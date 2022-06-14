import React from 'react';
import {Container, Row, Form, Button, Col} from 'react-bootstrap';
import BoostrapHead from '../../components/BoostrapHead';

import loginStyle from '../../styles/Login.module.scss';


import useUser from '../../hooks/userHook';


function Admin() {
  const { login, onFormChange, email, password } = useUser();

  return (
    <>
      <BoostrapHead title="Admin" />
      <Container className={`${loginStyle.login_wrapper}`}>
        <Row className={`${loginStyle.form_wrapper} justify-content-center align-content-middle`}>
          <Col lg="12">
            <Form onSubmit={login}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={onFormChange('email')} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={onFormChange('password')}/>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Admin;
