/* Script de post déploiement contenant les tables principales de la base de données ainsi que quelques insertions de données pour les tests.
 */

// Select the database to use.
use('portforall')

// Insert a few documents into the sales collection.
db.getCollection('user').insertMany([
	{
		last_name: 'ZADIKIAN',
		first_name: 'Thomas',
		email: 'thoma.zadikian@gmail.com',
		password: '123456789',
		birst_date: ISODate('1994-08-15T08:00:00Z'),
		bio: "My name is Thomas, i'm the creator of this plateform for a school project. ",
		web_site: { site01: 'www.test.com' },
		role: 'admin',
		register_date: ISODate('2024-05-13T09:06:00Z'),
		generale_condition: true,
		newsletter: false,
	},
])

// Permet de visualiser les données de la collection user qui n'ont pas accepté les conditions générales
db.user.find()
