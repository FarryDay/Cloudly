export type SaveFileRequest = {
	userId: number,
	path: string,
	file: Express.Multer.File
}

export type CreateFolderRequest = {
	userId: number,
	path: string
}