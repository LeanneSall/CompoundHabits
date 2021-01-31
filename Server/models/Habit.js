const mongoose = require('mongoose');

const HabitSchema = new mongoose.Schema({

    habitname: {
        type: String,
        required: true
    },
    leadin: {
        type: String,
    },
    category: {
        type: String,
    },
    prize: {
        type: String
    }

})

module.exports = Habit = mongoose.model('habit', HabitSchema);