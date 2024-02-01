const { dbQuery } = require("./db-query");

module.exports = {
  async insertBin(id, binPath, createdAt) {
    const CREATE_BIN = "INSERT INTO bins (id, bin_path, created_at)" +
                            "  VALUES ($1, $2, $3)";
    try {
      let result = await dbQuery(CREATE_BIN, id, binPath, createdAt);
      return result.rowCount > 0;
    } catch (error) {
      throw error;
    }
  },

  async insertRequest(id, bin_id, mongo_id, received_at, http_method, http_path) {
    const CREATE_REQUEST = "INSERT INTO requests (id, bin_id, mongo_id, received_at, http_method, http_path)" + 
                           "VALUES ($1, $2, $3, $4, $5, $6)";
    try {
      let result = await dbQuery(CREATE_REQUEST, id, bin_id, mongo_id, received_at, http_method, http_path);
      return result.rowCount > 0;
    } catch (error) {
      throw error;
    }
  },

  async getBinId(binPath) {
    const SELECT_BIN = "SELECT id" +
                            "  FROM bins" + 
                            "  WHERE bin_path = ($1)";
    try {
      let result = await dbQuery(SELECT_BIN, binPath);
      return result.rows[0].id;
    } catch (error) {
      throw error;
    }
  },
};