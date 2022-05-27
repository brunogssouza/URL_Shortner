import express from 'express'
import { MongoConnection } from './database/mongoConnection'
import { URLcontrolller } from './controller/URLcontroller';



const api = express()
api.use(express.json())



const databaseMONGODB = new MongoConnection()
databaseMONGODB.connect()

const URLcontroller = new URLcontrolller();

api.post('/shorten', URLcontroller.shorten)
api.get('/:hash', URLcontroller.redirect)


api.listen(5000, () => console.log('Express listening'))

