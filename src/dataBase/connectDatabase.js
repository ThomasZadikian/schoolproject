import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('./BDD.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
	if (err) {
		console.error(err.message)
	} else {
		console.log('Connected to the SQLite database.')
	}
})

export default db
