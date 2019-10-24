var contents = document.getElementsByClassName("main-content");
var buttons = document.getElementsByClassName("item");
var substr = "show";

// for why we used let tmp var after initial i var: https://dzone.com/articles/why-does-javascript-loop-only-use-last-value
// ^- Solution #3. Instead of "let" inside loop. the try catch is more reliable. the try/catch block has its own scope.

// ** Button Functionality / Routing - collapse window ** //
for (var iVar = 0; iVar < buttons.length; iVar++) {
  var content;
  try{throw iVar}
  catch(i) {
    buttons[i].onclick = function() {
      content = $("#content" + (i+1))[0];

      // TODO Animation - here inside the buttons onClick

      if (!(content.className.includes(substr))) {  // shrink the box, if already opened
         clearMainContentExcept(iVar);
      }
    };
  } //catch
} // for

// ** Hide all main-content views except the one selected ** //
function clearMainContentExcept(activeWindow){
  for ( var i = 0; i < contents.length; i++) {
    if (i === activeWindow) { continue; }
    $("#content" + (i+1)).collapse('hide');
  }
}

// TODO : put this line in serperate JS file
$( "#datepicker" ).datepicker({});
