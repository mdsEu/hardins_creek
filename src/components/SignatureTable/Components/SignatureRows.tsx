import React from 'react';
import Image from 'next/image';
import {Button} from 'react-bootstrap';
import styles from '@/styles/Admin.module.scss';

function SignatureRows({index, id, signature, status, updateStatus, createdAt}: {index: number, id:string, signature: string, status: string, updateStatus: (id : string, signature : string)=> () => void, createdAt: string}) {

  return (
    <tr>
      <td>{(index + 1 )}</td>
      <td className={styles.cell_signature}>
        <Image
          src={signature}
          layout="fill"
          objectFit='contain'
          alt="signature"
        />
      </td>
      <td>{status}</td>
      <td>{createdAt}</td>
      <td>
        <Button variant="success" onClick={updateStatus(id, 'approved')}>Approve</Button> &nbsp;
        <Button variant="danger" onClick={updateStatus(id, 'rejected')}>Reject</Button>
      </td>
    </tr>
  )
}

export default SignatureRows
