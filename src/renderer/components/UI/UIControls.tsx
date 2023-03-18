import useStore from 'renderer/store';
import useDispatch from 'renderer/hooks/useDispatch';
import RenderCounter from 'renderer/components/RenderCounter/RenderCounter';

const compare = (a: any, b: any) => JSON.stringify(a) === JSON.stringify(b);

const UI_CONTROLS = ['main-window', 'tray'];

const UIControls = () => {
  const visible = useStore((x) => x.ui?.visible, compare);
  const dispatch = useDispatch();

  return (
    <div>
      <RenderCounter />
      <ul>
        {UI_CONTROLS.map((x) => (
          <li key={x}>
            <input
              id={`ui-visible-${x}`}
              type="checkbox"
              checked={!!visible?.includes(x)}
              onChange={() => dispatch({ type: 'TOGGLE_VISIBLE', payload: x })}
            />
            <label htmlFor={`ui-visible-${x}`}>{x}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UIControls;
