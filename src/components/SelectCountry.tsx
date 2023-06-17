import { Autocomplete, Grid, Skeleton, TextField } from "@mui/material";
import { UseAxios } from "../hooks/UseAxios.tsx";
import  {useCallback} from "react";

type SelectCountryProps = {
	value: string;
	setValue: (value: string) => void;
	label: string;
};

export const SelectCountry = ({ value, setValue, label }: SelectCountryProps) => {
	// @ts-ignore
	const onAutocompleteChange = useCallback((event, newValue) => {
		if (typeof newValue === "string") {
			setValue(newValue);
		}
	}, [setValue])

	const [data, loader, error] = UseAxios("https://restcountries.com/v3.1/all");

	type Country = {
		name: {
			common: string;
		};
		flag: string;
		currencies: {
			[key: string]: {
				name: string;
				symbol: string;
			};
		};
	};

	if (loader) {
		return (
			<Grid item xs={12} md={3}>
				<Skeleton variant="rounded" height={60} />
			</Grid>
		);
	}

	if (error) {
		return "Something went wrong!";
	}

	const dataFilter = data.filter((item: Country) => "currencies" in item);

	const dataCountry = dataFilter.map((item: Country) => {
		return `${item.flag} ${Object.keys(item.currencies)[0]} - ${item.name.common}`;
	});

	return (
		<>
			<Grid item xs={12} md={3}>
				<Autocomplete
					value={value}
					options={dataCountry}
					disableClearable
					onChange={onAutocompleteChange}
					renderInput={(params) => <TextField {...params} label={label} />}
				/>
			</Grid>
		</>
	);
};
