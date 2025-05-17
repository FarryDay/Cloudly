import type { ClientProxy, Closeable } from '@nestjs/microservices'

export type FsClient = ClientProxy & Closeable & { id: number }

export type FsClientStats = {clientId: number, storageSize: number, totalSize: number, freeSize: number }