import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

import Signature from '../components/Signature';

import imageStore from '../store/imageStore';

const Home: NextPage = () => {
  const [imgState, imgAction] = imageStore();

  return (
    <div className={styles.container}>
      <Signature storeAction={ imgAction }/>
    </div>
  )
}

export default Home
