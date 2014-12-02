$.ajax('/feed')
  .success(function(data) {
    var tags = data.tags;

    $('body').css({'background-image' : 'url(' + tags[0] + ')' });

    callNextLoop(1,tags)
  });

function callNextLoop(i, arr) {

  setInterval(function() {
    if(i > arr.length - 1) i = 0;

    $('body').css({'background-image' : 'url(' + arr[i] + ')' });
    i = i+1;

  },90000)

}