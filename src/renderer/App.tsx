import Counter from 'renderer/components/Counter/Counter'
import AddToDo from 'renderer/components/ToDo/AddToDo'
import ToDoList from 'renderer/components/ToDo/ToDoList'
import UIControls from 'renderer/components/UI/UIControls'
import Dog from 'renderer/components/Dog/Dog'
import Folder from 'renderer/components/Folder/Folder'

const App = () => (
	<main>
		<h1>counter</h1>
		<Counter />
		<h1>to do</h1>
		<AddToDo />
		<ToDoList />
		<h1>ui</h1>
		<UIControls />
		<h1>folder</h1>
		<Folder />
		<h1>dog</h1>
		<Dog />
	</main>
)

export default App
