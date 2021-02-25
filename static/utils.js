
function turnOn(element) {
  element.style.display = 'inline-block';
}

function turnOff(element) {
  element.style.display = 'none';
}

function btnOff(element, disabled) {
  element.disabled=disabled;
}

function dataURLtoFile(dataurl, filename) {

  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, {type:mime});
}

function makeCurl(serverUrl, modelUrl, image) {
  const imageName = image.filename || 'input.png';
  const imageType = image.type || 'image/png';

  return `curl -X POST ${serverUrl} -H "accept: application/json" -H 
  "Content-Type: multipart/form-data" -F "image=@${imageName};type=${imageType}" -F "url=${modelUrl}"`;
}