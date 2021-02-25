function predict() {
  btnOff(document.getElementById('requestBtn'), true);
  btnOff(document.getElementById('webcamBtn'), true);
  clearGraph();
  _predict();
}

function _predict() {
  turnOff(document.getElementById('resultBox'));
  turnOff(document.getElementById('curlBox'));
  const canvas = document.getElementById('canvas');

  const url = document.getElementById('url').value.trim();
  let image = canvas.toDataURL();
  image = dataURLtoFile(image)

  const formData = new FormData();
  formData.append("image", image);
  formData.append("url", url);
  let mode = $('#radioGroup input:radio:checked').val();

  let apiserver;
  if (mode==='image') {
    apiserver = 'http://localhost:8080';
  } else {
    apiserver = 'http://localhost:8000';
  }
  fetch(
    apiserver + '/predict',
    {
      method: "POST",
      body: formData,
    }
  )
    .then(response => response.json())
    .then(response => {
      console.log(response)

      drawGraph(response);
      document.getElementById('curl').innerText = makeCurl(apiserver+'/predict', url, image);

      turnOn(document.getElementById('resultBox'));
      turnOn(document.getElementById('curlBox'));
      btnOff(document.getElementById('requestBtn'), false);
      btnOff(document.getElementById('webcamBtn'), false);
      console.log('DONE');
    })
    .catch(e => {
      console.log('error', e);

      document.getElementById("result").innerText = 'SORRY, SERVER ERROR';

      turnOn(document.getElementById('resultBox'));
      btnOff(document.getElementById('webcamBtn'), false);
      btnOff(document.getElementById('requestBtn'), false);

    })

}