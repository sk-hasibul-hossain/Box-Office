import { useParams } from "react-router-dom";
// import React, { useState, useEffect } from "react";
import React, { useReducer, useEffect } from "react";
import { apiGet } from "../misc/config";
import ShowMainData from "../components/show/ShowMainData";
import Details from "../components/show/Details";
import Seasons from "../components/show/Seasons";
import Cast from "../components/show/Cast";
import { ShowPageWrapper, InfoBlock } from "./Show.styled";
import { useShows } from "../misc/custom.hooks";

// const reducer = (prevState, action) => {
//   switch (action.type) {
//     case "FETCH_SUCCESS": {
//       return { isLoading: false, error: null, show: action.show };
//     }
//     case "FETCH_FAILD": {
//       return { ...prevState, isLoading: false, error: action.error };
//     }
//     default:
//       return prevState;
//   }
// };

// const initialState = {
//   show: null,
//   isLoading: true,
//   error: null,
// };

const Show = () => {
  const { id } = useParams();
  // const [show, setShow] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [{ show, isLoading, error }, dispatch] = useReducer(
  //   reducer,
  //   initialState
  // );

  // useEffect(() => {
  //   let isMounted = true;
  //   apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
  //     .then((results) => {
  //       if (isMounted) {
  //         dispatch({ type: "FETCH_SUCCESS", show: results });

  //         // setShow(results);
  //         // setIsLoading(false);
  //       }
  //     })
  //     .catch((err) => {
  //       if (isMounted) {
  //         dispatch({ type: "FETCH_FAILD", error: err.message });

  //         // setError(err.message);
  //         // setIsLoading(false);
  //       }
  //     });

  //   return () => (isMounted = false);
  // }, [id]);
  //console.log(show._embedded.cast);
  //console.log(params);
  const { show, isLoading, error } = useShows(id);

  if (isLoading) {
    return (
      <div>
        <p>data is being loaded</p>
      </div>
    );
  }
  if (error) {
    return <div>Error occured {error}</div>;
  }
  return (
    <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />
      <InfoBlock>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </InfoBlock>
      <InfoBlock>
        <h2>Season</h2>
        <Seasons seasons={show._embedded.seasons} />
      </InfoBlock>
      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </InfoBlock>
    </ShowPageWrapper>
  );
};

export default Show;
