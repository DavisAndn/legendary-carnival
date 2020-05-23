var Jimp = require("jimp");
var gm = require('gm');

// open a file called "lenna.png"
Jimp.read("1.jpg", function (err, image) {
    if (err) throw err;
    image.resize(337,302)            // resize
    image.quality(100)                 // set JPEG quality
    image.greyscale()                 // set greyscale
    image.invert(); 
    image.write("copy.jpg"); // save
                      // invert the image colours
for(var i=0; i<imageData.width; i++){
    for(var j=0; j<imageData.height; j++){
        var pixel = imageData[i * imageData.width + j];
        var isBlack = checkIfBlack(pixel);

        if (isBlack === false) {
            break;
        }
    }

    for(var j=0; j<imageData.height; j++){
        for(var k=0; k<4; k++){
            imageData[i * imageData.width + j + k] = 255;
        }
    }
}

for(var i=0; i<imageData.height; i++){
    for(var j=0; j<imageData.width; j++){
        var pixel = imageData[i + j * imageData.width];
        var isBlack = checkIfBlack(pixel);

        if (isBlack === false) {
            break;
        }
    }

    for(var j=0; j<imageData.height; j++){
        for(var k=0; k<4; k++){
            imageData[i + j * imageData.width + k] = 255;
        }
    }
}
});
