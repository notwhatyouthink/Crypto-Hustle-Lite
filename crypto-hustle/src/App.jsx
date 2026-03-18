import './App.css';
import { useEffect, useState } from 'react';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const App = () => {

  const [list, setList] = useState(null);

  useEffect(() => {
    const fetchAllCoinData = async () => {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=50&tsym=USD&api_key=${API_KEY}`
      );
      const json = await response.json();
      setList(json);
    };

    fetchAllCoinData().catch(console.error);
  }, []);

  return (
    <div className="whole-page">
      <h1>My Crypto List</h1>
      <ul>
        {list &&
          list.Data &&
          list.Data.filter(
            (coinData) =>
              coinData.CoinInfo.Algorithm !== "N/A" &&
              coinData.CoinInfo.ProofType !== "N/A"
          ).map((coinData) => (
            <li key={coinData.CoinInfo.FullName}>
              {coinData.CoinInfo.FullName}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;