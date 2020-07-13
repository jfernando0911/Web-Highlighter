
chrome.storage.onChanged.addListener(function (changes, namespace) {
  if (changes.disableButtonValue.newValue === true) {
    console.log("It's working", changes.disableButtonValue.newValue);
    window.location.reload();




  } else {
    window.location.reload();
    console.log("It's not working", changes.disableButtonValue.newValue);
  }

})

chrome.storage.sync.get(["disableButtonValue"], function (e) {    // it seems its working / 12/07/2020
  console.log("Checking", e.disableButtonValue)
  if (e.disableButtonValue === true) {
    chrome.storage.local.get("testNumber2", function (data) {


      let tempArr = [];

      for (let element of data.testNumber2) {
        // console.log(element.selection);
        tempArr.push(element.selection);
      }


      let options = {
        // root: document.querySelector("body"),
        // '-250px -40px -250px -40px'//Aquí nos quedamo, 19/01/2019, se supone q este es el width y height del viewport
        threshold: 1
      };


      let viewPortHighlight = (entries, observer) => {                       //It works only this part
        entries.forEach((entry) => {

          let instance = new Mark(entry.target);

          if (entry.isIntersecting === true) {
            instance.mark(tempArr, {
              separateWordSearch: false,
              className: "highlightMark tooltip alreadyIntersecting",
              accuracy: "exactly",
              acrossElements: true,
              diacritics: true,
              wildcards: "disabled"
            });

          }
          else {
            instance.unmark();
          }

        });





      }

      var Interobserver = new IntersectionObserver(viewPortHighlight, options);

      chrome.storage.onChanged.addListener(function (changes, namespace) {


        if (changes.testNumber2) { //Error al paracer arreglado, 11/07/2020 Teníamos que poner que si los cambios ocurrian en testNumber2 y no en otro (disableButtonValue)
          let tempArr = [];

          tempArr.push(changes.testNumber2.newValue[changes.testNumber2.newValue.length - 1].selection);


          let options = {
            // root: document.querySelector("body"),
            // '-250px -40px -250px -40px'
            threshold: 1
          };


          let viewPortHighlight = (entries, observer) => {

            entries.forEach((entry) => {

              let instance = new Mark(entry.target);

              if (entry.isIntersecting === true) {
                instance.mark(tempArr, {
                  separateWordSearch: false,
                  className: "highlightMark tooltip alreadyIntersecting",
                  accuracy: "exactly",
                  acrossElements: true,
                  diacritics: true,
                  wildcards: "disabled"
                });

              }
              else {
                instance.unmark();
              }

            });

          }


          var Interobserver = new IntersectionObserver(viewPortHighlight, options);




          let elementes = ["span", "p", "li", "h1", "h2", "h3", "h4", "h5", "h6", "a"];

          for (let e = 0; e < elementes.length; e++) {

            let shito = document.body.getElementsByTagName(elementes[e]);


            for (let i = 0; i < shito.length; i++) {
              Interobserver.observe(shito[i]);
            }
            // console.log("Scroll");


          }

        }




      });


      //----------------------------------------------------------------------------------------//

      let isScrolling;
      let testingVar;

      let counter = 0;
      window.addEventListener('scroll', function (event) {

        window.clearTimeout(isScrolling);


        if (event) {
          //  console.log(`Evento`, event.eventPhase);

          for (let i = 0; i <= elementes.length; i++) {

            testingVar = document.body.getElementsByTagName(elementes[i]);


          }

        }
        // debugger;

        counter = counter + 1;
        if (counter > 25) {

          Interobserver.disconnect();

          counter = 0;
        } else if (counter < 25) {
          isScrolling = setTimeout(function () {

            for (let e = 0; e < elementes.length; e++) {

              let shito = document.body.getElementsByTagName(elementes[e]);


              for (let i = 0; i < shito.length; i++) {
                Interobserver.observe(shito[i]);

              }
              console.log("Scroll");


            }

            counter = 0;
            console.log('Scrolling has stopped.');


          }, 1000);
        }




      }, false);







      let elementes = ["span", "p", "li", "h1", "h2", "h3", "h4", "h5", "h6", "a"];


      //-----------------------------------------------------------------------------------------------------------------------//

      let targetNode = document.querySelector("body");
      let config = {

        attributes: false,
        childList: true,
        subtree: true

      };



      let callback = (mutationsList, observer) => {




        for (let mutation of mutationsList) {


          if (mutation.addedNodes) {



            observer.disconnect();

            setTimeout(() => {

              for (let e = 0; e < elementes.length; e++) {

                let targetElements = document.body.getElementsByTagName(elementes[e]);

                for (let i = 0; i < targetElements.length; i++) {

                  Interobserver.observe(targetElements[i]);

                }

              }

              observer.observe(targetNode, config);


            }, 500);

          }

        }

        let selectingHighlightMarks = document.querySelectorAll(".tooltip");


        chrome.storage.local.get((data) => {

          addTitleMarks(selectingHighlightMarks, data.testNumber2);

        });


      };





      let observerMutation = new MutationObserver(callback);


      observerMutation.observe(targetNode, config);



    });





    var Element = function (nameElement, widthElement, heightElement, backgroundColorElement) {
      this.nameElement = nameElement;
      this.widthElement = widthElement;
      this.heightElement = heightElement;
      this.backgroundColorElement = backgroundColorElement;

      this.element = document.createElement(nameElement);
      this.element.style.width = widthElement + "px";
      this.element.style.height = heightElement + "px";
      this.element.style.backgroundColor = backgroundColorElement;

    }




    let p;



    let shadowElement = new Element("div");
    shadowElement.element.className = "ShadowElement";
    shadowElement.element.setAttribute("id", "ShadowElement");
    /* shadowElement.element.style.display = "none"; */
    /* let root = shadowElement.element.createShadowRoot();    */

    let root = shadowElement.element.attachShadow({ mode: 'open' });

    document.body.appendChild(shadowElement.element);


    //--------------------------------------------BaseDiv -----------------------------------------------------////#endregion

    /* let host = document.querySelector(".ShadowElement"); */

    let styleElement = document.createElement("style");
    styleElement.innerHTML = `
    
    
    
    #divBaseContextMenu{
      
      // display: flex;
      // flex-direction: column;
      // justify-content:space-between;
      display:none;
      position: absolute;
      background-color: #FFFFFF;
      font-size: 18px;
      line-height: 1.4;
      box-shadow: 0 6px 10px 0 rgba(0,0,0,.5),0 1px 8px -3px rgba(0,0,0,.5),0 2px 16px 0 rgba(0,0,0,.5);
      z-index:1000;
    
    }
    
    #divBaseXElement{
      
      position:relative;
      width: 100%;
      height: 25px;
      background-color: red;
      text-align: right;
      z-index: 2;
      box-sizing: border-box;
    }
    
    #spanXElement{
      position: relative;
      color: black;
      right: 5px;
      font-family: Verdana,sans-serif;
      font-size: 18px;
      cursor: pointer;
    }
    
    #spanXElement:hover{
      color: white;
    
    }
    
    
    
    
    #paragraphTextHighlight{
      margin-top:0;
      margin-bottom:2.5px;
      font-size: 16px;
      font-family: Verdana, sans-serif;
      
    }
    
    
    
    #textAreaElement{
      position: relative !important;
      width: 97% !important;
      height: 16% !important; 
      resize:none;
      disabled;
    }
    
    #paragraphTextHighlight2{
      
      font-size: 16px;
      font-family: Verdana, sans-serif;
      
    }
    
    
    #textAreaElement2{
      position: relative !important;
      
      width: 97% !important;
      height: 16% !important;  //Before 23%
      margin-top:0;
      top: -2px;
      resize:none;
      
    }
    
    #inputElement{
      position: relative;
      width: 95%;
      height: 8%;
      left: 3px;
      top: -4px;
    }
    
    #saveButton{
      // position: relative; 
      background-color: #6441a4;
      width: 98%;
      padding: .2rem .4rem;
      border: transparent;
      color: white;
      border-radius: 4px;
      // left:2px;
      // top: 2px;
      margin-bottom:2px;
      align-self: center;
      
    }
    
    #saveButton:hover{
      background-color: #6441E1;
    }
    
    #paragraphDuplicates{
      position:relative;
      color:white;
      font-size: 12px;
      top: -33px;
      left: -60px;
      z-index: 1;
    }
    
    
    
    #divBasePopUp{
      display:none;
      position: absolute;
      background-color:white;
      box-shadow: 0 6px 10px 0 rgba(0,0,0,.5),0 1px 8px -3px rgba(0,0,0,.5),0 2px 16px 0 rgba(0,0,0,.5);
      z-index: 999;
    }
    
    #divBasePopUpParagraph{
      background-color: blue;
      margin-left: 10px;
      width: 100%;
      color: white;
      position: relative;
      box-shadow: 0 4px 2px -2px gray;
      font-size: 18px;
      font-family: Arial,"Helvetica Neue",Helvetica,sans-serif;
      line-height: 1.4;
      margin: 0px 0px 16px 0px;
      z-index: 999;
    }
    
    #divBasePopUpParagraphTranslation{
      position:relative;
      display:block;
      z-index: 999;
      
    }
    
    #createErrorPforTextArea{
    position:relative;
    color:white;
    font-size: 12px;
    top: -33px;
    left: -28px;
    z-index: 1;
    }
    
    
    
    `;


    root.appendChild(styleElement);

    //----------------------------------------------------------------divBaseContextMenu----------------------------------------------------//
    let divBaseContextMenu = new Element("div", 200, 200);
    divBaseContextMenu.element.setAttribute("id", "divBaseContextMenu");


    //----------------------------------------------------------------divBaseXElement-------------------------------------------------------//  
    let divBaseXElement = new Element("div");
    divBaseXElement.element.setAttribute("id", "divBaseXElement");

    divBaseContextMenu.element.appendChild(divBaseXElement.element);

    //-----------------------------------------------------------Paragraph1---------------------------//
    let paragraphTextHighlight = new Element("p");
    paragraphTextHighlight.element.setAttribute("id", "paragraphTextHighlight");
    paragraphTextHighlight.element.textContent = "Highlight:";
    divBaseContextMenu.element.appendChild(paragraphTextHighlight.element);


    //------------------------------------------------------------TexTAreaElement----------------------------------------------------------//

    let textAreaElement = new Element("textarea");
    textAreaElement.element.setAttribute("id", "textAreaElement");

    divBaseContextMenu.element.appendChild(textAreaElement.element);

    //------------------------------------------------------------Paragraph2----------------------------------//

    let paragraphTextHighlight2 = new Element("p");
    paragraphTextHighlight2.element.setAttribute("id", "paragraphTextHighlight");
    paragraphTextHighlight2.element.textContent = "Description (Optional):";
    divBaseContextMenu.element.appendChild(paragraphTextHighlight2.element);


    //-----------------------------------------------------------TextAreaElement2---------------------------------------------------------//
    let textAreaElement2 = new Element("textarea");
    textAreaElement2.element.setAttribute("id", "textAreaElement");

    divBaseContextMenu.element.appendChild(textAreaElement2.element);



    //-------------------------------------------------------------InputElement -> For tags future---------------------------------------//
    //----------------------------------------------------------------spanXElement---------------------------------------------------------//
    let spanXElement = new Element("span");
    spanXElement.element.setAttribute("id", "spanXElement");
    spanXElement.element.textContent = "[x]";

    divBaseXElement.element.appendChild(spanXElement.element);


    spanXElement.element.addEventListener("click", function () {
      divBaseContextMenu.element.style.display = "none";




    });


    //------------------------------------------------------------ButtonElement----------------------------------------------------------//

    let saveButton = new Element("button");
    saveButton.element.setAttribute("id", "saveButton");
    saveButton.element.textContent = "SAVE";

    divBaseContextMenu.element.appendChild(saveButton.element);         // Aquí me quedé - > Le agregué box-shadow al divBaseContextMenu 26-10-2018


    //---------------------------------------------------------MouseOverElement--------------------------------------------------------////
    let divBasePopUP = new Element("div", 200, 100);
    divBasePopUP.element.setAttribute("id", "divBasePopUp");

    //-----------------------------------------------------MouseOverElement->Paragraph-------------------------------------------------///
    let divBasePopUpParagraph = new Element("p");
    divBasePopUpParagraph.element.setAttribute("id", "divBasePopUpParagraph");
    divBasePopUpParagraph.element.textContent = "Translation:";


    divBasePopUP.element.appendChild(divBasePopUpParagraph.element);

    //-----------------------------------------------------MouseOverElement -> Paragraph Translation ----------------------------------//
    let divBasePopUpParagraphTranslation = new Element("p");
    divBasePopUpParagraphTranslation.element.setAttribute("id", "divBasePopUpParagraphTranslation");

    divBasePopUP.element.appendChild(divBasePopUpParagraphTranslation.element);

    root.appendChild(divBasePopUP.element);



    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

      if (request.action == true) {
        p = document.createElement("p");
        p.setAttribute("id", "paragraphDuplicates");
        p.textContent = "Error: It's already stored";
        divBaseXElement.element.appendChild(p);


        if (divBaseContextMenu.element.querySelectorAll("#paragraphDuplicates").length > 1) {
          divBaseXElement.element.removeChild(p);
        }
        sendResponse({ farewell: "what" });

      }


    });





    //---------------------------------If we click outside the shadowElement the display of the DivBaseContextMenu is none------------------//



    document.addEventListener('click', function (e) {
      if (e.target !== document.querySelector(".ShadowElement")) {
        divBaseContextMenu.element.style.display = "none";
        // inputElement.element.value = "";
        if (divBaseContextMenu.element.contains(p)) {
          divBaseXElement.element.removeChild(p);
        }

        let selectCreateErrorPForTextArea = divBaseXElement.element.querySelector("#createErrorPforTextArea");
        if (selectCreateErrorPForTextArea) {
          divBaseXElement.element.removeChild(selectCreateErrorPForTextArea);
        }


      }



    }, false);





    //---------------------------------if we click the save button we will save the input Value of inputElement--------------------------------------------------------------------------//







    saveButton.element.addEventListener("click", function (e) {

      // console.log("El tipo de textAreaElement es : -------------->", typeof textAreaElement.element.value);

      divBaseContextMenu.element.style.display = "none";




      if (divBaseXElement.element.contains(p)) {
        divBaseXElement.element.removeChild(p);
      } else {
        console.log("No lo contiene...");
      }






      chrome.runtime.sendMessage({
        greeting: true,
        txtSelection: textAreaElement.element.value.trim(),
        txtTranslation: textAreaElement2.element.value.trim(),
        pageUrl: referenceUrl
      });









    }, false);


    //------------------------------------------------------------------------------------------------------------------------------------//


    root.appendChild(divBaseContextMenu.element);


    var mensaje;
    var seleccion;
    var refenceUrl;





    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {


      seleccion = message.selectionText;
      mensaje = message.seleccionBool;
      referenceUrl = message.referenceUrl;              //Getting message, selectionbool, referenceurl from backgroundScript to send it back when save button pressed



      if (message.seleccionBool) {

        chrome.storage.sync.get(['disableButtonValue'], function (result) {
          console.log('Value currently is ' + result.disableButtonValue);
          // console.log('TypeOf ', typeof result.disableButtonValue);
        });


        let coordenates = {
          textSelection: window.getSelection(),
          get range() { return this.textSelection.getRangeAt(0) },
          get oRect() { return this.range.getBoundingClientRect() },
          get selectionParentNode() { return this.textSelection.anchorNode.parentNode },
        }

        function setParameters({ textSelection, oRect, selectionParentNode }) {

          let selectionFontSize = window.getComputedStyle(selectionParentNode).getPropertyValue('font-size').replace("px", "");   //We used .replace to remove the px 

          divBaseContextMenu.element.style.display = "block";

          divBaseContextMenu.element.style.top = Number(pageYOffset) + Number(oRect.top) + (Number(selectionFontSize) + 5) + "px"; //Aquí me quedé calculando el tamaño de la letra 23/10/2018

          let bodyClientWidth = document.body.clientWidth;
          let divBaseContextMenuWidth = divBaseContextMenu.element.style.width.replace("px", "");        //We remove the px from the width of divBaseContextMenu to do operations 

          textAreaElement.element.value = textSelection.toString();
          textAreaElement2.element.value = "";

          if ((Number(divBaseContextMenuWidth) + oRect.left) > bodyClientWidth) {
            let operation = bodyClientWidth - divBaseContextMenuWidth;
            divBaseContextMenu.element.style.left = operation - 5 + "px";
          } else {
            divBaseContextMenu.element.style.left = oRect.left + "px";
          }

        }


        setParameters(coordenates);


      }


    });




  }


})


