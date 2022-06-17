import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const saveLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
  cookies.set(key, value, { maxAge: 60 * 60 * 24 });
}

const getLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}


export {
  saveLocalStorage,
  getLocalStorage
}
