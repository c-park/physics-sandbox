window.addEventListener('load', () => {
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
            width:  500,
            height:  500,
            background: 'transparent',
            wireframes: false,
            showAngleIndicator: false
        }
    });

    var start = {
        x: 250,
        y: 375 
    };

    //Add a ball
    var ball = Matter.Bodies.circle(start.x, start.y, 20, {
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

    var fixPoint = {x:250, y:250};

    var constr = constraint.create({
        pointA: fixPoint,
        bodyB: ball,
        //    stiffness: 0.01,
        //    length: 250
    });

    Matter.World.add(world, constr); 

    Matter.Engine.run(engine);
    Matter.Render.run(render);
    console.log('running');

    // console.log(start);
    // Catch Run pushed
    // $('#run').on('click',  () => {
    //     Matter.Body.setPosition(ball, {x: start[0], y: start[1]} ) 
    // });

    $('#sim_form').submit((e) => {
        e.preventDefault();

        Matter.World.clear(world);

        var mass = $('#massInput').val();
        var length = $('#lengthInput').val();
        var phi = $('#phiInput').val();

        var start = {
            x: 250 + 25*length*Math.cos(phi),
            y: 250 - 25*length*Math.sin(phi)
        };
        console.log(start);
        
        //Add a ball
        var ball = Matter.Bodies.circle(start.x, start.y, 20, {
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

        var fixPoint = {x:250, y:250};

        var constr = constraint.create({
            pointA: fixPoint,
            bodyB: ball,
            //    stiffness: 0.01,
            //    length: 250
        });

        Matter.World.add(world, constr); 


    });

    // $('.x-axis').change( () => {
    //     var xGravity = $('#xamount').val();
    //     console.log(xGravity);
    //     engine.world.gravity['x'] = xGravity;
    // });

    // $('.y-axis').change( () => {
    //     var yGravity = $('#yamount').val();
    //     console.log(yGravity);
    //     engine.world.gravity['y'] = yGravity;
    // });


});

    
 




