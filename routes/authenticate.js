const express = require("express");
const axios = require("axios");
const _ = require("lodash");
const { users } = require("../models/User");
const {userRegistration} = require('./authorize')
const jwt = require("jsonwebtoken");

require("dotenv").config();
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${req.body.id_token}`
    );
    const curr_user = _.pick(data, [
      "sub",
      "email",
      "picture",
      "given_name",
      "family_name",
    ]);
    try {
      const user_db = await users.findOne({sub:curr_user.sub});
      if(user_db){
        const token = jwt.sign(
          _.pick(user_db, ["_id","picture", "given_name","email","type"]),
          process.env.JWT_SECRET
        );
        res.status(200).send(token);
      }
      else {
        const new_user = new users(curr_user)
        await new_user.save()
        const token = jwt.sign(
          _.pick(new_user, ["_id","picture", "given_name","email","type"]),
          process.env.JWT_SECRET
        );
        res.status(201).send(token);
      }
    } catch (error) {
      console.log(error);
        res.status(500).send("Unable to authenticate");
    }
  } catch (error) {
    res.status(500).send(error.data);
  }
});

router.post('/register',[userRegistration],async(req,res)=>{
    try {
      const user_db = await users.findById(req.body.userid)
      user_db.type = req.body.values.type
      await user_db.save()
      const token = jwt.sign(
        _.pick(user_db, ["_id","picture", "given_name","email","type"]),
        process.env.JWT_SECRET
      );
      console.log(token)
      res.status(200).send(token);
    } catch (error) {
      res.status(500).send(error.data)
    }
})

module.exports = { authenticationRouter: router };
