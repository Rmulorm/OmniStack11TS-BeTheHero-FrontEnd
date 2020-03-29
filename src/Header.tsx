import React, { FunctionComponent } from 'react';

const Header: FunctionComponent = (props) => {
  return(
    <header>
      <h1>{props.children} </h1>
    </header>
  );
}

export default Header;