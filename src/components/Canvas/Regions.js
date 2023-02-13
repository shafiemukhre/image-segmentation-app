import React, { useRef, useEffect } from 'react';
import { Layer, Line, Circle } from 'react-konva';

export default function Regions(props){
    const layerRef = useRef(null);

    useEffect(() => {
        const canvas = layerRef.current.getCanvas()._canvas;
        canvas.style.opacity = 0.8;
    },[]);

    console.log(props.isDrawing)

    return (
        <Layer ref={layerRef}>
            {props.regions.map( region => {
                return (
                    <Line
                        key={region.id}
                        points={region.points.flatMap(p => [p.x, p.y])}
                        //pen
                        fill={region.color}
                        stroke="white"
                        strokeWidth={1}
                        closed
                        //brush
                        // stroke={region.color}
                        // strokeWidth="50"
                        // lineJoin="round"
                        // lineCap="round"
                    />
                )
            })}
            { props.isDrawing && <Circle 
                x={props.regions[props.regions.length - 1].points[0].x} 
                y={props.regions[props.regions.length - 1].points[0].y} 
                radius={3} 
                fill="white" 
                stroke="black" 
                strokeWidth={1}/>}
        </Layer>
    )
}