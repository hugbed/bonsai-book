const db = require('../db');

class Tree {
	static async fetchAll() {
  		const { rows } = await db.query('SELECT * FROM tree_view');
  		return rows;
	}

	static async fetchById(id) {
		const { rows } = await db.query('SELECT * FROM tree_view WHERE id = $1', [id]);
		return rows[0];
	}
}

module.exports = Tree;