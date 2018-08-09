const Router = require('express-promise-router')
const multer  = require('multer');

const dateToString = (date) => {
	let dateStr = `${date.getFullYear()}-`;
	dateStr += `${date.getMonth()}-`;
	dateStr += `${date.getDate()}.`;
	dateStr += `${date.getHours()}.`;
	dateStr += `${date.getMinutes()}.`;
	dateStr += `${date.getSeconds()}.`;
	dateStr += `${date.getMilliseconds()}`;
	return dateStr;
};

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
	cb(null, 'public/img');
  },
  filename: (req, file, cb) => {
	const filename = file.originalname;
	const date = new Date(Date.now());
	cb(null, filename.split('.').slice(0, -1).join('.') + '.' + dateToString(date) + '.jpg');
  }
});
const upload = multer({ storage });

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

router.get('/tree/maintenance/:tree_id', async (req, res) => {
	const id = req.params["tree_id"];
	res.send(await treeDB.fetchMaintenanceForTree(id));
});

router.post('/tree/maintenance', async (req, res) => {
	const maintenance = {
		treeId : req.body.tree_id,
		type : req.body.type,
		date : req.body.date,
		comment : req.body.comment,
	  };
	const id = await treeDB.addMaintenance(maintenance);
	res.send(JSON.stringify({ maintenance_id: id }))
	res.sendStatus(200);
});

router.get('/maintenance/types', async (req, res) => {
	res.send(await treeDB.fetchMaintenanceTypes());
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

router.post('/tree/photo', async (req, res) => {
	const photo = {
		treeId : req.body.tree_id,
		date : req.body.date,
		filepath : req.body.filepath,
		comment : req.body.comment,
	  };
	await treeDB.addPhotoForTree(photo);
	res.sendStatus(200);
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
