var express = require('express');
var router = express.Router();
var {verifyUniversityToken,verifyuniversityIDToUniersityConversion} = require('../middleware/auth')
var universityController = require('../controllers/universityController.js');
var universityRankingController = require('../controllers/universityRankingController.js');
var universityImageController = require('../controllers/universityImageController.js');
var universityOverviewController = require('../controllers/universityOverviewController.js');
var universityCommissionController = require('../controllers/universityCommissionController.js');
var universityPrimaryInformationController = require('../controllers/universityPrimaryInformationController')
var universityCourseController = require('../controllers/universityCourseController.js');
var {fileUpload} = require('../middleware/fileUpload')
var universitySummaryController = require('../controllers/universitySummaryController.js');
var universityAdmissionController = require('../controllers/universityAdmissionController.js');
var universityScholarshipController = require('../controllers/universityScholarshipController.js');
var universityDocumentController = require('../controllers/universityDocumentController.js');
var universityFaqController = require('../controllers/universityFaqController.js');
var universityImageVideoController = require('../controllers/universityImageVideoController')
var universityIntakeController = require('../controllers/universityIntakeController')
/*
 * GET
 */
router.get('/:universityID/faqs/', verifyuniversityIDToUniersityConversion, universityFaqController.list);

/*
 * GET
 */
router.get('/:universityID/faqs/:id',verifyuniversityIDToUniersityConversion, universityFaqController.show);

/*
 * POST
 */
router.post('/faqs',verifyUniversityToken, universityFaqController.create);

/*
 * PUT
 */
router.put('/faqs/:id',verifyUniversityToken, universityFaqController.update);

/*
 * DELETE
 */
router.delete('/faqs/:id',verifyUniversityToken, universityFaqController.remove);

/*
 * GET
 */
router.get('/:universityID/documents', verifyuniversityIDToUniersityConversion, universityDocumentController.list);

/*
 * GET
 */
router.get('/:universityID/documents/:id',verifyuniversityIDToUniersityConversion,  universityDocumentController.show);

/*
 * POST
 */
router.post('/documents',verifyUniversityToken,fileUpload,  universityDocumentController.create);

/*
 * PUT
 */
router.put('/documents/:id',verifyUniversityToken,fileUpload,  universityDocumentController.update);

/*
 * DELETE
 */
router.delete('/documents/:id',verifyUniversityToken,  universityDocumentController.remove);

/*
 * GET
 */
router.get('/:universityID/scholarships', verifyuniversityIDToUniersityConversion, universityScholarshipController.list);

/*
 * GET
 */
router.get('/:universityID/scholarships/:id',verifyuniversityIDToUniersityConversion,  universityScholarshipController.show);

/*
 * POST
 */
router.post('/scholarships', verifyUniversityToken, universityScholarshipController.create);

/*
 * PUT
 */
router.put('/scholarships/:id', verifyUniversityToken, universityScholarshipController.update);

/*
 * DELETE
 */
router.delete('/scholarships/:id',verifyUniversityToken,  universityScholarshipController.remove);

/*
 * GET
 */
router.get('/:universityID/admissions',verifyuniversityIDToUniersityConversion,  universityAdmissionController.list);

/*
 * GET
 */
router.get('/:universityID/admissions/:id',verifyUniversityToken,  universityAdmissionController.show);

/*
 * POST
 */
router.post('/admissions',verifyUniversityToken,  universityAdmissionController.create);

/*
 * PUT
 */
router.put('/admissions/:id',verifyUniversityToken,  universityAdmissionController.update);

/*
 * DELETE
 */
router.delete('/admissions/:id',verifyUniversityToken,  universityAdmissionController.remove);

/*
 * GET
 */
router.get('/:universityID/summary', verifyuniversityIDToUniersityConversion, universitySummaryController.show);

/*
 * POST
 */
router.put('/summary', verifyUniversityToken, universitySummaryController.update);

/*
 * GET
 */
router.get('/:universityID/courses', verifyuniversityIDToUniersityConversion,universityCourseController.list);

/*
 * GET
 */
