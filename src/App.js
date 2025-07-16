import React, { useState, useEffect } from 'react';
import './App.css';

// Data for the 9 drum pads
const drumPads = [
  {
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4.mp3'
  },
  {
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

function App() {
  const [display, setDisplay] = useState('');

  const playSound = (keyTrigger, description) => {
    setDisplay(description);
    const audio = document.getElementById(keyTrigger);
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  const handleKeyPress = (event) => {
    const key = event.key.toUpperCase();
    const drumPad = drumPads.find(pad => pad.keyTrigger === key);
    if (drumPad) {
      playSound(drumPad.keyTrigger, drumPad.id);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div id="drum-machine">
      <div id="display">{display || 'Press a key'}</div>
      <div className="pad-container">
        {drumPads.map(pad => (
          <div
            key={pad.id}
            className="drum-pad"
            id={pad.id}
            onClick={() => playSound(pad.keyTrigger, pad.id)}
          >
            {pad.keyTrigger}
            <audio
              className="clip"
              id={pad.keyTrigger}
              src={pad.url}
            ></audio>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
