import { Box, Button, CircularProgress, Container, Paper, Stack, TextField, Typography } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const FindDay = () => {
    const { user } = useAuth();
    const history = useHistory();
    const [date, setDate] = useState(new Date().toLocaleDateString());
    const [day, setDay] = useState({});

    let resizeDate = '';
    // date resize
    for (let i = 0; i < date.length; i++) {
        if (date[i] !== '/') {
            resizeDate = resizeDate + date[i];
        }
    }

    const email = user?.email;

    const handleClick = () => {
        fetch(`https://obscure-basin-50456.herokuapp.com/single-day/${email}/${resizeDate}`)
            .then(res => res.json())
            .then(data => {
                setDay(data);
            });
        document.querySelector('#findDay').style.display = 'flex';
    }

    const handleChangeRoute = (id) => {
        history.push(`/edit/${id}`);
    }

    const goToHome = () => {
        history.push('/');
    }

    return (
        <Container>

            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ mt: 1 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Selcet Date"
                            value={date}
                            onChange={(newDate) => {
                                setDate(newDate);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <Button variant="contained" sx={{ mt: 1, ml: 2 }} onClick={handleClick}>Find</Button>
                </Box>
            </Box>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Paper
                    sx={{
                        p: 3,
                        display: 'none',
                        flexDirection: 'column',
                        height: 'auto',
                    }}
                    id="findDay"
                >
                    <Typography variant="h4" gutterBottom component="div">{day[0]?.date}</Typography>
                    <Typography variant="p" gutterBottom component="div" sx={{ mb: 5 }}>{day[0]?.user} Day</Typography>
                    <Typography variant="subtitle1" gutterBottom component="div"><span>১ টি কুরআনের আয়াতঃ </span>{day[0]?.ayat}</Typography>
                    <Typography variant="subtitle1" gutterBottom component="div"><span>১ টি হাদিসঃ </span>{day[0]?.hadith}</Typography>
                    <Typography variant="subtitle1" gutterBottom component="div"><span>আজকের ভালো কাজগুলিঃ </span>{day[0]?.valoKaj}</Typography>
                    <Typography variant="subtitle1" gutterBottom component="div"><span>আজকের ভুল কাজগুলিঃ  </span>{day[0]?.vulKaj}</Typography>
                    <Typography variant="subtitle1" gutterBottom component="div"><span>-------------</span></Typography>
                    {
                        day[0]?.works.map((work, index) => <Typography variant="subtitle1" gutterBottom component="div" key={index}><TaskAltIcon color="primary" />{work}</Typography>)
                    }
                    <Typography variant="subtitle1" gutterBottom component="div"><span>-------------</span></Typography>
                    <Stack spacing={2} direction="row" sx={{ mt: 3, mb: 5 }}>
                        {
                            user?.email === day[0]?.email && <Button variant="contained" onClick={() => handleChangeRoute(day[0]?._id)}>Edit</Button>
                        }
                        <Button variant="outlined" onClick={() => goToHome()}>Home</Button>
                    </Stack>
                    <Typography variant="subtitle1" gutterBottom component="div"><span>আত্মসমালোচনাঃ </span>{day[0]?.attoSomalocona}</Typography>
                </Paper>
            </Container>
        </Container>

    );
};

export default FindDay;