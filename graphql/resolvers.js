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

  // Creates diagnosis and saves it in Database
  createDiagnosis: async ({ diagnosis, type, overview, symptoms, treatments, specialists, contagiousMethod }) => {
    const { collection } = await mainConnect();
    const result = await collection.insertOne({ diagnosis, type, overview, symptoms, treatments, specialists, contagiousMethod });
    return { id: result.insertedId, result };
  },

  // Updates an existing diagnosis in the database
  updateDiagnosis: async ({ id, diagnosis, type, overview, symptoms, treatments, specialists, contagiousMethod }) => {
    const { collection } = await mainConnect();
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          diagnosis,
          type,
          overview,
          symptoms,
          treatments,
          specialists,
          contagiousMethod
        }
      }
    );
    return result.modifiedCount > 0 ? { id, success: true } : { id, success: false };
  },

  // Deletes a diagnosis from the database
  deleteDiagnosis: async ({ id }) => {
    const { collection } = await mainConnect();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0 ? { id, success: true } : { id, success: false };
  },

  // Creates user and saves it in Database
  createUser: async ({ username, email, googleId }) => {
    const { userfile } = await mainConnect();
    const result = await userfile.insertOne({ username, email, googleId });
    return { id: result.insertedId, username, email };
  },

  // Find a user using the email
  getUser: async ({ email }) => {
    const { userfile } = await mainConnect();
    const result = await userfile.findOne({ email: email });
    return result;
  },

  // Find a user using the ID
  getUserById: async ({ id }) => {
    const { userfile } = await mainConnect();
    const result = await userfile.findOne({ _id: new ObjectId(id) });
    return result;
  }
};

module.exports = resolvers;
