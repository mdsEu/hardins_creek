import React from 'react'

import {Table} from 'react-bootstrap';

import Header from './Components/Header';
import SignatureRows from './Components/SignatureRows';

const HEADERS = ['#', 'signature', 'status', 'created at','approve', 'reject'];

function SignatureTable({signatures} : {signatures: any[]}) {
  return (
    <Table striped bordered hover>
      <Header headers={HEADERS} />
      <tbody>
        {signatures.map((signature, index) => (
          <SignatureRows
          key={index as number}
          index={index as number}
          id={signature._id}
          signature={signature.url}
          status={signature.approved ? 'approved' : 'rejected'}
          createdAt={signature.createdAt}
        />
        ))}
      </tbody>
    </Table>
  )
}

export default SignatureTable
