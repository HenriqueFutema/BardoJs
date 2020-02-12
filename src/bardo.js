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
        typeof(schema) !== Object && console.log("schema is not a Object");
        const _schema = mongoose.Schema(schema)
        return this.controller(mongoose.model(name, schema), name)
    }

    controller(model, name=""){
        this.router.get(`/${name}`, async (req, res) => {
            const data = await model.find()
            return res.json(data)
        })
        this.router.get(`/${name}/:id`, async (req, res) => {
            const data = await model.findById(id)
            return res.json(data)
        })
        this.router.post(`/${name}`, async (req, res) => {
            const data = await model.create(req.body)
            return res.json(data)
        })
        this.router.put(`/${name}/:id`, async (req, res) => {
            const { id } = req.params
            const data = await model.findByIdAndUpdate(id, req.body, {new: true})
            return res.json(data)
        })
        this.router.delete(`/${name}/:id`, async (req, res) => {
            const { id } = req.params
            const data = await model.findByIdAndRemove(id)
            return res.json(data)
        })
        this.app.use(this.router)
        console.log(this.router)
    }


    run(port=""){
        this.app.listen(port || 3333, () =>{
            console.log(`Bardo running on port: ${port || 3333}`)
        })
    }

}


module.exports = Bardo