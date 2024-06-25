const {
    customError,
} = require('../exception/business-exceptions');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUsersDetail, updateUser, createUser, getChecklistQuery, postChecklistQuery, deleteChecklistQuery, getChecklistItemQuery, postChecklistItemQuery, getChecklistItemIdQuery, deleteChecklistItemIdQuery, putChecklistItemIdQuery, renameChecklistItemIdQuery } = require('../query/master-user');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(gConfig.database, gConfig.username, gConfig.password, gConfig);
const { Op } = require("sequelize");
const dd = require('dump-die');
const { exitOnError } = require('winston');

const loginService = async (username, password, fcmToken) => {
    // throw new NotFoundError("User doesn't exists!", 933);
    const user = await getUsersDetail({username: username});  
    if(user){
        const match = await bcrypt.compare(password, user.dataValues.password);                         
        if(match){                                
            let token = jwt.sign(
                {
                    id: user.dataValues.id,
                    username: user.dataValues.username,                                        
                }, `${gConfig.jwt.secret}`, { expiresIn: '1h'});  
                
            await updateUser({
                token: token
            }, user.dataValues.id).catch((error) => { throw new Error(error) });
            return {
                token: token                                    
            };
        }else{
            throw new Error("Username and Password doesn't match !");
        }
    } else {
        throw new Error("Username and Password doesn't match");
    }
};

const registerService = async(body) => {    
    const t = await sequelize.transaction();  
    try {        
        let check_user = await getUsersDetail({username: body.username});
        if(check_user) {
            throw new Error("User exists!");
        } else {
            const salt = bcrypt.genSaltSync(10);
            const passwordhashed = await bcrypt.hash(body.password, salt);
    
            let body_request = {
                username: body.username,
                password: passwordhashed,
                email: body.email
            }

            let user = await createUser(body_request, t).catch((error) => { throw new Error(error) });
            await t.commit()
            return user;   
        }
    } catch (error) {
        t.rollback()
        throw new Error(error)
    }  
}

const getChecklistService = async() => {
    let data = await getChecklistQuery().catch((error) => { throw new Error(error) });

    return data;
}

const postChecklistService = async(request_body) => {
    const t = await sequelize.transaction(); 
    try {
        let create = await postChecklistQuery(request_body, t).catch((error) => { throw new Error(error) });
        await t.commit()        
        return create        
    } catch (e) {
        await t.rollback()        
        throw e
    }
}

const deleteChecklistService = async(checklist_id) => {
    const t = await sequelize.transaction(); 
    try {
        let data = await deleteChecklistQuery({checklist_id: checklist_id}, t).catch((error) => { throw new Error(error) });
        await t.commit()        
        return data        
    } catch (e) {
        await t.rollback()        
        throw e
    }
}

const getChecklistItemService = async(checklist_id) => {
    let data = await getChecklistItemQuery({checklist_id: checklist_id}).catch((error) => { throw new Error(error) });
    
    return data;
}

const postChecklistItemService = async(request_body) => {
    const t = await sequelize.transaction(); 
    try {
        let create = await postChecklistItemQuery(request_body, t).catch((error) => { throw new Error(error) });
        await t.commit()        
        return create        
    } catch (e) {
        await t.rollback()        
        throw e
    }
}

const getChecklistItemIdService = async(checklist_id, checklist_item_id) => {
    let data = await getChecklistItemIdQuery({checklist_id: checklist_id, checklist_item_id: checklist_item_id}).catch((error) => { throw new Error(error) });
    
    return data;
}

const deleteChecklistItemIdService = async(checklist_id, checklist_item_id) => {
    const t = await sequelize.transaction(); 
    try {
        let data = await deleteChecklistItemIdQuery({checklist_id: checklist_id, checklist_item_id: checklist_item_id}, t).catch((error) => { throw new Error(error) });
        await t.commit()        
        return data        
    } catch (e) {
        await t.rollback()        
        throw e
    }
}

const putChecklistItemIdService = async(checklist_id, checklist_item_id) => {    
    const t = await sequelize.transaction(); 
    try {
        let data = await putChecklistItemIdQuery({status_checked: 1}, {checklist_id: checklist_id, checklist_item_id: checklist_item_id}, t).catch((error) => { throw new Error(error) });
        await t.commit()        
        return data        
    } catch (e) {
        await t.rollback()        
        throw e
    }
}

const renameChecklistItemIdService = async(checklist_id, checklist_item_id, item_name) => {
    const t = await sequelize.transaction(); 
    try {
        let data = await renameChecklistItemIdQuery({checklist_item_name: item_name}, {checklist_id: checklist_id, checklist_item_id: checklist_item_id}, t).catch((error) => { throw new Error(error) });
        await t.commit()        
        return data        
    } catch (e) {
        await t.rollback()        
        throw e
    }
}

module.exports = {
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
    renameChecklistItemIdService,
};