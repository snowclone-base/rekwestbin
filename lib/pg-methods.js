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
  }

};
