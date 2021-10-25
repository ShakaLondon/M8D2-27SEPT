import mongoose from "mongoose"
import bcrypt from "bcrypt"

const { Schema, model } = mongoose

const AuthorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    dateOfBirth:{
      type: String,
      required: true,
    },
    avatar:{
      type: String,
      required: true,
      default: "https://www.kindpng.com/picc/m/192-1925162_login-icon-png-transparent-png.png"
    },
    role:{
      type: String,
      required: true,
      enum: ["User", "Admin"],
      default: "User"
    },
  },
  {
    timestamps: true, // adding createdAt and modifiedAt automatically
  }
)

AuthorSchema.pre("save", async function(next){
//Before saving document in db hash password before storing
//use this on creation but also use when data is modified in a PUT
  const newUser = this 

  const userPW = newUser.password

  if (newUser.isModified("password")){

    newUser.password = await bcrypt.hash(userPW, 10)
  }

  next()

})

AuthorSchema.methods.toJSON = function () {
  // console.log(this)
  // toJSON  is called every time res send is sent 
  const userDocument = this

  const docObject = userDocument.toObject()

  delete docObject.password
  delete docObject.__v

  console.log(docObject, "toJson")

  // const docJSON = docObject.toJSON()

  return docObject

}

AuthorSchema.statics.checkCredentials = async function (email, userPW) {
  // find the user by email
  console.log(email, "checkEmail")
  const user = await this.findOne({ email })
  console.log(user)
  // if user found compare hashed password
  if(user) {
    const userVerified = await bcrypt.compare(userPW, user.password)

    console.log(userVerified, "userFound")
    if (userVerified) { 
      return user
    } else { 
      return null 
    }
  } else {
    return null
  }
}

export default model("Authors", AuthorSchema) // bounded to "users" collection

// seperate crud for embeded values check purchase history in riccardos code

