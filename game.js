// The amount of points in the path:
var points = 3;

// The distance between the points:
var length = 40;

view.viewSize = new Size(window.innerWidth, window.innerHeight);

// var path = new Path({
// 	strokeColor: '#000000',
// 	strokeWidth: 5,
// 	strokeCap: 'round'
// });

// var head = new Shape.Circle({
//     center: view.center / [10, 1],
//     radius: 30,
//     strokeColor: 'black',
//     fillColor: 'white',
//     strokeWidth: 5
// });

var guy = new Person(view.center / [10, 1]);

// var start = (view.center / [10, 1]);
// for (var i = 0; i < points; i++)
// 	path.add(start + new Point(i * length, 0));				// making points in the path for the body

function onMouseMove(event) {

	guy.head.position = event.point;										// The position of the circle is at the mouse

	guy.bodyPath.firstSegment.point.y = event.point.y + guy.head.radius;	// moving the body to the edge
	guy.bodyPath.firstSegment.point.x = event.point.x;						// moving the x part to the edge
	var bodyPath = guy.bodyPath;											// making the body segments to the path
	for (var i = 0; i < 2; i++) {
		var segment  = bodyPath.segments[i];
		var nextSeg = segment.next;
		var vec = segment.point - nextSeg.point;
		vec.length = 40;
		nextSeg.point = segment.point - vec;
	}//for
	bodyPath.smooth({type: 'continuous'});

	guy.lArmPath.firstSegment.point.y = event.point.y + guy.head.radius;	// moving the body to the edge
	guy.lArmPath.firstSegment.point.x = event.point.x;						// moving the x part to the edge
	var lArmPath = guy.lArmPath;											// making the body segments to the path
	for (var i = 0; i < 2; i++) {
		var segment  = lArmPath.segments[i];
		var nextSeg = segment.next;
		var vec = segment.point - nextSeg.point;
		vec.length = 30;
		nextSeg.point = segment.point - vec;
	}//for
	lArmPath.smooth({type: 'continuous'});

	guy.rArmPath.firstSegment.point.y = event.point.y + guy.head.radius;	// moving the body to the edge
	guy.rArmPath.firstSegment.point.x = event.point.x;						// moving the x part to the edge
	var rArmPath = guy.rArmPath;											// making the body segments to the path
	for (var i = 0; i < 2; i++) {
		var segment  = rArmPath.segments[i];
		var nextSeg = segment.next;
		var vec = segment.point - nextSeg.point;
		vec.length = 30;
		nextSeg.point = segment.point - vec;
	}//for
	rArmPath.smooth({type: 'continuous'});

	guy.lLegPath.firstSegment.point.y = event.point.y + guy.head.radius;	// moving the body to the edge
	guy.lLegPath.firstSegment.point.x = event.point.x;						// moving the x part to the edge
	var lLegPath = guy.lLegPath;											// making the body segments to the path
	for (var i = 0; i < 2; i++) {
		var segment  = lLegPath.segments[i];
		var nextSeg = segment.next;
		var vec = segment.point - nextSeg.point;
		vec.length = 40;
		nextSeg.point = segment.point - vec;
	}//for
	lLegPath.smooth({type: 'continuous'});

	guy.rLegPath.firstSegment.point.y = event.point.y + guy.head.radius;	// moving the body to the edge
	guy.rLegPath.firstSegment.point.x = event.point.x;						// moving the x part to the edge
	var rLegPath = guy.rLegPath;											// making the body segments to the path
	for (var i = 0; i < 2; i++) {
		var segment  = rLegPath.segments[i];
		var nextSeg = segment.next;
		var vec = segment.point - nextSeg.point;
		vec.length = 40;
		nextSeg.point = segment.point - vec;
	}//for
	rLegPath.smooth({type: 'continuous'});
}//onMouseMove

// function onMouseDown(event) {
// 	path.fullySelected = true;
// 	path.strokeColor = '#e08285';
// }
//
// function onMouseUp(event) {
// 	path.fullySelected = false;
// 	path.strokeColor = '#000000';
// }


function resizeAndRedrawCanvas()
{
  var desiredWidth = window.width;
  var desiredHeight = window.height;

  canvas.width = desiredWidth;
  canvas.height = desiredHeight

  view.viewSize = new Size(desiredWidth, desiredHeight);
}


// Character Object

