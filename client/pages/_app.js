import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Navbar, WalletBar } from "../components";
import "../styles/globals.css";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "ethereum";

function MyApp({ Component, pageProps }) {
	return (
		<ThirdwebProvider activeChain={activeChain}>
			<div className="h-[12vh]">
				<Navbar />
			</div>
			<div className="h-[88vh]">
				<Component {...pageProps} />
			</div>
		</ThirdwebProvider>
	);
}

export default MyApp;
