$.getJSON("/users", function(users) {
  var userSelect = $("#userSelect");
  var userTweetSelect = $("#userTweetSelect");
  $.each(users, function(index, user) {
    var option = $("<option />").val(user.id).text(user.screen_name);
    userTweetSelect.append(option.clone());
    userSelect.append(option);
  });
});

$.getJSON("/tweets", function(tweets) {
  var tweetSelect = $("#tweetSelect");
  var linkSelect = $("#linkSelect");
  var hashtagSelect = $("#hashtagSelect");
  var mentionSelect = $("#mentionSelect");
  $.each(tweets, function(index, tweet) {
    var option = $("<option />").val(tweet.id).text(tweet.id);
    linkSelect.append(option.clone());
    hashtagSelect.append(option.clone());
    mentionSelect.append(option.clone());
    tweetSelect.append(option);
  });
});

function changeStage(url) {
  var stage = $("#titlecontent");
  stage.empty();
  var newStage = stage.clone(true);

  newStage.offsetWidth;
  $.getJSON(url, function(data) {
    $.each(data, function(key, val) {
      para = document.createElement("p");
      content = "";
      $.each(val, function(k, v) {
        content += k.toUpperCase() + ": " + v + "<br>"
      });
      para.innerHTML = content;
      console.log(para);
      newStage.append(para);
    });
  });
  stage.after(newStage);
  stage.remove();
};

$("#userSelect").change(function() {
  var selectURL = "/users";
  var selection = $("#userSelect option:selected").val();
  if (selection === "") {
    return;
  } else if (selection === "all") {
    changeStage(selectURL);
  } else {
    changeStage(selectURL + "/" + selection);
  }
});

$("#userTweetSelect").change(function() {
  var selectURL = "/users";
  var selection = $("#userTweetSelect option:selected").val();
  if (selection === "") {
    return;
  } else {
    changeStage(selectURL + "/" + selection + "/tweets");
  }
});

$("#tweetSelect").change(function() {
  var selectURL = "/tweets";
  var selection = $("#tweetSelect option:selected").val();
  if (selection === "") {
    return;
  } else if (selection === "all") {
    changeStage(selectURL);
  } else {
    changeStage(selectURL + "/" + selection);
  }
});

$("#linkSelect").change(function() {
  var selectURL = "/tweets";
  var selection = $("#linkSelect option:selected").val();
  if (selection === "") {
    return;
  } else {
    changeStage(selectURL + "/" + selection + "/links");
  }
});

$("#hashtagSelect").change(function() {
  var selectURL = "/tweets";
  var selection = $("#hashtagSelect option:selected").val();
  if (selection === "") {
    return;
  } else {
    changeStage(selectURL + "/" + selection + "/hashtags");
  }
});

$("#mentionSelect").change(function() {
  var selectURL = "/tweets";
  var selection = $("#mentionSelect option:selected").val();
  if (selection === "") {
    return;
  } else {
    changeStage(selectURL + "/" + selection + "/mentions");
  }
});
