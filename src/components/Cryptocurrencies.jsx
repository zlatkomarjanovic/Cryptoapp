import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';

const Cryptocurrencies = ({ simplified }) => {
	const count = simplified ? 10 : 100;
	const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
	const [cryptos, setCryptos] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	console.log(cryptos);

	useEffect(() => {
		const filteredData = cryptosList?.data?.coins.filter((coin) =>
			coin.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setCryptos(filteredData);
	}, [cryptosList, searchTerm]);

	if (isFetching) return 'Loading...';

	return (
		<>
			{!simplified && (
				<div className='search-crypto'>
					<Input
						placeholder='Search Cryptocurrency'
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			)}

			<Row className='crypto-card-container' gutter={[32, 32]}>
				{cryptos?.map((currency) => (
					<Col className='crypto-card' key={currency.id} lg={6} m={12} xs={24}>
						<Link to={`/crypto/${currency.id}`}>
							<Card
								hoverable
								extra={<img className='crypto-image' src={currency.iconUrl} />}
								title={`${currency.rank}. ${currency.name}`}
							>
								<p>Price : {millify(currency.price)}</p>
								<p>Market cap : {millify(currency.marketCap)}</p>
								<p>Daily Change : {millify(currency.change)}%</p>
							</Card>
						</Link>
					</Col>
				))}
			</Row>
		</>
	);
};

export default Cryptocurrencies;
