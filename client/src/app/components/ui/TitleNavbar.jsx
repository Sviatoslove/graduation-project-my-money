import React from 'react';
import PropTypes from 'prop-types';

 const TitleNavbar = ({path}) => {
  console.log('path:', path)
  const titleNavbar = {
    '/': 'Посмотри насколько ты хорош!',
    '/counts': 'Счета'

  }
  return ( <div style={{fontWeight:'bold', fontSize:'2em'}}>{titleNavbar[path]}</div> );
 }

 TitleNavbar.propTypes={
  path: PropTypes.string
 }
  
 export default TitleNavbar;