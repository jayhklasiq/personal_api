const { MongoClient } = require('mongodb');

async function mainConnect() {
  try {
    const mongoConnect = new MongoClient(process.env.DATABASE);

    await mongoConnect.connect();
    console.log('Connected to MongoDB');

    const database = mongoConnect.db('Diagnosis');
    return {
      database,
      collection: database.collection('symptoms'),
      userfile: database.collection('user')
    };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

module.exports = mainConnect;