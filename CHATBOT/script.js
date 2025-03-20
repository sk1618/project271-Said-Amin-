const API_KEY = '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';

const content = document.getElementById('content');
const ChatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');

let isAnswerLoading = false;
let answerSectionId = 0;

sendButton.addEventListener('click', ()=>handleSendMessage());
chatInput.addEventListener('keypress', event =>{
    if(event.key ==='Enter'){
        handleSendMessage();
    }
})

function handleSendMessage(){
    const question = chatInput.value.trim();

    if(question ==='' || isAnswerLoading) return;

    sendButton.classList.add('send-button-nonactive');

    addQuestionSection(question);
    chatInput.value = '';
}

function getAnswer(question){
    const fetchData =
    fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
        "model": "deepseek/deepseek-r1-distill-llama-70b:free",
        "messages": [
            {
            "role": "user",
            "content": question
            }
        ]
        })
    });
    fetchData.then(response=>response.json())
    .then(data=> {
        const resultData = data.choices[0].message.content;
        isAnswerLoading = false;
        addAnswerSection(resultData);
    }).finally(() => {
        scrollToBottom();
        sendButton.classList.remove('send-button-nonactive');
    })
}


  function addQuestionSection(message){
    isAnswerLoading = true;
    const sectionElement = document.createElement('section');
    sectionElement.className = 'question-section';
    sectionElement.textContent =message;
    
    content.appendChild(sectionElement);
    addAnswerSection(message)
    scrollToBottom();
  }

  function addAnswerSection(message){
    if(isAnswerLoading){
        answerSectionId++;
        const sectionElement = document.createElement('section');
        sectionElement.className = 'answer-section';
        sectionElement.innerHTML =getLoadingSvg();
        sectionElement.id = answerSectionId;

        content.appendChild(sectionElement);
        getAnswer(message);
    }else{
        const answerSectionElement = document.getElementById(answerSectionId);
        answerSectionElement.textContent = message;
    }
    
  }

  function getLoadingSvg(){
    return `<svg style ="height: 30px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#007BFF" stroke="#007BFF" stroke-width="15" r="15" cx="40" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></circle><circle fill="#007BFF" stroke="#007BFF" stroke-width="15" r="15" cx="100" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></circle><circle fill="#007BFF" stroke="#007BFF" stroke-width="15" r="15" cx="160" cy="65"><animate attributeName="cy" calcMode="spline" dur="2" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></circle></svg>`
  }
  function scrollToBottom(){
    content.scrollTo({
        top: content.scrollHeight,
        behavior: 'smooth'
    });
  }
