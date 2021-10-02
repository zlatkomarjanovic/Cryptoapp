import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
	const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
	const { data } = useGetCryptosQuery(100);
	const { data: cryptoNews } = useGetCryptoNewsQuery({
		newsCategory,
		count: simplified ? 6 : 12,
	});

	const demoImgUrl =
		'https://images.pexels.com/photos/4185957/pexels-photo-4185957.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

	if (!cryptoNews?.value) return 'Loading...';
	return (
		<div>
			<Row gutter={[24, 24]}>
				{!simplified && (
					<Col span={24}>
						<Select
							showSearch
							className='select-news'
							placeholder='Select a Crypto'
							optionFilterProp='children'
							onChange={(value) => setNewsCategory(value)}
							filterOption={(input, option) =>
								option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
							}
						>
							<Option value='Cryptocurrency'>Cryptocurrency</Option>
							{data?.data?.coins.map((coin) => (
								<Option value={coin.name}>{coin.name}</Option>
							))}
						</Select>
					</Col>
				)}
				{cryptoNews.value.map((news, i) => (
					<Col xs={24} sm={12} lg={8} key={i}>
						<Card hoverable className='news-card'>
							<a href={news.url} target='_blank' rel='noreferrer'>
								<div className='news-image.container'>
									<Title className='news-title' level={4}>
										{news.name}
									</Title>
									<img
										style={{ maxWidth: '200px', maxHeight: '100px' }}
										alt='news'
										src={news?.image?.thumbnail?.contentUrl || demoImgUrl}
									/>
								</div>
								<p>
									{news.description > 100
										? `${news.description.substring(0, 100)}...`
										: news.description}
								</p>
								<div className='provider-container'>
									<div>
										<Avatar
											src={
												news.provider[0]?.image?.thumbnail?.contentUrl ||
												demoImgUrl
											}
											alt='news'
										/>
										<Text className='provider-name'>
											{news.provider[0]?.name}
										</Text>
									</div>
									<Text>
										{moment(news.datePublished).startOf('ss').fromNow()}
									</Text>
								</div>
							</a>
						</Card>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default News;
