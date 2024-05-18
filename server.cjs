const express = require('express');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql2/promise'); 

const pool = mysql.createPool({
  host: '127.0.0.1', 
  user: 'admin', 
  password: 'admin',
  database: 'portforall', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
const app = express();
const PORT = process.env.PORT || 3000; 

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

function generateAuthToken(userId) {
  return `Bearer ${userId}`; // Par exemple, utilisez l'ID de l'utilisateur comme jeton
}

// Define your API routes
app.post('/api/users', async (req, res) => {
  const newUser = req.body;
  try {
    const connection = await pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error connecting to database:', err);
        return;
      }
      console.log('Connected to database');
      connection.release();
    });;
    const [result] = await connection.execute(
      `INSERT INTO users (last_name, first_name, email, password, bio, role, registration_date)
      VALUES (?,?,?,?,?,?,NOW())`,
      [
        newUser.last_name,
        newUser.first_name,
        newUser.email,
        newUser.password,
        newUser.bio,
        "user"
      ]
    );
    connection.release();
    
    const insertedId = result.insertId;
    res.json({ message: 'User created successfully', user: { ...newUser, id: insertedId, role: 'user' } });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Route connect user
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const [userData] = await pool.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
    
    if (userData.length === 0) {
      return res.status(401).json({ message: 'L\'utilisateur avec cet email n\'existe pas' });
    }


 /*
    LORSQUE LE PASSWORD SERA HASHER
    const hashedPassword = rows[0].password;
    
    if (password !== hashedPassword) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }
    */

    // Générez un token d'authentification (vous pouvez utiliser JWT ou tout autre mécanisme)
    const token = generateAuthToken(userData.id);
    res.json({ token, userData });
  } catch (error) {
    console.error('Erreur lors de la connexion de l\'utilisateur:', error);
    res.status(500).send('Erreur Serveur Interne');
  }
});

app.listen(PORT, function() {
  console.log('Server running on port ' + PORT);
});
