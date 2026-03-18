import './App.css';
import { useEffect, useState } from 'react';
import CoinInfo from './Components/CoinInfo';
import SideNav from './Components/SideNav';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const App = () => {

  const [list, setList] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

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

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filteredData = list.Data.filter((item) =>
        Object.values(item.CoinInfo)
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(list.Data);
    }
  };

  return (
    <div className="whole-page">
      <SideNav />
      
      <h1>My Crypto List</h1>
      <h2>Sharnica Jeudy Z23582376</h2>
      <input
        type="text"
        placeholder="Search..."
        onChange={(inputString) => searchItems(inputString.target.value)}
      />
      <ul>
        {searchInput.length > 0
          ? filteredResults
              .filter(
                (coinData) =>
                  coinData.CoinInfo.Algorithm !== "N/A" &&
                  coinData.CoinInfo.ProofType !== "N/A"
              )
              .map((coinData) => (
                <CoinInfo
                  key={coinData.CoinInfo.FullName}
                  image={coinData.CoinInfo.ImageUrl}
                  name={coinData.CoinInfo.FullName}
                  symbol={coinData.CoinInfo.Name}
                />
              ))
          : list &&
            list.Data &&
            list.Data.filter(
              (coinData) =>
                coinData.CoinInfo.Algorithm !== "N/A" &&
                coinData.CoinInfo.ProofType !== "N/A"
            ).map((coinData) => (
              <CoinInfo
                key={coinData.CoinInfo.FullName}
                image={coinData.CoinInfo.ImageUrl}
                name={coinData.CoinInfo.FullName}
                symbol={coinData.CoinInfo.Name}
              />
            ))}
      </ul>
    </div>
  );
}

export default App;