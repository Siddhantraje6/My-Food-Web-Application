const mongoose = require("mongoose");
const uri = "your uri"

//declaring the function connectMongoDB
const connectMongoDB = async() => {
    await mongoose.connect(uri).then(() => {
            console.log('Connected to the database!!');
            //defining the schema
            const schema = new mongoose.Schema({}, {strict:false}); //we have flexible schema which is not strict

            //creating the model
            const foodItems = mongoose.model('food_items', schema, 'food_items');

            //fetching the data
            foodItems.find({}).then(data =>{
                const foodCategory = mongoose.model("food_category", schema, "food_category");
                foodCategory.find({}).then(data2 => {
                    console.log("success fetching the data from the database");
                    global.food_items = data;
                    global.food_category = data2;
                })
                .catch(err => {
                    console.log(err);
                })
            })
            .catch(err => {
                console.log(err);
            })
        }  
    )
            .catch(err => {
                console.log(err);
            })
}

module.exports = connectMongoDB;
