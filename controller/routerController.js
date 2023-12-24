const collection=require('../mongodb');

async function userLoginPost(req, res) {
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
}

function signupPage(req, res) {
    try {
        return res.render('deta');
    } catch (error) {
        console.log(error)
    } 
}
async function signupPost (req, res) {
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
        console.log(error);
    }
}
function dashboardPage(req, res) {
    if (req.session.nam) {
        res.render('dashboard', { nam: req.session.nam, title: 'Dashboard' })
    } else {
        res.redirect('/')
    }
}
function logOut(req, res) {
    try {
        req.session.destroy()
        res.redirect('/')
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    userLoginPost,
    signupPage,
    signupPost,
    dashboardPage,
    logOut
}