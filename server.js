const express = require('express')
const app = express();
const port = 5000
const path = require('path')
const session = require('express-session')
const bodyparser = require('body-parser')
const ejs=require('ejs')
const router=require('./router')
const adminRouter=require('./adminRouter')

const { v4: uuidv4 } = require('uuid')
const nocache = require('nocache')
const oneDay = 1000 * 60 * 60 * 24

app.use(nocache())

app.set('view engine', 'ejs')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))




//to load static files
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/static', express.static(path.join(__dirname, 'public/assets')))


app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay }
}))


app.use('/route',router)
app.use('/route',adminRouter)
//Home route
app.get('/', (req, res) => {
    if (req.session.nam) {
        res.redirect('/route/dashboard')
    } else {
        res.render('base',{login:"Login",title:'Login.'})
    }

})


app.listen(port, () => console.log(`server started at port  http://localhost:5000`))