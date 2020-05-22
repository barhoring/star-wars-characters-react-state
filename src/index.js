import React, { useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import CharacterList from './CharacterList';

import './styles.scss';
import endpoint from './endpoint';

const LOADING = 'LOADING';
const RESPONSE_COMPLETE = 'RESPONSE_COMPLETE';
const ERROR = 'ERROR';

const initialState = {
  result: null,
  loading: true,
  error: null,
};

const fetchReducer = (state, action) => {
  console.log(action);
  if (action.type === LOADING) {
    return initialState;
  }

  if (action.type === RESPONSE_COMPLETE) {
    return { result: action.payload, loading: false, error: null };
  }

  if (action.type === ERROR) {
    return {
      loading: false,
      error: true,
      result: null,
    };
  }
  // Or throw an error
  return state;
};

const useFetch = (url) => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    dispatch({ type: LOADING });
    console.log('Fetching...');

    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        debugger;
        dispatch({ type: RESPONSE_COMPLETE, payload: response });
      })
      .catch((error) => {
        dispatch({ type: ERROR });
      });
  }, []);

  return [state.result, state.loading, state.error];
};
const Application = () => {
  const [response, loading, error] = useFetch(endpoint);
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
