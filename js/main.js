/* Galleria (Gallery) 
***********************************************/

// create overlay
var $overlay      = $('<div id="overlay"></div>');
var $itemOverlay  = $('<div class="item-overlay"></div>');
var $image        = $('<img class="item-image">');
var $iframe       = $('<iframe allowscriptaccess="always" frameborder="0" scrolling="no"></iframe>');
var $captionTitle = $('<p class="title"></p>');
var $captionDescription = $('<p class="description"></p>');
var $captionOverlay     = $('<div class="caption-overlay"></div>')
var $controllers        = $('<div class="controllers">'+
                        '<img class="close" src="img/icons/close.svg">'+
                        '<img class="right" src="img/icons/right.svg">'+
                        '<img class="left" src="img/icons/left.svg">'+
                        '</div>');



/* Funzioni (Functions) 
***********************************************/

function getLocalItem (localItem) {  
  thisItem = localItem;
  var itemLocation = $(localItem).attr("href");
     
    if(itemLocation.indexOf("youtube") > -1 || itemLocation.indexOf("vimeo") > -1){
      //Update overlay with the item linked in the link
      $iframe.attr("src", itemLocation);
      //An iframe to itemOverlay
      $itemOverlay.append($iframe);
      $('.item-image').remove();
      } else if(itemLocation.indexOf("youtube") === -1 || itemLocation.indexOf("vimeo") === -1){
        //Update overlay with the item linked in the link
        $image.attr("src", itemLocation);
        //An image to itemOverlay
        $itemOverlay.append($image);
        $('iframe').remove();
        } 

  //Get caption title text and set caption
    var captionTitleText = $(localItem).find(".caption-title").text();
    $captionTitle.text(captionTitleText);
  
  //Get caption description text and set caption
    var captionDescriptionText = $(localItem).find(".caption-description").text();
    $captionDescription.text(captionDescriptionText);
} // end getLocalItem

function getPrevItem() {
  $imageParent = $(thisItem).parent().prev();
    thisItem = $($imageParent).children("a");
      getLocalItem(thisItem);
} // end getPrevItem 

function getNextItem() {
  $imageParent = $(thisItem).parent().next();
    thisItem = $($imageParent).children("a");
      getLocalItem(thisItem);
} // end getNextItem 


// all appends
function append(){

  // Add captionOverlay
  $itemOverlay.append($captionOverlay);
  //A caption title to itemOverlay
  $captionOverlay.append($captionTitle);
  //A caption description to itemOverlay
  $captionOverlay.append($captionDescription);

  // The controllers to item-overlay
  $itemOverlay.append($controllers);

  // Add itemOverlay to overlay
  $overlay.append($itemOverlay);
  //Add overlay
  $("body").append($overlay);
} //end append



// lightbox

$('#gallery a').click(function(e){
  e.preventDefault();
  getLocalItem(this);
  append();

  $('.left').click(function() { getPrevItem(); });
  $('.right').click(function() { getNextItem(); });

  $(".controllers img.close").click(function(){
    $("#overlay").fadeOut(500, function(){
      $(this).remove();
    });
  }) // end click close controller

  //Show the overlay.
  $("#overlay").hide().fadeIn();
  $(".item-overlay").hide().fadeIn(200);
  $(".controllers").hide().fadeIn(600);
}) // end click gallery a



// Keyboard Navigation 
$("body").on("keyup", function(e){
  if(e.keyCode === 37) {
    getPrevItem();

  } else if(e.keyCode === 39) {
    getNextItem();
    
    }
}); // end Keyboard Navigation


/* Barra di ricerca (Search bar) 
***********************************************/
// I use:
// .keyup()
// :contains()

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