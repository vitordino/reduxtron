import { createBrowserRouter, RouterProvider, RouterProviderProps } from 'react-router-dom'
import AppLayout from 'renderer/components/AppLayout'
import { Toolbar } from 'renderer/components/Toolbar'
import Counter from 'renderer/components/Counter'
import AddToDo from 'renderer/components/AddToDo'
import ToDoList from 'renderer/components/ToDoList'
import UIControls from 'renderer/components/UIControls'
import Folder from 'renderer/components/Folder'
import Dog from 'renderer/components/Dog'
import ToDoView from './ToDoView'

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
				path: '/folder',
				element: (
					<>
						<Toolbar>folder</Toolbar>
						<Folder />
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
		],
	},
])

export const Routes = (props: Omit<RouterProviderProps, 'router'>) => (
	<RouterProvider {...props} router={router} />
)
