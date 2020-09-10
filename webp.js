const imagemin = require('imagemin') // The imagemin module.
const webp = require('imagemin-webp') // imagemin's WebP plugin.
const outputFolder = './assets/img/webp' // Output folder
const PNGImages = './assets/img/webp/*.png' // PNG images
const JPEGImages = './assets/img/webp/*.jpg' // JPEG images

async function png() {
  const files = await imagemin([PNGImages], {
    destination: outputFolder,
    plugins: [
      webp({
        lossless: true, // Losslessly encode images
      }),
    ],
  })
}

async function jpg() {
  const files = await imagemin(['./assets/img/webp/*.jpg'], {
    destination: outputFolder,
    plugins: [webp({ quality: 75 })],
  })
}

png()
jpg()
