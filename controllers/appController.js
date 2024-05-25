const mainConnect = require("../data/connect");
const resolver = require('../graphql/resolvers')
/* ****************************************
*  Deliver diagnosis form
* *************************************** */
function buildDiagnosisForm(req, res, next) {
  res.render(
    'pages/diagnosis',
    {
      title: 'Diagnosis'
    }
  );
}

/* ****************************************
 *  Submit diagnosis form
 * *************************************** */
async function diagnosisFormSubmitted(req, res) {
  const { diagnosis, type, overview, symptoms, treatments, specialists, contagiousMethod } = req.body;

  try {
    const { collection } = await mainConnect();
    const result = await resolver.createDiagnosis({
      diagnosis,
      type,
      overview,
      symptoms,
      treatments,
      specialists,
      contagiousMethod
    });
    console.log(`${result.id} successfully added to Database`);
    res.status(201).json({ id: result.id });
  } catch (error) {
    console.error('Error submitting diagnosis form:', error);
    res.status(500).send('Error submitting diagnosis form.');
  }
}


/* ****************************************
 *  View all inputs in DB
 * *************************************** */
async function viewAllDiagnosis(req, res) {
  const allDG = await resolver.getAllDiagnosis()
  res.json(allDG);
}

/* ****************************************
 *  View inputs in DB using ID
 * *************************************** */
async function viewDiagnosisById(req, res) {
  const id = req.params.id;
  const diagnosis = await resolver.getDiagnosisById({ id });

  if (!diagnosis) {
    return res.status(404).json({ message: 'Cannot find Diagnosis' });
  }
  res.json(diagnosis);
}


/* ****************************************
 *  Deliver Form Submission Success Page
 * *************************************** */
async function submissionSuccess(req, res) {
  const { diagnosis, type, overview, symptoms, treatments, specialists, contagiousMethod } = req.body;

  const { collection } = await mainConnect();
  const result = await resolver.createDiagnosis({
    diagnosis,
    type,
    overview,
    symptoms,
    treatments,
    specialists,
    contagiousMethod
  });

  res.render(
    'pages/success',
    {
      title: 'Diagnosis Form Submission Successful',
      result: result.id
    });
}

module.exports = {
  buildDiagnosisForm,
  diagnosisFormSubmitted, viewAllDiagnosis, submissionSuccess, viewDiagnosisById
};