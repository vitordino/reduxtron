import AddToDo from 'renderer/components/AddToDo'
import ToDoList from 'renderer/components/ToDoList'
import { Toolbar } from 'renderer/components/Toolbar'
import ToDoVisibilityToggle from 'renderer/components/ToDoVisibilityToggle'
import ToDoClearButton from './ToDoClearButton'

const ToDoView = () => (
	<>
		<Toolbar>to do</Toolbar>
		<AddToDo />

		<ToDoList />
		<footer className='flex bg-slate-2 border-slate-4 border-t'>
			<ToDoVisibilityToggle />
			<div className='flex-1' />
			<ToDoClearButton />
		</footer>
	</>
)

export default ToDoView
