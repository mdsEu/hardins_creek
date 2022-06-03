import React from 'react';

// Hooks
import useSignatures from '../../hooks/useSignature'

function Signatures() {
  const { printImages } = useSignatures();

  return (
    <div className='signatures-wrapper'>
      {printImages()}
    </div>
  )
}

export default Signatures
