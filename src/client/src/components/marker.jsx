import React from 'react';
import '../css/Marker.css';

export default function Marker(props){
  return (
    <div>
      <div
        className="pin bounce"
        style={{ backgroundColor: props.color, cursor: 'pointer' }}
        title={props.name}
      />
      <div className="pulse" />
    </div>
  );
};
