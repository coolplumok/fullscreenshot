const fs            = require('fs');
const urlExists     = require("url-exists");
const { scrap }     = require("./scrap.module");

typed_url = "goo000asdfadsgle.com";

if (typed_url.includes('http')) {
    url = typed_url;
}
else {
    url = 'https://' + typed_url;
}

urlExists(url, function(err, exists) {
    if (exists) {
        console.log( url + "exist!");
    } else {
        throw ( url +  ' does not exist!' );
    }
});

path = './images';

if (!fs.existsSync(path)){
    fs.mkdirSync(path);
    console.log("created dir!");
}
let current_time = Date.now();
file_name = "go-search" + current_time + '.jpg';
file_path = path + '/' + file_name;
console.log(file_name);

scrap(function() {
    data = {'file_name': file_name}
    console.log("Searched!", data);
}, url, file_path);
