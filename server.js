const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const mongoose = require('mongoose')
const QuestionModel = require('./models/question')

mongoose.connect('mongodb+srv://admin:web42fullstack@cluster0.afowa.mongodb.net/quyetde?retryWrites=true&w=majority', (err) => {
    if (err) throw err
    console.log('mongodb success');
});


app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    const pathFile = path.resolve(__dirname, './client/home.html')
    res.sendFile(pathFile)
})
app.get('/ask', (req, res) => {
    const pathFile = path.resolve(__dirname, './client/create-question.html')
    res.sendFile(pathFile)
})
app.get('/question/:questionId', (req, res) => {
    const pathFile = path.resolve(__dirname, './client/question.html')
    res.sendFile(pathFile)
})

app.get('/random-question', async (req, res) => {
    const query = {
        state: 'OK',
        rnd: {
            $gte: Math.random()
        }
    };
    const randomQuestion = await QuestionModel.findOne(query)
    res.send(randomQuestion)
})

app.get('*', (req, res) => {
    res.send('404 not found')
})

app.post('/create-question', async (req, res) => {
    const { content } = req.body
    const newQuestionData = {
        content,
        yesCount: 0,
        noCount: 0
    }
    const newQuestion = await QuestionModel.create(newQuestionData)
    res.send({
        success: 1, data: {
            ...newQuestion,
            id: newQuestion._id
        }
    })
})
app.post('/question', async (req, res) => {
    const { questionId, upVote, downVote } = req.body
    const foundQuestion = await QuestionModel.findById(questionId)
    if (!foundQuestion) {
        return res.send({ success: 0 })
    } else {
        if (upVote) {
            foundQuestion.yesCount++
            await QuestionModel.updateOne({ _id: questionId }, foundQuestion, () => res.send(foundQuestion))
        } else if (downVote) {
            foundQuestion.noCount++
            QuestionModel.findByIdAndUpdate(questionId, foundQuestion, () => res.send(foundQuestion))
        } else return res.send(foundQuestion)
    }
})

app.listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;
})
