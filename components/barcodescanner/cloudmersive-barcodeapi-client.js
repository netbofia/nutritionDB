var CloudmersiveBarcodeapiClient = require('cloudmersive-barcodeapi-client');

var defaultClient = CloudmersiveBarcodeapiClient.ApiClient.instance;
 
// Configure API key authorization: Apikey
var Apikey = defaultClient.authentications['Apikey'];
Apikey.apiKey = "01224dcd-18a8-460b-8b2a-237bd8a28b76"
 


var api = new CloudmersiveBarcodeapiClient.BarcodeScanApi();
var imageFile = __dirname+"/../../public/images/barcode-test.jpg"; // File | Image file to perform the operation on.  Common file formats such as PNG, JPEG are supported.

 
 

module.exports = function(){
  var callback = function(error, data, response) {
    if (error) {
      console.log(error);
    } else {
      console.log('API called successfully. Returned data: ' + data);
    }
  };

  
  api.barcodeScanImage(imageFile, callback);
};
