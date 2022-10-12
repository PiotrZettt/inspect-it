import axios from "axios";
import { partialRight } from "lodash";
import React, { useEffect, useState } from "react";
import SelectFG from "./SelectFG";
import endpoints from "./Endpoints";
import Defect from "./Defect";
import { DEFAULT_COLOR_SCHEME_STORAGE_KEY } from "@mui/system/cssVars/getInitColorSchemeScript";

export default function Analyse() {

    const [defects, setNewDefects] = useState([])
    const [partInstances, setPartInstances] = useState([])
    const [parts, setNewParts] = useState([])

    const [partFG, setPartFG] = useState('')
    const [isFgCode, setIsFgCode] = useState(false)
    const [isSerial, setIsSerial] = useState(false)
    const [searchDefect, setSearchDefect] = useState('')

    const [partInstanceID, setPartInstanceID] = useState(56)


    let serialNumber = ''


    // useEffect(() => {
    //     getPartID

    // }, [partFG]);

    function getPartID() {
        axios({
            method: 'GET',
            url: endpoints.partURL
        }).then((response) => {
            const data = response.data
            const part = data.filter(i => i.FG_code == partFG)
            setPartID(part.id)
            console.log('part id', part.id)
        })
    }

    async function getDefects(e) {
        console.log('getDefects got fired and serial is', {serialNumber})
        e.preventDefault()

        await axios({
            method: 'GET',
            url: endpoints.instanceURL
        }).then((response) => {
            const data = response.data
            const part = data.filter(i => i.serial_number == serialNumber)
            setPartInstanceID(part.id)
            console.log('part', part)
        })

        console.log('the new id is:', partInstanceID)

        await axios({
            method: 'GET',
            url: endpoints.defectURL
        }).then((response) => {
            const data = response.data
            const defects = data.filter(i => {i.part_instance == partInstanceID})

            setNewDefects(defects)
            console.log('defects', defects)

        }

        )
    }
    console.log('result', parts)

    const noDisplaySerialInput = <div></div>

    const displaySerialInput = <div>
        <form >
            <label>SERIAL NUMBER</label>
            <input type="text" defaultValue={serialNumber} onChange={(e) => { serialNumber = e.target.value; setIsSerial(true) }} />
            <button type='submit' onClick={getDefects}> Search </button>
        </form>
    </div>

    return (
        <div>
            <div>
                <SelectFG
                    selectFGCode={setPartFG}
                    setFgCode={setIsFgCode}
                />
            </div>

            <div>
                {isFgCode ? displaySerialInput: noDisplaySerialInput}
            </div>
            <div>
                <h3>
                    {partFG}
                </h3>
            </div>
            
        </div>
    )

}