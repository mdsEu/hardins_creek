import { createStore, createHook } from 'react-sweet-state';
import { getLocalStorage } from '@/utils/storage';

type State = { signatures: Array<any>, isLoading: boolean };
type Actions = typeof actions;

const name = 'Images'

const initialState = {
  signatures: [],
  isLoading: false
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
      return signature;
    }

    return null;
  },
  getByStatus: (status : string) => async ({ setState } : {getState: any, setState: any}) => {
    const token = getLocalStorage('token');
    const approved = status === 'pending' ? 'null' : status === 'approved';
    setState({ isLoading: true });

    const request = await fetch(`../api/signatures?query="{\\"approved\\":${approved}}"`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (request.status === 200) {
      const signatures = await request.json();
      setState({ signatures: signatures.signatures, isLoading: false });
    } else {
      setState({ isLoading: false });
    }
  },
  updateStatus: (id: string, status:string) => async ({ setState, getState } : {getState: any, setState: any}) => {
    const token = getLocalStorage('token');
    const { signatures } = getState();

    const request = await fetch(`../api/signatures/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        status,
      }),
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (request.status === 200) {
      const signature = await request.json();

      const signatureIndex = signatures.findIndex((s:any) => s._id === signature._id);

      signatures[signatureIndex] = signature;

      setState({ signatures: [...signatures]});
    }
  }
}

const Store = createStore<State, Actions>({
  initialState,
  actions,
  name
});

export default createHook(Store);
