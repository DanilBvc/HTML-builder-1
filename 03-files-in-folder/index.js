const fs = require("fs")
const path = require("path")
let paths = path.join(__dirname, 'secret-folder')
fs.readdir(paths, (err, data) => {
    if(err) throw err
    data.forEach((el) => {
        fs.stat(path.join(paths, el), (err,stat)=> {
            if(err) throw err
            if(stat.isFile()) {
                console.log(`${el.split('.')[0]} - ${el.split('.')[1]} - ${stat.size}b`);
            }
        })
    })
})
