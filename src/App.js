import React from 'react';
import { CUBE_NET_LIB } from './cubenets/CubeNetLib';
import SimpleBoard from './components/SimpleBoard';

function App() {
    console.log(CUBE_NET_LIB.length);

    function getRandomIndices(count, total) {
        const indices = Array.from({ length: total }, (_, i) => i);
      
        // Fisher-Yates shuffle
        for (let i = indices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [indices[i], indices[j]] = [indices[j], indices[i]];
        }
      
        return indices.slice(0, count);
    }

    const selected = getRandomIndices(10, CUBE_NET_LIB.length);
    //[48, 113, 115, 171, 96, 25, 184, 102, 182, 161];
    console.log(selected);

    return (
        <div className='main-board'>
            <h1>Is the following net a valid cube net?</h1>
            <div className='net-board'>
                <SimpleBoard indices={selected} />
            </div>
        </div>
    );
  }
  
  export default App;
