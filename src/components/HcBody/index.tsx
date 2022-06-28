import React from 'react';
import Head from 'next/head';
import documentStore from '../../store/documentStore';

function HcBody(props: any) {
  const [stateDocument] = documentStore();

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=2, user-scalable=1, viewport-fit=cover" />
      </Head>
      <div className={stateDocument.strBodyClasses as string}>
        <div>{props.children}</div>
      </div>
    </>
  )
}
HcBody.defaultProps = {
}
HcBody.propTypes = {
}

export default HcBody;
