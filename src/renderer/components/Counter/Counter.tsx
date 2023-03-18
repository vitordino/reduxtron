import useStore from 'renderer/store';
import useDispatch from 'renderer/hooks/useDispatch';
import RenderCounter from 'renderer/components/RenderCounter/RenderCounter';

const Counter = () => {
  const counter = useStore((x) => x.counter);
  const dispatch = useDispatch();
  return (
    <div>
      <RenderCounter />
      <button onClick={() => dispatch({ type: 'DECREMENT' })} type="button">
        -
      </button>
      <code>{counter}</code>
      <button onClick={() => dispatch({ type: 'INCREMENT' })} type="button">
        +
      </button>
    </div>
  );
};

export default Counter;
