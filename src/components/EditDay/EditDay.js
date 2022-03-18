import { Button, Container, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const EditDay = () => {
    const history = useHistory();
    const [day, setDay] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetch(`https://obscure-basin-50456.herokuapp.com/day/${id}`)
            .then(res => res.json())
            .then(data => setDay(data));

    }, [id])

    const handleHadithChange = e => {
        const updateHadith = e.target.value;
        const updateDay = { 
            hadith: updateHadith,
            ayat: day.ayat,
            vulKaj: day.vulKaj,
            valoKaj: day.valoKaj,
            attoSomalocona: day.attoSomalocona
        };
        setDay(updateDay);
    }
    const handleAyatChange = e => {
        const updateAyat = e.target.value;
        const updateDay = { 
            hadith: day.hadith,
            ayat: updateAyat,
            vulKaj: day.vulKaj,
            valoKaj: day.valoKaj,
            attoSomalocona: day.attoSomalocona
        };
        setDay(updateDay);
    }
    const handleVulKajChange = e => {
        const updateVulKaj = e.target.value;
        const updateDay = { 
            hadith: day.hadith,
            ayat: day.ayat,
            vulKaj: updateVulKaj,
            valoKaj: day.valoKaj,
            attoSomalocona: day.attoSomalocona
        };
        setDay(updateDay);
    }
    const handleValoKajChange = e => {
        const updateValoKaj = e.target.value;
        const updateDay = { 
            hadith: day.hadith,
            ayat: day.ayat,
            vulKaj: day.vulKaj,
            valoKaj: updateValoKaj,
            attoSomalocona: day.attoSomalocona
        };
        setDay(updateDay);
    }
    const handleAttoSomaloconaChange = e => {
        const updateAttoSomalocona = e.target.value;
        const updateDay = { 
            hadith: day.hadith,
            ayat: day.ayat,
            vulKaj: day.vulKaj,
            valoKaj: day.valoKaj,
            attoSomalocona: updateAttoSomalocona
        };
        setDay(updateDay);
    }

    const handleUpdate = () => {
        const url = `https://obscure-basin-50456.herokuapp.com/update-day/${id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(day)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                   alert('1 product updated');
                }
            })
        history.push(`/day/${id}`);
    };
    return (
        <Container>
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <Box sx={{ mt: 3, width: '500px' }}>
                    <TextField
                        id="hadith"
                        name="hadith"
                        onChange={handleHadithChange}
                        value={day.hadith || ''}
                        multiline
                        maxRows={5}
                        placeholder="১ টি হাদীস"
                        fullWidth
                    />
                </Box>
                <Box sx={{ mt: 3, width: '500px' }}>
                    <TextField
                        id="ayat"
                        name="ayat"
                        onChange={handleAyatChange}
                        value={day.ayat || ''}
                        multiline
                        maxRows={5}
                        placeholder="১ টি আয়াত"
                        fullWidth
                    />
                </Box>
                <Box sx={{ mt: 3, width: '500px' }}>
                    <TextField
                        id="vulKaj"
                        name="vulKaj"
                        onChange={handleVulKajChange}
                        value={day.vulKaj || ''}
                        multiline
                        maxRows={5}
                        placeholder="আজকের ভুল কাজগুলো"
                        fullWidth
                    />
                </Box>
                <Box sx={{ mt: 3, width: '500px' }}>
                    <TextField
                        id="valoKaj"
                        name="valoKaj"
                        onChange={handleValoKajChange}
                        value={day.valoKaj || ''}
                        multiline
                        maxRows={5}
                        placeholder="ভালো কাজগুলো"
                        fullWidth
                    />
                </Box>
                <Box sx={{ mt: 3, width: '500px' }}>
                    <TextField
                        id="attoSomalocona"
                        name="attoSomalocona"
                        onChange={handleAttoSomaloconaChange}
                        value={day.attoSomalocona || ''}
                        multiline
                        maxRows={5}
                        placeholder="আত্মসমালোচনা"
                        fullWidth
                    />
                </Box>
                <Button onClick={ () => handleUpdate()} variant="contained" sx={{ mt: 3, mb: 3, width: '500px' }}>Update</Button>
            </Box>
        </Container>
    );
};

export default EditDay;