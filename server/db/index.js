const { Pool } = require('pg');

const pool = new Pool();

const query = (text, params) => pool.query(text, params);

const fetchById = async (table, id) => {
	const { rows } = await query('SELECT * FROM ' + table + ' WHERE id = $1', [id]);
	return rows[0];
};

const fetchAllRows = async (table) => {
	const { rows } = await query('SELECT * FROM ' + table);
	return rows;
};

const fetchAllQueryRows = async (queryStr, params) => {
	const { rows } = await query(queryStr, params);
	return rows;
};

const fetchFirstQueryRow = async (queryStr, params) => {
	const rows = await fetchAllQueryRows(queryStr, params);
	return rows[0];
};

module.exports = {
  query: query,
  connect: () => pool.connect(),
  begin: (client) => client.query('BEGIN'),
  commit: (client) => client.query('COMMIT'),
  rollback: (client) => client.query('ROLLBACK'),
  fetchById: fetchById,
  fetchAllRows: fetchAllRows,
  fetchAllQueryRows: fetchAllQueryRows,
  fetchFirstQueryRow: fetchFirstQueryRow,
};
