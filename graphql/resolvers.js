const { ObjectId } = require('mongodb');
const mainConnect = require('../data/connect');

const resolvers = {
  // Find a diagnosis using the ID
  getDiagnosisById: async ({ id }) => {
    const { collection } = await mainConnect();
    const result = await collection.findOne({ _id: new ObjectId(id) });
    return result;
  },

  // Find and return all diagnosis in database
  getAllDiagnosis: async () => {
    const { collection } = await mainConnect();
    return collection.find({}).toArray();
  },

  //creates diagnosis and saves it in Database
  createDiagnosis: async ({ diagnosis, type, overview, symptoms, treatments, specialists, contagiousMethod }) => {
    const { collection } = await mainConnect();
    const result = await collection.insertOne({ diagnosis, type, overview, symptoms, treatments, specialists, contagiousMethod });
    return { id: result.insertedId, result };
  }
};

module.exports = resolvers