import React, { useState, useEffect } from 'react'

import {Table} from 'react-bootstrap';

import Header from './Components/Header';
import SignatureRows from './Components/SignatureRows';

const HEADERS = ['#', 'signature', 'status', 'created at','actions'];

type Filters = {
  signatures: any[],
  filter: any,
}

function SignatureTable({signatures, filter} : Filters) {

  const [filteredSignatures, setFilteredSignatures] = useState(signatures);

  useEffect(() => {
    // only filter signature Approved
    // if filter.approved is true and filter.rejected is false => only approved===true
    // if filter.approved is false and filter.rejected is true => only approved===false
    // else not filter

    if(filter.approved !== filter.rejected) {
      setFilteredSignatures(() => {
        return signatures.filter(signature => {
          return filter.approved && !filter.rejected ? signature.approved === true : signature.approved === false;
        });
      });

    } else {
      setFilteredSignatures(signatures);
    }

  }, [signatures, filter]);

  return (
    <Table striped bordered hover variant="dark">
      <Header headers={HEADERS} />
      <tbody>
        {filteredSignatures && filteredSignatures.map((signature, index) => (
          <SignatureRows
          key={index as number}
          index={index as number}
          id={signature._id}
          signature={signature.url}
          status={signature.approved ? 'approved' : 'rejected'}
          createdAt={signature.created_at}
        />
        ))}
      </tbody>
    </Table>
  )
}

export default SignatureTable
