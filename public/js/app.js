const weatherform=document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent= ''
messageTwo.textContent= ''

weatherform.addEventListener('submit',(event)=>{
    event.preventDefault()
    const location = search.value
    fetch('http://localhost:3000/weather/?address='+search.value).then((response)=>{
        response.json().then((data) => {
            if (data.error){
                messageOne.textContent=data.error
                messageTwo.textContent=''
            }
            else{
                messageOne.textContent='Location: '+data.location
                messageTwo.textContent='Forecast: '+data.forecast
            }
            
        })
    })
})