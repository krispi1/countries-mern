import React from 'react';
import spinner from '../assets/spinner-transparent-bg.gif';

const loadingStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  top: '50%',
  left: '50%',
};

function Loading() {
  return (
    <div style={loadingStyle}>
      <img src={spinner} alt="loading spinner" />      
    </div>
  )
}

export default Loading;
