let express = require('express');

let router = express.Router();
let formationController = require('./controllers/formationController');



router.get('/formation', formationController.formationList);

router.get('/formation/add/:index', formationController.formationAddToBasket);

router.get('/formation/basket', formationController.formationGoToBasket);

router.get('/formation/delete/:index', formationController.formationDeleteFromBasket);

router.post('/formation/connected', formationController.formationConnected);

router.get('/formation/finalize', formationController.formationFinalize);

router.get('/formation/connect', formationController.formationConnect);

router.get('/', function(req, res) {
	res.redirect('/formation');
});









module.exports = router;