import React, { useState, useEffect } from "react";
import endpoints from "./Endpoints";
import axios from "axios";
import Defect from './Defect';
import jQueryStatic from "jquery";
import SelectFG from "./SelectFG";

// save part as ok flag if no defect detected
let isOK = true

function Inspect() {

  // Inspect module variables

  const [part, setNewPart] = useState('');
  const [partFG, setPartFG] = useState('');
  const [partDescription, setPartDescription] = useState('');
  const [referenceImage, setNewReferenceImage] = useState('');
  const [partInstance, setNewPartInstance] = useState(null);
  const [serialNumber, setSerialNumber] = useState(' ');
  const [inspectionStage, setInspectionStage] = useState('Final inspection');
  const [inspectionStatus, setInspectionStatus] = useState('OK');

  const [isFgCode, setIsFgCode] = useState(false);
  const [isSerial, setIsSerial] = useState(false);
  const [isStage, setIsStage] = useState(false);
  // const [isOK, setIsOK] = useState(true)

  // Update part data for inspection
  useEffect(() => { getParts() }, [partFG, isSerial]);

  // Retrieve part data from server
  function getParts() {
    axios({
      method: "GET",
      url: endpoints.partURL,

    }).then((response) => {
      const data = response.data;
      const retrievedPart = data.filter(i => i.FG_code == partFG);
      setNewReferenceImage(retrievedPart[0].img_reference);
      setPartFG(retrievedPart[0].FG_code);
      setPartDescription(retrievedPart[0].description);
      setNewPart(retrievedPart[0].id)

    }).catch((error) => {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    })
  }

  // Save inspected parts
  function addPartInstance() {
    // if serial number is valid
    if (isSerialValid()) {
      // save a new part instance 
      function getCookie(name) {
        // get a csrf token
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
            var cookie = jQueryStatic.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
            }
          }
        }
        console.log(cookieValue)

        return cookieValue;
      };

      const csrftoken = getCookie('csrftoken');

      // object to be saved
      const inspectionResults = {
        "part_origin": part,
        "serial_number": serialNumber,
        "stage": inspectionStage,
        "passed": isOK,

      };

      console.log('inspection results', inspectionResults)

      axios({
        method: "POST",
        url: endpoints.instanceURL,
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFTOKEN': csrftoken
        },
        data: inspectionResults,
      }).then((response) => {
        setNewPartInstance(response.data.id);
        setInspectionStage(response.data.stage);
        setInspectionStatus(response.data.status);
      })
      //reset serial number and 
      setSerialNumber('')
      setIsSerial(false)
    }

    return false
  }

  function isSerialValid() {
    if (serialNumber.length >= 9 && serialNumber.length < 12) {
      console.log('serial', serialNumber)
      setIsSerial(true)
      return true
    }
    window.alert('The serial number you put is not valid')
    return false
  }
  
  // hide elements by this empty div
  const noDisplay = <div></div>

  // part status (Rework, Quarantine, Scrap)
  const statusDisplay = <div>
    <select onChange={(e) => { setInspectionStatus(e.target.value) }}>
      <option value="What is the next action"> What is the next action</option>
      <option value="Rework"> Rework </option>
      <option value="Quarantine"> Quarantine </option>
      <option value="Scrap"> Scrap </option>
    </select>
  </div>

  // 'passed' and 'failed' buttons view
  
  const displayPassedButtons = <div>
    <button id="okButton" type="button" onClick={() => { isOK = true; addPartInstance() }}>Passed</button>
    <button id="failButton" type="button" onClick={() => { isOK = false; addPartInstance(); setIsStage(false) }}>Failed</button>
  </div>

  // select inspection stage view
  const stageSelector = <div>
    <select onChange={(e) => { setInspectionStage(e.target.value); setIsStage(true) }}>
      <option value=""> Final inspection</option>
      <option value="Final Inspection"> Final inspection</option>
      <option value="Pre-paint Inspection"> Pre-paint Inspection</option>
    </select>
    <div>
      {isStage ? noDisplay : serialDisplay}
    </div>
    <div>
      {isSerial ? displayPassedButtons : noDisplay}
    </div>
  </div>

  // serial number input view
  const serialDisplay = <div>
    <form >
      <label>SERIAL NUMBER</label>
      <input type="text" value={serialNumber} onChange={(e) => { setSerialNumber(e.target.value) }} />
      <button type="submit" onClick={(e) => { e.preventDefault(); isSerialValid() }}>+</button>
    </form>
  </div>

  // mark defect view
  const defectMarkUp = <div>
    <Defect
      origin={part}
      originFG={partFG}
      originDescription={partDescription}
      image={referenceImage}
      part_instance={partInstance}
      serialNumber={serialNumber}
      stage={inspectionStage}
      status={inspectionStatus}
      nextPart={setIsStage}
    />
    <div>{statusDisplay}</div>
  </div>
  console.log('is serial', isSerial)

  const newPart = <div>
    {/* Select the FG code of the inspected part */}
    <SelectFG
      selectFGCode={setPartFG}
      setFgCode={setIsFgCode}
    />
    {/* Display the FG code and part description */}
    <h2>{partFG}</h2>
    <h2>{partDescription}</h2>

    {/* Display inspection stage selector if a part has been selected */}
    <div>{isFgCode ? stageSelector : noDisplay}</div>
  </div>


  const nextPart = <div>
    {/* display serial number input if inspection stage has been selected */}
    <div>{isStage ? serialDisplay : noDisplay}</div>
    {/* Enable defect recording if the part status is not ok */}
    <div>{isOK ? noDisplay : defectMarkUp}</div>
    <div>{isSerial ? <p>no serial</p> : <p>serial</p>}</div>
  </div>

  return (<div className="inspectionScreen">
    <div>{newPart}</div>
    <div>{nextPart}</div>
  </div>
  )
}
export default Inspect

