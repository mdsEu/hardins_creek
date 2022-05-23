import React from 'react';

import documentStore from '../../store/documentStore';

function HcBody(props: any) {
  const [stateDocument] = documentStore();

  return (
    <div className={stateDocument.strBodyClasses}>
      <div>{props.children}</div>
    </div>
  )
}
HcBody.defaultProps = {
}
HcBody.propTypes = {
}

export default HcBody;
