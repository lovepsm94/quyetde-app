let questionId = undefined
document.querySelector('.result-btn').disabled = true
function renderPage() {
    $.ajax({
        url: "https://test1234312312.herokuapp.com/random-question",
        type: "GET",
        success: (res) => {
            $('#content').text(`${res.content}`)
            questionId = res._id
            document.querySelector('.result-btn').disabled = false
        },
        error: (err) => console.log(err)
    })
}
renderPage()
document.querySelector('.result-btn').addEventListener('click',() => {
    location.replace(`https://test1234312312.herokuapp.com/question/${questionId}`)
})
document.querySelector('.next-question-btn').addEventListener('click',() => {
    renderPage()
})
function upVote() {
    $.ajax({
        url: "https://test1234312312.herokuapp.com/question",
        type: "POST",
        data: { questionId, upVote: 1 },
        success: (res) => {
            location.replace(`https://test1234312312.herokuapp.com/question/${questionId}`)
        },
        error: (err) => console.log(err)
    })
}
function downVote() {
    $.ajax({
        url: "https://test1234312312.herokuapp.com/question",
        type: "POST",
        data: { questionId, downVote: 1 },
        success: (res) => {
            location.replace(`https://test1234312312.herokuapp.com/question/${questionId}`)
        },
        error: (err) => console.log(err)
    })
}

