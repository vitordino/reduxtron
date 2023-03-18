import { ChangeEvent } from 'react';
import useStore from 'renderer/store';
import useDispatch from 'renderer/hooks/useDispatch';
import RenderCounter from 'renderer/components/RenderCounter/RenderCounter';

const compare = (a: unknown, b: unknown) =>
  JSON.stringify(a) === JSON.stringify(b);

const Dog = () => {
  const status = useStore((x) => x.dog?.status);
  const allBreeds = useStore((x) => x.dog?.allBreeds, compare);
  const favoriteName = useStore((x) => x.dog?.favorite?.name);
  const favoriteImage = useStore((x) => x.dog?.favorite?.image);
  const dispatch = useDispatch();

  const handleChangeFavorite = (e: ChangeEvent<HTMLSelectElement>) =>
    dispatch({ type: 'DOG:SELECT_FAVORITE_BREED', payload: e.target.value });

  return (
    <div>
      <RenderCounter />
      <pre>{JSON.stringify({ status })}</pre>
      <select value={favoriteName} onChange={handleChangeFavorite}>
        <option value="">---</option>
        {allBreeds?.map((x) => (
          <option key={x} value={x}>
            {x}
          </option>
        ))}
      </select>
      <div>
        <img
          style={{ width: 128, height: 128, objectFit: 'cover' }}
          src={favoriteImage}
        />
      </div>
    </div>
  );
};

export default Dog;
