const fs = require('fs');

const base64Decode = (base64String, subName="IMG") => {

    const ext = base64String.split(';')[0].split('/')[1];
    if (ext) {
        const base64Image = base64String.split(';base64,').pop();
        const path = 'storages/images/'+subName+ Date.now() + '.' + ext;
        fs.writeFile(path, base64Image, { encoding: 'base64' }, function (err) {
            if (err) {
                console.log("There was a error!");
            }
        });
        return path;
    } else {
        return undefined;
    }
}

module.exports.base64Decode = base64Decode;