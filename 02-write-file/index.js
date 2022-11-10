const fs = require('fs');
const { createInterface } = require('readline');
const { stdin, stdout } = process;

const write = fs.createWriteStream('./02-write-file/index.txt');

const readline = createInterface({
  input: stdin,
  output: stdout,
});
const end = () => {
  readline.write('bye');
  readline.close();
  write.end();
};
readline.write('enter text \n');
readline.on('line', (data) => {
  if (data.trim() === 'exit') {
    end();
  } else {
    write.write(`${data}\n`);
  }
});
readline.on('SIGINT', () => {
  end();
});
stdin.on('data', (data) => {
  if (/exit/gi.test(data.toString())) {
    console.log(` \nBye`);
    process.exit();
  }
});
