const object = require('./object');

const audioSchema = new object.mongoose.Schema({
    title: {
        type: String,
        required: true
    }, artist: {
        type: String,
        required: true
    }, url: {
        type: String,
        required: true
    }, image: {
        type: String,
        required: true
    }
});

module.exports = object.connection.model("audio", audioSchema);