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

module.exports = upload;