var express = require('express')
var router = express.Router()
const collection = require('./mongodb')


// router.get('/login',(req,res)=>{
//     res.redirect('/')
// })

router.post('/login', async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.name })
        if (check.password === req.body.password) {
            req.session.loginee = true
            req.session.nam = req.body.name
            // res.render('dashboard',{nam:req.session.nam})
            res.redirect('/route/dashboard')
        } else {
            res.render('base', { incorr: 'incorrect password...' })
            // res.redirect('/')
        }
    }
    catch {
        // res.render('base',{incorr:'Wrong Details!'})
        res.redirect('/')
    }
})
router.get('/signup', (req, res) => {
    res.render('deta')
})
router.post('/signup', async (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    }
        await collection.insertMany([data])
        res.redirect('/')


})
router.get('/dashboard', (req, res) => {
    if (req.session.nam) {
        res.render('dashboard', { nam: req.session.nam,title:'Dashboard' })
    } else {
        res.redirect('/')
    }

})
router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
    // try{
    //     req.session.destroy((err) => {
    //         if (err) {
    //             console.log(err)
    //             res.send("Error")
    //         } else {
    //             res.redirect('/')
    //             console.log(req.session)
    //         }
    //     })
    // }
    // catch{
    //     res.redirect('/')
    // }

})


module.exports = router