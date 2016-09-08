define(['jquery', 'desmos'], function($, Desmos) {
    var target = this;

    target.width("100%");
    target.height(360);
    
    var calc = Desmos.Calculator( target, {expressionsCollapsed:true} );
    calc.setExpression({latex:"f(x)= x^2/5 -3", color:"blue"});
    calc.setExpression({latex:"a=0",sliderBounds: {min: -10,max: 10}});
    calc.setExpression({latex:"(a,f(a))", color:"red"});
    calc.setExpression({latex:"h=2", sliderBounds: {min: -5,max: 5}});
    calc.setExpression({latex:"(a+h,f(a+h))",color:"green"});
    calc.setExpression({latex:"(2a/5)(x-a) + f(a)", color:"red"});
    calc.setExpression({latex:"((f(a+h)-f(a))/h)(x-a) + f(a)", color:"green"});
});
