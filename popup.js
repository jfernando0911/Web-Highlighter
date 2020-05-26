

const li1 = document.getElementById("add-word-or-phrase");
const li2 = document.getElementById("vocabulary");


const section1 = document.getElementById("section1-add-word-or-prhase");
const section2 = document.getElementById("section2-vocabulary");

//Section 1 

const divSourceLanguage = document.querySelector(".source-language > input");
const divTargetLanguage = document.querySelector(".target-language > input");
// const divReference = document.querySelector(".reference > input");
const divSaveButton = document.querySelector('.save-button > button');
const h2ErrorMessage = document.getElementById('section1-errorMessage');

//Section 1 - Fill Input Fields

const getInputEmptyValueSourceLanguageError = document.querySelector(".inputEmptyValueSourceLanguage");
const getInputEmptyValueTargetLanguageError = document.querySelector(".inputEmptyValueTargetLanguage");
getInputEmptyValueSourceLanguageError.style.display='none';
getInputEmptyValueTargetLanguageError.style.display='none';




li1.addEventListener("click", (e)=>{
    section1.style.display = "block";
    section2.style.display = "none";
},false);

li2.addEventListener('click', ()=>{
    section1.style.display = "none";
    section2.style.display = "block";
})



console.log(divSaveButton);



let emptyArray = [];


divSaveButton.addEventListener("click", (e)=>{

   
    let word = new Word(0, divSourceLanguage.value, divTargetLanguage.value);
    
   
    
    

    chrome.storage.local.get('testNumber2', function(value){
        
        
       
        if(isObjectEmpty(value)){
            
            chrome.storage.local.set({testNumber2:[word]});
            
            emptyInputValues(divSourceLanguage, divTargetLanguage);

        }else{
            
            word = new Word(value.testNumber2.length, divSourceLanguage.value, divTargetLanguage.value);
            
            //Aquí nos quedamos, nadamas que esta al revez highlight y definition
            value.testNumber2.push(word);

          

            debugger;   //20/02/2019, tenemos un error, cuando hay un valor nuevo en la base dadots testNumber, en lugar de, enviar un mensaje, utilizar el método onchanged del storage y buscar duplicados ahí.

            if(value.testNumber2[value.testNumber2.length-1].sourceLanguage == ''){   
                value.testNumber2.pop();
                console.log("You forgot to fill the Source Language Field");
                getInputEmptyValueSourceLanguageError.style.display = 'block';
            }else if(value.testNumber2[value.testNumber2.length-1].targetLanguage == ''){
                value.testNumber2.pop();
                console.log('You forgot the fill the Target Language Field');
                getInputEmptyValueTargetLanguageError.style.display = 'block';
            }else{
                getInputEmptyValueSourceLanguageError.style.display = 'none';
                getInputEmptyValueTargetLanguageError.style.display = 'none'; 
            }

            
            chrome.storage.local.set({testNumber2: value.testNumber2 });
            
            

            emptyInputValues(divSourceLanguage, divTargetLanguage);
            
           
            

            
        }


        
    });
    
}, false);




// Aquí estaban antes las funciones, pero agregamos el archivo popupFunctions.js al html popup.html




chrome.storage.onChanged.addListener(function(changes, namespace) {
                

    if(changes.testNumber2.newValue){
      
        // console.log('Este es el error ->', h2ErrorMessage.textContent = 'Hay un nuevo valor...');

        let tempArr=[];
       
        
        tempArr = pushSelectionValues(tempArr, changes.testNumber2.newValue);

        // console.log('tempArr.arr3 ---------->', tempArr.arr1);
        
        // for(let word of changes.testNumber2.newValue ){    // This for loop checks saves selections from the word object which helps to check duplicates
        //     tempArr.push(word.selection);                   
        // }

        
        

        if(hasDuplicates(tempArr.arr1)){
            
            chrome.storage.local.remove('testNumber2');
            tempArr.arr1=[];

            h2ErrorMessage.textContent = `It's already stored`;
            h2ErrorMessage.style.display = 'block'; //Aquí nos quedamos 04/03/2019-> Tenmos que poner el h2 en rojo como error.
            h2ErrorMessage.style.color = 'red';

            setInterval(() => {
                h2ErrorMessage.style.display = 'none';
                
            }, 1000);
            
            
            
            // allObjectsStorage.arr1.pop();
            
            // console.log('Este es el array1 sin el duplicado', allObjectsStorage.arr1);

            chrome.storage.local.set({testNumber2:changes.testNumber2.oldValue});
        }else{
            // console.log('False');
        }
        
      


    }

    


});


