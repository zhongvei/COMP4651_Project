import {
  ChartSquareBarIcon,
  CurrencyDollarIcon,
  OfficeBuildingIcon,
} from "@heroicons/react/outline";

import img from "../public/virtual.png";

const benefitOne = {

  title: "Our Solution",
  desc: "We leverages both finance and Web3 technologies to create a community-driven platform for affordable housing to create a more equitable and sustainable housing market in Hong Kong.",
  image: img,
  bullets: [
    {
      title: "For Our Investors",
      desc: "Serves as a transparent investment to diversify their portfolio while being able to contribute to a social issue in their local community",
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

export { benefitOne };
