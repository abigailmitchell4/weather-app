console.log('hello! Client side js file loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const m1 = document.querySelector('#m1')
const m2 = document.querySelector('#m2')


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const location = search.value

  m1.textContent = 'Loading...'
  m2.textContent = ''

  fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
  res.json().then((data) => {
    if (data.err) {
      console.log(data.err)
      m1.textContent = data.err
    } else {
      m1.textContent = data.location
      m2.textContent = data.forecast
      
      console.log(data.location)
      console.log(data.forecast)
    }
  })
})

})
