const connection = require('../../../../connectionPool.cjs');


async function imageRetrieveService (req, res) {
  let conn; 
  const portfolio_id = req.body;
  conn = await connection.getConnection();
  try {
    const [upload] = await conn.execute(
      `SELECT * from artworks WHERE portfolio_id = ?`,
      [
        19, 
      ]
    ) ;
    if (upload) {
        const imagesWithBase64 = upload.map(item => ({
          ...item,
          file_data: Buffer.from(item.file_data).toString('base64')
        }));
        res.json({ upload: imagesWithBase64 });
    } else {
        console.log('marche pas')
    }
} catch(error) {
      console.error('SQL Error:', error.sqlMessage);
      console.error('Error Code:', error.code);
      console.error('Error SQL State:', error.sqlState);
      console.error('SQL:', error.sql);
    }
}

module.exports = imageRetrieveService; 