import type { ToDo as TodoType } from 'main/store/reducers/toDos';
import useDispatch from 'renderer/hooks/useDispatch';

const ToDo = ({ id, title, completed }: TodoType) => {
  const dispatch = useDispatch();
  const toggle = () => dispatch({ type: 'TOGGLE_TO_DO', payload: id });
  const remove = () => dispatch({ type: 'REMOVE_TO_DO', payload: id });
  return (
    <div>
      <input id={id} type="checkbox" checked={completed} onChange={toggle} />
      <label htmlFor={id}>{title} </label>
      <button type="button" onClick={remove}>
        🗑️
      </button>
    </div>
  );
};

export default ToDo;
