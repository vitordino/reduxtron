import { createBrowserRouter, RouterProvider, RouterProviderProps } from 'react-router-dom'
import AppLayout from 'renderer/components/AppLayout'
import Counter from 'renderer/components/Counter/Counter'
import AddToDo from 'renderer/components/ToDo/AddToDo'
import ToDoList from 'renderer/components/ToDo/ToDoList'
import UIControls from 'renderer/components/UI/UIControls'
import Folder from 'renderer/components/Folder/Folder'
import Dog from 'renderer/components/Dog/Dog'

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
	<RouterProvider {...props} router={router} fallbackElement='fallback' />
)
