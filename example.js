define(['jquery'], function($) {
    alert('alert!');
    console.log( "this=",this );

    var target = $(this);

    target.css('background-color','blue');
    target.width(100);
    target.height(100);
});
