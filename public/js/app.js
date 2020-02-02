console.log('LOADED !!!!!!')



const weatherform = document.querySelector('form')

const searchElement = document.querySelector("input")


weatherform.addEventListener('submit',(e)=> {
    e.preventDefault()
    const location = searchElement.value

    const MessageOne = document.querySelector("#message-1")
    const MessageTwo = document.querySelector("#message-2")

    MessageOne.textContent = 'Loading.....'

    fetch('/weather?address=' + location).then((response)=>{

    response.json().then((data)=>{

        if(data.error){

            MessageOne.textContent = data.error
        }
        else{
            MessageOne.textContent = 'Location :'+ data.location
            MessageTwo.textContent = data.forecast
        }
        
    })

})



    
    console.log('Testing')
    console.log(location)
})