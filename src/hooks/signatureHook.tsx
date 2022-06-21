/* eslint-disable react-hooks/exhaustive-deps */
import {useEffect, useState} from 'react'

import imageStore from '../store/imageStore';

function useSignature(isLoadingSignature : boolean) {

  const [store, actions] = imageStore();
  const {signatures} = store;
  const [filter, setFilter] = useState('pending');
  const [filteredSignatured, setFilteredSignatured] = useState(signatures)

  const load = async () => {
    if (isLoadingSignature) {
      await actions.getByStatus(filter);
    }
  }

  const filterStatus = (s : any) => {
    let value = null;

    if (filter === 'approved') {
      value = true;
    } else if (filter === 'rejected') {
      value = false;
    }
    return s.approved === value;
  }

  useEffect(() => {
    setFilteredSignatured([...signatures.filter(filterStatus)])
  }, [signatures]);

  useEffect(() => {
    load();
  }, [filter]);

  const updateStatus = (id: string, status: string) => {
    return () => {
      actions.updateStatus(id, status);
    }
  }

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;

    if (checked) {
      setFilter(id);
    }
  };

  return {
    filteredSignatured,
    updateStatus,
    handleFilter,
    isLoading: store.isLoading,
    filter
  }
}

export default useSignature;
