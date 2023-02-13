import React, { useState, useRef, useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import useStyles from './style';
import { useTheme } from '@material-ui/core/styles';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Pictures from '../Pictures/Pictures';

import { 
  createPhoto, readAllPhotos, deletePhoto } from '../../services/Database/Database';

export default function LeftDrawer(props){
    const classes = useStyles();
    const theme = useTheme();
  
    const handleDrawerClose = () => {
      props.setDrawerClose(false)
    };

    const [imageList, setImageList] = useState('');
    
    //add photo into database
    function uploadImages(e){
      const images = e.target.files;
      Object.values(images).map( image => createPhoto(image));
      //after all photos are uploaded to database, update imageList state
      readAllPhotos().then((resolvedResult) => {
        setImageList(resolvedResult);
      });
    };

    //read photo from database whenever page is refreshed
    useEffect(() => {
      //readphoto() function return a Promise
      //therefore use .then() to resolve the promise and get its result
      readAllPhotos().then((resolvedResult) => {
        setImageList(resolvedResult);
      });
    }, []);

    console.log(`imagelist: ${imageList}`)

    return (
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.isDrawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <input id="file-upload" type="file" accept="image/*" 
            hidden multiple onChange={uploadImages}/>
          <label htmlFor="file-upload">
            <IconButton component="span">
              <CloudUploadIcon/>
            </IconButton>
          </label>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? 
              <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        {imageList && imageList.map(data => {
          const objURL = URL.createObjectURL(data.photoFile);
          return (
            <div>
              <img 
                src={objURL}
                key={data.id}
                style={{
                  width: "100px",
                  margin: "10px auto 0",
                }}
                onClick={(e) => {console.log(e.target)}}
                />
            </div>
          )
        })}
      </Drawer>
    )
}