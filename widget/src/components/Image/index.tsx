import React from 'react';

function Image({alt= '', ...props} : any) {
  return (
    <img { ...props } alt={alt}/>
  )
}

export default Image;
