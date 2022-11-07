const fs = require('fs');
const path = require('path');
fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', {recursive:true}, () => {});
fs.readdir(path.join(__dirname, 'styles'), (err, data) => {
  if(err) throw err;
  data.forEach((el) => {
    fs.stat(path.join(__dirname, 'styles', el), (err, stat) => {
        if(err) throw err
        if(el.split('.')[1] === 'css') {
            fs.readFile(path.join(__dirname, 'styles', el), 'utf-8', (err, styleContent) => {
                if(err) throw err
                fs.writeFile(path.join(__dirname, 'project-dist','bundle.css'), styleContent , (err) => {
                    if(err) throw err
                    const datav = Buffer.from(styleContent);
                    fs.appendFile(path.join(__dirname, 'project-dist', 'bundle.css'), datav + '', (errr) => {
                      if(errr) {
                        throw errr;
                      }
                    });
                })

            })
        }
    })
  })
});