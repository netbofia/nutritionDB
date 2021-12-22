import javascriptBarcodeReader from 'javascript-barcode-reader'



javascriptBarcodeReader({
  /* Image file Path || {data: Uint8ClampedArray, width, height} || HTML5 Canvas ImageData */
  image: source,
  barcode: 'code-2of5',
  // barcodeType: 'industrial',
  options: {    
    // useAdaptiveThreshold: true // for images with sahded portions
    // singlePass: true
  }
})
  .then(code => {
    console.log(code)
  })
  .catch(err => {
    console.log(err)
  })