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

getGoals: (req, res) => res.status(200).send(goals),
    deleteGoals: (req, res) => {
        let index = goals.findIndex(elem => elem.id === +req.params.id)
        goals.splice(index, 1)
        res.status(200).send(goals)
    },
    createGoals: (req, res) => {
        let { goal, timeframe, textBox, imageURL } = req.body
        let newGoals = {
            goal,
            timeframe,
            imageURL,
            textBox
        }
       
        res.status(200).send(goal)
    },
    updateGoals: (req, res) => {
        let { id } = req.params
        let { type } = req.body
        let index = goals.findIndex(elem => +elem.id === +id)

        if (goals[index].days === 365 && type === 'plus') {
            res.status(400).send('cannot go above 365')
        } else if (goals[index].days === 0 && type === 'minus') {
            res.status(400).send('cannot go below 0')
        } else if (type === 'plus') {
            goals[index].days++
            res.status(200).send(goals)
        } else if (type === 'minus') {
            goals[index].days--
            res.status(200).send(goals)
        } else {
            res.sendStatus(400)
        }
    }
}