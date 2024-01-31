const config = require("./config");
const { Client } = require("pg");

const CONNECTION = {
  connectionString: config.DATABASE_URL,
};

module.exports = {
  async dbQuery(statement, ...parameters) {
    let client = new Client(CONNECTION);

    await client.connect();
    let result = await client.query(statement, parameters);
    await client.end();

    return result;
  }
};
