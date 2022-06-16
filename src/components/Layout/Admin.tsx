import { useEffect } from 'react';
import { Container } from "react-bootstrap";
import styles from '@/styles/Admin.module.scss';
import BoostrapHead from '@/components/Layout/BoostrapHead';


type LayoutProps = {
  children: React.ReactNode,
  title: string,
};

const Layout = ({ children, title }: LayoutProps) => {

  useEffect( () => {
    const Document: any = window.document;
    Document && Document.querySelector("body").classList.add("admin");
  }, []);

  return (
    <Container fluid className={styles.layout_admin}>
      <BoostrapHead title={title} />
      <div className={styles.layout_content}>{children}</div>
    </Container>
  );
}

export default Layout;