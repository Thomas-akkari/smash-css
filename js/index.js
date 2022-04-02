// get the current styles size, in px integer.
var maxSize = parseInt($('.range').css("font-size"));

function setBackgrounds(){
    $(".char").each((i,e) => {
        $(e).css("background-image","url(\"/img/portrait/"+e.id+".png\")")
        $(e).css("background-size","cover")
        $(e).css("background-position","right 0px bottom -5px")
        $(e).before("<div class='filter' id='filter"+e.id+"'></div>")
    });

    $(".filter").click(function (o){
        if($(o.target).is("div")){
            switchColor($(this))
        }
    })
}

function switchColor(filter){
    let color = filter.css("background-color")
    switch(color) {
        case "rgba(0, 0, 0, 0)":
            filter.css("background-color", "rgba(0, 255, 0, .5)")
            break;
        case "rgba(0, 255, 0, 0.5)":
            filter.css("background-color", "rgba(255, 0, 0, .5)")
            break;
        case "rgba(255, 0, 0, 0.5)":
            filter.css("background-color", "rgba(0, 0, 255, .5)")
            break;
        case "rgba(0, 0, 255, 0.5)":
            filter.css("background-color", "rgba(255, 202, 20, .5)")
            break;
        case "rgba(255, 202, 20, 0.5)":
            filter.css("background-color", "rgba(0, 0, 0, 0.7)")
            break;
            break;
        case "rgba(0, 0, 0, 0.7)":
            filter.css("background-color", "rgba(0, 0, 0, 0)")
            break;
        default:
            console.log("something happened rip")
            break;
    }
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