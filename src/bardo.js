const express = require('express')
const mongoose = require('mongoose')

class Bardo{

    constructor(configDB={}){
        this.configDB = configDB
        this.app = express()
        this.router = express.Router()
    }

    createConfigDB(url=""){
        this.configDB = {
            baseUrl: url
        }
    }

    connectDB(url=""){
        mongoose.connect(url ? url : this.configDB.baseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(console.log("Running DB"))
    }

    model(schema=[], name=""){
        const _schema = mongoose.Schema(schema)
        return this.controller(mongoose.model(name, schema), name)
    }

    controller(model, name=""){
        this.router.get('/', async (req, res) => {
            const test = await model.find()
            return res.json(test)
        })
        this.app.use(this.router)
    }


    run(port=""){
        this.app.listen(port || 3333, () =>{
            console.log(`Bardo running on port: ${port || 3333}`)
        })
    }

}


module.exports = Bardo