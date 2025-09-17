import IntroSection from "./compoents/introSection/IntroSection";
import Goals from "./compoents/goals/Goals";
import Presentation from "./compoents/presentation/Presentation";
import BreakingNews from "./compoents/breakingNews/BreakingNews";
import Partners from "./compoents/partners/Partners";
import Contact from "./compoents/contactUs/ContactUs";

export default function Home() {
  return (
    <div>
      <IntroSection />
      <Goals />
      <Presentation />
      <BreakingNews />
      <Partners />
      <Contact />
    </div>
  );
}
