const Router = require('express-promise-router')

const treeDB = require('../db/Tree')

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()

// export our router to be mounted by the parent application
module.exports = router;

router.get('/', async (req, res) => {
	const treei = {
	  family : 'Family',
	  genus : 'Genus',
	  species : 'Species',
	  acquisitionDate : '2018-01-01',
	  acquisitionAge : 2,
	  acquisitionLocation : 'Here',
	  acquisitionType : 'Air Layering',
	  acquisitionComment : 'Comment'
	};
	console.log(await treeDB.addTree(treei));
	res.send(await treeDB.fetchAll());
});

router.get('/tree/:id', async (req, res) => {
	const id = req.params["id"];
	res.send(await treeDB.fetchById(id));
});

router.post('/tree', async (req, res) => {
	const treei = {
	  family : req.body.family,
	  genus : req.body.genus,
	  species : req.body.species,
	  acquisitionDate : req.body.acquisition_date,
	  acquisitionAge : req.body.acquisition_age,
	  acquisitionLocation : req.body.acquisition_location,
	  acquisitionType : req.body.acquisition_type,
	  acquisitionComment : req.body.acquisition_comment
	};
	await treeDB.addTree(treei);
	res.send({ success: true});
});

// post a new tree (will add familiy, genus, etc. if necessary)

router.get('/families', async (req, res) => {
	res.send(await treeDB.fetchFamilies());
});

router.get('/genus', async (req, res) => {
	res.send(await treeDB.fetchGenus());
});

router.get('/species', async (req, res) => {
	res.send(await treeDB.fetchSpecies());
});

router.get('/types', async (req, res) => {
	res.send(await treeDB.fetchTypes());
});

router.get('/maintenance', async (req, res) => {
	res.send(await treeDB.fetchMaintenance());
});

// post maintenance (will add maintenace_type if necessary)

router.get('/maintenance/types', async (req, res) => {
	res.send(await treeDB.fetchMaintenanceTypes());
});

// should be able to fetch photos for a tree, a (tree, date)
router.get('/photos', async (req, res) => {
	res.send(await treeDB.fetchPhotos());
});

router.get('/photos/:tree_id', async (req, res) => {
  	const treeId = req.params["tree_id"];
	res.send(await treeDB.fetchPhotosForTree());
});

router.get('/photos/:tree_id/:date', async (req, res) => {
  	const treeId = req.params["tree_id"];
  	const date = req.params["date"];
	res.send(await treeDB.fetchPhotosForTreeDate(treeId, date));
});

// post photo for tree, date (with filepath, comment)



