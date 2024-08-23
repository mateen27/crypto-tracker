import { AppBar, Container, createTheme, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { setCurrency } from '../redux/currencySlice';

const TitleTypography = styled(Typography)({
    flex: 1,
    color: '#f1f1f1',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    cursor: 'pointer',
});

const Header = () => {
    // states for the redux
    const dispatch = useDispatch();
    const currency = useSelector((state) => state.currency.currency)
    const symbol = useSelector((state) => state.currency.symbol)

    // for redirection to pages/screens
    const navigate = useNavigate();

    // for the dark theme of our application
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            mode: 'dark'
        },
    });
    
    const handleCurrencyChange = (event) => {
        dispatch(setCurrency(event.target.value));
      };

    return (
        <ThemeProvider theme={darkTheme}>
        <AppBar color='transparent' position='static'>
            {/* helps to keep responsive */}
            <Container>
                <Toolbar>
                    {/* Using the styled component */}
                    <TitleTypography onClick={() => navigate('/')} variant="h5">Crypto Tracker</TitleTypography>

                    {/* for the selector component */}
                    <Select
                        variant='outlined'
                        style={{
                            width: 100,
                            height: 40,
                            marginRight: 15
                        }}
                        value={currency}
                        onChange={handleCurrencyChange}
                    >
                        <MenuItem value={'USD'}>USD</MenuItem>
                        <MenuItem value={'INR'}>INR</MenuItem>
                    </Select>
                </Toolbar>
            </Container>
        </AppBar>
        </ThemeProvider>
    )
}

export default Header;
