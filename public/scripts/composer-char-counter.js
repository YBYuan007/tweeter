// function to count characters in the tweet

// const { text } = require("body-parser");

$(document).ready(function() {
  $('#tweet-text').on('keyup', () => {
    let counter = 140;
    let a = $("#tweet-text").val().length;
    let b = counter - a;
    $(".counter").text(b); 

    if (b < 0) {
      $('#count-text').addClass("countOver");
    } else {
      console.log("hello", b);
      $('#count-text').removeClass("countOver");
    }
  });
});


