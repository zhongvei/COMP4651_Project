import { useState, useEffect } from "react";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import { Sepolia } from "@thirdweb-dev/chains";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import NProgress from "nprogress"; // nprogress module
import "nprogress/nprogress.css"; // styles of nprogress

import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { StateContextProvider } from "../context";
import { Navbar } from "../components";
import "../styles/globals.css";
import "../styles/pageLoader.css";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";


ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = Sepolia

function MyApp({ Component, pageProps }) {
	const router = useRouter();

	NProgress.configure({ showSpinner: false });

	const [loading, setLoading] = useState(false);
	const onLoading = () => {
		setLoading(true);
		NProgress.start();
	};

	const endLoading = () => {
		setLoading(false);
		NProgress.done();
	};

	Router.events.on("routeChangeStart", () => onLoading());
	Router.events.on("routeChangeComplete", () => endLoading());
	Router.events.on("routeChangeError", () => endLoading());

	return (
		<ThirdwebProvider activeChain={activeChain}>
			<Head>
				<title>HomeAbode |</title>
			</Head>
			<StateContextProvider>
				<Navbar />
                <ToastContainer />
				<Component {...pageProps} />
			</StateContextProvider>
		</ThirdwebProvider>
	);
}

export default MyApp;
