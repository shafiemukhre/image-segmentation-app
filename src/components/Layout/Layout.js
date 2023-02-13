import React, { useState } from 'react';
import { Grid, Paper, Toolbar, AppBar, CssBaseline, 
  IconButton, 
  Typography} from '@material-ui/core';
import clsx from 'clsx';

import MenuIcon from '@material-ui/icons/Menu';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import useStyles from './style';
import Canvas from '../Canvas/Canvas';
import Instances from '../Instances/Intances';
import LeftDrawer from '../LeftDrawer/LeftDrawer';

export default function Layout() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap component="div">
            Image Segmentation App
            </Typography>
          <IconButton color="inherit">
            <InfoOutlinedIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <LeftDrawer isDrawerOpen={open} setDrawerClose={setOpen}/>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Paper elevations={3}>
          <Canvas/>
        </Paper>
        <Instances/>
      </main>
    </div>
  );
}
