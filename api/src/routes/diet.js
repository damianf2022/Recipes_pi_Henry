const {Router} = require('express')
const { getAllDiets } = require('../controllers/diets');

const router = Router()

router.get("/diets", getAllDiets);

module.exports = router;