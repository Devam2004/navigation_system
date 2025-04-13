import React from 'react';

const LocationButton = ({ inCampus, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 20px',
        background: inCampus ? '#4CAF50' : '#aaa',
        color: 'white',
        position: 'absolute',
        top: 10,
        right: 10,
        border: 'none',
        borderRadius: '8px',
        cursor: inCampus ? 'pointer' : 'not-allowed'
      }}
      disabled={!inCampus}
    >
      {inCampus ? 'Start Navigation' : 'Outside Campus'}
    </button>
  );
};

export default LocationButton;
