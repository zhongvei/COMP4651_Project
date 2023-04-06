import {
  ChartSquareBarIcon,
  DeviceMobileIcon,
  CurrencyDollarIcon,
  AdjustmentsIcon,
  SunIcon,
  OfficeBuildingIcon,
} from "@heroicons/react/outline";

import benefitOneImg from "../public/benefit-one.png";
import benefitTwoImg from "../public/benefit-two.png";

const benefitOne = {

  title: "Who are we?",
  desc: "Our solution leverages both finance and Web3 technologies to create a community-driven platform for affordable housing to create a more equitable and sustainable housing market in Hong Kong.",
  image: benefitOneImg,
  bullets: [
    {
      title: "For Our Investors",
      desc: "Serves as a transparent investment to diversity their portfolio while being able to contribute to a social issue in their local community",
      icon: <ChartSquareBarIcon />,
    },
    {
      title: "For Our Renters",
      desc: "Increases the supply of affordable housing that will allow for a comfortable and secure home, thereby improving their quality of life and overall wellbeing",
      icon: <CurrencyDollarIcon />,
    },
    {
      title: "For Companies",
      desc: "Provides a revenue-generating and sustainable ESG initiative and positive local brand engagement",
      icon: <OfficeBuildingIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Offer more benefits here",
  desc: "You can use this same layout with a flip image to highlight your rest of the benefits of your product. It can also contain an image or Illustration as above section along with some bullet points.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Mobile Responsive Template",
      desc: "Nextly is designed as a mobile first responsive template.",
      icon: <DeviceMobileIcon />,
    },
    {
      title: "Powered by Next.js & TailwindCSS",
      desc: "This template is powered by latest technologies and tools.",
      icon: <AdjustmentsIcon />,
    },
    {
      title: "Dark & Light Mode",
      desc: "Nextly comes with a zero-config light & dark mode. ",
      icon: <SunIcon />,
    },
  ],
};

export { benefitOne, benefitTwo };
