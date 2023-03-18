import { MenuItemConstructorOptions } from 'electron';
import store, { State } from '../store';

const TrayDog = (state: State): MenuItemConstructorOptions => {
  const breeds = state.dog?.allBreeds || [];
  const status = state.dog?.status;
  const favorite = state.dog?.favorite?.name;
  return {
    label: 'dog',
    type: 'submenu',
    submenu: [
      {
        label: favorite ? `favorite: ${favorite}` : 'no favorite dog ):',
        type: 'normal',
      },
      {
        type: 'separator',
      },
      breeds.length
        ? {
            label: 'pick one',
            type: 'submenu',
            submenu: breeds?.map((label) => ({
              label,
              type: 'radio',
              checked: label === favorite,
              click: () =>
                store.dispatch({
                  type: 'DOG:SELECT_FAVORITE_BREED',
                  payload: label,
                }),
            })),
          }
        : {
            label: `no breeds: ${status}`,
          },
    ],
  };
};

export default TrayDog;
