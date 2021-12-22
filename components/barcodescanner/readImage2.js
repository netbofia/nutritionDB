//https://www.dynamsoft.com/codepool/nodejs-barcode-scanner-camera-raspberrypi.html
bool ConvertCameraGrayDataToDIBBuffer(unsigned char* psrc, int size, int width, int height, unsigned char** ppdist, int *psize)
{
  BITMAPINFOHEADER bitmapInfo;
  memset(&bitmapInfo, 0, sizeof(BITMAPINFOHEADER));

  bitmapInfo.biBitCount = 8;
  bitmapInfo.biWidth = width;
  bitmapInfo.biHeight = height;
  bitmapInfo.biSize = sizeof(BITMAPINFOHEADER);

  int iStride = ((width * 8 + 31) >> 5) << 2;
  int iImageSize = iStride * height;
  if (size < iImageSize)
    return false;

  bitmapInfo.biSizeImage = iImageSize;

  *psize = iImageSize + bitmapInfo.biSize + 1024;
  *ppdist = new unsigned char[*psize];

  //1. copy BITMAPINFOHEADER
  memcpy(*ppdist, &bitmapInfo, sizeof(BITMAPINFOHEADER));

  //2. copy gray color map
  char rgba[1024] = { 0 };
  for (int i = 0; i < 256; ++i)
  {
    rgba[i * 4] = rgba[i * 4 + 1] = rgba[i * 4 + 2] = rgba[i * 4 + 3] = i;
  }
  memcpy(*ppdist + sizeof(BITMAPINFOHEADER), rgba, 1024);

  //3. copy gray data (should be fliped)
  unsigned char* srcptr = psrc + (height - 1)*width;
  unsigned char* dstptr = *ppdist + sizeof(BITMAPINFOHEADER) + 1024;

  for (int j = 0; j < height; ++j, srcptr -= width, dstptr += iStride)
  {
    memcpy(dstptr, srcptr, width);
  }

  return true;
}

unsigned char* pdibdata = NULL;
int dibsize = 0;
int width = worker->width, height = worker->height;
int size = width * height;
int index = 0;
unsigned char* data = new unsigned char[size];
// get Y from YUYV
for (int i = 0; i < size; i++)
{
  data[i] = worker->buffer[index];
  index += 2;
}
// gray conversion
ConvertCameraGrayDataToDIBBuffer(data, size, width, height, &pdibdata, &dibsize);
// read barcode
ret = DBR_DecodeBuffer(pdibdata, dibsize, &ro, &pResults);
// release memory
delete []data, data=NULL;
delete []pdibdata, pdibdata=NULL;





//let dbr = require(build it)


dbr.decodeYUYVAsync(frame, format.width, format.height, barcodeTypes,
            function(msg) {
                var result = null;
                for (index in msg) {
                    result = msg[index]
                    console.log("Format: " + result['format']);
                    console.log("Value : " + result['value']);
                    console.log("##################");
                }
                setTimeout(capture, 0);
            });