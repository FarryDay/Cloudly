import {
  BadRequestException,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import type { Folder } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { microservices } from '../config';
import type { CreateFolderDto } from './dto/createFolder.dto';
import type { FsClient, FsClientStats } from './types';
import { getBetterStatsClient } from './utils';

@Injectable()
export class FsService {
  private clients: FsClient[] = [];

  constructor(private readonly prismaService: PrismaService) {
    for (let service of microservices) {
      const client = ClientProxyFactory.create({
        transport: Transport.TCP,
        options: {
          host: service.host,
          port: service.port,
        },
      }) as FsClient;
      client.id = service.id;
      this.clients.push(client);
      client.connect().catch(() => {
        console.log(`Service ${service.id} dont work!`);
        this.clients.filter((client) => client.id !== service.id);
      });
    }
  }

  private async getBetterCloud() {
    const stats: FsClientStats[] = [];

    for (let client of this.clients) {
      const res = client.send({ cmd: 'get_stats' }, 0);

      const response = (await new Promise((resolve, reject) => {
        res.subscribe((data) => {
          resolve(data);
        });
      })) as FsClientStats;

      response.clientId = client.id;
      stats.push(response);
    }

    const betterClientStats = getBetterStatsClient(stats);
    return this.clients.find(
      (client) => client.id === betterClientStats.clientId,
    );
  }

  private async generateVirtualPath(userId: number, folder: Folder) {
    let path = `${folder.name}/`;
    if (folder.parentFolderId !== null) {
      const parentFolder = await this.findFolder(userId, folder.parentFolderId);
      path = (await this.generateVirtualPath(userId, parentFolder)) + path;
    }
    return path;
  }

  async saveFile(
    userId: number,
    file: Express.Multer.File,
    folder: Folder | null,
  ) {
    const cloud = await this.getBetterCloud();
    const res = cloud.send(
      { cmd: 'save_file' },
      {
        userId,
        path:
          folder !== null
            ? await this.generateVirtualPath(userId, folder)
            : '/',
        file,
      },
    );
    const data = await new Promise((resolve) => {
      res.subscribe((data) => {
        resolve(data);
      });
    });
    if (data == undefined) throw new ServiceUnavailableException();
    return this.prismaService.file.create({
      data: {
        filename: file.originalname,
        virtualFS: {
          connect: {
            userId: userId,
          },
        },
        folder: folder !== null ? { connect: { id: folder.id } } : null,
        serviceId: cloud.id,
        path:
          folder !== null
            ? await this.generateVirtualPath(userId, folder)
            : '/',
      },
    });
  }

  async findFolder(userId: number, folderId: string) {
    return this.prismaService.folder.findUnique({
      where: {
        virtualFS: { userId },
        id: folderId,
      },
    });
  }

  async createFolder(userId: number, createFolderDto: CreateFolderDto) {
    let parentFolder: Folder | null = null;
    if (createFolderDto.parentFolderId) {
      parentFolder = await this.findFolder(
        userId,
        createFolderDto.parentFolderId,
      );
    }

    const alreadyExists = await this.prismaService.folder.findFirst({
      where: {
        virtualFS: { userId },
        parentFolderId: parentFolder === null ? null : parentFolder.id,
        name: createFolderDto.name,
      },
    });
    if (alreadyExists !== null) {
      throw new BadRequestException(
        'Папка с таким именем уже существует в данной директории!',
      );
    }

    const folderData = await this.prismaService.folder.create({
      data: {
        name: createFolderDto.name,
        virtualFS: {
          connect: {
            userId,
          },
        },
        parentFolderId: parentFolder === null ? null : parentFolder.id,
      },
    });

    const cloud = await this.getBetterCloud();
    const res = cloud.send(
      { cmd: 'create_folder' },
      {
        userId,
        path: await this.generateVirtualPath(userId, folderData),
      },
    );

    const data = await new Promise((resolve) => {
      res.subscribe((data) => {
        resolve(data);
      });
    });

    if (data == undefined) {
      await this.prismaService.folder.delete({ where: { id: folderData.id } });
      throw new ServiceUnavailableException();
    }

    return folderData;
  }
}
