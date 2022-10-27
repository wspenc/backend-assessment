
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


const exerciseForm = document.getElementById("exercise-form")
const exerciseNameInput = document.getElementById("exercise-name-input")
const repCountInput = document.getElementById("exercise-input")
const deletionForm = document.getElementById("delete-form")
const deleteIdInput = document.getElementById("delete-exercise-input")
const counterForm = document.getElementById("counter-form")
const counterInput = document.getElementById("counter-input")
const resultsSection = document.getElementById("results-section")

const createExercise = (event) => {
    event.preventDefault()

    eraseResultsSection()

    const myBody = {
        name: exerciseNameInput.value,
        repCount: repCountInput.value,
    }

    exerciseNameInput.value = ''
    repCountInput.value = ''

    axios.post("http://localhost:4000/api/create/", myBody)
    .then((response) => {
        let db = response.data
        for (let i = 0; i < db.length; i++) {
            displayExercise(db[i])
        }
    })
    .catch((err) => {
        console.log(err)
    })
}

function deleteExercise(event) {
    event.preventDefault()

    eraseResultsSection()

    deleteId = deleteIdInput.value

    axios.delete("http://localhost:4000/api/delete/" + deleteId)
    .then((response) => {
        let db = response.data
        for (let i = 0; i < db.length; i++) {
            displayExercise(db[i])
        }
    })
    .catch((err) => {
        console.log(err)
    })

    deleteIdInput.value = ''
}

function addRep(event) {
    event.preventDefault()

    eraseResultsSection()

    counter = counterInput.value

    axios.put("http://localhost:4000/api/add/?id=" + counter)
    .then((response) => {
        let db = response.data
        for (let i = 0; i < db.length; i++) {
            displayExercise(db[i])
        }
    })
    .catch((err) => {
        console.log(err)
    })
}

function displayExercise(exercise) {
    let container = document.createElement('div')
    let nameEl = document.createElement('li')
    let repCountEl = document.createElement('li')
    let idEl = document.createElement('li')

    nameEl.innerHTML = 'Exercise: ' + exercise.name
    repCountEl.innerHTML = 'Rep: ' + exercise.repCount
    idEl.innerHTML = 'ID Number: ' + exercise.id

    container.appendChild(nameEl)
    container.appendChild(repCountEl)
    container.appendChild(idEl)

    container.classList.add('exercise-container')

    resultsSection.appendChild(container)
}

function eraseResultsSection() {
    resultsSection.innerHTML = ''
}


exerciseForm.addEventListener('submit', createExercise)
deletionForm.addEventListener('submit', deleteExercise)
counterForm.addEventListener('submit', addRep)