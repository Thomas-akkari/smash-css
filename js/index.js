

// get the current styles size, in px integer.
var maxSize = parseInt($('.range').css("font-size"));

function setBackgrounds(){
    $(".char").each((i,e) => {
        $(e).css("background-color","lightblue")
    })

    $(".char").each((i,e) => {
        $(e).css("background-image","url(\"/img/portrait/"+e.id+".png\")")
        $(e).css("background-size","cover")
        $(e).prop("isGrey", false)
        $(e).click(function (o){
            if($(o.target).is("div")){
                let url = $(this).prop("isGrey") ? "/img/portrait/"+e.id+".png" : "/img/greyPortrait/"+e.id+".png"
                let color = $(this).prop("isGrey") ? "lightblue" : "grey"
                $(this).css("background-image","url("+url+")")
                $(this).css("background-color",color)
                $(this).prop("isGrey", !$(this).prop("isGrey"))
            }
        })
    });
}

function isOverflowed (element){

    if ( $(element)[0].scrollWidth > $(element).innerWidth() ) {
        return true;
    } else {
        return false;
    }
};

function decreaseSize (element){

    var fontSize = parseInt($(element).css("font-size"));
    fontSize = fontSize - 1 + "px";
    $(element).css({'font-size':fontSize});

}

function maximizeSize (element){

    var fontSize = parseInt($(element).css("font-size"));
    while (!isOverflowed(element) && fontSize < maxSize){
        fontSize = fontSize + 1 + "px";
        $(element).css({'font-size':fontSize});
        fontSize = parseInt($(element).css("font-size"));
        // if this loop increases beyond the width, decrease again. 
        // hacky.
        if (isOverflowed(element)){
            while (isOverflowed(element)) {
                decreaseSize(element);
            }            
        }     

    }        

}

function fixSize (element){
    if (isOverflowed(element)){
        while (isOverflowed(element)) {
            decreaseSize(element);
        }            
    } else {
        maximizeSize(element);
    }
}

// execute it onready.
$('.range').each(function(){
    fixSize(this);
});

// bind to it.
$(function() {
    $('.range').keyup(function() {
        fixSize(this);
    })
});   

function main(){
    setBackgrounds()
}

main()