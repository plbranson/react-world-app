/*
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

import { Route, Routes } from 'react-router';

import Home from './pages/Home';
import CountryDetail from './pages/CountryDetail';

const App = () => {
	return (
		<div>
			<Routes>
				<Route path={'/'} element={<Home />} />
				<Route path={'/countries/:countryCode'} element={<CountryDetail />} />

				{/** All other paths go to 404 - Page Not Found */}
				<Route path={'*'} element={<h1>404 Page Not Found!</h1>} />
			</Routes>
		</div>
	);
};

export default App;
