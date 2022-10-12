import React, { useEffect, useRef, useState } from 'react';

let coordinates = []

const Canvas = props => {

    const canvasRef = useRef(null)
    const contextRef = useRef(null)

    // Add coordinates to the defect coordinates array
    function setCoordinates (x, y) {
        coordinates.push({x, y})
        console.log(coordinates)
    }

    // Get image src from props
    const img = new Image()
    img.src = props.image


    // Draw the reference image on the canvas
    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = 750
        canvas.height = 450
        canvas.style.border = 2
        console.log("draw")
        const context = canvas.getContext('2d')
        

        context.fillStyle = 'rgb(255, 0, 0, 0.22)'
        contextRef.current = context

        img.onload = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0);
          };
        coordinates = []
        }, [props.image, props.reset])


    // Mark defect location on the reference image
    const markDefect = ({nativeEvent}) => {
        const {offsetX, offsetY} = nativeEvent;
        if (props.enableMarking) {
            contextRef.current.fillRect(offsetX - 12, offsetY - 12, 25, 25);
            
            setCoordinates(offsetX, offsetY)
            props.setcoordinates(coordinates)

        } else { 
            window.alert('Pick a defect name first')
        }

        console.log("click ", props)
        }

    return <canvas
            ref={canvasRef}
            onClick={markDefect}
            />
}

export default Canvas   