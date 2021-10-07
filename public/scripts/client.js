/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {

  //escape function for cross-site scripting
  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const createTweetElement = function (tweetObject){
    const $tweets = `
    <article>

    <header class="tweet-header">
      <img class="avatar" src="${escape(tweetObject.user.avatars)}" width="25px" height="25px"></img>
      <p class="name">${escape(tweetObject.user.name)}</p> 
      <p class="handler">${escape(tweetObject.user.handle)}</p>
    </header>
  
    <p class="tweet-text" >${escape(tweetObject.content.text)}</p>

    <footer class="tweet-footer">
        <p class="date"> ${escape(timeago.format(new Date(tweetObject.created_at).toLocaleString()))}</p> 
      <div class="tweet-reaction">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-star"></i>
      </div>
    </footer>
  </article>
  `
    return $tweets;
  }

  const renderTweets = function(tweets){
    const $tweetContainer = $("#tweets-container"); 
    $tweetContainer.empty(); 

    for (const tt of tweets) {
      const $tt = createTweetElement(tt); 
      $tweetContainer.prepend($tt)
    }
    // return $tweetContainer;
  }

  // post information 
  const $form = $("#create-tweet");
  $form.on("submit", function(event) {
    $(".error-length").slideUp("slow");
    $(".error-empty").slideUp("slow");

    event.preventDefault();
    const serializedData = $form.serialize();
    let result = $("#tweet-text").val(); 

    if (result) {
      if (result.length <140) {
        $.ajax({
          url:"/tweets",
          method:"POST",
          data: serializedData,
        })
          .then(()=> loadTweets()) 
      } else  {
        $(".error-length").slideDown("slow");
      } 
    } else {
      $(".error-empty").slideDown("slow");
     }
     $("#tweet-text").val(""); 
  })

  

// $("#alert-message").click(function () {
//   if ( $( "div" ).first().is( ":hidden" ) ) {
//     $( "div" ).slideDown( "slow" );
//   } else {
//     $( "div" ).hide();
//   }
// });


  // get information 
  const loadTweets = function (){
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: (tweets) => {
        console.log("data:", tweets)
        renderTweets(tweets);
      }
    }
  )}
  loadTweets();

})// the end 


