const db = require('../db');

class Tree {
	static async fetchAll() {
  		return await db.fetchAllRows('tree_view');
	}

	static async fetchById(id) {
		return await db.fetchById('tree_view', id);
	}

	static async fetchFamilies() {
  		return await db.fetchAllRows('tree_family');
	}

	static async fetchGenus() {
  		return await db.fetchAllRows('tree_genus');
	}

	static async fetchSpecies() {
  		return await db.fetchAllRows('tree_species');
	}

	static async fetchTypes() {
  		return await db.fetchAllRows('tree_type');
	}

	static async fetchType(familyId, genusId, speciesId) {
		let queryStr = 'SELECT * from tree_type WHERE ';
		queryStr    += 'tree_family_id = $1 AND tree_genus_id = $2 AND tree_species_id = $3';
		return await db.fetchFirstQueryRow(queryStr, [familyId, genusId, speciesId]);
	}

	static async addType(familyId, genusId, speciesId) {
		const type = await this.fetchType(familyId, genusId, speciesId);
		if (type !== undefined) {
			return type.id;
		}
		let queryStr = 'INSERT INTO tree_type (id, tree_family_id, tree_genus_id, tree_species_id) ';
		queryStr += 'VALUES (DEFAULT, $1, $2, $3) RETURNING id'
		const { id } = await db.fetchFirstQueryRow(queryStr, [familyId, genusId, speciesId]);
		return id;
	}

	static async fetchMaintenanceTypes() {
  		return await db.fetchAllRows('maintenance_type');
	}

	static async fetchMaintenance() {
  		return await db.fetchAllRows('maintenance_view');
	}

	static async fetchMaintenanceForTree(id) {
		return await db.fetchAllQueryRows('SELECT * from maintenance_view WHERE tree_id = $1', [id]);
  	}

	static async addMaintenance(maintenance) {
		const maintenanceTypeId = await this._addName('maintenance_type', maintenance.type);
		let queryStr = 'INSERT INTO maintenance (id, tree_id, maintenance_type_id, date, comment) ';
		queryStr    += 'VALUES (DEFAULT, $1, $2, $3, $4) RETURNING id';
		const { id } = await db.fetchFirstQueryRow(
			queryStr, [maintenance.treeId, maintenanceTypeId, maintenance.date, maintenance.comment]
		);
		return id;
	}

	static async fetchPhotos() {
  		return await db.fetchAllRows('photo');
	}

	static async fetchPhotosForTree(id) {
		return await db.fetchAllQueryRows('SELECT * FROM photo WHERE tree_id = $1', [id]);;
	}

	static async fetchLastPhotoForTree(id) {
		return await db.fetchFirstQueryRow('SELECT * FROM photo WHERE tree_id = $1 ORDER BY date DESC', [id]);
	}

	static async fetchPhotosForTreeDate(treeId, date) {
		return await db.fetchAllQueryRows('SELECT * FROM photo WHERE tree_id = $1 AND date = $2', [treeId, date]);;
	}

	static async fetchTimelineTableIndices() {
		return await db.fetchAllRows('timeline_table_index');
	}

	static async fetchTimeline(treeId, offset, numberOfItems) {
		const tableIds = await this.fetchTimelineTableIndices();
		let tableMapping = {};
		tableIds.forEach((tableMappingRow) => tableMapping[tableMappingRow.id] = tableMappingRow);

		// // todo: LIMIT and OFFSET
		const timelineIds = await db.fetchAllQueryRows('SELECT * FROM timeline_view WHERE tree_id = $1 OFFSET $2 LIMIT $3', [treeId, offset, numberOfItems]);

		// instead we could offer a get timeline item route
		let timeline = [];
		for (const timelineRow of timelineIds) {
			const tableMappingRow = tableMapping[timelineRow.table_index];
			const id = timelineRow.id;
			const item = await db.fetchById(tableMappingRow.table_name, id);

			timeline.push({
				type: tableMappingRow.item_type_name,
				...item,
			});
		}

		return timeline;
	}

	static async addPhotoForTree(photo) {
		let queryStr = 'INSERT INTO photo (id, tree_id, date, filepath, comment) ';
		queryStr    += 'VALUES (DEFAULT, $1, $2, $3, $4) RETURNING id';
		const { id } = await db.fetchFirstQueryRow(
			queryStr, [photo.treeId, photo.date, photo.filepath, photo.comment]
		);
		return id;
	}

	static async addNoteForTree(photo) {
		let queryStr = 'INSERT INTO note (id, tree_id, date, comment) ';
		queryStr    += 'VALUES (DEFAULT, $1, $2, $3) RETURNING id';
		const { id } = await db.fetchFirstQueryRow(
			queryStr, [photo.treeId, photo.date, photo.comment]
		);
		return id;
	}

	static async _fetchName(table, name) {
		return await db.fetchFirstQueryRow('SELECT * from ' + table + ' WHERE name = $1', [name]);;
	}

	static async _addName(table, name) {
		try {
			// add it if it does not exist
			const { id } = await db.fetchFirstQueryRow('INSERT INTO ' + table + ' (id, name) VALUES (DEFAULT, $1) RETURNING id', [name]);
 			return id;
		} catch (e) {
			// it already exists, fetch its id
			const res = await this._fetchName(table, name);
			const { id } = res;
			return id;
		}
	}	

	static async addFamily(name) {
		return await this._addName('tree_family', name);
	}

	static async addGenus(name) {
		return await this._addName('tree_genus', name);
	}

	static async addSpecies(name) {
		return await this._addName('tree_species', name);
	}

	static async addAcquisitionType(name) {
		return await this._addName('acquisition_type', name);
	}

	static async fetchAcquisitionTypes() {
		return await db.fetchAllQueryRows('SELECT * FROM acquisition_type');
	}

	static async addAcquisition(acquisition) {
		const typeId = await this.addAcquisitionType(acquisition.type);

		let queryStr = 'INSERT INTO acquisition (id, tree_id, acquisition_type_id, date, age, location, comment) ';
		queryStr    += 'VALUES (DEFAULT, $1, $2, $3, $4, $5, $6) RETURNING id';

		const { id } = await db.fetchFirstQueryRow(
			queryStr,
			[ acquisition.treeId, typeId, acquisition.date, acquisition.age, acquisition.location, acquisition.comment ]
		);
		return id;
	}

	static async addTree(tree) {
		// need transaction here, commit only if everything can be added
		const client = await db.connect();

		try {
			await db.begin(client);

			const familyId = await this.addFamily(tree.family);
			const genusId = await this.addGenus(tree.genus);
			const speciesId = await this.addSpecies(tree.species);

			const treeTypeId = await this.addType(familyId, genusId, speciesId);

			let queryStr = 'INSERT INTO tree (id, tree_type_id) ';
			queryStr    += 'VALUES (DEFAULT, $1) RETURNING id';
			const { id } = await db.fetchFirstQueryRow(
				queryStr,
				[ treeTypeId ]
			);

			const acquisition = {
				treeId: id,
				type: tree.acquisitionType,
				date: tree.acquisitionDate,
				age: tree.acquisitionAge,
				location: tree.acquisitionLocation,
				comment: tree.acquisitionComment
			};
			const acquisitionId = await this.addAcquisition(acquisition);

			await db.commit(client);

			return { tree_id: id, acquisition_id: acquisitionId };
		} catch(e) {
			await db.rollback(client);
			throw e;
		} finally {
			client.release();
		}
	}
}

module.exports = Tree;