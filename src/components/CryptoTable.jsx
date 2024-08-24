import React, { useEffect, useState } from "react";
import { CoinList } from "./config/api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  createTheme,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
  Paper,
  Pagination,
} from "@mui/material";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CryptoTable = () => {
  const [crypto, setCrypto] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
//   pages for the pagination component
  const [page, setPage] = useState(1);

  const currency = useSelector((state) => state.currency.currency);
  const symbol = useSelector((state) => state.currency.symbol);
  const navigate = useNavigate();

  const fetchCryptoList = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(CoinList(currency));
      setCrypto(data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCryptoList();
  }, [currency]);

  const searchCrypto = () => {
    return crypto.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(search) ||
        crypto.symbol.toLowerCase().includes(search)
    );
  };

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{
            fontSize: 26,
            fontFamily: "Montserrat",
            marginTop: 10,
            marginBottom: 5,
          }}
        >
          Latest Cryptocurrency Prices
        </Typography>

        {/* <TextField
          label="Search the Crypto Currency..."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        /> */}

        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "#121212" }} />
          ) : (
            <Table>
              <TableHead>
                <TableRow style={{ backgroundColor: "#131313" }}>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "#f1f1f1",
                        fontWeight: "bold",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {searchCrypto()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => {
                    const profit = row?.price_change_percentage_24h >= 0;

                    return (
                      <TableRow
                        style={{
                          backgroundColor: "#16171a",
                          cursor: "pointer",
                        }}
                        hover
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>
                        <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                            row.market_cap.toString().slice(0, -6)  // slicing because to remove last 6 digits from the number 
                          )}
                          M
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination
          count={Math.ceil(searchCrypto()?.length / 10)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CryptoTable;
