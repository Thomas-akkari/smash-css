// get the current styles size, in px integer.
var maxSize = parseInt($('.range').css("font-size"));

function setBackgrounds(){
    $(".char").each((i,d) => {
        $(d).css("background-image","url(\"/img/portrait/"+d.dataset.iconId+".png\")")
        $(d).css("background-size","cover")
        $(d).css("background-position","right 0px bottom -5px")
        if(!$(d).hasClass("legend"))
            $(d).before("<div class='filter' id='filter_"+d.dataset.iconId+"'></div>")
    });

    $(".filter").click(function (e){
        if($(e.target).is("div")){
            switchColor($(this))
        }
    })

    $(".legend").each((i,d) => {
        $(d).before("<div class='filter' id='filter_"+i+"'></div>")
        for (let index = 0; index <= i; index++) {
            switchColor($("#filter_"+i))
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
}

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
            decreaseSize(element)
        }            
    } else {
        maximizeSize(element)
    }
}

function main(){
    // execute it onready.
    $('.range').each(function(){
        fixSize(this)
    })

    // bind to it.
    $(function() {
        $('.range').keyup(function() {
            fixSize(this)
        })
    })

    setBackgrounds()
}

main()