import { useState, useReducer, useEffect } from "react";
import { apiGet } from "./config";

function showsReducer(prevState, action) {
  switch (action.type) {
    case "ADD": {
      return [...prevState, action.showId];
    }
    case "REMOVE": {
      return prevState.filter((showId) => showId !== action.showId);
    }
    default:
      return prevState;
  }
}

function usePersistedReducer(reducer, initialState, key) {
  const [state, dispatch] = useReducer(reducer, initialState, (initial) => {
    const persisted = localStorage.getItem(key);
    return persisted ? JSON.parse(persisted) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}

const reducer = (prevState, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS": {
      return { isLoading: false, error: null, show: action.show };
    }
    case "FETCH_FAILD": {
      return { ...prevState, isLoading: false, error: action.error };
    }
    default:
      return prevState;
  }
};

export function useShow(key = "shows") {
  return usePersistedReducer(showsReducer, [], key);
}

export function useLastQuery(key = "lastQuery") {
  const [input, setInput] = useState(() => {
    const persisted = localStorage.getItem(key);
    return persisted ? JSON.parse(persisted) : "";
  });
  const setPersistedInput = (newState) => {
    setInput(newState);
    sessionStorage.setItem(key, JSON.stringify(newState));
  };
  return [input, setPersistedInput];
}

export function useShows(showId) {
  //const [{ show, isLoading, error }, dispatch] = useReducer
  const [state, dispatch] = useReducer(
    reducer,
    // initialState
    {
      show: null,
      isLoading: true,
      error: null,
    }
  );

  useEffect(() => {
    let isMounted = true;
    apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
      .then((results) => {
        if (isMounted) {
          dispatch({ type: "FETCH_SUCCESS", show: results });

          // setShow(results);
          // setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          dispatch({ type: "FETCH_FAILD", error: err.message });

          // setError(err.message);
          // setIsLoading(false);
        }
      });

    return () => (isMounted = false);
  }, [showId]);
  return state;
}
