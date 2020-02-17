const Joi = require('joi');
const db = require('./connection');
 
const schema = Joi.object().keys({
    opp_id: Joi.number().required()
});
 
const logs = db.get('logs');
 
function getAll() {
    return logs.find();
}
 
function create(log) {
    const result = Joi.validate(log, schema);
    if (result.error == null) {
        log.created = new Date();
        return logs.insert(log);
    } else {
        return Promise.reject(result.error);
    }
}
function remove(id){
    return logs.remove({ _id: id})
}

module.exports = {
    create,remove,
    getAll
};