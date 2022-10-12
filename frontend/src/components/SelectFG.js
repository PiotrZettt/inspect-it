import React from "react";


function SelectFG(props) {
  return <div>
    <div><label htmlFor="FG_code-select">Part FG Code</label>
    <form >
      <select id="FG_code-select" onChange={(e) => { props.selectFGCode(e.target.value); props.setFgCode(true) }}>
        <option value=" "> Select Part </option>
        <option value="FG1986"> FG1986</option>
        <option value="FG1989"> FG1989</option>
        <option value="FG2275"> FG2275</option>
        <option value="FG2279"> FG2279</option>
        <option value="FG2165"> FG2165</option>
        <option value="FG2166"> FG2166</option>
        <option value="FG2337"> FG2337</option>
        <option value="FG2340"> FG2340</option>
      </select>
    </form></div>
    </div>
}

export default SelectFG
