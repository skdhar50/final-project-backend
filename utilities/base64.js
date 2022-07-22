const fs = require('fs');
const isBase64 = require('is-base64');

const base64Decode = (base64String, subName="IMG") => {

    const base64 = isBase64(base64String, { mimeRequired: true });
    if (base64) {
        const ext = base64String.split(';')[0].split('/')[1];
        const base64EncodedString = base64String.split(';base64,').pop();
        const name = subName + Date.now() + '.' + ext;
        const path = 'public/storage/images/'+name;
        fs.writeFile(path, base64EncodedString, { encoding: 'base64' }, function (err) {
            if (err) {
                console.log("There was a error!");
                return undefined;
            }
        });
        return name;
    } else {
        return undefined;
    }
}

module.exports.base64Decode = base64Decode;