import React from 'react'

import {validateTokenSSR} from '../../utils/auth';


import SignatureTable from '@/components/SignatureTable';
import BoostrapHead from '@/components/BoostrapHead';

import useSignature from '../../hooks/signatureHook';

function ApprovingSignatures() {
  const { signatures } = useSignature();

  return (
    <>
       <BoostrapHead title="Approving Signatures" />
       <SignatureTable signatures={signatures} />
    </>
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
