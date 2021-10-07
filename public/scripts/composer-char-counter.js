console.log("composer-char-counter.js is working");
const obj = $.getJSON("./server/data-files/initial-tweets.json");
console.log(obj);

$(document).ready(function() {
  $('#tweet-text').on('keyup', () => {
    let counter = 140;
    let a = $("#tweet-text").val().length; 
    let b = counter-a; 
    $('#count-text').text(b);
  
    if (b < 0) {
      $('#count-text').addClass("countOver"); 
    } else {
      $('#count-text').removeClass("countOver");
    }
  })

});


