const fs = require('fs');
const path = require('path');
const { start } = require('repl');

const styles = path.join(__dirname, "styles")
const bundleDir = path.join(__dirname, 'project-dist', 'style.css')

async function directory() {
  await fs.mkdir(
    path.join(__dirname, 'project-dist'),
    { recursive: true },
    () => {}
  );
  await fs.mkdir(
    path.join(__dirname, 'project-dist', 'assets'),
    { recursive: true },
    () => {}
  );
}
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



function starst() {
  generateBundle()
  /* styles copy top */

  /* assets copy */
  function copyDir(filesPath, copiedPath) {
    fs.readdir(filesPath, { withFileTypes: true }, (err, data) => {
      if (err) {
        throw err;
      } else {
        data.forEach((elem) => {
          if (elem.isFile()) {
            fs.copyFile(
              path.join(filesPath, elem.name),
              path.join(copiedPath, elem.name),
              (err) => {
                if (err) throw err;
              }
            );
          } else if (elem.isDirectory()) {
            fs.mkdir(
              copiedPath + '\\' + elem.name,
              { recursive: true },
              (err) => {
                if (err) throw err;
              }
            );
            copyDir(
              path.join(filesPath, elem.name),
              path.join(copiedPath, elem.name)
            );
          }
        });
      }
    });
  }
  copyDir(
    path.join(__dirname, 'assets'),
    path.join(__dirname, 'project-dist') + '\\' + 'assets'
  );

  let templateTxt = '';
  fs.readFile(
    path.join(__dirname, 'template.html'),
    'utf-8',
    (err, templateData) => {
      if (err) throw err;
      templateTxt += templateData;
      fs.readdir(
        path.join(__dirname, 'components'),
        { withFileTypes: true },
        (err, files) => {
          if (err) throw err;
          files.forEach((file) => {
            if (file.isFile() && path.extname(file.name) === '.html') {
              fs.readFile(
                path.join(path.join(__dirname, 'components'), file.name),
                'utf-8',
                (err, data) => {
                  if (err) throw err;
                  const compName = '{{' + path.parse(file.name).name + '}}';
                  templateTxt = templateTxt.replace(compName, data);
                  fs.writeFile(
                    path.join(__dirname, 'project-dist', 'template.html'),
                    templateTxt,
                    (err) => {
                      if (err) throw err;
                    }
                  );
                }
              );
            }
          });
        }
      );
    }
  );
}
directory();
starst();
