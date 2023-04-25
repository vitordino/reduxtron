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
		<div className='h-9' />
		<footer className='flex fixed w-[stretch] bottom-0 h-9 bg-slate-2 border-slate-4 border-t z-10'>
			<ToDoVisibilityToggle />
			<div className='flex-1' />
			<ToDoClearButton />
		</footer>
	</>
)

export default ToDoView
