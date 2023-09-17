import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getCountryDetail } from '../services';
import styles from '../styles/CountryDetail.module.css';

function CountryDetail() {
	const { countryCode } = useParams();
	const [detail, setDetail] = useState({});

	useEffect(
		function () {
			getCountryDetail(countryCode).then(function (result) {
				setDetail(result.data);
			});
		},
		[countryCode]
	);

	return (
		<div className={styles.countryDetailWrapper}>
			<div>
				<img src={detail.flags?.png} alt={detail.name} />
			</div>
			<div>
				<div>Name: {detail.name}</div>
				<div>Capitol: {detail.capitol}</div>
				<div>Population: {detail.population}</div>
				<div>Currencies: {detail.currencies?.map((currency) => currency.name).join(', ')}</div>
			</div>
		</div>
	);
}

export default CountryDetail;
