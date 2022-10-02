import React, { useEffect } from 'react';
import { Calculator } from './components';

const App = () => {

  useEffect(() => {
    document.title = "Calculator"
  })

  return (
    <div className="App">
      <div className='title'>Calculator</div>
      <Calculator/>
    </div>
  );
}

export default App;
