import { createStore, createHook, Action } from 'react-sweet-state';


type State = { images: Array<string> };
type Actions = typeof actions;

const name = 'Images'

const initialState = {
  images: [],
};

const actions = {
  save: (image : File) => async ({ }) => {
    const data = new FormData();
    data.append("signature", image);

    const request = await fetch('./api/signatures/', {
      method: 'POST',
      body: data
    })

    if (request.status === 200) {
      const signature = await request.json()
      console.log(signature)
      return;
    }

    console.log(request)
  },
}

const Store = createStore<State, Actions>({
  initialState,
  actions,
  name
});

export default createHook(Store);
