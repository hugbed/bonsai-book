const Router = require('express-promise-router')

const upload = require('../upload');
const treeDB = require('../db/Tree')

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()

router.get('/', async (req, res) => {
	res.send(JSON.stringify(await treeDB.fetchAll()));
});

router.get('/tree/:id', async (req, res) => {
	const id = req.params["id"];
	res.send(JSON.stringify(await treeDB.fetchById(id)));
});

router.post('/tree', async (req, res) => {
	const tree = {
	  family : req.body.family,
	  genus : req.body.genus,
	  species : req.body.species,
	  acquisitionDate : req.body.acquisition_date,
	  acquisitionAge : req.body.acquisition_age,
	  acquisitionLocation : req.body.acquisition_location,
	  acquisitionType : req.body.acquisition_type,
	  acquisitionComment : req.body.acquisition_comment
	};
	await treeDB.addTree(tree);
	res.sendStatus(200);
});

router.get('/families', async (req, res) => {
	res.send(JSON.stringify(await treeDB.fetchFamilies()));
});

router.get('/genus', async (req, res) => {
	res.send(JSON.stringify(await treeDB.fetchGenus()));
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

router.get('/tree/maintenance/:tree_id', async (req, res) => {
	const id = req.params["tree_id"];
	res.send(await treeDB.fetchMaintenanceForTree(id));
});

router.post('/tree/maintenance/:tree_id', async (req, res) => {
	const treeId = req.params["tree_id"];
	const maintenance = {
		treeId : treeId,
		type : req.body.type,
		date : req.body.date,
		comment : req.body.comment
	};
	const id = await treeDB.addMaintenance(maintenance);
	res.send(JSON.stringify({ id: id }))
});

router.get('/maintenance/types', async (req, res) => {
	res.send(await treeDB.fetchMaintenanceTypes());
});

router.get('/acquisition/types', async (req, res) => {
	res.send(await treeDB.fetchAcquisitionTypes());
});

// should be able to fetch photos for a tree, a (tree, date)
router.get('/photos', async (req, res) => {
	res.send(await treeDB.fetchPhotos());
});

router.get('/tree/photos/:tree_id', async (req, res) => {
  	const treeId = req.params["tree_id"];
	res.send(await treeDB.fetchPhotosForTree(treeId));
});

router.get('/tree/photos/:tree_id/:date', async (req, res) => {
  	const treeId = req.params["tree_id"];
  	const date = req.params["date"];
	res.send(await treeDB.fetchPhotosForTreeDate(treeId, date));
});

router.get('/tree/timeline/:tree_id', async (req, res) => {
	const treeId = req.params["tree_id"];
	const offset = req.query["offset"];
	const numberOfItems = req.query["numberOfItems"];
  	res.send(await treeDB.fetchTimeline(treeId, offset, numberOfItems));
});

router.post('/tree/note', async (req, res) => {
	const note = {
		treeId : req.body.tree_id,
		date : new Date(Date.now()),
		comment : req.body.comment
	};
	const id = await treeDB.addNoteForTree(note);
	res.send(JSON.stringify({ id: id }));
});

router.post('/tree/photo', async (req, res) => {
	const photo = {
		treeId : req.body.tree_id,
		date : req.body.date,
		filepath : req.body.filepath,
		comment : req.body.comment
	};
	const id = await treeDB.addPhotoForTree(photo);
	res.send(JSON.stringify({ id: id }));
});

router.get('/tree/photo/file/:filename', async (req, res) => {
	const filename = __dirname + '/../public/img/' + req.params["filename"];
	res.download(filename);
});

router.post('/tree/photo/file', upload.single('file'), function (req, res, next) {
	const filename = req.file.filename;
	console.log('Uploaded image: ' + filename);
	res.send(JSON.stringify({ filename: filename }));
});

// export our router to be mounted by the parent application
module.exports = router;
