import { useEffect, useState } from "react";
const API_KEY = import.meta.env.VITE_APP_API_KEY;

function CryptoNews() {
  const [newsList, setNewsList] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${API_KEY}`
      );
      const json = await response.json();
      setNewsList(json);
    };

    fetchNews().catch(console.error);
  }, []);

  return (
    <div className="news-container">
      {newsList &&
        newsList.Data &&
        newsList.Data.map((article, index) => (
          <li key={index} className="news-item">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
          </li>
        ))}
    </div>
  );
}

export default CryptoNews;