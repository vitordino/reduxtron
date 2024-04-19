import { createHashRouter, RouterProvider, RouterProviderProps } from 'react-router-dom'
import { AppLayout } from 'src/renderer/components/AppLayout'
import { SettingsView } from 'src/renderer/components/SettingsView'
import { Dog } from 'src/renderer/components/Dog'
import { ToDoView } from 'src/renderer/components/ToDoView'
import { Finder } from 'src/renderer/components/Finder'

const router = createHashRouter([
	{
		path: '/',
		element: <AppLayout />,
		children: [
			{
				path: '/to-do',
				element: <ToDoView />,
			},
			{
				path: '/settings',
				element: <SettingsView />,
			},
			{
				path: '/dog',
				element: <Dog />,
			},
			{
				path: '/finder',
				element: <Finder />,
			},
		],
	},
])

export const Routes = (props: Omit<RouterProviderProps, 'router'>) => (
	<RouterProvider {...props} router={router} />
)
