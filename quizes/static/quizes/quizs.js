console.log("quizing")
const url = window.location.href
const quizbox = document.getElementById("quiz-box")
const scorebox= document.getElementById("score-box")
const resultbox= document.getElementById("result-box")
const timerbox= document.getElementById("timerbox")
let data
const activatetimer = (time) =>{
  console.log(time)
  if (time.toString().length < 2){
    timerbox.innerHTML = `<b>0${time}:00</b>`
  }
  else{
    timerbox.innerHTML = `<b>${time}:00</b>`
  }
  let minutes=time -1
  let seconds = 60
  let displayseconds 
  let displayminutes

  const timer = setInterval(()=>{
    seconds --
    if (seconds < 0){
      seconds = 59
      minutes --
    }
    if(minutes.toString().length < 2){
      displayminutes = '0'+ minutes
    }
    else{
      displayminutes = minutes
    }
    if(seconds.toString().length < 2){
      displayseconds = '0'+ seconds
    }
    else{
      displayseconds = seconds
    }
    if(minutes== 0 & seconds==0){
      
      clearInterval(timer)
      alert("time over")
      sendata();
    }
    timerbox.innerHTML = `<b>${displayminutes}:${displayseconds}</b>`
  },1000)

}
$.ajax({
    type:'GET',
    url:`${url}data`,
    success: function(response){
      
      data = response.data
      
      data.forEach(el => {
        for (const[question,answer] of Object.entries(el)){
          quizbox.innerHTML +=`
          <hr>
          <div class="mb-2">
          <b> ${question} </b>
          </div>
          `
          answer.forEach(answer=>{
            quizbox.innerHTML +=`
            <div> 
              <input type="radio" class="ans" id ="${question}-${answer}" name="${question}" value="${answer}">
              <label for="#${question}">${answer}</label>
            </div>
            `
          })
        }
      });
      activatetimer(response.time);
      
    },
    error: function(response){
      alert("error getting data")
    }
  });


  const quizform = document.getElementById("quiz-form")
  const csrf = document.getElementsByName("csrfmiddlewaretoken")
  

  const sendata = () =>{
    const elements = [...document.getElementsByClassName("ans")]
    console.log("working")
      const data = {}
      data['csrfmiddlewaretoken'] = csrf[0].value
      elements.forEach(el=>{
        
        if(el.checked){
          data[el.name] = el.value
        }
        else{
          if(!data[el.name]){
            data[el.name]=null
          }
        }
      })
      $.ajax({
        type: 'POST',
        url: `${url}save/`,
        data:data,
        success:function(response){
          
          const results= response.result
          console.log(results)
          quizform.classList.add('not-visible')
          if (response["passed"]==true){
            scorebox.innerHTML = `congrat! you passed the test with score ${response["score"].toFixed(2)}`
          }
          else{
            scorebox.innerHTML = `ups! you failed the test with score ${response["score"].toFixed(2)}`
          }
          results.forEach(res =>{
            const resdiv = document.createElement("div")
            for (const[queston,resp] of Object.entries(res)){
              resdiv.innerHTML += queston
              const cls = ['container','p-3','text-light','h4']
              resdiv.classList.add(...cls)
              if (resp["anwsered"] == "not answered"){
                resdiv.innerHTML += `-${resp["anwsered"]} | corect anwser: ${resp["correct_answer"]} `
                resdiv.classList.add("bg-danger")
              }
              else{
                const answer= resp["anwsered"]
                const corect= resp["correct_answer"]
                if (answer==corect){
                  resdiv.innerHTML += ` answered: ${answer} `
                  resdiv.classList.add("bg-success")

                }
                else{
                  resdiv.innerHTML += ` answered: ${answer} | correct answer:${corect} `
                  resdiv.classList.add("bg-danger")
                }
              }
            }
            const body = document.getElementsByTagName('BODY')[0]
            resultbox.append(resdiv)
          })
          

        },
        error: function(response){
          alert("error getting data")
        }

      })
  }


  quizform.addEventListener('submit', e=>{
    e.preventDefault();
    sendata();

  })












