const fs = require('fs');
const path = require('path');
const styles = path.join(__dirname, "styles")
const bundleDir = path.join(__dirname, 'project-dist', 'bundle.css')
 async function generateBundle () {
  const data = await copyCss(styles)
  createBundle(bundleDir, data)
}
const copyCss = (paths) => {
  return new Promise((res, rej) => {
    fs.readdir(paths, {withFileTypes: true}, (err, data) => {
      if(err) throw err 
      res (
        data.filter(dat => dat.isFile()).filter(dat => path.extname(dat.name) == '.css').map(dat => path.join(paths, dat.name))
      )
    })
  })
}
const createBundle = async(bundle, file) => {
  const stream = fs.createWriteStream(bundle)
  file.forEach(element => {
    const stream1 = fs.createReadStream(element)
    stream1.pipe(stream)
  });
}
generateBundle()