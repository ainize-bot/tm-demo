
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

var previous_model_type = 'image';
var previous_model_urls = {
  image: 'https://teachablemachine.withgoogle.com/models/fmTqHH1jX/',
  pose: 'https://storage.googleapis.com/tm-models/QDvGMpQt/',
};

function model_type_changed(new_model_type) {
  console.log(new_model_type);
  var current_model_url = document.getElementById('url').value;
  if (previous_model_type !== new_model_type) {
    previous_model_urls[previous_model_type] = current_model_url;
  }
  document.getElementById('url').value = previous_model_urls[new_model_type];
  previous_model_type = new_model_type;
  turnOff(document.getElementById('resultBox'));
  turnOff(document.getElementById('curlBox'));
}