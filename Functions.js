function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}



//327 
function addTitleMarks(highlightsSelected, getLocalDataChromeStorage ){
    for(let i = 0; i < highlightsSelected.length; i++){ 
      for(let j = 0; j < getLocalDataChromeStorage.length; j++){
        if(highlightsSelected[i].textContent.toLocaleLowerCase() === getLocalDataChromeStorage[j].selection.toLocaleLowerCase()){
          // console.log("Hola mundos mundos mundos");
          // console.log(typeof getLocalDataChromeStorage[j].txtTranslation);
          highlightsSelected[i].title = getLocalDataChromeStorage[j].txtTranslation;

        }
      }
      // if(highlightsSelected[i].textContent.toLocaleLowerCase() === getDataWords)
    }
  }



//---------------------------------------------------------------All Functions--------------------------------------------------//

function saludo(){
    console.log("Hola desde el backgroundScript");
}

function hasDuplicate(arr, arrPop){
    if( new Set(arr).size !== arr.length){
      arrPop.pop();
    }else{
      return;
    }
  }


function isArrayEmpty( arr ){
    if (typeof arr !== 'undefined' && arr.length > 0) {
    //La array está definida y tiene por lo menos un elemento dentro...
    console.log("La array testArra NO está vacía...");
    }else{
      console.log("está vacía");
    } 



  }


  function isEmptyObject(obj){
    return JSON.stringify(obj) === '{}';
  }


  function checkDuplicates(tempArr, arr){
    let checkDuplicatesBool = new Object();

    for(let obj in  arr){                               
      tempArr.push(arr[obj].selection);
    }

    if( new Set(tempArr).size !== arr.length){  
      arr.pop();
      checkDuplicatesBool.value = true;
    }else{
      checkDuplicatesBool.value = false;
    }

    tempArr = [];   

    return checkDuplicatesBool.value;

  }


// -----------------------------------------PopUp js------------------------------------------------------------//


function isObjectEmpty(object){

    if(Object.entries(object).length === 0 && object.constructor === Object){
        return true;
    }else{
        return false;
    }

}



function Word(id, sourceLanguage, targetLanguage) {
    this.id = id;
    this.selection = targetLanguage.toLowerCase();
    this.txtTranslation = sourceLanguage.toLowerCase();
   
}




function emptyInputValues(inputSourceLanguage, inputTargetLanguage /*, inputReference*/){
    inputSourceLanguage.value = '';
    inputTargetLanguage.value = '';
    // inputReference.value = '';
    
}




function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}



function deleteDuplicates(emptyArr, arr){
    for(let element of arr){   //Aquí nos quedamos, 20/02/2019. Estamos tratando de encontrar el duplicado del valor de sourceLanguageValue, meterlo en una arr, para después
        emptyArr.push(element.sourceLanguage); //Ver si está duplicado este valor....    
    }

    if(hasDuplicates(emptyArr)){
        console.log('Tiene duplicado, lol');
        arr.pop();
        emptyArr = [];
    }else{
        console.log("No tiene duplicado");
    }

}




function pushNewValues(arr1, arr2){
    for(let element of arr2){
        arr1.push(element);
    }



    return {arr1};
}



function pushSelectionValues(arr1, arr2){
    for(let element of arr2){
        arr1.push(element.selection);
    }

    return {arr1};
}

