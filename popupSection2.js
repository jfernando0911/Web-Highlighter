//It doesnt update the table of words, when theres a new one. Unless, we close the popup html and click on vocabulary again.
// let selectTable = document.getElementsByClassName("thisClass");
// let converting = Array.from(selectTable);

// // console.log(selectingTable);
// // let convertedTo = Array.from(selectingTable);
// console.log(selectTable);


chrome.storage.local.get("testNumber2", function(data){
    // console.log(data.testNumber2);


   let table = {
        database: data.testNumber2,
        iterateDataBase: function(){
            for(let word of this.database){
                // console.log("This set of words ->", word);   <- This iterate the whole database
            }
        },
        insertTableData: function(){
            let selectTable = document.getElementById("table-words");
            console.log(selectTable);
            for(let tr of data.testNumber2){
                let createTr = document.createElement("tr");
                

               
                for(let i = 0; i <= Object.keys(tr).length; i++){
                    //  
                    console.log("--------------------------->", i); //Si solo hay 4 campos, ponemos x , sino no ponemos nada ese es el error.

                    if(i === 0){
                        // console.log("En el uno");
                        let createTd = document.createElement("td");   //Se supone que tenemos que crear un elemento cada vez, q qureamos agregar un nuevo td.
                        createTd.textContent = tr.id;                   // 23/04/2019
                        createTr.appendChild(createTd);
                    }else if( i === 1){
                        let createTd = document.createElement("td"); 
                        // console.log("En el dos");
                        createTd.textContent = tr.selection;
                        createTr.appendChild(createTd);
                    }else if( i === 2){
                        //console.log("En el tres");
                        let createTd = document.createElement("td");
                        createTd.textContent = tr.txtTranslation;
                        createTr.appendChild(createTd);
                    }else if (i == 3){
                        //console.log("En el cuatro")
                        let createTd = document.createElement("td");
                        let createLink = document.createElement("a");
                        let urlFindingRegexExp = /https|http/gi;


                        if(tr.referenceUrl != ""){
                            
                            if(urlFindingRegexExp.test(tr.referenceUrl)){
                                // console.log("There's an url"); //if urlFindingRegexExp find an url then it adds the Link in its textContent
                                createLink.textContent = "Link" ;   
                                createLink.setAttribute("href", tr.referenceUrl);
                                createLink.setAttribute("target", "_blank");
                                createTd.appendChild(createLink);
                            }else{

                                createLink.textContent = "No link";
                                createTd.appendChild(createLink);
                                // console.log("No es verdad...");
                            }


                            // createLink.textContent = "Link" ;   //Aquí nos quedamos, 24/04/2019 -> En vez de poner el link, pone otra link
                            // createLink.setAttribute("href", "#");
                            // createTd.appendChild(createLink);
                            // console.log("Aquí están los links: ", tr.referenceUrl); //Aquí nos quedamos, de todas maneras, pone como links cualquier tr.Reference url
                                                                                    //18/05/2019 https://stackoverflow.com/questions/10625497/regex-to-check-if-http-or-https-exists-in-the-string
                        }
                        

                    
                        
                        // console.log(createLink);
                        createTr.classList.add("thisClass");
                        createTr.appendChild(createTd);
                    }else{
                        let createTd = document.createElement("td");
                        createTd.addEventListener("click",(e)=>{
                            // console.log(data.testNumber2);
                            chrome.storage.local.get("testNumber2", function(items) {
                                // console.log(items.testNumber2[0]);
                                let tempArray = [];
                                for(items of items.testNumber2){
                                    console.log(items.id);
                                    if(items.txtTranslation !== e.target.parentNode.parentNode.children[1].textContent){
                                        // chrome.storage.local.set({testNumber2: data.testNumber2});
                                         tempArray.push(items);
                                         e.target.parentNode.parentNode.remove();
                                    }
                                    chrome.storage.local.set({testNumber2: tempArray});
                                    // console.log();
                                }
                                // for(let items of testNumber2){
                                //     console.log(items);
                                    

                                // }
                                // Remove one item at index 0
                                // items.users.splice(0, 1);
                                // chrome.storage.set(items, function() {
                                //     alert('Item deleted!');
                                // });
                            });

                            // console.log(e.target.parentNode.style.backgroundColor);
                            // e.target.parentNode.parentNode.remove();
                            

                        });
                        createTd.innerHTML = "<p>X</p>";
                        createTr.appendChild(createTd);
                    }
                    
                }

                

               
                selectTable.appendChild(createTr); //Aquí nos quedamos, 19/04/2019
            }
            
        },
        getCVSFormatArr: function(database){
            let tempArr =[];
                for(let element of database){
                    let newString = element.id + "," + element.txtTranslation + "," + element.selection +"," + element.referenceUrl;
                    tempArr.push(newString);
                }
                return tempArr.join("\n");
        },
        createCVSLink:function(fileFormat, contentType, elementName, FileName, elementTextContent){
        //    let contentType = contentType; //Se supone que el error está en excel y no como lo descargamos, etc. Borrar elotro link, 25/05/2019 Aquí nos quedamos.

           let csvFile = new Blob([fileFormat], {type: contentType});
           
           let a = document.createElement(elementName);
           a.download = FileName;
           a.href = window.URL.createObjectURL(csvFile);
           a.textContent = elementTextContent;
           
           a.dataset.downloadurl = [contentType, a.download, a.href].join(':');
           return a;
        },
        DownloadVocabulary: function(){
            //  console.log("Hello from inside the table, we are getting this ------------->", this.getDownloadVocabularyButton);
            // let getDownloadVocabularyButton = document.getElementById("downloadVocabulary");
            //  getDownloadVocabularyButton.addEventListener("click", function(){
            //      console.log("Este es el vocabulary BUtton"); //Aquí nos quedamos, 21/05/2019. Tenemos que descargar el vocabulario..
            //      let section2 = document.getElementById("section2-vocabulary");
            // console.log(section2);

             
            //  });


            //Aquí nos quedamos, 27/05/2019 -> fraccionamos el código un poco...

            

             

             let getDivDownload = document.getElementById("DownLoadLink");
            
            
             let CSV = this.getCVSFormatArr(this.database); 


           
           
           //--------------------------------------------------------------Primera Solución -------------------------------------------//
           
        //    let contentType = 'data:text/csv'; //Se supone que el error está en excel y no como lo descargamos, etc. Borrar elotro link, 25/05/2019 Aquí nos quedamos.

        //    let csvFile = new Blob([CSV], {type: contentType});
           
        //    let a = document.createElement('a');
        //    a.download = 'my.csv';
        //    a.href = window.URL.createObjectURL(csvFile);
        //    a.textContent = 'Download Vocabulary as CVS';
           
        //    a.dataset.downloadurl = [contentType, a.download, a.href].join(':');
         

        //    this.createCVSLink(CSV, 'data:text/csv',  "a", "myVocabulary.cvs", "Download vocabulary as cvs");

      


           getDivDownload.appendChild(this.createCVSLink(CSV, 'data:text/csv',  "a", "myVocabulary.csv", "Download vocabulary as cvs"));
            
     


            debugger;
            
            
           
        }
    }

    let getVocabularyInput = document.getElementById("input-vocabulary");
    
        

    getVocabularyInput.addEventListener("keyup",(e)=>{    //Aquí nos quedamos, 01/05/2019
        let selectTable = document.getElementById("table-words");
        let trs = selectTable.getElementsByTagName("tr");
        // let td = tr[2].getElementsByTagName("td");
        let td;

        for(let i = 1; i < trs.length; i++){
            // console.log(trs[i]);
            td = trs[i].getElementsByTagName("td");

            // console.log(td[1].textContent); //Aquí nos quedamos, 13/05/2019 -> Tenemos que ocultar los tr cuando encontremos el indexof de algo.

            // console.log(td[1].parentNode); //En teoría ya funciona, sólo modificar el display block y none, 15/05/2019
            
            // console.log(td[1].textContent.toLowerCase());

            if(td[1].textContent.toUpperCase().indexOf(getVocabularyInput.value.toUpperCase()) > -1){
                console.log(td[1].textContent);
                td[1].parentNode.style.display= "table-row";
                 
            }else if(td[0].textContent.toUpperCase().indexOf(getVocabularyInput.value.toUpperCase()) > -1){
                td[0].parentNode.style.display = "table-row";
                
            }else if(td[2].textContent.toUpperCase().indexOf(getVocabularyInput.value.toUpperCase()) > -1){
                td[2].parentNode.style.display = "table-row";
            }else if(td[3].textContent.toUpperCase().indexOf(getVocabularyInput.value.toUpperCase()) > -1){
                td[3].parentNode.style.display = "table-row"; //Aquí nos quedamos, 17/05/2019 -> si pnemos soruce language, target language, id o reference aparece
                                                              // en el buscador, tratar de programar más para alargar los minutosq programamo.
            }
            else{
                td[1].parentNode.style.display= "none";
            }
            
            // if(td[0].textContent.toUpperCase().indexOf(getVocabularyInput.value.toUpperCase()) > -1){
            //     console.log(td[0].textContent);
               
               
            // }else{
            //     td[0].parentNode.style.display = "none";
            // }
            
            


            
            //https://stackoverflow.com/questions/20798477/how-to-find-index-of-all-occurrences-of-element-in-array

            //Aquí nos quedamos, no encuentra la palabra sonid, pero puede ser porque solamente enecuentra el primer resultado...; 14/05(2019);




        }
        
        // for(let tr of trs){
        //     td = tr.getElementsByTagName("td"); //No podemos obtener el textCONTENT de getElementsBy, aquí nos quedamos, 10/05/2019
        //     console.log(td[2].textContent);
            
        //     // debugger;
        //     //Aquí nos quedamos, 11/05/2019, todavía no podemos obtener el textContent

            


        //     // console.log(td[1]); //Aquí nos quedamos, 09/05/2019

        // }

        // debugger;


        // console.log(e);
        // console.log("Input Value: ",getVocabularyInput.value); //Aquí nos quedamos, una vez q obtegamos el valor de input, tenemos que buscar en cada td el resultado.
    });                                                        //08/05/2019


    // let getDownloadVocabularyButton = document.getElementById("downloadVocabulary");
    // getDownloadVocabularyButton.addEventListener("click", function(){
    //     console.log("Este es el vocabulary BUtton"); //Aquí nos quedamos, 21/05/2019. Tenemos que descargar el vocabulario..
    // })
    
    table.iterateDataBase();
    table.insertTableData();
    // table.helloWorld();
    table.DownloadVocabulary();

});
