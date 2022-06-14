import React from 'react';
import Head from "next/head";

function BootstrapHead({ title, ...props } : { title: string, [key: string]: any }) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        />
        <title>{title}</title>
      </Head>
    </>
  )
}


export default BootstrapHead;
