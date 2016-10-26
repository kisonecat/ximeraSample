define(['jquery', 'db', 'reset', 'arguments'], function($, db, reset, arguments) {
    var target = this;

    console.log(arguments);
    
    target.width("100%");
    target.height(300);

    target.trigger( 'ximera:answer-needed' );

    db(function(event) {
	if (db.correct)
	    target.css('background-color','#DFE');
	else
	    target.css('background-color','#EEE');	    
    });
    
    target.click( function() {
	db.correct = true;
	target.trigger( 'ximera:correct' );
    });

    reset( function() {
	db.correct = false;
    });
});
