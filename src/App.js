import React, { useState, useEffect, useRef} from 'react';
import axios from 'axios';


export default function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('reacthooks');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)
  const searchInputRef = useRef()

  useEffect(() => {
    getResult();
    // axios
    // .get('http://hn.algolia.com/api/v1/search?query=reacthooks')
    // .then(response => {
    //   console.log(response.data);
    //   setResults(response.data.hits);
    // });
  }, []);

  const getResult = async() => {
    setLoading(true)
    try {
      const response = await axios
      .get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
    setResults(response.data.hits);
    }catch(err){
      setError(err)
    }
    setLoading(false)
  };

  const handleSearch = event => {
    event.preventDefault();
    getResult();
  }
  const handleClearSearch = () => {
    setQuery("");
    searchInputRef.current.focus()
  }
  return (
    <div>
   <h1>Hooks News</h1>
    <form onSubmit={handleSearch}>
      <input
        type="text"
        onChange={event => setQuery(event.target.value)}
        value={query}
        ref={searchInputRef}
      />
      <button type="submit">
        Search
      </button>
      <button type="button" onClick={handleClearSearch}>
        Clear
      </button>
    </form>
    {/* ternary */}
    {loading ? (<di>Loading results...</di>) :
      (<ul>
        {results.map(result => (
          <li key={result.objectID}>
            <a href={result.url}>{result.title}</a>
          </li>
        ))}
      </ul>)}
        {error && <div>{error.message}</div>}
    </div>
  );
}


