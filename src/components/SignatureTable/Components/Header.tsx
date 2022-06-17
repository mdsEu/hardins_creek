import React from 'react';

function Header({headers}: {headers: string[]}) {
  return (
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th key={index}>{header}</th>
        ))}
      </tr>
    </thead>
  )
}

export default Header
