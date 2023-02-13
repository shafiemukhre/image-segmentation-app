import React from 'react';
import { Paper } from '@material-ui/core';
import CreateTwoToneIcon from '@material-ui/icons/CreateTwoTone';

export default function ToolSection(){
    return (
        <div>
            <Paper elevations={3}>
                <CreateTwoToneIcon color="primary"/>
            </Paper>
        </div>
    )
}