function Person(startPoint){
    // This will be pretty predifined so it shouldn't need any args
    //head
    this.head = new Shape.Circle({
        center: startPoint,
        radius: 30,
        strokeColor: '#e08285',
        fillColor: 'white',
        strokeWidth: 5
    });// Shape.Circle takes a json object

    this.attachPoint = new Point(
        this.head.position.x,
        this.head.position.y + this.head.radius
    );// This is the point the arms and body attach to

    //body
    this.bodyPath = new Path({
        strokeColor: '#e08285',
        strokeWidth: 5,
        strokeCap: 'round',
		fullySelected: 'true'
    });// Path takes a json object
    for (var i = 0; i < 3; i++)
        this.bodyPath.add(this.attachPoint + new Point(0, i * 40)); // Point that has x=0 and y=i*40. 40 is the length of the segment
    // make the body connect

    //arms
    this.lArmPath = new Path({
        strokeColor: '#e08285',
        strokeWidth: 5,
        strokeCap: 'round',
		fullySelected: 'true'
    });// Path takes a json object
    for (var i = 0; i < 3; i++)
        this.lArmPath.add(this.attachPoint + new Point(0, i * 25)); // Point that has x=0 and y=i*25. 25 is the length of the segment
    // make the left arm connect

    this.rArmPath = new Path({
        strokeColor: '#e08285',
        strokeWidth: 5,
        strokeCap: 'round',
		fullySelected: 'true'
    });// Path takes a json object
    for (var i = 0; i < 3; i++)
        this.rArmPath.add(this.attachPoint + new Point(0, i * 25)); // Point that has x=0 and y=i*25. 25 is the length of the segment
    // // make the right arm connect

    // //legs
    this.legAttach = this.attachPoint + new Point(0, 120);
    this.lLegPath = new Path({
        strokeColor: '#e08285',
        strokeWidth: 5,
        strokeCap: 'round',
		fullySelected: 'true'
    });// Path takes a json object
    for (var i = 0; i < 3; i++)
        this.lLegPath.add(this.legAttach + new Point(0, i * 25));

    this.rLegPath = new Path({
        strokeColor: '#e08285',
        strokeWidth: 5,
        strokeCap: 'round',
		fullySelected: 'true'
    });// Path takes a json object
    for (var i = 0; i < 3; i++)
        this.rLegPath.add(this.legAttach + new Point(0, i * 25));
}//constructor


// I could have sworn it worked like this at some point...
// I need help with JavaScript classes Dan...
//
// class Person{
//     // This will be pretty predifined so it shouldn't need any args
//     constructor(){
//         this.startPoint = view.center / [10, 1];
//         //head
//         this.head = new Shape.Circle({
//             center: this.startPoint,
//             radius: 30,
//             strokeColor: 'black',
//             fillColor: 'white',
//             strokeWidth: 5
//         });// Shape.Circle takes a json object
//
//         this.attachPoint = new Point(
//             this.startPoint.x,
//             this.startPoint.y + this.head.radius
//         );// This is the point the arms and body attach to
//
//         //body
//         this.bodyPath = new Path({
//         	strokeColor: 'black',
//         	strokeWidth: 5,
//         	strokeCap: 'round'
//         });// Path takes a json object
//         for (var i = 0; i < 3; i++)
//         	bodyPath.add(this.attachPoint + new Point(0, i * 40)); // Point that has x=0 and y=i*40. 40 is the length of the segment
//         // make the body connect
//
//         //arms
//         this.lArmPath = new Path({
//         	strokeColor: 'black',
//         	strokeWidth: 5,
//         	strokeCap: 'round'
//         });// Path takes a json object
//         for (var i = 0; i < 3; i++)
//         	lArmPath.add(this.attachPoint + new Point(0, i * 25)); // Point that has x=0 and y=i*25. 25 is the length of the segment
//         // make the left arm connect
//
//         this.rArmPath = new Path({
//         	strokeColor: 'black',
//         	strokeWidth: 5,
//         	strokeCap: 'round'
//         });// Path takes a json object
//         for (var i = 0; i < 3; i++)
//         	rArmPath.add(this.attachPoint + new Point(0, i * 25)); // Point that has x=0 and y=i*25. 25 is the length of the segment
//         // make the right arm connect
//
//         //legs
//         this.legAttach = this.attachPoint + new Point(0, 120);
//         this.lLegPath = new Path({
//         	strokeColor: 'black',
//         	strokeWidth: 5,
//         	strokeCap: 'round'
//         });// Path takes a json object
//         for (var i = 0; i < 3; i++)
//         	lLegPath.add(this.legAttach + new Point(0, i * 25));
//
//         this.rLegPath = new Path({
//         	strokeColor: 'black',
//         	strokeWidth: 5,
//          	strokeCap: 'round'
//         });// Path takes a json object
//         for (var i = 0; i < 3; i++)
//         	rLegPath.add(this.legAttach + new Point(0, i * 25));
//
//     }//constructor
//}
