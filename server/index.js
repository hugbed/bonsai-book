const { Client } = require('pg');

async function main() {
	const client = new Client(/*{
		user: 'dbuser',
		host: 'db',
		database: 'tree',
		password: 'secretpassword',
		port: 5432,
	}*/);
	await client.connect();
	const res = await client.query('SELECT $1::text as message', ['Hello world!']);
	console.log(res.rows[0].message);
	await client.end();
}

main();

