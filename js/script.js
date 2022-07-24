// pop up
$(document).ready(function() {	

    var id = '#dialog';

    //Get the screen height and width
    var maskHeight = $(document).height();
    var maskWidth = $(window).width();

    //Set heigth and width to mask to fill up the whole screen
    $('#mask').css({'width':maskWidth,'height':maskHeight});
    
    //transition effect		
    $('#mask').fadeIn(500);	
    $('#mask').fadeTo("slow",0.9);	

    //Get the window height and width
    var winH = $(window).height();
    var winW = $(window).width();
          
    //Set the popup window to center
    $(id).css('top',  winH/2-$(id).height()/2);
    $(id).css('left', winW/2-$(id).width()/2);

    //transition effect
    $(id).fadeIn(2000); 	

//if close button is clicked
$('.window .close').click(function (e) {
    //Cancel the link behavior
    e.preventDefault();
    
    $('#mask').hide();
    $('.window').hide();
});		

//if mask is clicked
$('#mask').click(function () {
    $(this).hide();
    $('.window').hide();
});		

});



// pop up



// count up me 
window.onload = ()=>{
    // $(selector).countMe(delay,speed)
    $("#num1").countMe(1,1.5);
    $("#num2").countMe(3,3);
    $("#num3").countMe(4,5);
 }
// count up me 
// animate css 
// animate css 
// date and time 

$(function () {
    $('#datetimepicker1').datetimepicker();
});





// date and time 



// slider 
$(function(){

    let i=0;
    function change(){  
        ++i;
        $($("main div")[i-1]).animate({width:"10%"},0.01).removeClass("a");
        $($('.slide li')[i-1]).removeClass("b");
        if(i==5){
            i=0;
        }
        $($("main div")[i]).animate({width:"50%"}).addClass("a");
        $($('.slide li')[i]).addClass("b");
    }
    var a=setInterval(change,2000);
    
    let j=0;    
    $('main div').click(function(){
        clearInterval(a);
        j=$(this).index();
        if(j!=0 || j!=4){
            $('span').removeClass('c');
        }
        if($(this).hasClass("a")){}
        else{
            $('main div').animate({width:"10%"},0.5).removeClass('a');
            $('.slide li').removeClass('b');
            $(this).animate({width:"50%"},200).addClass('a');
            $( $('.slide li')[$(this).index()] ).addClass('b');
        }
    });
    
    $('span').click(function(){
        clearInterval(a);
        j=$('.a').index();
        if(j==0 && $(this).hasClass('prev')){
            $($('main div')[0]).animate({width:"10%"},0.01).removeClass("a")
            $($('.slide li')[0]).removeClass("b");
            $($('main div')[4]).animate({width:"50%"},200).addClass("a")
            $($('.slide li')[4]).addClass("b");
        }
        else if(j==4 && $(this).hasClass('next')){
            $($('main div')[4]).animate({width:"10%"},0.01).removeClass("a")
            $($('.slide li')[4]).removeClass("b");
            $($('main div')[0]).animate({width:"50%"},200).addClass("a")
            $($('.slide li')[0]).addClass("b");
        }
        else{
            if($(this).hasClass("prev")){
                $($('main div')[j]).animate({width:"10%"},0.01).removeClass("a")
                $($('.slide li')[j]).removeClass("b");
                $($('main div')[j-1]).animate({width:"50%"},200).addClass("a")
                $($('.slide li')[j-1]).addClass("b");
            }
            else{
                $($('main div')[j]).animate({width:"10%"},0.01).removeClass("a")
                $($('.slide li')[j]).removeClass("b");
                $($('main div')[j+1]).animate({width:"50%"},200).addClass("a")
                $($('.slide li')[j+1]).addClass("b");
            }
        }
            
    });

});
// slider
// image 
var data = [
    {speed:30,blur:3,scale:.8},
    {speed:40,index:2},
    {speed:30,blur:2,scale:.7},
    {speed:60,index:2},
    {speed:20,blur:3,scale:.5},
    {speed:30,index:2},
    {speed:50},
    {speed:30,index:2,scale:.5},
];
$('img').each(function(i,o){
    $(this).parallax(data[i]);
});
// image 

// color change 
$(function(){
    // fade out black mask on load for smooth page reveal
    $('div#mask').fadeOut(5000);

    // call hueristics plugin with default params
    // this will change the page background color
    // which will 'shine' through the transparent
    // body background image.
    $('body').hueristics();


    // unneccesary (but fun!) function to swirl the stars
    var s=0,b=0,m=0,f=0,timer;
    function stars(b,m,f,distance){
        // set relative distance to move layers
        b+=distance[0];
        m+=distance[1];
        f+=distance[2];
        // move position right and left
        $('div.stars#back').css('background-position',b+'px 0px');
        $('div.stars#middle').css('background-position',m+'px 0px');
        $('div.stars#front').css('background-position',f+'px 0px');
        // do it again
        timer = setTimeout(function(){
            stars(b,m,f,distance)
        },20);
    }
    stars(0,0,0,[.5,-.5,-1]);
    // end star animate function


})


