import React, { useRef } from 'react';
import { Image, Layer } from 'react-konva';
import useImage from 'use-image';

export default function BaseImage(){

    const [image] = useImage('https://rawcdn.githack.com/konvajs/site/5291745255c93c168175b1246f6ce6d3285a573e/react-demos/image-label-tool/public/image-2.jpg');

    const layerRef = useRef(null);
    return (
        <Layer ref={layerRef}>
            <Image image={image}/>
        </Layer>

    );
};