const mongoose = require('mongoose')

const QuizSchema = new mongoose.Schema({
    teacher_id:{type:mongoose.Schema.Types.ObjectId,required:true},
    title:{type:String,required:true},
    duration:{type:String,required:true},
    questions:[
        {
            title:{type:String,required:true},
            type:{type:String,required:true},
            points:{type:String,required:true},
            options:[{type:String}]
        }
    ]
})

const ResponseSchema = new mongoose.Schema({
    student_id:{type:mongoose.Schema.Types.ObjectId,required:true},
    quiz_id:{type:mongoose.Schema.Types.ObjectId,required:true},
    quiz_name:{type:String,required:true},
    responses:[
        {
            question:{type:String,required:true},
            answer:{type:String,required:true},
        }
    ]
})

const quizs = mongoose.model('quiz',QuizSchema)
const quizresponses = mongoose.model('quizresponse',ResponseSchema)
module.exports = {quizs,quizresponses}