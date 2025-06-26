import Banner from "../components/Banner";
import FeaturesPost from "./FeaturesPost";
import SafetyTips from "./SafetyTips";
import HowWorks from "./HowWorks";
import { useTheme } from "../hooks/use-theme";
import Newsletter from "../components/Newsletter";

const Home = () => {
  const { theme } = useTheme();
  return (
    <div data-theme={theme} className="transition-colors duration-300">
      <div>
        <Banner />
        <FeaturesPost />
        <HowWorks />
        <SafetyTips />
        <Newsletter></Newsletter>
      </div>
    </div>
  );
};

export default Home;
