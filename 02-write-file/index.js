const fs = require('fs');
const { stdin, stdout } = process;
stdout.write('Enter some text\n')
stdin.on('data', (data) => {
 if((/exit/gi).test(data.toString())){ 
  console.log('Bye')
  process.exit()
 }
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
