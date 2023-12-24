

function adminLoginPage(req, res) {
    try {
        if (req.session.logined) {
            res.redirect('/route/home')
        } else {
            res.render('adminlog',{title:"admin Login"})
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
            req.session.logi=true
            res.redirect('/route/home')
            console.log(req.session)
        } else {
            res.redirect('/route/admin')
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports={
    adminLoginPage,
    adminLoginPost
}