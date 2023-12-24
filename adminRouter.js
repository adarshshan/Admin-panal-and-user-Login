const express = require('express')
const adminRouter = express.Router()
const collection = require('./mongodb')
const controller = require('./controller/adminController')

const credential = {
    username: 'Adarsh',
    password: 'adarsh'
}

adminRouter.get('/admin', controller.adminLoginPage);
adminRouter.post('/logi', controller.adminLoginPost);

adminRouter.get('/home', async (req, res) => {
    try {
        if (req.session.user) {
            const data = await collection.find();
            res.render("adminpnl", {
                title: 'Home page',
                data: data,
            })
        } else {
            res.redirect('/route/admin')
        }
    } catch (error) {
        console.log(error)
    }
})

adminRouter.get('/add', (req, res) => {
    try {
        res.render('add_users', { title: 'Add users' })
    } catch (error) {
        console.log(error)
    }
})


adminRouter.post('/add', async (req, res) => {
    try {
        if (req.session.logi) {
            const data = {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password
            }
            console.log(req.body.name)
            await collection.insertMany([data])
            res.redirect('/route/home')
        } else {
            res.redirect('/route/admin')
        }
    } catch (error) {
        console.log(error)
    }
})

adminRouter.get('/admin_logout', (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                res.send(err)
                console.log(err)
            } else {
                res.redirect('/route/admin')
            }

        })
    } catch (error) {
        console.log(error)
    }
})

adminRouter.get('/edit/:id', async (req, res) => {
    try {
        let id = req.params.id
        collection.findById(id, (err, user) => {
            if (err) {
                res.redirect('/home')
            } else {
                if (user == null) {
                    res.redirect('/home')
                } else {
                    res.render('edit_users', { title: 'Edit User', collection: user })
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
})

adminRouter.post('/update/:id', (req, res) => {
    try {
        let id = req.params.id
        collection.findByIdAndUpdate(id, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password
        },
            (err, result) => {
                if (err) {
                    res.send(err)
                } else {
                    res.redirect('/route/home')
                }
            }
        )
    } catch (error) {
        console.log(error)
    }
})

adminRouter.get('/delete/:id', (req, res) => {
    try {
        let id = req.params.id
        collection.findByIdAndRemove(id, (err, result) => {
            if (err) {
                res.send(err)
            } else {
                res.redirect('/route/home')
            }
        })
    } catch (error) {
        console.log(error)
    }
})

adminRouter.post('/search', async (req, res) => {
    try {
        let searchTerm = req.body.searchTerm
        var emai = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
        let searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");
        let searchemail = searchTerm.replace(emai)

        const person = await collection.find({
            $or: [
                { name: { $regex: new RegExp(searchNoSpecialChar, "i") } },
                { email: { $regex: new RegExp(searchemail, "i") } },
            ]
        })
        res.render('search', { person, title: 'search results' })

    } catch (error) {
        console.log(err)
    }
})

module.exports = adminRouter