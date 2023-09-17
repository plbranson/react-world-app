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

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';

import { getAllCountries } from '../services';
import styles from '../styles/Home.module.css';
import CountryCard from '../components/CountryCard';

const Home = () => {
	const [region, setRegion] = useState('');
	const [countryName, setCountryName] = useState('');
	const [allCountriesList, setAllCountriesList] = useState([]);
	const [filteredCountriesList, setFilteredCountriesList] = useState([]);

	const handleRegionChange = (event) => {
		setRegion(event.target.value);
	};

	const handleCountryNameChange = (event) => {
		setCountryName(event.target.value);
	};

	useEffect(() => {
		getAllCountries().then(function (result) {
			const countries = result.data;
			setAllCountriesList(countries);
			setFilteredCountriesList(countries);
		});
	}, []);

	useEffect(() => {
		if (region === '' && countryName === '') {
			setFilteredCountriesList(allCountriesList);
		} else {
			let filteredCountries = allCountriesList;
			// Step #1: Filtering based on region
			if (region.length) {
				filteredCountries = filteredCountries.filter((country) => {
					if (country.region === region) {
						return true;
					} else {
						return false;
					}
				});
			}
			// Step #2: Filter based on country name
			if (countryName.length) {
				filteredCountries = filteredCountries.filter(function (country) {
					const lowercaseName = country.name.toLowerCase();
					if (lowercaseName.includes(countryName.toLocaleLowerCase())) {
						return true;
					} else {
						return false;
					}
				});
			}
			setFilteredCountriesList(filteredCountries);
		}
	}, [region, countryName, allCountriesList]);

	return (
		<div>
			<div className={styles.filtersWrapper}>
				<TextField
					id={'outlined-basic'}
					label={'Filter by Name'}
					variant={'outlined'}
					onChange={handleCountryNameChange}
					value={countryName}
				/>
				<FormControl sx={{ m: 1, minWidth: 120 }}>
					<InputLabel id={'demo-simple-select-helper-label'}>Filter by Region</InputLabel>
					<Select
						labelId={'demo-simple-select-helper-label'}
						id={'demo-simple-select-helper'}
						value={region}
						label={'Filter by Region'}
						onChange={handleRegionChange}
					>
						<MenuItem value={''}>All</MenuItem>
						<MenuItem value={'Africa'}>Africa</MenuItem>
						<MenuItem value={'Americas'}>Americas</MenuItem>
						<MenuItem value={'Asia'}>Asia</MenuItem>
						<MenuItem value={'Europe'}>Europe</MenuItem>
						<MenuItem value={'Oceania'}>Oceania</MenuItem>
					</Select>
				</FormControl>
			</div>
			<div className={styles.countryCardWrapper}>
				{filteredCountriesList.map((country) => (
					<Link to={`/countries/${country.alpha3Code}`} key={country.alpha3Code} style={{ textDecoration: 'none' }}>
						<CountryCard
							name={country.name}
							capitol={country.capitol}
							population={country.population}
							flagUrl={country.flags.png}
						/>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Home;
