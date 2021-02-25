
function initWebcam() {
  const video = document.getElementById("player");
  const webcamBtn = document.getElementById('webcamBtn');
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({video: true}).then(function(stream) {
      video.srcObject = stream;
      video.play();
    });
  }

  webcamBtn.addEventListener("click", function() {
    context.drawImage(video, 0, 0, 400, 300);
    turnOn(document.getElementById('canvas'));
    btnOff(document.getElementById('requestBtn'), false);
  });
}
