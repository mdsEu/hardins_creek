import React, { useState, useEffect } from 'react'

import {Table} from 'react-bootstrap';

import Header from './Components/Header';
import SignatureRows from './Components/SignatureRows';

import useSignature from 'src/hooks/signatureHook';
const HEADERS = ['#', 'signature', 'status', 'created at','actions'];


function SignatureTable({signature} : {signature: Array<any>}) {
  const {updateStatus} = useSignature(false);

  return (
    <Table striped bordered hover variant="dark">
      <Header headers={HEADERS} />
      <tbody>
        {signature && signature.map((signature, index) => (
          <SignatureRows
          key={index as number}
          index={index as number}
          id={signature._id}
          signature={signature.url}
          status={signature.approved ? 'approved' : signature.approved === null ? 'pending' : 'rejected'}
          createdAt={signature.created_at}
          updateStatus={updateStatus}
        />
        ))}
      </tbody>
    </Table>
  )
}

export default SignatureTable
