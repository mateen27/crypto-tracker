import React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Carousel from './Carousel';

const BackgroundImageContainer = styled('div')({
  backgroundImage: 'url(https://windowscustomization.com/wp-content/uploads/2019/04/Starfield.gif)',
  height: 400,
  width: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
});

const BannerContent = styled(Container)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  paddingTop: 25,
});

const Tagline = styled('div')({
  display: 'flex',
  height: '40%',
  flexDirection: 'column',
  justifyContent: 'center',
  textAlign: 'center',
});

const Banner = () => {
  return (
    <BackgroundImageContainer>
      <BannerContent>
        <Tagline>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              marginBottom: 2,
              fontFamily: 'Montserrat',
            }}
          >
            Crypto Tracker
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              color: 'darkgrey',
              textTransform: 'capitalize',
              fontFamily: 'Montserrat',
            }}
          >
            Information regarding your favorite Crypto Currency
          </Typography>
        </Tagline>
      </BannerContent>

      <Carousel/>
    </BackgroundImageContainer>
  );
}

export default Banner;
