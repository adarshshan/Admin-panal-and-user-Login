var express = require('express')
var router = express.Router()
const collection = require('./mongodb')



router.post('/login', async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.name })
        if (check.password === req.body.password) {
            req.session.loginee = true
            req.session.nam = req.body.name
            res.redirect('/route/dashboard')
        } else {
            res.render('base', { incorr: 'incorrect password...' })
        }
    }
    catch {
        res.redirect('/')
    }
})
router.get('/signup', (req, res) => {
    res.render('deta')
})
router.post('/signup', async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password
        }
        await collection.insertMany([data])
        res.redirect('/')

    } catch (error) {
        console.log(error)
    }
})
router.get('/dashboard', (req, res) => {
    try {
        if (req.session.nam) {
            res.render('dashboard', { nam: req.session.nam, title: 'Dashboard' })
        } else {
            res.redirect('/')
        }
    } catch (error) {
        console.log(error)
    }
})
router.get('/logout', (req, res) => {
    try {
        req.session.destroy()
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})


module.exports = router