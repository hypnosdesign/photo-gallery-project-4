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