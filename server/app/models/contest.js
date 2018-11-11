var mongoose = require('mongoose');

module.exports = mongoose.model('Contest', {
    id: Number,
    name: String,
    image: String,
    description: String
});
