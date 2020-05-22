import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import CharacterList from './CharacterList';

import './styles.scss';
import endpoint from './endpoint';

const Application = () => {
  const useFetch = (url) => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      console.log('Fetching...');
      setLoading(true);
      setResponse(null);
      setError(null);

      fetch(endpoint)
        .then((response) => response.json())
        .then((response) => {
          debugger;
          setLoading(false);
          setResponse(response);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
        });
    }, []);

    return [response, loading, error];
  };

  const [response, loading, error] = useFetch(endpoint);
  debugger;
  const characters = response || [];

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <CharacterList characters={characters} />
          )}
          {error && <p className="error">{error.message}</p>}
        </section>
      </main>
    </div>
  );
};

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Router>
    <Application />
  </Router>,
  rootElement,
);
