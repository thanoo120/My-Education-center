const express = require('express');
const router = express.Router();
const {
  getStudyMaterials,
  createStudyMaterial,
  updateStudyMaterial,
  deleteStudyMaterial,
  getUniversityEntrances,
  createUniversityEntrance,
  updateUniversityEntrance,
  deleteUniversityEntrance
} = require('../controllers/contentController');

router.get('/study-materials', getStudyMaterials);
router.post('/study-materials', createStudyMaterial);
router.put('/study-materials/:id', updateStudyMaterial);
router.delete('/study-materials/:id', deleteStudyMaterial);

router.get('/entrance-details', getUniversityEntrances);
router.post('/entrance-details', createUniversityEntrance);
router.put('/entrance-details/:id', updateUniversityEntrance);
router.delete('/entrance-details/:id', deleteUniversityEntrance);

module.exports = router;
