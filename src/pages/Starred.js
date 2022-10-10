import MainPageLayout from "../components/MainPageLayout";
import React, { useEffect, useState } from "react";
import { useShow } from "../misc/custom.hooks";
import { apiGet } from "../misc/config";
import ShowGrid from "../components/show/ShowGrid";

const Starred = () => {
  const [starred] = useShow();
  const [shows, setShows] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (starred && starred.length > 0) {
      const promises = starred.map((showId) => apiGet(`/shows/${showId}`));
      Promise.all(promises)
        .then((apiData) => apiData.map((show) => ({ show })))
        .then((results) => {
          setShows(results);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  });
  return (
    <MainPageLayout>
      <h2>
        {isLoading && <div>shows are still loading</div>}
        {error && <div> Error occur: {error}</div>}
        {!isLoading && !shows && <div>No shows were added</div>}
        {!isLoading && !error && shows && <ShowGrid data={shows} />}
      </h2>
    </MainPageLayout>
  );
};

export default Starred;
