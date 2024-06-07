const createError = require('http-errors');
const resolver = require('../graphql/resolvers');

/* ****************************************
*  Deliver diagnosis form
* *************************************** */
function buildDiagnosisForm(req, res, next) {
  try {
    res.render('pages/dg', { title: 'Diagnosis' });
  } catch (error) {
    next(createError(500, 'Error rendering diagnosis form'));
  }
}

/* ****************************************
 *  Submit diagnosis form
 * *************************************** */
async function diagnosisFormSubmitted(req, res, next) {
  const { diagnosis, type, overview, symptoms, treatments, specialists, contagiousMethod } = req.body;
  try {
    console.log('adding to database...');
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
    next(createError(500, 'Error submitting diagnosis form'));
  }
}

/* ****************************************
*  Deliver Update diagnosis form
* *************************************** */
async function buildUpdateDiagnosisForm(req, res, next) {
  const id = req.params.id;
  try {
    const diagnosis = await resolver.getDiagnosisById({ id });
    if (!diagnosis) {
      return next(createError(404, 'Cannot find Diagnosis'));
    }
    res.render('pages/updateDiagnosis', { title: 'Update Diagnosis', diagnosis });
  } catch (error) {
    next(createError(500, 'Error rendering update diagnosis form'));
  }
}

/* ****************************************
 *  Submit Updated diagnosis form
 * *************************************** */
async function updatedDiagnosisFormSubmitted(req, res, next) {
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
      res.status(200).json({ id: result.id });
    } else {
      next(createError(404, 'Cannot find Diagnosis to update'));
    }
  } catch (error) {
    console.error('Error updating diagnosis form:', error);
    next(createError(500, 'Error updating diagnosis form'));
  }
}

/* ****************************************
 *  View all inputs in DB
 * *************************************** */
async function viewAllDiagnosis(req, res, next) {
  try {
    const allDG = await resolver.getAllDiagnosis();
    res.json(allDG);
  } catch (error) {
    next(createError(500, 'Error fetching all diagnoses'));
  }
}

/* ****************************************
 *  View inputs in DB using ID
 * *************************************** */
async function viewDiagnosisById(req, res, next) {
  const id = req.params.id;
  try {
    const diagnosis = await resolver.getDiagnosisById({ id });
    if (!diagnosis) {
      return next(createError(404, 'Cannot find Diagnosis'));
    }
    res.json(diagnosis);
  } catch (error) {
    next(createError(500, 'Error fetching diagnosis by ID'));
  }
}

/* ****************************************
 *  Delete a diagnosis
 * *************************************** */
async function deleteDiagnosis(req, res, next) {
  const id = req.params.id;
  try {
    const result = await resolver.deleteDiagnosis({ id });
    if (result.success) {
      console.log(`${id} successfully deleted from Database`);
      res.status(200).json({ message: 'Diagnosis deleted successfully' });
    } else {
      next(createError(404, 'Cannot find Diagnosis to delete'));
    }
  } catch (error) {
    console.error('Error deleting diagnosis:', error);
    next(createError(500, 'Error deleting diagnosis'));
  }
}

/* ****************************************
*  Deliver Success Page
* *************************************** */
function success(req, res, next) {
  try {
    res.render('pages/success');
  } catch (error) {
    next(createError(500, 'Error rendering success page'));
  }
}

/* ****************************************
*  Deliver Login Page
* *************************************** */
function loadLoginpage(req, res, next) {
  try {
    res.render('pages/login', { title: 'Login' });
  } catch {
    next(createError(500, 'Error rendering login page'));
  }
}

/* ****************************************
*  Deliver Login Page
* *************************************** */
const loadRegisterPage = (req, res) => {
  try {
    res.render('pages/register', { title: 'Register' });
  } catch {
    next(createError(500, 'Error rendering register page.'))
  }
};

module.exports = {
  buildDiagnosisForm,
  diagnosisFormSubmitted,
  viewAllDiagnosis,
  viewDiagnosisById,
  buildUpdateDiagnosisForm,
  updatedDiagnosisFormSubmitted,
  deleteDiagnosis,
  success,
  loadLoginpage,
  loadRegisterPage
};
