import React from 'react';
import './Pixel.css';

const Pixel = ({
  red,
  green,
  blue,
}) => {
  const backgroundColor = `rgb(${red}, ${green}, ${blue})`;
  return <div className="Pixel" style={{backgroundColor}}></div>
}

export default Pixel;
