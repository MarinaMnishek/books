const {Router} = require('express')
const router = Router()


//Инициализация админской панели Firebase
const admin = require("firebase-admin")
const serviceAccount = require("../firebase-adminsdk.json")
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://gb-lib-87b6c-default-rtdb.europe-west1.firebasedatabase.app"
  })

 exports.checkAuth = (req, res, next) => {
    if (req.headers.authtoken) {
        admin.auth().verifyIdToken(req.headers.authtoken)
          .then(() => {
            next()
          }).catch(() => {
            res.status(403).send('Unauthorized')
          });
      } else {
        res.status(403).send('Unauthorized')
  }
}  

  //     /api/admin
router.post('/singup', async (req, res) => {
    const userResponse = await admin.auth().createUser({
        email: req.body.email,
        password: req.body.password,
        emailVerified: false,
        disabled: false
    })
    res.json(userResponse)
})




module.exports = router