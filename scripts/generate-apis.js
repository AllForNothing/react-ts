const { codegen } = require('swagger-axios-codegen');
const yaml = require('js-yaml');
const fs = require('fs');

//configuration
let inputFile = 'swagger/swagger.yaml';
const outputDir = 'swagger';




if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}
const swaggerObj = yaml.load(fs.readFileSync(inputFile, {encoding: 'utf-8'}));
// host is not needed as UI uses relative path for back-end APIs
if (swaggerObj.host) {
    delete swaggerObj.host;
}
// enhancement for property 'additionalProperties'
traverseObject(swaggerObj);

//convert swagger.yaml to swagger.json
fs.writeFileSync(outputDir + '/swagger.json', JSON.stringify(swaggerObj, null, 2));




codegen({
    methodNameMode: 'operationId',
    source: require('../swagger/swagger.json'),
    outputDir: './src/generatedApis'
});


fs.unlinkSync('swagger/swagger.json');



function traverseObject(obj) {
    if (obj) {
        if (Array.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                traverseObject(obj[i])
            }
        }
        if (typeof obj === 'object') {
            for (let name in obj) {
                if (obj.hasOwnProperty(name)) {
                    if (name === 'additionalProperties'
                        && obj[name].type === 'object'
                        && obj[name].additionalProperties === true) {
                        obj[name] = true;
                    } else {
                        traverseObject(obj[name])
                    }
                }
            }
        }
    }
}
