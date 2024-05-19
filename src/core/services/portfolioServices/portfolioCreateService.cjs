const connection = require('../../../../connectionPool.cjs');


async function portfolioCreate (req, res) {
  let conn; 
  const portfolioData = req.body;
  conn = await connection.getConnection();
  try {
    const [portfolioExist] = await conn.execute('SELECT * FROM portfolios WHERE user_id = ?', [portfolioData.user_id]);
    if(portfolioExist.length === 0 ) {
      console.log(portfolioExist)
      const [result] = await conn.execute(
        `INSERT INTO portfolios (user_id, title, description, creation_date, visible )
        VALUES (?,?,?,NOW(),1)`,
        [
          portfolioData.user_id,
          portfolioData.title,
          portfolioData.description,
        ]
      );
          if(result){
            const [portfolioIDResult] = await conn.execute(
              `SELECT portfolio_id FROM portfolios WHERE user_id = ?`, [portfolioData.user_id]
            )
            const portfolio_id = portfolioIDResult[0].portfolio_id;
            await conn.execute(
              `UPDATE users SET portfolio_id = ? WHERE user_id = ? `, [portfolio_id, portfolioData.user_id]
            )
            res.json({portfolio_id});
          } 
          else {
            res.status(500).send('Imposible de mettre a jour l\'utilisateur')
          }
          } 
          else {
            res.status(409).send('User already exists')
          }
      } catch (error) {
        res.status(500).send('Internal Server Error');
      } finally {
      if(conn) {
        conn.release();
      }
    }
}

module.exports = portfolioCreate; 