const connection = require('../../../../connectionPool.cjs');


async function imageRetrieveService (req, res) {
  let conn; 
  const portfolio_id = req.body;
  conn = await connection.getConnection();
  try {
    console.log(portfolio_id + 'Part 1')
    const [upload] = await conn.execute(
      `SELECT * from artworks WHERE portfolio_id = ?`,
      [
        19, 
      ]
    ) ;
      if (upload) {
        res.json({upload});
  }
    } catch(error) {
      console.error('SQL Error:', error.sqlMessage);
      console.error('Error Code:', error.code);
      console.error('Error SQL State:', error.sqlState);
      console.error('SQL:', error.sql);
    }
}

module.exports = imageRetrieveService; 