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


