import { useEffect, useState } from "react";
import axios from 'axios';

export const UseAxios = (url: string) => {
	const [data, setData] = useState<any[]>([]); // Додайте тип для стану data
	const [error, setError] = useState<any>(null); // Додайте тип для стану error
	const [loader, setLoader] = useState<boolean>(false); // Додайте тип для стану loader

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoader(true);
				const response = await axios(url);
				setData(response.data);
			} catch (error) {
				setError(error);
			} finally {
				setLoader(false);
			}
		};
		fetchData();
	}, [url]);

	return [data, error, loader];
}
