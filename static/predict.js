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

  if (!document.getElementById('url').value) {
    btnOff(document.getElementById('requestBtn'), false);
    btnOff(document.getElementById('webcamBtn'), false);
    return;
  }

  let url = document.getElementById('url').value.trim();
  if (!url.endsWith('/')) {
    url += '/';
    document.getElementById('url').value = url;
  }
  let image = canvas.toDataURL();
  image = dataURLtoFile(image)

  const formData = new FormData();
  formData.append("image", image);
  formData.append("url", url);
  let mode = $('#radioGroup input:radio:checked').val();

  let apiserver;
  if (mode==='image') {
    apiserver = 'https://tm.e.ainize.ai/api/image/predict';
  } else {
    apiserver = 'https://tm.e.ainize.ai/api/pose/predict';
  }
  document.getElementById('curl').innerText = makeCurl(apiserver, url, image);
  turnOn(document.getElementById('curlBox'));
  fetch(
    apiserver,
    {
      method: "POST",
      body: formData,
    }
  )
    .then(response => response.json())
    .then(response => {
      console.log(response)

      drawGraph(response);

      turnOn(document.getElementById('resultBox'));
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