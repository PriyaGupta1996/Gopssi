const express = require("express")
const router = express.Router()
const protect = require("../middleware/authMiddleware")
const { accessChat, fetchAllChats, createGroupChat, renameGroup, groupAdd, groupRemove } = require("../controllers/chatControllers")


router.route('/').post(protect, accessChat)
router.route('/').get(protect, fetchAllChats)
router.route('/group').post(protect, createGroupChat)
router.route('/rename').put(protect, renameGroup)
router.route('/groupRemove').put(protect, groupRemove)
router.route('/groupAdd').put(protect, groupAdd)

module.exports = router 