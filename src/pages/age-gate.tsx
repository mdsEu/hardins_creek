import type { NextPage } from 'next'
import {useState} from 'react'

import Signature from '../components/Signature';

import imageStore from '../store/imageStore';

import ModalAgeGate from '../components/ModalAgeGate';

import documentStore from '../store/documentStore';
import HcBody from '../components/HcBody';


const AgeGatePage: NextPage = () => {
  const [,actionsDocument] = documentStore();

  const[openModal, setOpenModal] = useState(false);

  return (
    <HcBody>
        <ModalAgeGate
          open={openModal}
          onClose={() => setOpenModal(false)}
          storeAction={ actionsDocument }
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
    </HcBody>
  )
}

export default AgeGatePage
