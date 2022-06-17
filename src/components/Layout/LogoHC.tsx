import Image from 'next/image';
import logo from '@/public/images/modal-age-gate/logo_hardinscreek.png';
import styles from '@/styles/Admin.module.scss';

const Logo = () => {
  return (
    <div className={styles.wrap_logo}>
      <Image
        src={logo}
        alt="Hardin's Creek"
        width={180}
        height={41.7}
      />
    </div>
  );
}

export default Logo;