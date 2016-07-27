define(['jquery'], function($) {
    var target = this;
    
    target.css('background-color','#EEE');
    target.width("100%");
    target.height(300);

    target.trigger( 'ximera:answer-needed' );

    target.persistentData(function(event) {
	target.css('background-color','#DFE');
    });
    
    target.click( function() {
	target.persistentData( 'correct', true);
	target.trigger( 'ximera:correct' );
    });
});
