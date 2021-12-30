const express=require('express');
const router=express.Router();
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose');
const User = require('../modals/user');
const URI='mongodb+srv://vishu39:vishusharma@cluster0.hvlis.mongodb.net/user?retryWrites=true&w=majority';
mongoose.connect(URI,err=>{
    if(err){
        console.error('!Error'+err);
    }
    else{
        console.log('connected to mongodb');
    }
})

router.get('/',(req,res)=>{
    res.send('From Api routes');
})


//verify Token
function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}

//api for events
router.get('/events', (req,res) => {
    let events = [
      {
        "_id": "1",
        "name": "sgasgas",
        "description": "vishsusskfsakfjsfs",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "sgasgas",
        "description": "vishusssss",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "sgasgas",
        "description": "vishsusskfsakfjsfs",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "sgasgas",
        "description": "vishsusskfsakfjsfs",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "5",
        "name": "sgasgas",
        "description": "vishsusskfsakfjsfs",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "6",
        "name": "sgasgas",
        "description": "vishsusskfsakfjsfs",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ]
    res.json(events)
  })

//Api for specialevents
router.get('/special',verifyToken, (req, res) => {
    let specialEvents = [
      {
        "_id": "1",
        "name": "asfasf Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "asfasf Special",
        "description": "safsaf",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "asfasf Special",
        "description": "gfkfgfhdh",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "asfasf Special",
        "description": "kgdgk",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "5",
        "name": "asfasf Special",
        "description": "dfhhfdh",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "6",
        "name": "asfasf Special",
        "description": "dfhhdssd",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ]
    res.json(specialEvents)
  })


//Api for user register
router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((err, registeredUser) => {
      if (err) {
        console.log(err)      
      } else {
        let payload = {subject: registeredUser._id}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
      }
    })
  })

// Api for user login
  router.post('/login', (req, res) => {
    let userData = req.body
    User.findOne({email: userData.email}, (err, user) => {
      if (err) {
        console.log(err)    
      } else {
        if (!user) {
          res.status(401).send('Invalid Email')
        } else 
        if ( user.password !== userData.password) {
          res.status(401).send('Invalid Password')
        } else {
          let payload = {subject: user._id}
          let token = jwt.sign(payload, 'secretKey')
          res.status(200).send({token})
        }
      }
    })
  })


module.exports=router;