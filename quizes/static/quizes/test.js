console.log("hello")
let url = window.location.href
let visible = 3
const postsBox = document.getElementById("posts-box")
const spinnerBox = document.getElementById("spinner-box")
const loadBox = document.getElementById("load-box")
const loadBtn = document.getElementById("load-btn")

const handleEvent = () =>{
    $.ajax({
        type : 'GET',
        url : `${url}test/${visible}/`,
        success: function(response){
            const data = response.data
            data.map(post =>{
                console.log(post.id)
            })
        },
        error: function(error){
            console.log(error)
        }
    })
}

handleEvent()
loadBtn.addEventListener('click', ()=>{
    visible +=3
    handleEvent()
})