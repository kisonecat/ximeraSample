define(['jsxgraph', 'db'], function(JXG, db) {
    var target = this;
    
    target.width("100%");
    target.height(300);
    
    JXG.Options.board.showCopyright=false;

    var dx=0.1;
    var clickTime = 1000;
    var n_e_max = 3;
    var board = JXG.JSXGraph.initBoard($(target).attr('id'), {boundingbox: [-4, 2, 4, -1.7],
							      axis:false,});
    
    var xaxis = board.create(
	'axis', [[0.0,0.0], [1.0, 0.0]],
	{ticks: {drawZero: true,
		 drawLabels: true,
		 majorHeight: 15, minorHeight:5,
		 label: {offset:[-3,-15]}}
	});
    
    var n_e = board.create(
	'slider', [[-3,1.5], [-2,1.5], [0,0,n_e_max]],
	{snapWidth:1, name: "n_e", precision: 0, withTicks: false,
	});

    var Es=[];

    n_e.on("drag", function () {
	for(var i=0; i< n_e_max; i++) {
	    Es[i].setAttribute({visible: i<this.Value()});
	}
	db.n_e = n_e.Value();
    });

    E_state=[]
    
    for(var i=0; i<n_e_max; i++) {
	
	var E=board.create(
	    'glider', [i,0,xaxis],
	    {name: "E1", snapToGrid: true, snapSizeX: dx,
	     highlight: false, withLabel:false,
	     visible: n_e.Value() > i,
	    })
	
	Es.push(E);
	
	E.mouseDownTime=0;
	E.dragged=false;
	E.stable=true
	E.index = i

	E_state.push({value: E.X(), stable: E.stable })
	
	// switch stability if click (i.e., up/down in less than clickTime)
	E.on('down', function(e) {
	    this.mouseDownTime=e.timeStamp; this.dragged=false;
	});
	E.on('drag', function() {
	    this.dragged=true;
	    E_state[this.index].value = this.X();
	    db.E_state=E_state
	});
	E.on('up', function(e) {
	    if(e.timeStamp < this.mouseDownTime + clickTime && !this.dragged) {
		this.stable = !this.stable;
		if(this.stable) {
		    this.setAttribute({fillOpacity: 1});
		}
		else {
		    this.setAttribute({fillOpacity: 0});
		}
		E_state[this.index].stable = this.stable;
		db.E_state=E_state
	    }
	});
    }

    // callback if any variables from database are modified
    db( function(event) {
	n_e.setValue(db.n_e);
	E_state=db.E_state
	for(var i=0; i< n_e_max; i++) {
	    Es[i].setAttribute({visible: i< db.n_e});
	    Es[i].coords.usrCoords=[1, db.E_state[i].value,0];
	    Es[i].coords.usr2screen();
	    Es[i].stable = db.E_state[i].stable;
	    if(Es[i].stable) {
		Es[i].setAttribute({fillOpacity: 1});
	    }
	    else {
		Es[i].setAttribute({fillOpacity: 0});
	    }
	}
	board.update();
    });
});
