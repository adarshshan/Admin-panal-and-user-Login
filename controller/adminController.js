const collection = require("../mongodb")

const credential = {
    username: 'Adarsh',
    password: 'adarsh'
}


function adminLoginPage(req, res) {
    try {
        if (req.session.logined) {
            res.redirect('/route/home')
        } else {
            res.render('adminlog', { title: "admin Login" })
        }
    } catch (error) {
        console.log(error)
    }
}

function adminLoginPost(req, res) {
    try {
        if (credential.username == req.body.name && credential.password == req.body.password) {
            req.session.user = req.body.name
            req.session.logined = true
            req.session.logi = true
            res.redirect('/route/home')
            console.log(req.session)
        } else {
            res.redirect('/route/admin')
        }
    } catch (error) {
        console.log(error)
    }
}

async function homePage(req, res) {
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
}
function addUserPage(req, res) {
    try {
        res.render('add_users', { title: 'Add users' })
    } catch (error) {
        console.log(error)
    }
}
async function addUserPost(req, res) {
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
}
function adminLogout(req, res) {
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
}
async function editUserPage(req, res) {
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
}
function updatePost(req, res) {
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
}
function deleteUser(req, res) {
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
}
async function Search(req, res) {
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
}

module.exports = {
    adminLoginPage,
    adminLoginPost,
    homePage,
    addUserPage,
    addUserPost,
    adminLogout,
    editUserPage,
    updatePost,
    deleteUser,
    Search
}