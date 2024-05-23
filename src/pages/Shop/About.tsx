import { Options } from "../../components";
import { ShopLayout } from "../../layout";
import { AboutContent, AboutInfo, AboutPersons } from "../../components";

function About() {
  return (
    <ShopLayout>
      <AboutContent />
      <AboutInfo />
      <AboutPersons />
      <Options />
    </ShopLayout>
  );
}

export default About;
