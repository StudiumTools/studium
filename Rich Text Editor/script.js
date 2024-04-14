 // Variables
 
 let optionButtons = document.querySelectorAll(".option-button");
 let advancedOptionButton = document.querySelectorAll(".adv-option-button");
 let fontName = document.getElementById("fontName");
 let fontSizeRef = document.getElementById("fontSize");
 let writingArea = document.getElementById("text-input");
 let linkButton = document.getElementById("createLink");
 let alignButtons = document.querySelectorAll(".align");
 let spacingButtons = document.querySelectorAll(".spacing");
 let formatButtons = document.querySelectorAll(".format");
 let scriptButtons = document.querySelectorAll(".script");
 
 // List of FontLIst

 let fontList = ["Arial", "Verdana", "Times New Roman", "Garamond", "Courier New", "Cursive"];

 // Initial Settings

 const initializer = () =>{
    // Function Calls for Highlighting Buttons
    // No Highlights for link, unlik lists, undo, redo, since they  are one time operations.
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, false);
    highlighter(scriptButtons, true);

    // Create Options For Font Names
    fontList.map((value) =>{
        let option = document.createElement("option");
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    // FontSize allows only till 7
    for(let i =1; i <= 7; i++){
      let option = document.createElement("option");
      option.value = i;
      option.innerHTML = i;
      fontSizeRef.appendChild(option);  
    }

    // Default Size

    fontSizeRef.value = 3;
 };

 // Main Logic

 const modifyText = (command, defaultUi, value) => {
    // execCommand executes command on selected text
    document.execCommand(command,defaultUi,value);
 }

// For Basic operations which don't need value parameter
optionButtons.forEach(button =>{
    button.addEventListener("click", () =>{
        modifyText(button.id,false,null);
    });
})

// Options that Require Value Parameter (e.g Colors, Fonts)

advancedOptionButton.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id,false,button.value);
    });
  });

// Links

linkButton.addEventListener("click", () =>{
    let userLink = prompt("Enter a URL");
    // If Link has HTTP then pass directly else add Https
    if(/https/i.test(userLink)){
        modifyText(linkButton.id, false, userLink);
    } else{
        userLink = "https://" + userLink;
        modifyText(linkButton.id, false, userLink);
    }
});

 // Highlight clicked button

 const highlighter = (className, needsRemoval) =>{
    className.forEach((button) => {
        button.addEventListener("click", () =>{
            // needsRemoval = true means only one button should highlighted and others would be normal
            if(needsRemoval){
                let alreadyActive = false;

                // If currently clicked button is already active 
                if(button.classList.contains("active")){
                    alreadyActive = true;
                }

                //Remove Highlight from other Buttons

                highlighterRemover(className);
                if(!alreadyActive){
                    // Highlight Clicked Button
                    button.classList.add("active");
                }
            }
            else{
                // If Other buttons can be highlighted
                button.classList.toggle("active");
            }
        });
    });
 };

 const highlighterRemover = (className) => {
    className.forEach((button) => {
      button.classList.remove("active");
    });
  };

window.onload = initializer();