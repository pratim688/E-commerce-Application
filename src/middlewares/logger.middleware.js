//to check user work
import fs from 'fs';
import winston from "winston";
const fsPromise = fs.promises;
// async function log(logdata){
//     try{
//         //this is bad things to see user password then 
//         if(!logdata.includes("signin")){
//         logdata=`\n ${new Date().toString()}- ${logdata}`;
//         await fsPromise.appendFile('log.txt',logdata);
//         }

//     }catch(err){
//         console.log(err);
//     }
   
// }

const logger=winston.createLogger({
    level:'info',
    format:winston.format.json(),
    defaultMeta:{service:'request-logging'},
    transports:[
        new winston.transports.File({filename:'log.txt'})
    ]
})

const loggerMiddleware = async(req,res,next)=>{
    if(!req.url.includes('signin')){
    const logData = `${req.url}-${JSON.stringify(req.body)}`;
   logger.info(`\n${logData}`)
    // await log(logData);//it gives Object object then use stringify to convert it in string
    }
    next();
}
export default loggerMiddleware;