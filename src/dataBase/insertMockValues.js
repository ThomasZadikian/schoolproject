import db from './connectDatabase.js'

const mockValues = {
	mockUser: `INSERT INTO Utilisateurs (
        nom,
        prenom,
        email,
        mot_de_passe,
        date_naissance,
        bio,
        site_web,
        avatar_id,
        role,
        date_inscription,
        conditions_generales,
        newsletter
    )
    VALUES (
        'Dupont',
        'Jean',
        'jean.dupont@example.com',
        'password1',
        '1980-01-01',
        'Je suis Jean Dupont.',
        'http://www.jeandupont.com',
        1,
        'utilisateur',
        datetime('now'),
        1,
        1
    ), (
        'Doe',
        'John',
        'john.doe@example.com',
        'password2',
        '1990-01-01',
        'Je suis John Doe.',
        'http://www.johndoe.com',
        2,
        'utilisateur',
        datetime('now'),
        1,
        0
    );`,
}
const insterMockValues = Object.values(mockValues).join(' ')

db.serialize(() => {
	db.exec(insterMockValues, (err) => {
		if (err) {
			console.error(err.message)
		} else {
			console.log('Success')
		}
	})
})

db.close()
