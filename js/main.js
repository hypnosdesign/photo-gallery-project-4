/***************************
  JAVASCRIPT
***************************/

/* Variabili (Variables)
***********************************************/

var report = " ";



/* Funzioni (Functions)
***********************************************/

// print a message and append it in the gallery id.
function print(message) {
  var doc = document.getElementById("gallery");
  doc.innerHTML = message;
}

// return html of the thumbnail
function getFigure() {
  if(item.image){
    report += '<li class="item-gallery"><a href="'+ item.image +'"><figure>';
    report += '<img src="'+ item.thumb +'" alt="'+ item.title +'">';
    report += '<figcaption class="caption">'+ item.caption +'</figcaption>';
    report += "</figure></a></li>"; 
  } else if (item.video){
    report += '<li class="item-gallery"><a href="'+ item.video +'">';
    report += '<video poster="'+ item.thumb +'">';
    report += '<p class="caption">'+ item.caption +'</p>';
    report += '</video></a></li>';
    //'<iframe width="auto" src="'+ item.video +'" frameborder="0"></iframe>'
    // <video controls="true">
    // <source src="www.youtube.com/watch?v=3bGNuRtlqAQ" type="video/mp4" />
    // </video>
  }

  return report;
}



/* Cicli (Loops) 
***********************************************/

// show images in the page
for (var i = 0; i < items.length; i++) {
  item = items[i];
  print(getFigure(item));
} // fine ciclo for (End for cicle)



/***************************
  jQuery
***************************/



/* Galleria (Gallery) 
***********************************************/

// Variabili (Variables)

var $overLay = $('<div class="overlay"></div>');
var $container = $(
  '<div class="container">' 
    +'<div class="controllers">'
      +'<img class="close" src="img/icons/cross.svg">'
      +'<img class="next" src="img/icons/chevron-thin-right.svg">'
      +'<img class="prev" src="img/icons/chevron-thin-left.svg">'
    +'</div>'
  +'</div>');
var $img = $('<img>');
var $caption = $("<p></p>");
var $vid = $('<video controls="true"></video>');


// alls append
$('body').append($overLay);
  $overLay.append($container);
    $container.append($caption);
      
// clicks
$('#gallery li').children().click( function(e){
  e.preventDefault();
  getLocalItem(this);
  $overLay.show("fast", "linear");
  $container.show("slow");

$('.prev').click(function() { getPrevItem(); });
$('.next').click(function() { getNextItem(); });

}); // fine click item-gallery



// Functions

function getLocalItem (localItem) {  
  thisItem = localItem;
    var locationItem = $(localItem).attr("href");
    if($('img')){
      $container.append($img);
      $vid.remove();
      $img.attr("src", locationItem);} 
    if($('video')){
      $container.append($vid);
      $img.remove();
      $vid.attr("src", locationItem);}

    var $captionText = $(localItem).find('.caption').text();
      $caption.text($captionText); }
// end getLocalItem *********************************************

function getPrevItem() {
  $imageParent = $(thisItem).parent().prev();
    thisItem = $($imageParent).children("a");
      getLocalItem(thisItem);}
// end getPrevItem **********************************************   

function getNextItem() {
  $imageParent = $(thisItem).parent().next();
    thisItem = $($imageParent).children("a");
      getLocalItem(thisItem);}
// end getNextItem **********************************************     

// reload the document
$(".close").on( "click", (function() { location.reload(); }) );


// Keyboard Navigation 
$("body").on("keyup", function(e){
  if(e.keyCode === 37) {
    getPrevItem();
    //$('.container p').remove();
  } else if(e.keyCode === 39) {
    getNextItem();
    //$('.container p').remove();      
    }
}); 
// end Keyboard Navigation ***************************************


/* video */
videos = document.querySelectorAll("video");
for (var i = 0, l = videos.length; i < l; i++) {
    var video = videos[i];
    var src = video.src || (function () {
        var sources = video.querySelectorAll("source");
        for (var j = 0, sl = sources.length; j < sl; j++) {
            var source = sources[j];
            var type = source.type;
            var isMp4 = type.indexOf("mp4") != -1;
            if (isMp4) return source.src;
        }
        return null;
    })(); 
    if (src) {
        var isYoutube = src && src.match(/(?:youtu|youtube)(?:\.com|\.be)\/([\w\W]+)/i);
        if (isYoutube) {
            var id = isYoutube[1].match(/watch\?v=|[\w\W]+/gi);
            id = (id.length > 1) ? id.splice(1) : id;
            id = id.toString();
            var mp4url = "http://www.youtubeinmp4.com/redirect.php?video=";
            video.src = mp4url + id;
        }
    }
}

/* Barra di ricerca (Search bar) 
***********************************************/
// I use:
// .keyup()
// :Contains()

// searching function
function searching(input, list) {
  
  // Ogni volta che input cambia allora...
  $(input).keyup( function () {
    
    // setto variabile per i valori e trasformo in lower case
    // https://css-tricks.com/snippets/jquery/make-jquery-contains-case-insensitive/
    $.expr[":"].contains = $.expr.createPseudo(function(arg) {
      return function( elem ) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
      };
    });

    var typed = $(this).val().toLowerCase();
      
      // if typed is not a blank space
      if(typed !== " ") {
        // fadeout the anchors if type is not contained in list
        $(list).find("li:not(:contains("+typed+"))").fadeOut("fast");
        // fadein the anchors is contained in list
        $(list).find("li:contains("+typed+")").fadeIn("slow");
      }else {
        // if type is equal to a white space or result not found
        $(list).find("figure").show();
      }
  }); // end keyup
} // end function searching ***********************************

//start searching function passing the arguments
searching($("#search"),$("#gallery"));