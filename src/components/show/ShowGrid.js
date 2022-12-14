import ShowCard from "./ShowCard";
import IMAGE_NOT_FOUND from "../../images/not-found.png";
import { FlexGrid } from "../styled";
import { useShow } from "../../misc/custom.hooks";

const ShowGrid = ({ data }) => {
  //console.log(data);

  const [starredShows, dispatchStarred] = useShow();

  return (
    <FlexGrid>
      {/* results.map((item) => <div key={item.show.id}>{item.show.name}</div>) */}
      {/* <img src={IMAGE_NOT_FOUND} /> */}
      {data.map(({ show }) => {
        const isStarred = starredShows.includes(show.id);

        const onStarClick = () => {
          //console.log(isStarred);
          if (isStarred) {
            dispatchStarred({ type: "REMOVE", showId: show.id });
          } else {
            dispatchStarred({ type: "ADD", showId: show.id });
          }
        };

        return (
          <ShowCard
            key={show.id}
            id={show.id}
            name={show.name}
            image={show.image ? show.image.medium : IMAGE_NOT_FOUND}
            summary={show.summary}
            onStarClick={onStarClick}
            isStarred={isStarred}
          />
        );
      })}
    </FlexGrid>
  );
};

export default ShowGrid;
