import { createBrowserRouter, RouterProvider, RouterProviderProps } from 'react-router-dom'
import AppLayout from 'renderer/components/AppLayout'
import { Toolbar } from 'renderer/components/Toolbar'
import Counter from 'renderer/components/Counter'
import UIControls from 'renderer/components/UIControls'
import Dog from 'renderer/components/Dog'
import ToDoView from 'renderer/components/ToDoView'
import Finder from 'renderer/components/Finder'

const router = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		children: [
			{
				path: '/counter',
				element: (
					<>
						<Toolbar>counter</Toolbar>
						<Counter />
					</>
				),
			},
			{
				path: '/to-do',
				element: <ToDoView />,
			},
			{
				path: '/ui',
				element: (
					<>
						<Toolbar>ui</Toolbar>
						<UIControls />
					</>
				),
			},
			{
				path: '/dog',
				element: (
					<>
						<Toolbar>dog</Toolbar>
						<Dog />
					</>
				),
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
