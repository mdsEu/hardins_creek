/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect} from 'react'

import imageStore from '../store/imageStore';

function useSignature() {

  const [store, actions] = imageStore()

  useEffect(() => {
    const load = async () => {
      await actions.get();
    }
    load();
  }, [])

  const updateStatus = (id: string, status: string) => {
    return () => {
      actions.updateStatus(id, status);
    }
  }

  return {
    signatures: store.signatures,
    updateStatus
  }
}

export default useSignature;
