import { Container, Paper, Box, FormControlLabel, Checkbox, Grid, Button } from '@mui/material';
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useHistory } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const AdMyDay = () => {
    const { user } = useAuth();
    const history  = useHistory();
    const [date, setDate] = useState(new Date().toLocaleDateString());
    const [checked0, setChecked0] = useState(false);
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(false);
    const [checked3, setChecked3] = useState(false);
    const [checked4, setChecked4] = useState(false);
    const [checked5, setChecked5] = useState(false);
    const [checked6, setChecked6] = useState(false);
    const [checked7, setChecked7] = useState(false);
    const [works] = useState([]);

    
    const handleChange0 = (event) => {
        setChecked0(event.target.checked);
        if(event.target.checked === true){
            works.push('৫ ওয়াক্ত নামাজ এবং সকালে কুরআন পড়েছি'); 
        }
    }

    const handleChange1 = (event) => {
        setChecked1(event.target.checked);
        if (event.target.checked === true) {
            works.push('সকালে ৩ ঘন্টা একাডেমিক পড়াশুনা করেছি');  
        }
    };

    const handleChange2 = (event) => {
        setChecked2(event.target.checked);
        if (event.target.checked === true) {
            works.push('জীবনের মূল টার্গেটের জন্য ৩ ঘন্টা সময় দিয়েছি');  
        }
    };

    const handleChange3 = (event) => {
        setChecked3(event.target.checked);
        if (event.target.checked === true) {
            works.push('জীবনের মূল লক্ষ্য নিয়ে ১ টি ভিডিও বানিয়েছি ও ১ টি আর্টিকেল লিখেছি');     
        }
    };

    const handleChange4 = (event) => {
        setChecked4(event.target.checked);
        if (event.target.checked === true) {
            works.push('পরিবার এবং বন্ধু বান্ধবের খোঁজ নিয়েছি');     
        }
    };

    const handleChange5 = (event) => {
        setChecked5(event.target.checked);
        if (event.target.checked === true) {
            works.push('টিউশনিতে ৩.৫ ঘন্টা সময় দিয়েছি');    
        }
    };

    const handleChange6 = (event) => {
        setChecked6(event.target.checked);
        if (event.target.checked === true) {
            works.push(' ১ টি ছোট গল্প লেখার চেষ্টা করেছি এবং জবে Apply করেছি');   
        }
    };

    const handleChange7 = (event) => {
        setChecked7(event.target.checked);
        if (event.target.checked === true) {
            works.push('রাত ১১ টার মধ্যে ঘুমিয়ে গেছি');  
        }
    };

    let resizeDate = '';
    // date resize
    for(let i=0; i < date.length; i++){
        if(date[i] !== '/'){
            resizeDate = resizeDate + date[i];
        }
    }

    console.log(resizeDate);

    // SEND DATA TO SERVER //

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const day = {
            date: date,
            resizeDate: resizeDate,
            email: user.email,
            user: user.displayName,
            works: works,
            hadith: data.get('hadith'),
            ayat: data.get('ayat'),
            vulKaj: data.get('vulKaj'),
            valoKaj: data.get('valoKaj'),
            attoSomalocona: data.get('attoSomalocona')
        };
        postToServer(day);
        alert('day added');
        history.push('/');
    };

    const postToServer = (day) => {
        fetch('https://obscure-basin-50456.herokuapp.com/addDay', {
            method: 'POST',
            body: JSON.stringify(day),
            headers: {
                "Content-type": "application/json;charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(data => console.log('success'))
    }
    
    return (
        <Container component="main" maxWidth="sm">
            <Paper sx={{ padding: '27px', mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
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
                </Box>
                <Box sx={{ maxWidth: 500, mt: 3 }}>
                    <FormControlLabel control={<Checkbox checked={checked0} onChange={handleChange0} />} label='৫ ওয়াক্ত নামাজ এবং সকালে কুরআন পড়েছি' /> 
                    <FormControlLabel control={<Checkbox checked={checked1} onChange={handleChange1} />} label='সকালে ৩ ঘন্টা একাডেমিক পড়াশুনা করেছি' /> 
                    <FormControlLabel control={<Checkbox checked={checked2} onChange={handleChange2} />} label='জীবনের মূল টার্গেটের জন্য ৩ ঘন্টা সময় দিয়েছি'/>  
                    <FormControlLabel control={<Checkbox checked={checked3} onChange={handleChange3} />} label='জীবনের মূল লক্ষ্য নিয়ে ১ টি ভিডিও বানিয়েছি ও ১ টি আর্টিকেল লিখেছি'  />
                    <FormControlLabel control={<Checkbox checked={checked4} onChange={handleChange4} />} label='পরিবার এবং বন্ধু বান্ধবের খোঁজ নিয়েছি' />
                    <FormControlLabel control={<Checkbox checked={checked5} onChange={handleChange5} />} label='টিউশনিতে ৩.৫ ঘন্টা সময় দিয়েছি' />
                    <FormControlLabel control={<Checkbox checked={checked6} onChange={handleChange6} />} label='১ টি ছোট গল্প লেখার চেষ্টা করেছি এবং জবে Apply করেছি'/> 
                    <FormControlLabel control={<Checkbox checked={checked7} onChange={handleChange7} />} label='রাত ১১ টার মধ্যে ঘুমিয়ে গেছি' />
                </Box>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Box sx={{ mt: 3, width: '500px' }}>
                        <TextField
                            id="hadith"
                            name="hadith"
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
                            multiline
                            maxRows={5}
                            placeholder="আজকের ভুল কাজগুলো"
                            fullWidth
                        />
                    </Box>
                    <Box sx={{ mt: 3, width: '500px' }}>
                        <TextField
                            id="valoKaj"
                            name="vulKaj"
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
                            multiline
                            maxRows={5}
                            placeholder="আত্মসমালোচনা" 
                            fullWidth
                        />
                    </Box>
                   
                    <Button type="submit" variant="contained" sx={{ mt: 3, mb: 3, width: '500px' }}>Add this Day</Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default AdMyDay;