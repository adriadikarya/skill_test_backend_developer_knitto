const route = require('express').Router();
const jwt = require('jsonwebtoken');
const dd = require('dump-die');
const {
    NotFoundError,
    ForbiddenError,
    CodeError
} = require('../exception/business-exceptions');
const {
    loginService,
    registerService,
    getChecklistService,  
    postChecklistService,
    deleteChecklistService,  
    getChecklistItemService,
    postChecklistItemService,
    getChecklistItemIdService,
    deleteChecklistItemIdService,
    putChecklistItemIdService,
    renameChecklistItemIdService
} = require('../services/auth_handler');


const login = async(req, res, next) => {
    try{
        let data = await loginService(req.body.username, req.body.password);
        return res.status(200).json(data);
    }catch(e){
        if (e instanceof NotFoundError) {
            return res.status(404).json({
                message: e.message,
            });
        } else if (e instanceof ForbiddenError) {
            return res.status(403).json({            
                message: e.message
            });
        } else {
            return res.status(500).json({
                message: 'Internal Server Error! ' + e
            });
        }
    }
}

const register = async(req, res, next) => {
    try {
        let data = await registerService(req.body);
        return res.status(200).json(data);
    } catch (e) {
        if (e instanceof NotFoundError) {
            return res.status(404).json({
                message: e.message,
            });
        } else if (e instanceof ForbiddenError) {
            return res.status(403).json({            
                message: e.message
            });
        } else {
            return res.status(500).json({
                message: 'Internal Server Error! ' + e
            });
        }
    }
}

const getChecklist = async(req, res, next) => {
    try {                        
        let data = await getChecklistService().catch((error) => { throw new Error(error) });

        return res.status(200).json(data)        
    } catch (error) {
        next(error)
    }
}

const postChecklist = async(req, res, next) => {
    try {                        
        let request_body = {
            checklist_name: req.body.name 
        };
        let data = await postChecklistService(request_body).catch((error) => { throw new Error(error) });

        return res.status(200).json(data)        
    } catch (error) {
        next(error)
    }
}

const deleteChecklist = async(req, res, next) => {
    try {                        
        let checklist_id = req.params.id
        let data = await deleteChecklistService(checklist_id).catch((error) => { throw new Error(error) });

        return res.status(200).json({message: 'Delete Successfully'})        
    } catch (error) {
        next(error)
    }
}

const getChecklistItem = async(req, res, next) => {
    try {                        
        let checklist_id = req.params.checklist_id
        let data = await getChecklistItemService(checklist_id).catch((error) => { throw new Error(error) });
        
        return res.status(200).json(data)        
    } catch (error) {
        next(error)
    }
}

const postChecklistItem = async(req, res, next) => {
    try {                        
        let checklist_id = req.params.checklist_id;        
        let item_name = req.body.itemName;
        let request_body = {
            checklist_id: checklist_id,
            checklist_item_name: item_name,
            status_checked: false
        }
        let data = await postChecklistItemService(request_body).catch((error) => { throw new Error(error) });
        
        return res.status(200).json(data)        
    } catch (error) {
        next(error)
    }
}

const getChecklistItemId = async(req, res, next) => {
    try {                        
        let data = await getChecklistItemIdService(req.params.id, req.params.checklist_item_id).catch((error) => { throw new Error(error) });
        
        return res.status(200).json(data)        
    } catch (error) {
        next(error)
    }
}

const deleteChecklistItemId = async(req, res, next) => {
    try {                        
        let checklist_id = req.params.id;
        let checklist_item_id = req.params.checklist_item_id;
        let data = await deleteChecklistItemIdService(checklist_id, checklist_item_id).catch((error) => { throw new Error(error) });

        return res.status(200).json({message: 'Delete Successfully'})        
    } catch (error) {
        next(error)
    }
}

const putChecklistItemId = async(req, res, next) => {
    try {                        
        let checklist_id = req.params.id;
        let checklist_item_id = req.params.checklist_item_id;    
        let data = await putChecklistItemIdService(checklist_id, checklist_item_id).catch((error) => { throw new Error(error) });

        return res.status(200).json({message: 'Update status successfully'})        
    } catch (error) {
        next(error)
    }
}

const renameChecklistItemId = async(req, res, next) => {
    try {                        
        let checklist_id = req.params.id;
        let checklist_item_id = req.params.checklist_item_id;   
        let item_name = req.body.itemName; 
        let data = await renameChecklistItemIdService(checklist_id, checklist_item_id, item_name).catch((error) => { throw new Error(error) });

        return res.status(200).json({message: 'Rename item successfully'})        
    } catch (error) {
        next(error)
    }
}

module.exports = {
    login,
    register,
    getChecklist,
    postChecklist,
    deleteChecklist,
    getChecklistItem,
    postChecklistItem,
    getChecklistItemId,
    deleteChecklistItemId,
    putChecklistItemId,
    renameChecklistItemId
};