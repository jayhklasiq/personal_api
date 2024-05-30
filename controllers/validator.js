const { body, validationResult } = require('express-validator');

const validateDiagnosis = [
  body('diagnosis').notEmpty().withMessage('Diagnosis is required'),
  body('type').isIn(['Infection', 'Virus']).withMessage('Type must be either Infection or Virus'),
  body('overview').notEmpty().withMessage('Overview is required'),
  body('symptoms').notEmpty().withMessage('Symptoms are required'),
  body('treatments').notEmpty().withMessage('Treatments are required'),
  body('specialists').notEmpty().withMessage('Specialists are required'),
  body('contagiousMethod').notEmpty().withMessage('Contagious Method is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateDiagnosis
};
