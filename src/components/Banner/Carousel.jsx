import { styled } from '@mui/material/styles'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { TrendingCoins } from '../config/api'

const Carousel = () => {

  // State for trending cryptocurrencies
  const [trendingCrypto, setTrendingCrypto] = useState([]);

  // Fetching the currency type and symbol from the Redux store
  const currency = useSelector((state) => state.currency.currency);
  const symbol = useSelector((state) => state.currency.symbol);

  // Fetch trending coins
  const fetchTrendingCoins = async () => {
    try {
      const { data } = await axios.get(TrendingCoins(currency));
      setTrendingCrypto(data);
    } catch (error) {
      console.error('Error fetching trending coins:', error);
    }
  };

  // Fetch trending coins when the currency changes
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  // Styled components using MUI
  const CarouselContainer = styled('div')({
    display: 'flex',
    height: '50%',
    alignItems: 'center',
  });

  const CarouselItems = styled(Link)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  });

  // Map over the trending cryptocurrencies to create carousel items
  const items = trendingCrypto.map((coin) => {
    const profit = coin?.price_change_percentage_24h >= 0;

    return (
      <CarouselItems to={`/crypto/${coin.id}`} key={coin.id}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {coin?.current_price.toFixed(2)}
        </span>
      </CarouselItems>
    );
  });

  // Responsive settings for the carousel
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <CarouselContainer>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </CarouselContainer>
  );
};

export default Carousel;
