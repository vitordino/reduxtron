import AddToDo from 'renderer/components/AddToDo'
import ToDoList from 'renderer/components/ToDoList'
import { Toolbar } from 'renderer/components/Toolbar'
import ToDoVisibilityToggle from 'renderer/components/ToDoVisibilityToggle'
import ToDoClearButton from './ToDoClearButton'
import Footer from './Footer'

const ToDoView = () => (
	<>
		<Toolbar>to do</Toolbar>
		<div id='view' className='flex-1 flex flex-col'>
			<AddToDo />
			<ToDoList />
			<Footer>
				<ToDoVisibilityToggle />
				<div className='flex-1' />
				<ToDoClearButton />
			</Footer>
		</div>
	</>
)

export default ToDoView
