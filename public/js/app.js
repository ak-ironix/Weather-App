console.log("Client side JS file is workning")

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector("#message-2")

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = ''
    messageTwo.textContent = ''
    const location = search.value
    messageOne.textContent = 'Loading...'
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast.forecast + ' and feelslike ' + data.forecast.feelslike + ' degrees celsius'
            }
        })
    })
})