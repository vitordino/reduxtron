import { app } from 'electron'
import { URL } from 'url'
import path from 'path'

export const resolveHtmlPath = (htmlFileName: string) => {
	if (process.env.NODE_ENV === 'development') {
		const port = process.env.PORT || 1212
		const url = new URL(`http://localhost:${port}`)
		url.pathname = htmlFileName
		return url.href
	}
	return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`
}

const RESOURCES_PATH = app.isPackaged
	? path.join(process.resourcesPath, 'assets')
	: path.join(__dirname, '../../assets')

export const getAssetPath = (...paths: string[]): string => {
	return path.join(RESOURCES_PATH, ...paths)
}
