import { useState } from "react";
import styles from "../styles/Home.module.css";
import { useStateContext } from "../context";
import Landing from "../components/Landing";
import SectionTitle from "../components/sectionTitle";
import Benefits from "../components/benefits";
import { benefitOne } from "../components/data";
import Video from "../components/video";
import Faq from "../components/faq";
import Footer from "../components/footer";
import PopupWidget from "../components/popupWidget";

export default function Home() {
	const { getBuildings, getTransaction, getFlats, buyFlat, connect, generate } =
		useStateContext();

	const [test, settest] = useState({
		name: "",
		available: "",
		taken: "",
	});

	const [tx, settx] = useState({
		buyer: "",
		flat: "",
		price: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log("clicked");

			await generate();
			// settest(data);
			// console.log(`${test.name} ${test.available} ${test.taken}`);
			// console.log(data.available.toNumber());
		} catch (error) {
			console.log(`error ${error}`);
		}
	};

	const handleEvents = async (e) => {
		e.preventDefault();
		try {
			const events = await getTransaction();
			console.log(events);
			settx(events);
			// console.log(tx[0])
		} catch (error) {
			console.log(error);
		}
	};

	const handleFlats = async (e) => {
		e.preventDefault();
		try {
			const events = await getFlats("building1");
			console.log(events);
			// settx(events)
			// console.log(tx[0])
		} catch (error) {
			console.log(error);
		}
	};

	const handleBuyFlat = async (e) => {
		e.preventDefault();
		try {
			const reciept = await buyFlat("building1", "B", "5000000000000000000");
		} catch (error) {
			console.log(error);
		}
	};

	const handleGenerate = async (e) => {
		e.preventDefault();
		console.log("clicked");
		try {
			await generate();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Landing />
			{/* <button 
				onClick={handleSubmit}
				className={`w-10 h-10`}
				style={{backgroundColor:'red'}}
			/> */}


	  <Benefits data={benefitOne} />
	  <SectionTitle
        pretitle="Watch a video"
        title="Learn How Our Platform Works">
      </SectionTitle>
      <Video />
      
      <SectionTitle pretitle="FAQ" title="Frequently Asked Questions">
        Below you will find answers to the most common questions we receive. If you have any other questions, please feel free to contact us.
      </SectionTitle>
      <Faq />
      <Footer />
      <PopupWidget />
    </>
  )}
