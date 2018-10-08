const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PledgeSchema = new Schema({
    name: String,
    amount: Number
});

module.exports = mongoose.model('Pledge', PledgeSchema);
