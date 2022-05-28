const express = require("express")
const router = express.Router()


router.route('/').post(protect, accessChat)
router.route('/').get(protect, fetchChats)
router.route('/group').post(protect, createGroupChat)
router.route('./rename').put(protect, renameGroup)
router.route('./groupRemove').put(protect, removeGroup)
router.route('./groupAdd').put(protect, groupAdd)