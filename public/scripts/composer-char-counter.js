// function to count characters in the tweet

$(document).ready(function() {
  $('#tweet-text').on('keyup', () => {
    let counter = 140;
    let a = $("#tweet-text").val().length;
    let b = counter - a;
  
    if (b < 0) {
      $('#count-text').addClass("countOver");
    } else {
      $('#count-text').removeClass("countOver");
    }
  });
});


