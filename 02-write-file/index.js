const fs = require('fs');
const { stdin, stdout } = process;
stdin.on('data', (data) => {
  fs.access('./02-write-file/index.txt', (error) => {
    if (error) {
      fs.open('./02-write-file/index.txt', 'w', (err) => {
        if(err) throw err
      })
      fs.appendFile('./02-write-file/index.txt', data, (err) => {
        if(err) throw err
      })
    } else {
        fs.appendFile('./02-write-file/index.txt', data, (err) => {
            if(err) throw err
          })
    }
  });
});
