import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Navbar } from "../components";
import { StateContextProvider } from "../context";
import "../styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "localhost";

function MyApp({ Component, pageProps }) {
	return (
		<ThirdwebProvider activeChain={activeChain}>
			<StateContextProvider>
				<div className="h-[12vh]">
					<Navbar />
				</div>
				<div className="h-[88vh]">
					<Component {...pageProps} />
				</div>
			</StateContextProvider>
		</ThirdwebProvider>
	);
}

export default MyApp;
