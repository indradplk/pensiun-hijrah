require('dotenv').config();
const app = require('./app');
const { db, connectDb } = require('./config/db');
const { connectToDatabasePPIP } = require('./config/db_ppip_test');
const { connectToDatabasePPUKP } = require('./config/db_ppukp_test');
const { connectToDatabaseMDPLK } = require('./config/db_mdplk');
const { connectToDatabaseHRIS } = require('./config/db_hris');

function normalizePort(port) {
  if (typeof port === 'string') {
    return parseInt(port);
  } else if (typeof port === 'undefined') {
    return 4000;
  }

  return port;
}

(async () => {
  await connectDb();
  await connectToDatabasePPIP();
  await connectToDatabasePPUKP();
  await connectToDatabaseMDPLK();
  await connectToDatabaseHRIS();
  await db.sync({});
})();

const port = normalizePort(process.env.PORT);
app.listen(port, () => console.log(`Application running on port ${port}`));