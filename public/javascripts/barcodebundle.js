(function(){
    let scanner = await (Dynamsoft.DBR.BarcodeScanner.createInstance());
    scanner.onUnduplicatedRead = (txt, result) => {
    // Do somthing with the "txt" found in the barcode
    };
    await scanner.show();
})();
