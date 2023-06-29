

const modalbtns = [...document.getElementsByClassName('modal-button')]
const modalbody =  document.getElementById('modal-body-comfirm')
const startbutton =  document.getElementById('start-button')
const url = window.location.href

modalbtns.forEach(modalbtn=> modalbtn.addEventListener('click',()=>{
    const pk = modalbtn.getAttribute('data-pk')
    const name = modalbtn.getAttribute('data-quiz')
    const numquestions = modalbtn.getAttribute('data-questions')
    const difficulty = modalbtn.getAttribute('data-difficulty')
    const scoretopass = modalbtn.getAttribute('data-pass')
    const time = modalbtn.getAttribute('data-time')
    

    modalbody.innerHTML =`
        <div class="h5 mb-3"> are you sure to start <b>${name}</b></div>
        <div class="text-muted">
            <ul>
                <li> difficulty level: ${difficulty} </li>
                <li> number squestions: ${numquestions} </li>
                <li> score to pass: ${scoretopass} </li>
                <li> time: ${time} </li>
            </ul>
        </div>
    `
    startbutton.addEventListener('click',()=>{
        window.location.href = url + pk
    })
}))


