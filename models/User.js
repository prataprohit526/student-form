const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    sub:{type:String,required:true},
    email:{type:String,required:true},
    picture:{type:String,required:true},
    given_name:{type:String,required:true},
    family_name:{type:String,required:true},
    type:{type:String,default:'Student'},
})

const users = mongoose.model('user',UserSchema)

module.exports = {users}