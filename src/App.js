import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';


var myHeaders = new Headers();
myHeaders.append("apikey", "3pSvevtYR1sDxlKktfGq7Gk2fYHzQ5bW");
var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

const BASE_URL = "https://api.apilayer.com/exchangerates_data/latest?symbols=&base=EUR"





function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);           // For the select menus
  const [fromCurrency, setFromCurrency] = useState([]);                 // State of the currency selected
  const [toCurrency, setToCurrency] = useState([]);                     // State of the currency selected
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1);                              // What value is in the input field.
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)  // Boolean state that stores which input field was last changed


  // If 'from' input field changed trigger this.
  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }
  // If 'to' input field changed trigger this.
  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }



  let toAmount, fromAmount;
  // If last changed input field was from the 'from' input field.
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }



  // Fetch __ from API.
  useEffect(() => {
    fetch(BASE_URL, requestOptions)
      .then(res => res.json())
      .then(data => {
      setCurrencyOptions([data.base, ...Object.keys(data.rates)])
      setFromCurrency(data.base)
      const firstCurrency = Object.keys(data.rates)[0]
      setToCurrency(firstCurrency)
      setExchangeRate(data.rates[firstCurrency])
    })
  }, [])



  // call whenever 'fromCurrency' or 'toCurrency' changes.
  useEffect(() => {
    // Initial state is null so don't call fetch.
    if (fromAmount != null && toCurrency != null) {
      fetch(`https://api.apilayer.com/exchangerates_data/latest?base=${fromCurrency}&symbols=${toCurrency}`, requestOptions)
      .then(res => res.json())
      .then(data => setExchangeRate(data.rates[toCurrency]))
    }
    
  }, [fromCurrency, toCurrency])


  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div>=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </>
    

  );
}

export default App;
