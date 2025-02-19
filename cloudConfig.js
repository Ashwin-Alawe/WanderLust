const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: "dhakueqdi",//process.env.CLOUD_NAME,
    api_key: "452886424488759", //process.env.CLOUDINARY_KEY,
    api_secret: "n9l4hYyse1ms25d3rv3iqAZLiy4", //process.env.CLOUDINARY_SECRET
});

// const url = cloudinary.url("APHOTO_sbod5u");
// console.log(url);

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_DEV',
      allowerdFormats: ["png", "jpg", "jpeg"], // supports promises as well
    },
  });

module.exports = {
    cloudinary,
    storage
}