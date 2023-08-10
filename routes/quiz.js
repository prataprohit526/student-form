const express = require("express");
const axios = require("axios");
const _ = require("lodash");
const { quizs,quizresponses } = require("../models/Quiz");
const {createQuiz,giveQuiz,viewQuizResponse,viewCreatedQuizes} = require('./authorize')
const router = express.Router();

router.get("/",async (req, res) => {
    try {
        const quizes = await quizs.find({})
        res.status(200).send(quizes)
    } catch (error) {
        console.log(error)
        res.status(500).send('Some error occured')
    }
});

router.get("/:id",async (req, res) => {
    try {
        const quizes = await quizs.findById(req.params.id)
        res.status(200).send(quizes)
    } catch (error) {
        console.log(error)
        res.status(500).send('Some error occured')
    }
});

router.post("/create",[createQuiz] ,async (req, res) => {
    try {
        const new_quiz = new quizs(req.body.values)
        await new_quiz.save()
        res.status(200).send('Quiz created')
    } catch (error) {
        console.log(error)
        res.status(500).send('Some error occured')
    }
});

router.post('/:id/submit',[giveQuiz],async(req,res)=>{
    req.body.values.quiz_id = req.params.id
    try {
        const new_response = new quizresponses(req.body.values)
        await new_response.save()
        res.status(200).send('Quiz submitted')
    } catch (error) {
        console.log(error)
        res.status(500).send('error in submitting the quiz')
    }
})

router.post('/student',[viewQuizResponse],async(req,res)=>{

    try {
        const response = await quizresponses.find({student_id:req.body.id})
        res.status(200).send(response)
    } catch (error) {
        console.log(error)
        res.status(500).send('error in fetching respose')
    }
})

router.post('/teacher',[viewCreatedQuizes],async(req,res)=>{

    try {
        const response = await quizs.find({teacher_id:req.body.id})
        res.status(200).send(response)
    } catch (error) {
        console.log(error)
        res.status(500).send('error in fetching respose')
    }
})

module.exports = {  quizRouter: router };
