const constant = require('../core/constant');

const getPagingData = (data, page, limit) => {
    const totalItem =  data.count
    const result = data.rows;
    const currentPage = page ? +page : 0;
    const rowCount = result.length;
    const totalPages = Math.ceil(totalItem / limit);
    const meta = {totalItem, totalPages, currentPage, rowCount}
    // return { meta, result };
    return { result };
};

const responseWithData = (res, data) => {
    return res.status(200).json({
        rc: constant.RC_SUCCESS,
        rm: constant.RM_SUCCESS,
        result: data
    });
};

const responseNoData = (res) => {
    return res.status(200).json({
        rc: constant.RC_SUCCESS,
        rm: constant.RM_SUCCESS,
    });
};

const responsePaginate = (res, data) => {
    return res.status(200).json({
        rc: constant.RC_SUCCESS,
        rm: constant.RM_SUCCESS,
        meta: data.meta,
        result: data.rows
    });

};

module.exports = {
    getPagingData,
    responseWithData,
    responseNoData,
    responsePaginate,
};