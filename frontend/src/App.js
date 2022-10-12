import React, { useState } from 'react';
import Analyse from './components/Analysis';
import Inspect from './components/Inspect'

function App() {

  // Toggle Mode to  display either data entry module or data analysis module

  const [toggleMode, setNewToggleMode] = useState(false);
  
  // Data entry module
  const inspectionScreen = (
    <header className="App-header">
      <h2>Inspect-It</h2>
      <Inspect />
    </header>
  )

  // Data analysis mode
  const analyseScreen = (<div>
    <h2>Analyse-It</h2>
    <Analyse />
    
  </div>)

  return (<div className="App">
    <select onChange={() => { setNewToggleMode(!toggleMode) }}>
      <option value="Inspect">INSPECT</option>
      <option value="Analyse">ANALYSE</option>
    </select>
  {/* switch between Analysing and Inspection modules*/}
    <div>{toggleMode ? analyseScreen : inspectionScreen}</div>
  </div>);
}
export default App;
