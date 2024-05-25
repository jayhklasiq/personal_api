const express = require('express');
const router = express.Router();
const controller = require('../controllers/appController');

/**
 * @swagger
 * /:
 *   get:
 *     summary: Home page
 *     description: Returns the home page.
 *     responses:
 *       200:
 *         description: Home page content.
 */
router.get('/', (req, res) => {
  res.send('Home Page');
});

/**
 * @swagger
 * /dg:
 *   get:
 *     summary: Build diagnosis form
 *     description: Renders the diagnosis form.
 *     responses:
 *       200:
 *         description: Diagnosis form page.
 */
router.get('/dg', controller.buildDiagnosisForm);

/**
 * @swagger
 * /dg:
 *   post:
 *     summary: Submit diagnosis form
 *     description: Submits the diagnosis form and saves data to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               diagnosis:
 *                 type: string
 *                 example: Example Diagnosis
 *               type:
 *                 type: string
 *                 example: Virus
 *               overview:
 *                 type: string
 *                 example: Overview of the diagnosis
 *               symptoms:
 *                 type: string
 *                 example: Symptoms of the diagnosis
 *               treatments:
 *                 type: string
 *                 example: Treatments for the diagnosis
 *               specialists:
 *                 type: string
 *                 example: Specialists for the diagnosis
 *               contagiousMethod:
 *                 type: string
 *                 example: Airborne
 *     responses:
 *       200:
 *         description: Form submitted successfully.
 *       500:
 *         description: Error submitting form.
 */
router.post('/dg', controller.diagnosisFormSubmitted);

/**
 * @swagger
 * /dg/{id}:
 *   put:
 *     summary: Update a diagnosis
 *     description: Updates a diagnosis by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The diagnosis ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               diagnosis:
 *                 type: string
 *               type:
 *                 type: string
 *               overview:
 *                 type: string
 *               symptoms:
 *                 type: string
 *               treatments:
 *                 type: string
 *               specialists:
 *                 type: string
 *               contagiousMethod:
 *                 type: string
 *     responses:
 *       200:
 *         description: Diagnosis updated successfully.
 *       404:
 *         description: Diagnosis not found.
 *       500:
 *         description: Error updating diagnosis.
 */
router.put('/dg/:id', (req, res) => {
  res.status(501).send('Not Implemented');
});

/**
 * @swagger
 * /dg/{id}:
 *   delete:
 *     summary: Delete a diagnosis
 *     description: Deletes a diagnosis by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The diagnosis ID.
 *     responses:
 *       200:
 *         description: Diagnosis deleted successfully.
 *       404:
 *         description: Diagnosis not found.
 *       500:
 *         description: Error deleting diagnosis.
 */
router.delete('/dg/:id', (req, res) => {
  res.status(501).send('Not Implemented');
});

/**
 * @swagger
 * /getalldg:
 *   get:
 *     summary: View all diagnoses
 *     description: Returns all diagnoses in the database.
 *     responses:
 *       200:
 *         description: A list of diagnoses.
 */
router.get('/getalldg', controller.viewAllDiagnosis);

/**
 * @swagger
 * /dg/{id}:
 *   get:
 *     summary: View diagnosis by ID
 *     description: Returns a diagnosis by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The diagnosis ID.
 *     responses:
 *       200:
 *         description: Diagnosis found.
 *       404:
 *         description: Diagnosis not found.
 */
router.get('/dg/:id', controller.viewDiagnosisById);

/**
 * @swagger
 * /success:
 *   get:
 *     summary: Submission success page
 *     description: Returns the submission success page.
 *     responses:
 *       200:
 *         description: Submission success page.
 */
router.get('/success', controller.submissionSuccess);

// Export the router
module.exports = router;
