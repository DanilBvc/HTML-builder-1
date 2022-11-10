const fs = require('fs/promises');
const path = require('path');

(async() => {
    await fs.rm(path.join(__dirname, 'files-copy'), { recursive: true, force: true })
    await fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true });
    const data = await fs.readdir(path.join(__dirname, 'files'));
    for(let dat of data) {
        const src = path.join(path.join(__dirname, 'files'), dat)
       const where = path.join(path.join(__dirname, 'files-copy'), dat)
       await fs.copyFile(src, where)
    }
})()