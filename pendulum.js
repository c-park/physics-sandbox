window.addEventListener('load', () => {
	
	//Fetch our canvas
	var canvas = document.getElementById('world');
	
	//Setup Matter JS
	var engine = Matter.Engine.create();
    var world = engine.world;
    var constraint = Matter.Constraint;
	var render = Matter.Render.create({
		canvas: canvas,
		engine: engine,
		options: {
			width: 500,
			height: 500,
			background: 'transparent',
			wireframes: false,
			showAngleIndicator: false
		}
	});
	
	//Add a ball
	var ball = Matter.Bodies.circle(250, 200, 20, {
		density: 0.04,
		friction: 0.01,
        frictionAir: 0.00001,
        restitution: 0.8,
        render: {
            fillStyle: '#F35e66',
            strokeStyle: 'black',
            lineWidth: 1
        }
	});
    Matter.World.add(world, ball);
    
    // Constrain Ball to make pendulum
    var options = {
    }
	
    
   var fixPoint = {x:250, y:0};

   var constr = constraint.create({
       pointA: fixPoint,
       bodyB: ball,
    //    stiffness: 0.01,
    //    length: 250
   });

   Matter.World.add(world, constr); 

	//Make interactive
	// var mouseConstraint = Matter.MouseConstraint.create(engine, { //Create Constraint
	// 	element: canvas,
	// 	constraint: {
	// 		render: {
	//         	visible: false
	//     	},
	//     	stiffness:0.1
	//     }
	// });
	// Matter.World.add(world, mouseConstraint);
	
	//Start the engine
	Matter.Engine.run(engine);
	Matter.Render.run(render);
	
});


