import React, { useEffect, useMemo, useState } from 'react';
import Pixel from '../Pixel/Pixel';
import './Artboard.css';

const Artboard = () => {
  const [colours, setColours] = useState([]);
  const totalColours = 256;
  const totalSteps = 32;
  const colourStep = totalColours / totalSteps;

  const [shufflingColours, setShufflingColours] = useState(false);
  const [resettingColours, setResettingColours] = useState(true);
  const loading = shufflingColours || resettingColours;

  // Reset colour after render so app doesnt feel laggy
  useEffect(() => {
    if (resettingColours) {
      resetColour();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resettingColours]);

  // Shuffle colours after render so app doesnt feel laggy
  useEffect(() => {
    if (shufflingColours) {
      shuffle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shufflingColours]);

  const resetColour = () => {
    const initColours = [];

    for (let r = 1; r <= 32; r++) {
      for (let g = 1; g <= 32; g++) {
        for (let b = 1; b <= 32; b++) {
          const rStepped = r * colourStep;
          const gStepped = g * colourStep;
          const bStepped = b * colourStep;
          const rgb = `rgb(${rStepped}, ${gStepped}, ${bStepped})`;
          initColours.push(rgb);
        }
      }
    }

    setColours(initColours);
    setResettingColours(false);
  }

  const shuffle = () => {
    const tempColours = [ ...colours ];

    for (let i = tempColours.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tempColours[i], tempColours[j]] = [tempColours[j], tempColours[i]];
    }

    setColours(tempColours);
    setShufflingColours(false);
  }

  const pixels = useMemo(() => colours.map((colour, index) => <Pixel key={index} backgroundColor={colour} />), [colours]);

  const rows = useMemo(() => {
    const tempRows = [];

    while (pixels.length > 0) {
      const row = [];

      while (row.length < 128) {
        row.push(pixels.shift());
      }

      tempRows.push(<div className="Row" key={tempRows.length}>{ row }</div>);
    }

    return tempRows;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colours]);

  return (
    <div className="Artboard">
      { loading
        ? <div>...loading</div>
        : (
          <>
            {rows}
            <button onClick={() => setShufflingColours(true)}>Shuffle</button>
            <button onClick={() => setResettingColours(true)}>Reset</button>
          </>
        )
      }
    </div>
  );
}

export default Artboard;
