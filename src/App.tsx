import { Box, Container, Grid, Typography } from '@mui/material'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import {InputAmout} from './components/InputAmout'
import {SelectCountry} from './components/SelectCountry'
import {SwitchCurrency} from './components/SwitchCurrency'
import { CurrencyContext } from './context/CurrencyContext'
import "./App.css";
interface CurrencyContextType {
    fromCurrency: string;
    setFromCurrency: (currency: string) => void;
    toCurrency: string;
    setToCurrency: (currency: string) => void;
    firstAmount: number;
}
function App() {

    const {
        fromCurrency,
        setFromCurrency,
        toCurrency,
        setToCurrency,
        firstAmount,
        // @ts-ignore
    } = useContext<CurrencyContextType>(CurrencyContext);
    const [resultCurrency, setResultCurrency] = useState(0);
    const codeFromCurrency = fromCurrency.split(" ")[1];
    const codeToCurrency = toCurrency.split(" ")[1];

    useEffect(() => {
        if(firstAmount) {
            axios("https://api.freecurrencyapi.com/v1/latest", {
                params: {
                    apikey: "HoALnHCbDopiAV0J0nhVkTaKlw6gxdmyG7dyf0m2",
                    base_currency: codeFromCurrency,
                    currencies: codeToCurrency
                }
            })
                .then(response => setResultCurrency(response.data.data[codeToCurrency]))
                .catch(error => console.log(error))
        }
    }, [firstAmount, fromCurrency, toCurrency])


    return (
        <Container maxWidth="md" className="boxStyles">
            <Typography variant="h5" sx={{ marginBottom: "2rem" }}>
                 Conversions
            </Typography>
            <Grid container spacing={2}>
                <InputAmout />
                <SelectCountry
                    value={fromCurrency}
                    setValue={setFromCurrency}
                    label="From"
                />
                <SwitchCurrency />
                <SelectCountry value={toCurrency} setValue={setToCurrency} label="To" />
            </Grid>

            {firstAmount && (
                <Box sx={{ textAlign: "left", marginTop: "1rem" }}>
                    <Typography>
                        {firstAmount} {fromCurrency} =
                    </Typography>
                    <Typography variant="h5" sx={{ marginTop: "5px", fontWeight: "bold" }}>
                        {resultCurrency * parseFloat(firstAmount)} {toCurrency}
                    </Typography>
                </Box>
            )}

        </Container>
    )
}

export default App;
