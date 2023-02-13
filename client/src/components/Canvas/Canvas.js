import React, { useRef, useContext } from 'react';
import Konva from 'konva';
import { Stage } from 'react-konva';
import BaseImage from './BaseImage';
import CurrentImage from './CurrentImage';
import Regions from './Regions';
import { regionsContext, isDrawingContext, curPhotoIdContext } from '../../store';
import { readPhoto } from '../../services/Database/Database';
import IconButton from '@material-ui/core/IconButton';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';

let id = 1;

function getRelativePointerPosition(node){
    //return pointer position (pos) relative to the given node
    const transform = node.getAbsoluteTransform().copy();
    transform.invert();

    const pos = node.getStage().getPointerPosition();
    return transform.point(pos);
};

export default function Canvas(){
    const stageRef = useRef();
    const [regions, setRegions] = useContext(regionsContext);
    const [isDrawing, toggleDrawing] = useContext(isDrawingContext);
    const [curPhotoId, setCurPhotoId] = useContext(curPhotoIdContext);
    return (
        <div>
            <Stage 
                ref={stageRef} 
                width={700} 
                height={500}
                // brush tool
                // onMouseDown={e => {
                //     toggleDrawing(true);
                //     const point = getRelativePointerPosition(e.target.getStage());
                //     const region = {
                //         id: id++,
                //         color: Konva.Util.getRandomColor(),
                //         points: [point]
                //     };
                //     setRegions(regions.concat([region]));
                // }}

                // onMouseMove={e => {
                //     if (!isDrawing){
                //         return;
                //     }
                //     const lastRegion = { ...regions[regions.length - 1]};
                //     const point = getRelativePointerPosition(e.target.getStage());
                //     lastRegion.points = lastRegion.points.concat([point]);
                //     regions.splice(regions.length - 1, 1);
                //     setRegions(regions.concat([lastRegion]));
                // }}

                // onMouseUp={e => {
                //     if (!isDrawing){
                //         return;
                //     }
                //     const lastRegion = regions[regions.length - 1];
                //     if (lastRegion.points.length < 3) {
                //         regions.splice(regions.length - 1, 1);
                //         setRegions(regions.concat());
                //     }
                //     toggleDrawing();

                // }}
                //pen tool
                onClick={e => {
                    const point = getRelativePointerPosition(e.target.getStage());
                    console.log(isDrawing)
                    const lastRegion = { ...regions[regions.length - 1]};
                    if (lastRegion.points){
                        var startx = lastRegion.points[0].x
                        var starty = lastRegion.points[0].y
                    }

                    if (point.x < startx + 5 && point.x > startx - 5 && point.y < starty + 5 && point.y > starty - 5){
                        //last point
                        toggleDrawing(false)
                       if (lastRegion.points){
                            lastRegion.points = lastRegion.points.concat([point]);
                            regions.splice(regions.length - 1, 1);
                            return setRegions(regions.concat([lastRegion]));
                        } 
                    }
                    if (!isDrawing){
                        //first point 
                        const region = {
                            id: id,
                            color: Konva.Util.getRandomColor(),
                            points: [point]
                        };
                        setRegions(regions.concat([region]));  
                        toggleDrawing(true);
                    }
                    if (isDrawing){
                        //second point onward
                        if(lastRegion.points){
                            lastRegion.points = lastRegion.points.concat([point]);
                            regions.splice(regions.length - 1, 1);
                            setRegions(regions.concat([lastRegion]));
                        }
                    }
                }}

                onMouseMove={e => {
                    if (!isDrawing){
                        return;
                    }
                    const lastRegion = { ...regions[regions.length - 1]};
                    const point = e.target.getStage().getPointerPosition();
                    if (lastRegion.points){
                        lastRegion.points = lastRegion.points.concat([point]);
                        regions.splice(regions.length - 1, 1);
                        setRegions(regions.concat([lastRegion]));
                        lastRegion.points.pop()
                    }
                }}

            >
                {/* <BaseImage/> */}
                <CurrentImage photoId={curPhotoId} />
                <Regions regions={regions} isDrawing={isDrawing}/>
            </Stage>
            <IconButton>
                <ZoomInIcon/>
            </IconButton>
            <IconButton>
                <ZoomOutIcon/>
            </IconButton>
        </div>
    )
};