const connection = require('../../../../connectionPool.cjs');


async function imageUploadService (req, res) {
  let conn; 
  const artworkData = req.body;
  conn = await connection.getConnection();
  try {
    console.log(artworkData.file_data + 'Part 1')
    const [upload] = await conn.execute(
      `INSERT INTO 
        artworks (portfolio_id, title, description, media_type, file_name, file_type, file_size, file_data, creation_date, visible) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), 1)`,
      [
        artworkData.portfolio_id,
        artworkData.title,
        artworkData.description,
        artworkData.media_type,
        artworkData.file_name,
        artworkData.file_type,
        artworkData.file_size,
        artworkData.file_data 
      ]
    ) ;
      if (upload) {
        console.log(artworkData.portfolio_id)
      console.log('Artwork uploaded successfully');
  }
    } catch(error) {
      console.error('SQL Error:', error.sqlMessage);
      console.error('Error Code:', error.code);
      console.error('Error SQL State:', error.sqlState);
      console.error('SQL:', error.sql);
    }
}

module.exports = imageUploadService; 