const { string } = require("joi");
const mongoose = require("mongoose");


const blogschema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    snipet: {
        type: String,
        required: true
    }

},  {timestamps: true} );

const Blog = mongoose.model('Blog', blogschema);
module.exports = Blog;
