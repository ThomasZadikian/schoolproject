const connection = require('../../../../connectionPool.cjs');

  // Route delete user
  async function userDelete (req, res) {
    const {email, lastName} = req.body;
    let conn;
    try {
      conn = await connection.getConnection();
      await conn.query('DELETE FROM users WHERE last_name = ? AND email = ?', [lastName, email]);
      res.json({ message: 'Utilisateur supprimé avec succès' });
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur :', error);
      res.status(500).send('Erreur Serveur Interne');
    } finally {
      if (conn) {
        conn.release(); 
      }
    }
  };

  module.exports = userDelete; 