import React from 'react';
import Image from 'next/image';
import {Button} from 'react-bootstrap';

import useSignature from '../../../hooks/signatureHook';

function SignatureRows({index, id, signature, status, createdAt}: {index: number, id:string, signature: string, status: string, createdAt: string}) {
  const { updateStatus } = useSignature();
  return (
    <tr>
      <td>{index}</td>
      <td>
        <Image
          src={signature}
          width={100}
          height={100}
          alt="signature"
        />
      </td>
      <td>{status}</td>
      <td>{createdAt}</td>
      <td><Button variant="primary" onClick={updateStatus(id, 'approved')}>Approve</Button></td>
      <td><Button variant="danger" onClick={updateStatus(id, 'rejected')}>Reject</Button></td>
    </tr>
  )
}

export default SignatureRows
