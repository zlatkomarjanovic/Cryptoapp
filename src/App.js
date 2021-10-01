import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { Navbar } from './components';

const App = () => {
	return (
		<div className='app'>
			<div classNAme='navbar'>
				<Navbar />
			</div>
			<div classNAme='main'></div>
			<div classNAme='footer'></div>
		</div>
	);
};

export default App;
