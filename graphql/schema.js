const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Diagnosis {
    id: ID!
    diagnosis: String!
    type: String!
    overview: String!
    symptoms: String!
    treatments: String!
    specialists: String!
    contagiousMethod: String!
  }

  type Query {
    getDiagnosis(id: ID!): Diagnosis
    getDiagnoses: [Diagnosis]
  }

  type Mutation {
    createDiagnosis(
      diagnosis: String!
      type: String!
      overview: String!
      symptoms: String!
      treatments: String!
      specialists: String!
      contagiousMethod: String!
    ): Diagnosis

    updateDiagnosis(
      id: ID!
      diagnosis: String
      type: String
      overview: String
      symptoms: String
      treatments: String
      specialists: String
      contagiousMethod: String
    ): Diagnosis

    deleteDiagnosis(id: ID!): Boolean
  }
`);

module.exports = schema;
