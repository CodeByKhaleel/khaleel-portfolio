import LegacyPage from "./components/LegacyPage";
import { HomeDemo, HomeApproach, HomeProjects, HomeRecommendations } from "./components/HomeEnhancements";
import CareerCardTilt from "./components/CareerCardTilt";

export default function HomePage() {
  return <><LegacyPage pageKey="home" homeDemo={<HomeDemo />} homeApproach={<HomeApproach />} homeProjects={<HomeProjects />} homeRecommendations={<HomeRecommendations />} /><CareerCardTilt /></>;
}
