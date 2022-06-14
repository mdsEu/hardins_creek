import { createStore, createHook } from 'react-sweet-state';

import { saveLocalStorage } from '@/utils/storage';
import { json } from 'stream/consumers';

export interface User {
  __v: number;
  _id: string;
  email: string;
  token: string;
};

type State = {
  user: User;
};

type Actions = typeof actions;

const name = 'User'

const initialState = {
  user: {
    __v: 0,
    _id: '',
    email: '',
    token: '',
  }
};

const actions = {
  login: (email : string, password: string) => async ({ setState } : {setState: any}) => {

    const request = await fetch('./auth/signin', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (request.status === 200) {
      const user = await request.json();

      if (!user.errorMessage) {
        saveLocalStorage('token', user.token);
        setState({user});
      }
    }
  },
  validate: (token: string) => async ({ setState } : {setState: any}) => {
    if (token) {
      const request = await fetch('./auth/validate', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (request.status === 200) {
        const user = await request.json();

        if (!user.errorMessage) {
          setState({user});
          return true;
        }
      }
    }

    return false;
  }
}

const Store = createStore<State, Actions>({
  initialState,
  actions,
  name
});

export default createHook(Store);
