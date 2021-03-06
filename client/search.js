document.querySelector('#search-input').addEventListener('input', () => {
    const inputText = document.querySelector('#search-input').value.trim()
    if (inputText.length) {
        document.querySelector('.result').innerHTML = ''
        document.querySelector('#loading-img').style.display = 'block'
        $.ajax({
            url: "https://test1234312312.herokuapp.com/search-question",
            type: "POST",
            data: { content: inputText },
            success: (res) => {
                const searchResultsDom = res.map(question => {
                    const { content, yesCount, noCount, _id } = question
                    return `
                    <li class="list-group-item text-break" style="cursor: pointer;" onclick="location.replace('https://test1234312312.herokuapp.com/question/${_id}')">
                        ${content}
                        <span class="badge badge-danger badge-pill">${noCount}</span>
                        <span class="badge badge-primary badge-pill">${yesCount}</span>
                    </li>                     
                        
                    `
                }).join('')
                document.querySelector('#loading-img').style.display = 'none'
                document.querySelector('.result').innerHTML = searchResultsDom


            },
            error: (err) => console.log(err)
        })

    }

}) 