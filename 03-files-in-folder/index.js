const fs = require("fs")
const path = require("path")
let paths = path.join(__dirname, 'secret-folder')
const recurse = (last = '') => {
    fs.readdir(path.join(paths, last), (err, data) => {
        if(err) throw err
        data.forEach(element => {
                fs.stat(path.join(paths,last, element), (err, stat) => {
                    if(err) throw err
                    if(!stat.isFile()) {
                        recurse('/'+element)
                    }else {
                        console.log(`${element.split('.')[0]} - ${element.split('.')[1]} - ${stat.size}b`);
                    }
                })
        });
    })
}
recurse()