const Router = require('express-promise-router')

const treeDB = require('../db/Tree')

// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers
const router = new Router()

// export our router to be mounted by the parent application
module.exports = router;

router.get('/', async (req, res) => {
  res.send(await treeDB.fetchAll());
});

router.get('/:id', async (req, res) => {
  const id = req.params["id"];
  res.send(await treeDB.fetchById(id));
});
