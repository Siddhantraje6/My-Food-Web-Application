const express = require("express");
const router = express.Router();
const user = require('../models/Users');
const {body, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const jwtsecret = "thisismyfirstmernstackprojectSid"; //random secret string

router.post("/createuser", [body("email").isEmail(), 
                            body("password").isLength({min:5}),
                            body("name").isLength({min:5})], async(req, res) => {

    const result = validationResult(req);
    if(!result.isEmpty()) return res.status(400).json({error : result.array()}); //if error
    
    const salt = await bcrypt.genSalt(10);
    let securedPass = await bcrypt.hash(req.body.password, salt);

    try{
        await user.create({
            name: req.body.name,
            password: securedPass,
            email: req.body.email,
            location: req.body.location
        }).then(res.json({success:true}));
    }
    catch(error){
        console.log("something happened here");
        res.json({success:false});
    }
})

router.post("/loginuser", [body("email").isEmail(), 
                          body("password").isLength({min:5})], async(req, res) => {
    
    const result = validationResult(req);
    if(!result.isEmpty()) return res.status(400).json({error : result.array()});

    let email = req.body.email;
    let password = req.body.password;

    try{
        let userData = await user.findOne({email});
        if(!userData){
            return res.status(400).json({error : "Invalid Email"});
        }
        else{
            const cmpPassword = await bcrypt.compare(password, userData.password);
            if(cmpPassword){ //if true

                const data = {
                    user:{
                        id:userData.id
                    }
                }
                const authtoken = jwt.sign(data, jwtsecret);
                return res.json({success : true, authtoken : authtoken});
            }
            else{
                return res.status(400).json({error : "Invalid Password"});
            }
        }
    }
    catch(error){
        console.log("error: ", error);
        res.json({success:false});
    }
})

module.exports = router;