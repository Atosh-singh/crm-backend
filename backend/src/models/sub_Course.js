const mongoose = require('mongoose')

const subcourseSchema = new mongoose.Schema({
    removed: {
        type: Boolean,
        default: false,
    },
    enabled: {
        type: Boolean,
        default: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    courseId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    }],
    description: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
        timeseries: true,
    })

const Subcourse = mongoose.model('Subcourse', subcourseSchema)
module.exports = { Subcourse }