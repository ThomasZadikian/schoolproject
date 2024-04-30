const sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database('./BDD.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
	if (err) {
		console.error(err.message)
	} else {
		console.log('Connected to the database')
	}
})

module.exports = db
