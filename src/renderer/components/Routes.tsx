import { createBrowserRouter, RouterProvider, RouterProviderProps } from 'react-router-dom'
import AppLayout from 'renderer/components/AppLayout'
import Counter from 'renderer/components/Counter'
import AddToDo from 'renderer/components/AddToDo'
import ToDoList from 'renderer/components/ToDoList'
import UIControls from 'renderer/components/UIControls'
import Folder from 'renderer/components/Folder'
import Dog from 'renderer/components/Dog'

const router = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		children: [
			{
				path: '/counter',
				element: <Counter />,
			},
			{
				path: '/to-do',
				element: (
					<>
						<AddToDo />
						<ToDoList />
					</>
				),
			},
			{
				path: '/ui',
				element: <UIControls />,
			},
			{
				path: '/folder',
				element: <Folder />,
			},
			{
				path: '/dog',
				element: <Dog />,
			},
		],
	},
])

export const Routes = (props: Omit<RouterProviderProps, 'router'>) => (
	<RouterProvider {...props} router={router} />
)
