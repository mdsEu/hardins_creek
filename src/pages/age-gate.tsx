import type { NextPage } from 'next'
import {useState} from 'react'
import styles from '../styles/Home.module.css'

import Signature from '../components/Signature';

import imageStore from '../store/imageStore';

import ModalAgeGate from '../components/ModalAgeGate';

import documentStore from '../store/documentStore';


const AgeGatePage: NextPage = () => {
  const [stateDocument, actionsDocument] = documentStore();

  const[openModal, setOpenModal] = useState(false);

  return (
    <div className={stateDocument.strBodyClasses}>
      <div className={styles.container}>
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
      </div>
    </div>
  )
}

export default AgeGatePage
