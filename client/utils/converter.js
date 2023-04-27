export const exchangeRate = async (coin, currency) => {
	try {
		const response = await fetch(
			`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=${currency}`
		);
		const data = await response.json();
		const rate = data[coin][currency];
		return rate;
	} catch (error) {
		console.error(error);
		return 0;
	}
};
