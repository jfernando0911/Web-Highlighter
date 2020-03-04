

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
