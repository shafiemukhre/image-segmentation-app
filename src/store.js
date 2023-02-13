import React, { createContext, useState } from 'react';

export const isDrawingContext = createContext();
export const regionsContext = createContext();
export const curPhotoIdContext = createContext();

function Store(props){
    const [isDrawing, toggleIsDrawing] = useState(false);
    const [regions, setRegions] = useState([]);
    const [curPhotoId, setCurPhotoId] = useState('');

    return (
        <curPhotoIdContext.Provider value={[curPhotoId, setCurPhotoId]}>
            <regionsContext.Provider value={[regions, setRegions]}>
                <isDrawingContext.Provider value={[isDrawing, toggleIsDrawing]}>
                    { props.children }
                </isDrawingContext.Provider>
            </regionsContext.Provider>
        </curPhotoIdContext.Provider>
    );
};

export default Store;