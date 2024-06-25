const Users = require('../models').User;
const HeaderChecklistModel = require('../models').HeaderChecklist;
const DetailChecklistModel = require('../models').DetailChecklist;
const dd = require('dump-die')
;
const getUsersDetail = (where, attributes, include) => {    
    if (attributes === undefined) {
        attributes = {
            exclude : []
        }
    }

    return Users.findOne({
        where : where,
        attributes: attributes,
    })
    
}

const updateUser = (data, id, t) => {
    return Users.update(
        data,
        {
            where: {
                id: id
            }, transaction: t
        }
    )
}

const createUser = (data, t) => {
    
    return Users.create(
        data,
        { transaction: t }
    );
};

const getChecklistQuery = (where, attributes, include) => {
    if (attributes === undefined) {
        attributes = {
            exclude : []
        }
    }

    return HeaderChecklistModel.findAll({        
        attributes: attributes,
    })
} 

const postChecklistQuery = (data, t) => {
    return HeaderChecklistModel.create(
        data,
        { transaction: t }
    );
}

const deleteChecklistQuery = (where, t) => {
    return HeaderChecklistModel.destroy({
        where: where
    })
}

const getChecklistItemQuery = (where, attributes, include) => {
    if (attributes === undefined) {
        attributes = {
            exclude : []
        }
    }
    
    return DetailChecklistModel.findAll({ 
        where: where,       
        attributes: attributes,
    })
} 

const postChecklistItemQuery = (data, t) => {
    return DetailChecklistModel.create(
        data,
        { transaction: t }
    );
};

const getChecklistItemIdQuery = (where, attributes, include) => {    
    if (attributes === undefined) {
        attributes = {
            exclude : []
        }
    }
    
    return DetailChecklistModel.findOne({
        where : where,
        attributes: attributes,
    })
    
}

const deleteChecklistItemIdQuery = (where, t) => {
    return DetailChecklistModel.destroy({
        where: where
    })
}

const putChecklistItemIdQuery = (data, where, t) => {
    return DetailChecklistModel.update(
        data,
        {
            where: where, 
            transaction: t
        }
    )
}

const renameChecklistItemIdQuery = (data, where, t) => {
    return DetailChecklistModel.update(
        data,
        {
            where: where, 
            transaction: t
        }
    )
}

module.exports = {
    getUsersDetail,
    updateUser,
    createUser,
    getChecklistQuery,
    postChecklistQuery,
    deleteChecklistQuery,
    getChecklistItemQuery,
    postChecklistItemQuery,
    getChecklistItemIdQuery,
    deleteChecklistItemIdQuery,
    putChecklistItemIdQuery,
    renameChecklistItemIdQuery,
};
