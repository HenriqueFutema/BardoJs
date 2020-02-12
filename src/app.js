const bardo = require("./bardo")
const app = new bardo()

const configDB = require('./config/database')

app.connectDB(`mongodb+srv://${configDB.user}:${configDB.password}@meetyou-posru.mongodb.net/test?retryWrites=true&w=majority`)

const user = {
    name:{
        type: String
    },
    email: {
        type: String
    },
    password:{
        type: String
    }
}
const User = app.model(user, "User")

app.run()