import { createStore, createHook, Action } from 'react-sweet-state';


type State = { images: Array<string> };
type Actions = typeof actions;

const name = 'Images'

const initialState = {
  images: [],
};

const actions = {
  save: (image : string) => ({ }) => {
    console.log(image)
  },
}

const Store = createStore<State, Actions>({
  initialState,
  actions,
  name
});

export default createHook(Store);
