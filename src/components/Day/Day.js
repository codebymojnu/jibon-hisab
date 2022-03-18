import { Grid, Paper } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const Day = (props) => {
    const { _id, date, attoSomalocona } = props.day;
    return (
        <Grid item xs={12} md={4} lg={4}>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto',
                }}
            >
                <Link to={`/day/${_id}`}>{date}</Link>
                <p>{attoSomalocona}</p>
                <Link to={`/day/${_id}`}>Details</Link>
            </Paper>
        </Grid>
    );
};

export default Day;