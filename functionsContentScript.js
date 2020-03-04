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
