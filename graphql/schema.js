const { buildSchema } = require('graphql');

const schema = buildSchema(`
   type Diagnosis {
    id: ID!
    diagnosis: String!
    type: String!
    overview: String
    symptoms: [String]
    treatments: [String]
    specialists: [String]
    contagiousMethod: String
  }

  type User {
    id: ID!
    username: String!
    email: String!
    googleId: String
  }

  type Query {
    getDiagnosisById(id: ID!): Diagnosis
    getAllDiagnosis: [Diagnosis]
    getUser(email: String!): User
    getUserById(id: ID!): User
  }

  type Mutation {
    createDiagnosis(
      diagnosis: String!,
      type: String!,
      overview: String,
      symptoms: [String],
      treatments: [String],
      specialists: [String],
      contagiousMethod: String
    ): Diagnosis

    updateDiagnosis(
      id: ID!,
      diagnosis: String,
      type: String,
      overview: String,
      symptoms: [String],
      treatments: [String],
      specialists: [String],
      contagiousMethod: String
    ): UpdateResponse

    deleteDiagnosis(id: ID!): DeleteResponse

    createUser(username: String!, email: String!, googleId: String!): User
  }

  type UpdateResponse {
    id: ID!
    success: Boolean!
  }

  type DeleteResponse {
    id: ID!
    success: Boolean!
  }
`);

module.exports = schema;
