import { AddToDo } from 'src/renderer/components/AddToDo'
import { ToDoList } from 'src/renderer/components/ToDoList'
import { Toolbar } from 'src/renderer/components/Toolbar'
import { ToDoVisibilityToggle } from 'src/renderer/components/ToDoVisibilityToggle'
import { ToDoClearButton } from 'src/renderer/components/ToDoClearButton'
import { Footer } from 'src/renderer/components/Footer'

export const ToDoView = () => (
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
