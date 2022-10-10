import ActorCard from "./ActorCard";
import IMAGE_NOT_FOUND from "../../images/not-found.png";
import { FlexGrid } from "../styled";

const ActorGrid = ({ data }) => {
  return (
    <FlexGrid>
      {/* results.map((item) => (
          <div key={item.person.id}>{item.person.name}</div>
        ) */}
      <img src={IMAGE_NOT_FOUND} />
      {data.map((person) => (
        <ActorCard
          key={person.person.id}
          name={person.person.name}
          country={person.person.country ? person.person.country.name : null}
          birthday={person.person.birthday}
          gender={person.person.gender}
          image={
            person.person.image ? person.person.image.medium : IMAGE_NOT_FOUND
          }
        />
      ))}
    </FlexGrid>
  );
};

export default ActorGrid;
