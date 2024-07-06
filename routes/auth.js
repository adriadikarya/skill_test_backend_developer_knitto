const express = require('express');
const router = express.Router();
const {
    login,
    register,
    getChecklist,
    postChecklist,
    deleteChecklist,
    getChecklistItem,
    postChecklistItem,
    getChecklistItemId,
    putChecklistItemId,
    deleteChecklistItemId,
    renameChecklistItemId,
} = require('../auth/controller');
const {jwtMiddleware} = require('../util/middleware');

router.post('/login', login);
router.post('/register', register);
router.get('/checklist', jwtMiddleware, getChecklist)
router.post('/checklist', jwtMiddleware, postChecklist)
router.delete('/checklist/:id', jwtMiddleware, deleteChecklist)
router.get('/checklist/:checklist_id/item', jwtMiddleware, getChecklistItem)
router.post('/checklist/:checklist_id/item', jwtMiddleware, postChecklistItem)
router.get('/checklist/:id/item/:checklist_item_id', jwtMiddleware, getChecklistItemId)
router.put('/checklist/:id/item/:checklist_item_id', jwtMiddleware, putChecklistItemId)
router.delete('/checklist/:id/item/:checklist_item_id', jwtMiddleware, deleteChecklistItemId)
router.put('/checklist/:id/item/rename/:checklist_item_id', jwtMiddleware, renameChecklistItemId)

module.exports = router;