const sqlite3 = require('sqlite3').verbose()

let db = new sqlite3.Database(
	'./my_database.db',
	sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
	(err) => {
		if (err) {
			console.error(err.message)
		} else {
			console.log('Connected to the SQLite database.')
		}
	},
)

const sqlQueries = `    -- Table Utilisateurs
CREATE TABLE Utilisateurs (
    user_id INTEGER PRIMARY KEY,
    nom VARCHAR,
    prenom VARCHAR,
    email VARCHAR UNIQUE,
    mot_de_passe VARCHAR,
    date_naissance DATE,
    bio TEXT,
    site_web VARCHAR,
    avatar_id INTEGER,
    role ENUM('artiste', 'utilisateur', 'admin'),
    date_inscription DATETIME,
    conditions_generales BOOLEAN,
    newsletter BOOLEAN,
    FOREIGN KEY (avatar_id) REFERENCES Avatars(avatar_id)
);

-- Table Avatars
CREATE TABLE Avatars (
    avatar_id INTEGER PRIMARY KEY,
    nom_fichier VARCHAR,
    type_fichier VARCHAR,
    taille_fichier INT,
    chemin_fichier VARCHAR
);

-- Table Portfolios
CREATE TABLE Portfolios (
    portfolio_id INTEGER PRIMARY KEY,
    user_id INTEGER,
    titre VARCHAR,
    description TEXT,
    date_creation DATETIME,
    visible BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES Utilisateurs(user_id)
);

-- Table Artworks
CREATE TABLE Artworks (
    artwork_id INTEGER PRIMARY KEY,
    portfolio_id INTEGER,
    titre VARCHAR,
    description TEXT,
    type_media ENUM('image', 'video'),
    nom_fichier VARCHAR,
    type_fichier VARCHAR,
    taille_fichier INT,
    chemin_fichier VARCHAR,
    date_creation DATETIME,
    visible BOOLEAN,
    FOREIGN KEY (portfolio_id) REFERENCES Portfolios(portfolio_id)
);

-- Table Commentaires
CREATE TABLE Commentaires (
    commentaire_id INTEGER PRIMARY KEY,
    user_id INTEGER,
    portfolio_id INTEGER,
    artwork_id INTEGER,
    contenu TEXT,
    date_publication DATETIME,
    FOREIGN KEY (user_id) REFERENCES Utilisateurs(user_id),
    FOREIGN KEY (portfolio_id) REFERENCES Portfolios(portfolio_id),
    FOREIGN KEY (artwork_id) REFERENCES Artworks(artwork_id)
);

-- Table Likes
CREATE TABLE Likes (
    like_id INTEGER PRIMARY KEY,
    user_id INTEGER,
    portfolio_id INTEGER,
    artwork_id INTEGER,
    date_like DATETIME,
    FOREIGN KEY (user_id) REFERENCES Utilisateurs(user_id),
    FOREIGN KEY (portfolio_id) REFERENCES Portfolios(portfolio_id),
    FOREIGN KEY (artwork_id) REFERENCES Artworks(artwork_id)
);

-- Table Messages
CREATE TABLE Messages (
    message_id INTEGER PRIMARY KEY,
    expediteur_id INTEGER,
    destinataire_id INTEGER,
    contenu TEXT,
    date_envoi DATETIME,
    lu BOOLEAN,
    FOREIGN KEY (expediteur_id) REFERENCES Utilisateurs(user_id),
    FOREIGN KEY (destinataire_id) REFERENCES Utilisateurs(user_id)
);

-- Table Blocages
CREATE TABLE Blocages (
    blocage_id INTEGER PRIMARY KEY,
    bloqueur_id INTEGER,
    bloque_id INTEGER,
    date_blocage DATETIME,
    FOREIGN KEY (bloqueur_id) REFERENCES Utilisateurs(user_id),
    FOREIGN KEY (bloque_id) REFERENCES Utilisateurs(user_id)
);

-- Table Suivis
CREATE TABLE Suivis (
    suivi_id INTEGER PRIMARY KEY,
    follower_id INTEGER,
    followed_id INTEGER,
    date_suivi DATETIME,
    FOREIGN KEY (follower_id) REFERENCES Utilisateurs(user_id),
    FOREIGN KEY (followed_id) REFERENCES Utilisateurs(user_id)
);

-- Table Statistiques
CREATE TABLE Statistiques (
    stats_id INTEGER PRIMARY KEY,
    date DATE,
    page_vue INT,
    utilisateur_inscrit INT,
    portfolio_cree INT,
    artwork_upload INT,
    commentaire_poste INT,
    like_donne INT,
    message_envoye INT
);`

db.serialize(() => {
	db.exec(sqlQueries, (err) => {
		if (err) {
			console.error(err.message)
		} else {
			console.log('Tables created successfully')
		}
	})
})

db.close()
