import React, { useRef, useState, useEffect } from 'react';
import { Image, Layer } from 'react-konva';
import useImage from 'use-image';
import { readPhoto } from '../../services/Database/Database'

export default function CurrentImage(props){
    const [image] = useImage('https://rawcdn.githack.com/konvajs/site/5291745255c93c168175b1246f6ce6d3285a573e/react-demos/image-label-tool/public/image-2.jpg');
    const [curImageUrl, setCurImageUrl] = useState('https://rawcdn.githack.com/konvajs/site/5291745255c93c168175b1246f6ce6d3285a573e/react-demos/image-label-tool/public/image-2.jpg');

    const layerRef = useRef(null);

    useEffect(() => {
        readPhoto(props.photoId).then((photo) => {
            setCurImageUrl(photo);
        })
    },[props.photoId]);
    return (
        <Layer ref={layerRef}>
            <Image image={image}/>
        </Layer>

    );
};