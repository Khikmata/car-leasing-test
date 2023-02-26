import Head from 'next/head'

const Meta = ({ title, description }) => {
	return (
		<Head>
			<title>{title}</title>
			<meta name='description' content={description} />
			<link rel="icon" href="/favicon.ico" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
		</Head>
	)
}

export default Meta