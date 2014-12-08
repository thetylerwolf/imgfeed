var currentImg = 0,
    tags,
    intervalLoop,
    maxIndex = 3;

$.ajax('/feed')
  .success(function(data) {
    tags = data.tags;

    setBground();

    callNextLoop();
    setControls();
  });

function setControls() {
  $(window).keyup(function(e) {
    var key = e.keyCode;
    
    switch (key) {
      case 37:
        prevImg();
        break;
      case 39:
        nextImg();
        break;
      case 32:
        toggleFull();
        break;
    }

    setBground();
  });
}

function callNextLoop() {

  setInterval(function() {
    setBground();
    nextImg();

  },90000)

}

function nextImg() {
  currentImg = currentImg+1;
  if(currentImg > maxIndex - 1) currentImg = 0;
}

function prevImg() {
  currentImg = currentImg-1;
  if(currentImg < 0) currentImg = maxIndex - 1;
}

function setBground() {
  $('body').css({'background-image' : 'url(' + tags[currentImg] + ')' });
}

function toggleFull() {
  if(maxIndex == tags.length) maxIndex = 3;
  else if (maxIndex == 3) maxIndex = tags.length;
  if(currentImg > maxIndex - 1) currentImg = 0;
  setBground();
}
