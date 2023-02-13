import React from 'react';
import useStyles from './style';

export default function Pictures(props){
    const classes = useStyles();

    const fileList = props.pic;
    return (
        <div>
            
            {fileList && Object.values(fileList).forEach( file => {
                console.log(file)
                return (
                    <img src={URL.createObjectURL(file)} height="60"></img>
                )
            })}
        </div>
    )
}