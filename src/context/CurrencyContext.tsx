import React, { createContext, useState } from "react";

type CurrencyContextType = {
	fromCurrency: string;
	setFromCurrency: (value: string) => void;
	toCurrency: string;
	setToCurrency: (value: string) => void;
	firstAmount: string;
	setFirstAmount: (value: string) => void;
};

export const CurrencyContext = createContext<CurrencyContextType | null>(null);


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const CurrencyProvider: React.FC = ({ children }) => {
	const [fromCurrency, setFromCurrency] = useState("🇺🇸 USD - United States");
	const [toCurrency, setToCurrency] = useState("🇳🇱 EUR - Netherlands");
	const [firstAmount, setFirstAmount] = useState("");

	const value: CurrencyContextType = {
		fromCurrency,
		setFromCurrency,
		toCurrency,
		setToCurrency,
		firstAmount,
		setFirstAmount
	};

	return (
		<CurrencyContext.Provider value={value}>
			{children}
		</CurrencyContext.Provider>
	);
};
