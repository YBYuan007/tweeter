/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {
  const createTweetElement = function (tweetObject){
    const $tweets = `
    <article>

    <header class="tweet-header">
      <img class="avatar" src="${tweetObject.user.avatars}" width="25px" height="25px"></img>
      <p class="name">${tweetObject.user.name}</p> 
      <p class="handler">${tweetObject.user.handle}</p>
    </header>
  
    <p class="tweet-text" >${tweetObject.content.text}</p>

    <footer class="tweet-footer">
        <p class="date"> ${timeago.format(new Date(tweetObject.created_at).toLocaleString())}</p> 
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
    // $tweetContainer.empty(); 
    for (const tt of tweets) {
      console.log(tt);
      const $tt = createTweetElement(tt); 
      $tweetContainer.prepend($tt)
    }
    // return $tweetContainer;
  }


  // post information 
  const $form = $("#create-tweet");
  $form.on("submit", function(event) {
    event.preventDefault();
    const serializedData = $form.serialize();
    console.log(serializedData);

    $.ajax({
      url:"/tweets",
      method:"POST",
      data: serializedData,
    })
      .then(()=> loadTweets()) 
  })

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
      // error: (err) => {
      //   console.log(`there was an error: ${err}`)
      // }
    }
  )}
  loadTweets();

})// the end 


