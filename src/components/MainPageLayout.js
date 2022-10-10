import Navs from "./Navs";
import Title from "./Title";
const MainPageLayout = ({ children }) => {
  return (
    <div>
      <Title
        title="Box Office"
        subtitle="are you lookinging for a movie or an actor?"
      />
      <Navs />
      {children}
    </div>
  );
};

export default MainPageLayout;
