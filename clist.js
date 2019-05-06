const fs = require("fs");

const promise = new Promise( (resolve, reject) => {
    fs.readdir("./", (err, files) => {
        if (err) {
            reject(err);
            return console.error(err);
        } else {
            // 存储文件内容的数组
            const emojis = new Array;

            let length = files.length;
            for (let i=0; i<length; i++)
            {
                let f = files[i];
                let sf = f.slice(1,2);
                sf = parseInt(sf);
                if (!isNaN(sf)) {
                    let path = "./" + f;
                    let subFiles = fs.readdirSync(path);
                    let dirName = f.slice(3);
                    
                    let emoji = {
                        id: dirName,
                        list: subFiles,
                        header: dirName.split("-").join(" "),
                        path: path,
                        vif: false
                    };
                    
                    emojis.push(emoji)
                    if (i == length-1)
                    {
                        resolve(emojis);
                    }
                }
            };
        }
    });
});

promise.then( emojis => {
    fs.writeFile("list.js", "const emojis=" + JSON.stringify(emojis), err => {
        if (err) {
            console.error(err);
        }
    });
})