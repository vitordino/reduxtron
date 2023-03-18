import { Reorder } from 'framer-motion';

import useStore from 'renderer/store';
import useDispatch from 'renderer/hooks/useDispatch';
import RenderCounter from 'renderer/components/RenderCounter/RenderCounter';
import ToDo from './ToDo';

const compare = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);

const ToDoList = () => {
  const toDos = useStore((x) => x.toDos, compare);
  const dispatch = useDispatch();

  const setToDos = (payload?: typeof toDos) => {
    if (!payload) return;
    dispatch({ type: 'SET_TO_DOS', payload });
  };

  if (!toDos?.length) {
    return (
      <div>
        <RenderCounter />
        empty todo list
      </div>
    );
  }

  return (
    <div>
      <RenderCounter />
      <Reorder.Group axis="y" values={toDos} onReorder={setToDos}>
        {toDos.map((item) => (
          <Reorder.Item key={item.id} value={item}>
            <ToDo {...item} />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};

export default ToDoList;
