 chrome.contextMenus.create(
    {title:"Highlight text:  '%s'",contexts: ["selection"], "onclick": onRequest}
  
  );
 
  
  let testValue = true;
 
  let data2 = new Object;
  
  let otroTestArray = new Array();
 



 






  function onRequest(info) {
    
    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      // console.log(tabs[0].id);
      chrome.tabs.sendMessage(tabs[0].id, {seleccionBool: true, selectionText: info.selectionText, referenceUrl: info.pageUrl, todalaInfo: info},  function() {
        
          // console.log(response.farewell);                                         
        
      
      });

    });

  };

    
    

  
    chrome.runtime.onMessage.addListener(                                           
      function(request, sender, sendResponse) {                                     
        // console.log(sender.tab ?                                                    
        //             "from a content script:" + sender.tab.url :
        //             "from the extension", request.greeting,
        //             "sender qué es? ", sender.id);
        // console.log("El botón save ha sido presionado...");                         
        //   console.log(request.txtSelection, request.pageUrl);
          
          
        //   let popUpId = "bnlgfpgjfhinbjheabmilbmjgponfdan";   
                                                              
          // if(sender.id == popUpId){                           
          //   if(request.greeting == "shit"){
          //     // console.log(`Lmao! from ${sender.id}`);
          //     sendResponse({farewell: "saludos desde el backgroundScript"});
              
          //     return true;
          //   }else if(request.otroMensaje == "holaaaa"){
          //     sendResponse({mensajeBackground: "este es otro mensaje desde l background xd"});
          //     return true;
          //   }
          // }

          
        if (request.greeting == true){
          
          

          // console.log("txtTranslation: ", request.txtTranslation);

          data2 = new Object;
    
          data2.id = 0;
          data2.selection = request.txtSelection;   
          data2.txtTranslation = request.txtTranslation;  
          data2.referenceUrl = sender.tab.url;

          chrome.storage.local.get("testNumber2", function(data){


            if(isEmptyObject(data)){                                      
              
              chrome.storage.local.set({testNumber2 : [data2]});          
                                                                          

                            
            }else{                                                     
             
              

              data2.id = data.testNumber2.length;              
                                                                                                                                      
              data.testNumber2.push(data2);                               
              
              //------------------------------------------Aquí empieza el test ---------------------------------------------------------//


              
              
             
              if(checkDuplicates(otroTestArray, data.testNumber2)){
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                  chrome.tabs.sendMessage(tabs[0].id, {action: true}, function(response) {
                    console.log("We got it... -> ", response.farewell);
                  });  
              });

              }

              checkDuplicates(otroTestArray, data.testNumber2);

      
  

              chrome.storage.local.set({testNumber2: data.testNumber2}); 

             
            }




                        

          });
          

         
        }                                               
          
       
      });
    
    
    