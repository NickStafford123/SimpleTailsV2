const Drink = require('../models/drink.model')

exports.addDrink = async (req, res) =>{
    try{
        const {name, recipe, liquor} = req.body

        if (!req.auth || !req.auth.userId){  //handles authorization to make a create request, user must be logged in
            return res.status(403).send('User not authorized')
        }

        let picture
            if (req.file){
                picture = req.file.path
            } else {
                picture = ' '  //if no picture is uploaded a empty string will be saved
            }

        const newDrink = new Drink({
            user: req.auth.userId, // changed this it was user: req.uth.userId and causing issues with adding a post (Sarah)
            name,
            recipe,
            liquor,
            picture
        })

        const savedDrink = await newDrink.save()  // creates need drink entries
        res.status(200).json(savedDrink)
        console.log(res.statusCode)
        } catch(err) {
            console.log(err)
            res.status(500).send('Server Error while creating new drink')
        }
}

exports.getAllDrinks = async (req,res) =>{   // finds all drinks that were created
    try {
        const drinks = await Drink.find({})
        res.status(200).json(drinks)
        console.log(res.statusCode)
    } catch(err){
        res.status(500).send('Server Error while getting all drinks')
    }
}

exports.getUsersDrinks = async (req,res) =>{    // finds only the drinks of a specific user
    try{
        const drinks = await Drink.find({ user: req.auth.userId })
        res.status(200).json(drinks)
        console.log(res.statusCode)
    } catch(err) {
        res.status(500).send('Server error while getting users drinks')

    }
}

exports.getDrinksById = async (req,res) =>{   //will get a drink based off its id 
    try {
        const drink = await Drink.findById(req.params.id)
                                .populate('user', 'fullname -_id')
        if (!drink) {
            return res.status(404).send('Drink not found')
        }
        res.status(200).json(drink)
        console.log(res.statusCode)
    } catch(err){
        res.status(500).send('Server error while getting drink by id')
    }
}

// updatebyid 
exports.updateDrinkById = async (req, res) =>{
    try {
        const {name, recipe, liquor, picture} = req.body

        if (!req.auth || !req.auth.userId){  //handles authorization to make a create request, user must be logged in
            return res.status(403).send('User not authorized')
        }

        let updateData = { name, recipe, liquor }

        if (req.file){
            updateData.picture = req.file.path
        }

        const updateDrink = await Drink.findByIdAndUpdate(req.params.id, updateData, { new:true })

        if (!updateDrink){ // spelling error, I fixed it. Was !updatedDrink. (Sarah)
            return res.status(404).send('Drink not found')
        }

        res.status(200).json(updateDrink)
        console.log(res.statusCode)
    } catch(err) {
        console.log(err)
        res.status(500).send('Server error while updating drink')
    }
}

exports.deleteDrinkById = async (req, res) =>{
    try{
        const drink = await Drink.findByIdAndDelete(req.params.id)
        if (!drink){
            return res.status(404).send('Drink not found')
        }
        res.status(200).json(drink)
        console.log(res.statusCode)
    } catch(err){
        res.status(500).send('Server error while deleting drink')
    }
}