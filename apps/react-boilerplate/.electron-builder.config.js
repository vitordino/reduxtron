/**
 * TODO: Rewrite this config to ESM
 * But currently electron-builder doesn't support ESM configs
 * @see https://github.com/develar/read-config-file/issues/10
 */

const { join } = require('path')

/**
 * @type {() => import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = () => ({
	appId: 'com.electron.app',
	productName: 'reduxtron',
	asar: false,
	// asarUnpack: ['resources/**'],
	icon: join(__dirname, 'resources', 'images', 'icon.png'),

	directories: {
		buildResources: 'build',
	},
	files: [
		'!**/.vscode/*',
		'!src/*',
		'!electron.vite.config.{js,ts,mjs,cjs}',
		'!{.eslintignore,.eslintrc.cjs,.prettierignore,.prettierrc.json,dev-app-update.yml,CHANGELOG.md,README.md}',
		'!{.env,.env.*,.npmrc,pnpm-lock.yaml}',
		'!{tsconfig.json,tsconfig.node.json,tsconfig.web.json}',
	],
	afterSign: 'build/notarize.js',
	win: {
		executableName: 'reduxtron',
	},
	nsis: {
		artifactName: '${name}-${version}-setup.${ext}',
		shortcutName: '${productName}',
		uninstallDisplayName: '${productName}',
		createDesktopShortcut: 'always',
	},
	mac: {
		icon: join(__dirname, 'build', 'images', 'icon.icns'),

		entitlementsInherit: 'build/entitlements.mac.plist',
		extendInfo: [
			{
				NSCameraUsageDescription: "Application requests access to the device's camera.",
			},
			{
				NSMicrophoneUsageDescription: "Application requests access to the device's microphone.",
			},
			{
				NSDocumentsFolderUsageDescription:
					"Application requests access to the user's Documents folder.",
			},
			{
				NSDownloadsFolderUsageDescription:
					"Application requests access to the user's Downloads folder.",
			},
		],
	},
	dmg: {
		artifactName: '${name}-${version}.${ext}',
	},
	linux: {
		target: ['AppImage', 'snap', 'deb'],
		maintainer: 'electronjs.org',
		category: 'Utility',
	},
	appImage: {
		artifactName: '${name}-${version}.${ext}',
	},
	npmRebuild: false,
	publish: {
		provider: 'generic',
		url: 'https://example.com/auto-updates',
	},
})
