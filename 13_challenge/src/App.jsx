import { useState, useEffect } from "react";
import "./App.css";
// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const convert = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
      );

      const data = await response.json();
      console.log("data: ", data);
      /*
        {
          "amount": 1,
          "base": "EUR",
          "date": "2025-04-07",
          "rates": {
            "USD": 1.0967
          }  
        }
      */
      console.log("data.rates: ", data.rates);
      /* 
        { 
          "USD": 1.0967
        } 
      */
      console.log("data.rates[toCur]: ", data.rates[toCur]); //1.0967
      setConverted(data.rates[toCur]);
      setIsLoading(false);
    };

    /* Fixing an error when both fromCur and toCur are equals: */
    if (fromCur === toCur) return setConverted(amount);

    convert();
  }, [amount, fromCur, toCur]);

  return (
    <div>
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={fromCur}
        onChange={(e) => setFromCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCur}
        onChange={(e) => setToCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      {isLoading ? (
        <p>converting...</p>
      ) : (
        <p>
          {" "}
          {converted} {toCur}
        </p>
      )}
    </div>
  );
}

export default App;
