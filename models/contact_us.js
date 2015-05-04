var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ContactUsSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'Name can\'t be blank'
    },
    email: {
        type: String,
        default: '',
        required: 'Email can\'t be blank'
    },
    subject: {
        type: String,
        default: '',
        trim: true,
        required: 'Subject is required'
    },
    message: {
        type: String,
        default: '',
        trim: true,
        required: 'Message can\'t be blank'
    },
    created:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('ContactUs', ContactUsSchema);