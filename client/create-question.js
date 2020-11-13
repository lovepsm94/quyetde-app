const form = document.querySelector('.form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const content = form.textArea.value.trim();
    if (content) {
        $.ajax({
            url: 'https://test1234312312.herokuapp.com/create-question',
            type: 'POST',
            data: { content },
            success: (res) => {
                location.replace(`https://test1234312312.herokuapp.com/question/${res.data.id}`)
            },
            error: (err) => console.log(err)
        })
    }


});
const showTextArealength = () => {
    document.querySelector('#textarea-length').innerHTML = form.textArea.value.length + '/200';
}
 