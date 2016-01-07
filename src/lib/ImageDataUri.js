// converts a URL of an image into a dataURI
module.exports = function (url, cb) {
    // Create an empty canvas and image elements
    var canvas = document.createElement('canvas'),
        img = document.createElement('img');

    img.setAttribute('crossOrigin', 'anonymous');

    img.onload = function () {
        var ctx = canvas.getContext('2d');

        // match size of image
        canvas.width = img.width + 400;
        canvas.height = img.height;
        ctx.fillStyle="white";
        ctx.fillRect(0,0,img.width + 400,img.height)

        // Copy the image contents to the canvas
        ctx.drawImage(img, 200, 0, img.width, img.height);

        // Get the data-URI formatted image
        cb(null, canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));
    };

    img.onerror = function () {
        cb(new Error('FailedToLoadImage'));
    };

    // canvas is not supported
    if (!canvas.getContext) {
        setTimeout(cb, 0, new Error('CanvasIsNotSupported'));
    } else {
        img.src = url;
    }
};
