const connection = require('../../../../connectionPool.cjs');


async function userCreate (req, res) {
    let conn; 
    const newUser = req.body;
    try {
    conn = await connection.getConnection();
    const [userExist] = await conn.execute('SELECT * FROM users WHERE email = ?', [newUser.email]);
    if(userExist.length === 0 ) {
      const [result] = await conn.execute(
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
    } else {
      res.status(409).send('Internal Server Error');
    }
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send('Internal Server Error');
    } finally {
      if(conn) {
        conn.release();
      }
    }
  };

module.exports = userCreate; 
  