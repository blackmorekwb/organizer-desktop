var contents = document.getElementsByClassName("main-content");
var buttons = document.getElementsByClassName("item");
var substr = "show";

// for why we used let tmp var after initial i var: https://dzone.com/articles/why-does-javascript-loop-only-use-last-value
// resource: https://www.youtube.com/watch?v=XQEfWd1lh4Q onclick expand div

// ** Button Functionality / Routing - collapse window ** //
for (var iVar = 0; iVar < buttons.length; iVar++) {
  var content;
  try{throw iVar}
  catch(i) {
    buttons[i].onclick = function() {
      content = $("#content" + (i+1))[0];

      if (content.className.includes(substr)) {  // shrink the box, if already opened
        content.style.backgroundColor = "#010201"; //black
        // Since div's are under bootstrap's Collapse, the "show" class is automatically toggled.
        //content.className = content.className.replace(" show", '');
        clearMainContentExcept(i+0);
      } else {  // expand the box, if not already expanded
         content.style.backgroundColor = "#008000"; //green
         //content.className = content.className + " show";
      }
    };
  } //catch
} // for

function clearMainContentExcept(window){
//  for (var i = 0; i < contents.length; i++){  }
  //debugger; // for in or with the i interval

  for ( var i = 0; i < contents.length; i++) {
    //debugger; //first the repace line is bad. get rid of [0] - content is still set from above, not reset in this block
      //then pull window param in and have it not reset that one.
    content[0].className = content[0].className.replace(" show", '');
    //debugger;
  }
  /*
  for (content in contents) {
    debugger;
    content[0].className = content[0].className.replace(" show", '');
    debugger;
  }  */
}

// TODO : put this line in serperate JS file
$( "#datepicker" ).datepicker({});
