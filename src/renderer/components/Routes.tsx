import { createBrowserRouter, RouterProvider, RouterProviderProps } from 'react-router-dom'
import AppLayout from 'renderer/components/AppLayout'
import { Toolbar } from 'renderer/components/Toolbar'
import SettingsView from 'renderer/components/SettingsView'
import Dog from 'renderer/components/Dog'
import ToDoView from 'renderer/components/ToDoView'
import Finder from 'renderer/components/Finder'

const router = createBrowserRouter([
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
