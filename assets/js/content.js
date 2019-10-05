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
      //console.log("inside buttons each: i is -> " + i + "\n view is: #" + (i+1));
      content = $("#content" + (i+1))[0];

      if (content.className.includes(substr)) {  // shrink the box, if already opened
        content.style.backgroundColor = "#010201"; //black
        // Since div's are under bootstrap's Collapse, the "show" class is automatically toggled.
        //content.className = content.className.replace(" show", '');
        //content.className = "main-content collapse";
      } else {  // expand the box, if not already expanded
         content.style.backgroundColor = "#008000"; //green
         //content.className = content.className + " show";
      }
    };
  } //catch
} // for

/*

3()-----
when one is clicked, hide the one currently being shown (by class name)
replacing that window with the new content id



*/
