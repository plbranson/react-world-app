/**
 *  Copyright 2023 Patrick L. Branson
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

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
				<div>Capital: {detail.capital}</div>
				<div>Population: {detail.population}</div>
				<div>Currencies: {detail.currencies?.map((currency) => currency.name).join(', ')}</div>
			</div>
		</div>
	);
}

export default CountryDetail;
