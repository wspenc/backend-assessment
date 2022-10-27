const database = []

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    getFortune: (req, res) => {
        const fortunes = ["A birght future lay ahead", "Money is what you seek", "The pursuit to happiness is one step away"];
      
        let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex];
      
        res.status(200).send(randomFortune);
    },
    ////----------
    createExercise: (req, res) => {
        const name = req.body.name
        const repCount = req.body.repCount

        let highestId = 0
        for (let i = 0; i < database.length; i++) {
            if (database[i].id > highestId) {
                highestId = database[i].id
            }
        }
        highestId++

        let newExercise = {
            name: name,
            repCount: +repCount,
            id: highestId,
        }

        database.push(newExercise)
        console.log(database)
        res.status(200).send(database)
    },
    deleteExercise: (req, res) => {
        let id = +req.params.id

        for (let i = 0; i < database.length; i++) {
            if (database[i].id === id) {
                database.splice(i, 1)
            }
        }

        res.status(200).send(database)
    },
    addRep: (req, res) => {
        let {id} = req.query
        id = +id

        for (let i = 0; i < database.length; i++) {
            if (database[i].id === id) {
                database[i].repCount += 1
            }
        }

        res.status(200).send(database)
    }
}