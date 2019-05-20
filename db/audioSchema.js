const mongoosastic = require('mongoosastic');
const object = require('./object');

const audioSchema = new object.mongoose.Schema({
    title: {
        type: String,
        required: true,
        es_indexed:true
    }, artist: {
        type: String,
        required: true,
        es_indexed:true
    }, url: {
        type: String,
        required: true
    }, image: {
        type: String,
        required: true
    }
});

audioSchema.plugin(mongoosastic);

module.exports = object.connection.model("audio", audioSchema);