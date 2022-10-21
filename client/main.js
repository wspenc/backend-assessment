const complimentBtn = document.getElementById("complimentButton")

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

complimentBtn.addEventListener('click', getCompliment)

const fortuneBtn = document.getElementById("fortuneButton")

const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

fortuneBtn.addEventListener('click', getFortune)


const goalsContainer = document.querySelector('#goals-container')
const form = document.querySelector('form')

const goalsCallback = ({ data: goals }) => displayGoals(goals)
const errCallback = err => console.log(err.response.data)
const baseURL = "http://localhost:4000/api/goals"
const getGoals = () => axios.get(baseURL).then(goalsCallback).catch(errCallback)
const createGoal = body => axios.post(baseURL, body).then(goalsCallback).catch(errCallback)
const deleteGoal = id => axios.delete(`${baseURL}/${id}`).then(goalsCallback).catch(errCallback)
const updateGoal = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(goalsCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let goal = document.querySelector('#goal')
    let timeframe = document.querySelector('#timeframe')
    let imageURL = document.querySelector('#img')
    let textBox = document.querySelector("#textbox")

    let bodyObj = {
        goal: goal.value,
        timeframe: timeframe.value, 
        imageURL: imageURL.value,
        textBox: textBox.value,
    }

    createGoal(bodyObj)

    goal.value = ''
    timeframe.checked = false
    imageURL.value = ''
    textBox.value = ''
}

function createGoalSection(goal) {
    const goalSection = document.createElement('div')
    goalSection.classList.add('goal-section')

    goalSection.innerHTML = `<img alt='quote' src=${goal.imageURL} class="quote-image"/>
    <p class="goal-title">${goal.title}</p>
    <div class="btns-container">
        <button onclick="updateGoal(${goal.id}, 'minus')">-</button>
        <p class="goal-time">${goal.timeframe} days</p>
        <button onclick="updateGoal(${goal.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteGoal(${goal.id})">delete</button>
    `


    goalsContainer.appendChild(goalSection)
}

function displayGoals(arr) {
    goalsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createGoalSection(arr[i])
    }
}

form.addEventListener('submit', submitHandler)
