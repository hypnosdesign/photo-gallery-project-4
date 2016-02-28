/* Galleria (Gallery) 
***********************************************/
// create overlay
var $overlay = $('<div id="overlay"></div>');
var $itemOverlay = $('<div class="item-overlay"></div>');
var $image = $('<img class="item-image">');
var $iframe = $('<iframe allowscriptaccess="always" frameborder="0" scrolling="no"></iframe>');
var $captionTitle = $('<p class="title"></p>');
var $captionDescription = $('<p class="description"></p>');
var $captionOverlay = $('<div class="caption-overlay"></div>')
var $controllers = $('<div class="controllers">'+
                        '<img class="close" src="img/icons/close.svg">'+
                        '<img class="right" src="img/icons/right.svg">'+
                        '<img class="left" src="img/icons/left.svg">'+
                      '</div>');
// all appends

//An image to itemOverlay
$itemOverlay.append($image);
//An iframe to itemOverlay
$itemOverlay.append($iframe);

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

// lightbox

$('#gallery a').click(function(e){
  e.preventDefault();

  var itemLocation = $(this).attr("href");
  
  //Update overlay with the item linked in the link
  $image.attr("src", itemLocation);
  $iframe.attr("src", itemLocation);

  //Show the overlay.
  $("#overlay").show();
  $(".item-overlay").hide().fadeIn(100);
  $(".controllers").hide().fadeIn(3000);
  
  //Get caption title text and set caption
  var captionTitleText = $(this).find(".caption-title").text();
  $captionTitle.text(captionTitleText);
  //Get caption description text and set caption
  var captionDescriptionText = $(this).find(".caption-description").text();
  $captionDescription.text(captionDescriptionText);

}) // end click gallery a

$(".controllers img.close").click(function(){
    $("#overlay").hide();
  }) // end click close controller




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