router.get('/:universityID/courses/:id', verifyuniversityIDToUniersityConversion,universityCourseController.show);

/*
 * POST
 */
router.post('/courses',verifyUniversityToken, universityCourseController.create);

/*
 * PUT
 */
router.put('/courses/:id',verifyUniversityToken, universityCourseController.update);

/*
 * DELETE
 */
router.delete('/courses/:id',verifyUniversityToken, universityCourseController.remove);


/*
 * POST
 */
router.post('/login', universityController.login)

/*
 * POST
 */
router.post('/register',universityController.register);

/*
 * POST
 */
router.post('/forgotPassword',universityController.forgotPassword)

/*
 * POST
 */
router.post('/changePassword',verifyUniversityToken, universityController.changePassword)

/**
 * GET
 */
router.get('/:universityID/primaryInformation',verifyuniversityIDToUniersityConversion,universityPrimaryInformationController.show);

/**
 * PUT
 */
router.put('/primaryInformation',verifyUniversityToken,fileUpload,universityPrimaryInformationController.update);

/**
 * GET
*/
router.get('/:universityID/overview',verifyuniversityIDToUniersityConversion,universityOverviewController.show);

/**
  * PUT
  */
router.put('/overview',verifyUniversityToken,universityOverviewController.update);
 
/**
 * GET
*/
router.get('/:universityID/image',verifyuniversityIDToUniersityConversion,universityImageController.show);

/**
  * PUT
  */
router.put('/image',verifyUniversityToken,fileUpload,universityImageController.update);
 
 

router.get('/:universityID/faqs/', verifyuniversityIDToUniersityConversion, universityFaqController.list);

/*
 * GET
 */
router.get('/:universityID/commissions/:id',verifyuniversityIDToUniersityConversion, universityCommissionController.show);

router.get('/:universityID/commissions/',verifyuniversityIDToUniersityConversion, universityCommissionController.list);

/*
 * POST
 */
router.post('/commissions',verifyUniversityToken, universityCommissionController.create);

/*
 * PUT
 */
router.put('/commissions/:id',verifyUniversityToken, universityCommissionController.update);

/*
 * DELETE
 */
router.delete('/commissions/:id',verifyUniversityToken, universityCommissionController.remove);
 

/*
 * GET
 */
router.get('/:universityID/rankings/:id',verifyuniversityIDToUniersityConversion, universityRankingController.show);

router.get('/:universityID/rankings/',verifyuniversityIDToUniersityConversion, universityRankingController.list);


/*
 * POST
 */
router.post('/rankings',verifyUniversityToken, fileUpload,universityRankingController.create);

/*
 * PUT
 */
router.put('/rankings/:id',verifyUniversityToken,fileUpload, universityRankingController.update);

/*
 * DELETE
 */
router.delete('/rankings/:id',verifyUniversityToken, universityRankingController.remove);
 

/*
 * GET
 */
router.get('/:universityID/imageVideos/:id',verifyuniversityIDToUniersityConversion, universityImageVideoController.show);

router.get('/:universityID/imageVideos/',verifyuniversityIDToUniersityConversion, universityImageVideoController.list);


/*
 * POST
 */
router.post('/imageVideos',verifyUniversityToken, fileUpload,universityImageVideoController.create);

/*
 * PUT
 */
router.put('/imageVideos/:id',verifyUniversityToken, fileUpload,universityImageVideoController.update);

/*
 * DELETE
 */
router.delete('/imageVideos/:id',verifyUniversityToken, universityImageVideoController.remove);

router.get('/:universityID/intakes/:id',verifyuniversityIDToUniersityConversion, universityIntakeController.show);

router.get('/:universityID/intakes/',verifyuniversityIDToUniersityConversion, universityIntakeController.list);


/*
 * POST
 */
router.post('/intakes',verifyUniversityToken,universityIntakeController.create);

/*
 * PUT
 */
router.put('/intakes/:id',verifyUniversityToken,universityIntakeController.update);

/*
 * DELETE
 */
router.delete('/intakes/:id',verifyUniversityToken, universityIntakeController.remove);
module.exports = router;
