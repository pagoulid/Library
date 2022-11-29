export default function ErrorMsg(validations,messages){ // takes two lists with same size , any validation that is not true alerts corresponding msg

    if(validations.length==messages.length){
        for(let index=0;index<=validations.length-1;index++){
            if(!validations[index]){
                alert(messages[index])
            }
        }
    }
    else{
        console.log('List params of function must have same size')
    }

}