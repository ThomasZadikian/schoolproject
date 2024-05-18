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

// Define your API routes
app.post('/api/users', async (req, res) => {
  let conn; 
  const newUser = req.body;
  try {
    conn = await pool.getConnection();
    const [result] = await pool.execute(
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
    const insertedId = result.insertId;
    res.json({ message: 'User created successfully', user: { ...newUser, id: insertedId, role: 'user' } });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    if(conn) {
      conn.release();
    }
  }
});


// Route connect user
app.post('/api/login', async (req, res) => {
  let conn; 
  const { email, password } = req.body;
  try {
    conn = await pool.getConnection();
    const [result] = await pool.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
    if (result.length === 0) {
      return res.status(401).json({ message: 'L\'utilisateur avec cet email n\'existe pas' });
    }
    const userObject = {
      user_id: result[0].user_id,
      last_name: result[0].last_name,
      first_name: result[0].first_name,
      email: result[0].email,
      password: result[0].password,
      bio: result[0].bio,
      avatar_id: result[0].avatar_id,
      role: result[0].role,
      registration_date: result[0].registration_date
    };
    res.json(userObject);
  } catch (error) {
    console.error('Erreur lors de la connexion de l\'utilisateur :', error);
    res.status(500).send('Erreur Serveur Interne');
  } finally {
    if (conn) {
      conn.release(); 
    }
  }
});

// Route delete user
app.post('/api/delete', async (req, res) => {
  const {email, lastName} = req.body;
  let conn;
  try {
    conn = await pool.getConnection();
    await pool.execute('DELETE FROM users WHERE last_name = ? AND email = ?', [lastName, email]);
    res.json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur :', error);
    res.status(500).send('Erreur Serveur Interne');
  } finally {
    if (conn) {
      conn.release(); 
    }
  }
});



app.listen(PORT, function() {
  console.log('Server running on port ' + PORT);
});
