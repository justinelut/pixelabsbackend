const decompress = require('decompress');
import path from 'path'
//var AdmZip = require("adm-zip");

export default async function extractZipFile({
    doc, // incoming data to update or create with
    req, // full express request
    operation, // name of the operation ie. 'create', 'update'
    originalDoc
}) {
   
    if (doc) {
        decompress(path.resolve(__dirname, `../public/templates/${doc.filename}`), path.resolve(__dirname, `../../preview/${doc.templatename}`)).then(files => {
            console.log('done!');
        })
    }
    
    return doc; // Return operation arguments as necessary
}