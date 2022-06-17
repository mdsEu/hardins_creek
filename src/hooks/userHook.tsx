/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';


import userStore from '../store/userStore';

const useUser = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userStorage, userActions] = userStore();

  useEffect(() => {
    if (userStorage.user.token && userStorage.user.token !== '') {
      router.push('/admin/approving-signatures');
    }
  }, [userStorage.user])



  const login =async(e:any) => {
    e.preventDefault();
    await userActions.login(email, password);
  }

  const onFormChange = (type: string) => {
    return (event: any) => {
      if (type === 'email') {
        setEmail(event.target.value);
      } else {
        setPassword(event.target.value);
      }
    }
  }



  return {
    login,
    onFormChange,
    email,
    password
  }
}


export default useUser;
