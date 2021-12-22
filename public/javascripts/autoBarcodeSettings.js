function extractFileDimensions(src){
    let img=document.createElement('img')
    img.src=src
    img.onload = function() {
        var w = img.width;
        var h = img.height;
        let sizeSelect=$('select#inputSize')
        let option=document.createElement('option')
        let highestValue
        if(w>h){
            option.value=w
            option.textContent=w+"px"
            highestValue=w
        }else{
            option.value=h
            option.textContent=h+"px"
            highestValue=h
        }
        sizeSelect.append(option)
        $(`select#inputSize option[value=${highestValue}]`).attr('selected','selected')
        $('button#rerun').trigger('click')
    }
}
function iterPatchSize(){
    let jQpatchSize=$('select#patchSize')
    let patchSize=$('select#patchSize')[0]
    let selectedPatchSize=patchSize.selectedIndex
    let patchSizeOptions=patchSize.length
    if(selectedPatchSize==(patchSizeOptions-1)){
        let newSelection=0
        let option=$(`select#patchSize option:nth(${newSelection})`)
        if(option.attr('tested')){
            return;
        }else{
            option.attr('selected','selected')
            option.attr('tested','true')
        }
    }else{
        let newSelection=selectedPatchSize+1
        let option=$(`select#patchSize option:nth(${newSelection})`)
        if(option.attr('tested')){
            return;
        }else{
            option.attr('selected','selected')
            option.attr('tested','true')
        }


    }
    jQpatchSize.trigger('change')
    $('button#rerun').trigger('click')
}

$('document').ready(function(){



})
