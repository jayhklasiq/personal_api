const resolver = require('../graphql/resolvers');

/* ****************************************
*  Deliver diagnosis form
* *************************************** */
function buildDiagnosisForm(req, res) {
  res.render('pages/dg', { title: 'Diagnosis' });
}

/* ****************************************
 *  Submit diagnosis form
 * *************************************** */
async function diagnosisFormSubmitted(req, res) {
  const { diagnosis, type, overview, symptoms, treatments, specialists, contagiousMethod } = req.body;
  try {
    console.log('adding to database...')
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
*  Deliver Update diagnosis form
* *************************************** */
async function buildUpdateDiagnosisForm(req, res) {
  const id = req.params.id;
  const diagnosis = await resolver.getDiagnosisById({ id });

  if (!diagnosis) {
    return res.status(404).json({ message: 'Cannot find Diagnosis' });
  }

  res.render('pages/updateDiagnosis', { title: 'Update Diagnosis', diagnosis });
}

/* ****************************************
 *  Submit Updated diagnosis form
 * *************************************** */
async function updatedDiagnosisFormSubmitted(req, res) {
  const id = req.params.id;
  const { diagnosis, type, overview, symptoms, treatments, specialists, contagiousMethod } = req.body;

  try {
    const result = await resolver.updateDiagnosis({
      id,
      diagnosis,
      type,
      overview,
      symptoms,
      treatments,
      specialists,
      contagiousMethod
    });

    if (result.success) {
      console.log(`${id} successfully updated in Database`);
      // res.render('pages/success', { title: 'Diagnosis Form Update Successful', result: result.id });
      res.status(200).json({ id: result.id });
    } else {
      res.status(404).json({ message: 'Cannot find Diagnosis to update' });
    }
  } catch (error) {
    console.error('Error updating diagnosis form:', error);
    res.status(500).send('Error updating diagnosis form.');
  }
}

/* ****************************************
 *  View all inputs in DB
 * *************************************** */
async function viewAllDiagnosis(req, res) {
  const allDG = await resolver.getAllDiagnosis();
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
 *  Delete a diagnosis
 * *************************************** */
async function deleteDiagnosis(req, res) {
  const id = req.params.id;

  try {
    const result = await resolver.deleteDiagnosis({ id });

    if (result.success) {
      console.log(`${id} successfully deleted from Database`);
      res.status(200).json({ message: 'Diagnosis deleted successfully' });
    } else {
      res.status(404).json({ message: 'Cannot find Diagnosis to delete' });
    }
  } catch (error) {
    console.error('Error deleting diagnosis:', error);
    res.status(500).send('Error deleting diagnosis.');
  }
}

/* ****************************************
*  Deliver Success Page
* *************************************** */
function success(req, res) {
  res.render('pages/success');
}

module.exports = {
  buildDiagnosisForm,
  diagnosisFormSubmitted,
  viewAllDiagnosis,
  viewDiagnosisById,
  buildUpdateDiagnosisForm,
  updatedDiagnosisFormSubmitted,
  deleteDiagnosis,
  success
};
