import React from 'react';
import Layout from '@/components/Layout/Admin';
import { Row, Form, Button, Col} from 'react-bootstrap';
import styles from '@/styles/Admin.module.scss';
import useUser from '../../hooks/userHook';
import Logo from '@/components/Layout/LogoHC';

function Admin() {
  const { login, onFormChange, email, password } = useUser();

  return (
    <Layout title="Login admin">
      <Row className={`${styles.login_wrapper} justify-content-center align-content-middle`}>
        <Col className="d-flex justify-content-center align-items-center">
          <Form onSubmit={login} className={styles.panel}>
            <Logo />
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={onFormChange('email')} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={onFormChange('password')}/>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Layout>
  )
}

export default Admin;
