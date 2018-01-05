const jwt = require('jsonwebtoken');

class Checker{
    static authenticate(req,res,next){
        jwt.verify(req.headers.token,process.env.SECRET,(err,decoded)=>{
            if(err){
                res.status(500).json({msg:"Authentication Failed", err:err})
            }
            else{
                req.decoded = decoded
                console.log(req.decoded);
                next()
            }
        })
    }
}

module.exports = Checker;