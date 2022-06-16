import { useState } from 'react';
import Layout from '@/components/Layout/Admin';
import styles from '@/styles/Admin.module.scss';
import Logo from '@/components/Layout/LogoHC';
import Form from 'react-bootstrap/Form'

import {validateTokenSSR} from '../../utils/auth';
import SignatureTable from '@/components/SignatureTable';
import useSignature from '../../hooks/signatureHook';
function ApprovingSignatures() {
  const { signatures } = useSignature();

  const [filter, setFilter] = useState({
    approved: false,
    rejected: false,
  });

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setFilter({...filter, [id]: checked});
  };

  return (
    <Layout title="Approving Signatures">
      <div className={styles.table_wrapper}>
        <Logo />
        <div className={styles.filter_section}>
          <h5>Filter By: &nbsp;</h5>

          <Form>
          <Form.Check
              inline
              type="switch"
              id="approved"
              label="Approved"
              onChange={handleFilter}
              />
            <Form.Check 
              inline
              type="switch"
              id="rejected"
              label="Rejected"
              onChange={handleFilter}
            />
          </Form>

        </div>
        <SignatureTable signatures={signatures} filter={filter} />
      </div>
    </Layout>
  )
}

ApprovingSignatures.getInitialProps = async (ctx : any) => {
  // Must validate JWT
  // If the JWT is invalid it must redirect back to the main page.
  // You can do that with Router from 'next/router
  await validateTokenSSR(ctx)
  return {}
}

export default ApprovingSignatures
