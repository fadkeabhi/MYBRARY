const express = require("express")
const auther = require("../models/auther")
const Auther = require("../models/auther")
const router = express()

//All authers route
router.get("/", async (req,res) =>{
    let searchOption = {}
    if(req.query.name != null && req.query.name != ''){
        searchOption.name = new RegExp(req.query.name,"i")
    }
    try{
        const auther = await Auther.find(searchOption)
        res.render('authers/index' , {
            authers : auther,
            searchOption:req.query
        })
    }
    catch{
        res.redirect('/')
    }
    
})

//new auther route
router.get('/new', (req,res) =>{
    res.render('authers/new', {auther: new Auther()})
})

// Create Author Route
// router.post('/new', (req, res) => {
//     const auther = new Auther({
//         name : req.body.name
//     })
//     auther.save()
//     .then((newAuther) => {
//         res.redirect(`/`)
//     })
//     .catch((err) => {
//         res.render('authers/new',{
//             auther : req.body.name,
//             errormsg : "error creating auther"
//         })
//     })
// })



// Create Author Route
router.post('/new', async (req, res) => {
    const auther = new Auther({
        name : req.body.name
    })
    try{
        const newAuther = await auther.save()
        res.redirect(`/authers`)
    }
    catch{
        res.render('authers/new',{
                        auther : req.body.name,
                        errormsg : "error creating auther"
    })
}
})



module.exports = router