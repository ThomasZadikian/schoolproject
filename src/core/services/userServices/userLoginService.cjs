const connection = require('../../../../connectionPool.cjs');

async function userLogin (req, res){
    let conn;
    const { email, password } = req.body;
    try {
      conn = await connection.getConnection();
      const [result] = await conn.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
      if (result.length === 0) {
        return res.status(401).json({ message: 'L\'utilisateur avec cet email n\'existe pas' });
      }
      const userObject = result[0];
      res.json(userObject);
    } catch (error) {
      console.error('Erreur lors de la connexion de l\'utilisateur :', error);
      res.status(500).send('Erreur Serveur Interne');
    }  finally {
      if(conn) {
        conn.release();
      }
    }
  };

  module.exports = userLogin; 