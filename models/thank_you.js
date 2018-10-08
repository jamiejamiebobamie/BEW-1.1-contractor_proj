const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const ThankyouSchema = new Schema({
    title: String,
    content: String,
    pledgeId: { type: Schema.Types.ObjectId, ref: 'Pledge' }
});

module.exports = mongoose.model("Thankyou", ThankyouSchema);
