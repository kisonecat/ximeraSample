define(['jquery'], function($) {
    var target = this;
    
    target.width("100%");
    target.height(300);

    target.trigger( 'ximera:answer-needed' );

    target.persistentData(function(event) {
	if (target.persistentData( 'correct'))
	    target.css('background-color','#DFE');
	else
	    target.css('background-color','#EEE');	    
    });
    
    target.click( function() {
	target.persistentData( 'correct', true );
	target.trigger( 'ximera:correct' );
    });
});
