import type { NextPage } from 'next'
import {useState} from 'react'
import ModalAgeGate from '../components/ModalAgeGate';

import documentStore from '../store/documentStore';
import HcBody from '../components/HcBody';

import { IFrameModal } from '../components/modal';
import { IiFrame } from '../types';

const Home: NextPage = () => {
  const [,actionsDocument] = documentStore();

  const[openModal, setOpenModal] = useState(true);
  const[ageError, setAgeError] = useState(false);


  const modalIframe: IiFrame = {
    title: 'You signature has been recorded.',
    url: 'https://www.responsibility.org/',
    width: '96%',
  };

  return (
    <HcBody>
        <ModalAgeGate
          open={openModal}
          onClose={() => setOpenModal(true)}
          storeAction={ actionsDocument }
          setAgeError={setAgeError}
          />
        <button style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          padding: '5px 10px',
          fontSize: '1.6rem',
          width: '200px',
        }} onClick={() => setOpenModal(true)}>Demo Open Modal</button>
        <div style={{ height: '2000px' }}></div>
        {ageError && <IFrameModal modal={modalIframe} setAgeError={setAgeError} />}
    </HcBody>
  )
}

export default Home
