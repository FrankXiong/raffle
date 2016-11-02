const express = require('express')
const site = require('./controller/site')
const router = express.Router()

router.get('/', site.index)
router.get('/detail', site.detail)
router.post('/', site.save)
router.post('/wx/signature', site.signature)

module.exports = router
