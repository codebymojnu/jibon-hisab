import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, Stack, Button, CircularProgress } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import useAuth from '../../hooks/useAuth';
import { Box } from '@mui/system';

const DayDetails = () => {
    const { user } = useAuth();
    const history = useHistory();
    const { id } = useParams();
    const [day, setDay] = useState({
        works: ['', '', '', '', '', '', '', '']
    });
    // const { _id, date, works, hadith, ayat, vulKaj, valoKaj, attoSomalocona } = props.day;
    console.log(day);

    useEffect(() => {
        const url = `https://obscure-basin-50456.herokuapp.com/day/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setDay(data))
    }, [id])

    const handleChangeRoute = (id) => {
        history.push(`/edit/${id}`);
    }

    const goToHome = () => {
        history.push('/');
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {
                day.length === 0 && <div>
                    <div className="d-flex justify-content-center mt-5">
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    </div>
                    <h6 className="text-center mt-3">Loading...</h6>
                </div>
            }
            <Paper
                sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto',
                }}
            >
                <Typography variant="h4" gutterBottom component="div">{day?.date}</Typography>
                <Typography variant="p" gutterBottom component="div" sx={{ mb: 5 }}>{day?.user} Day</Typography>
                <Typography variant="subtitle1" gutterBottom component="div"><span>১ টি কুরআনের আয়াতঃ </span>{day?.ayat}</Typography>
                <Typography variant="subtitle1" gutterBottom component="div"><span>১ টি হাদিসঃ </span>{day?.hadith}</Typography>
                <Typography variant="subtitle1" gutterBottom component="div"><span>আজকের ভালো কাজগুলিঃ </span>{day?.valoKaj}</Typography>
                <Typography variant="subtitle1" gutterBottom component="div"><span>আজকের ভুল কাজগুলিঃ  </span>{day?.vulKaj}</Typography>
                <Typography variant="subtitle1" gutterBottom component="div"><span>-------------</span></Typography>
                {
                    day?.works.map(work => <Typography variant="subtitle1" gutterBottom component="div"><TaskAltIcon color="primary" />{work}</Typography>)
                }
                <Typography variant="subtitle1" gutterBottom component="div"><span>-------------</span></Typography>
                <Stack spacing={2} direction="row" sx={{ mt: 3, mb: 5 }}>
                    {
                        user?.email === day?.email && <Button variant="contained" onClick={() => handleChangeRoute(day?._id)}>Edit</Button>
                    }
                    <Button variant="outlined" onClick={() => goToHome()}>Home</Button>
                </Stack>
                <Typography variant="subtitle1" gutterBottom component="div"><span>আত্মসমালোচনাঃ </span>{day?.attoSomalocona}</Typography>
            </Paper>
        </Container>
    );
};

export default DayDetails;