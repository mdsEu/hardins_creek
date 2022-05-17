import { createStore, createHook, Action } from 'react-sweet-state';


type State = { images: Array<string> };
type Actions = typeof actions;

const name = 'Images'

const initialState = {
  images: [],
};

const actions = {
  save: (image : string) => async ({ }) => {
    const file = new File([image], 'capture.png', {
      type: 'image/png',
    });
    const data = new FormData();
    data.append("signature", file);

    const request = await fetch('./api/signatures/', {
      method: 'POST',
      body: data
    })

    console.log(request)
  },
}

const Store = createStore<State, Actions>({
  initialState,
  actions,
  name
});

export default createHook(Store);
