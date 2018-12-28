// Make an instance of two and place it on the page.
var cp_canvas = document.getElementById('colorpicker');
var params = { width: 300, height: 300};
var two = new Two(params).appendTo(cp_canvas);

// fill in background
var bg = two.makeRectangle(two.width / 2, two.height / 2, two.width, two.height)
bg.fill = '#FFFFFF';

var c1 = two.makeCircle(200, 150, 24);
var c2 = two.makeCircle(165, 102, 24);
var c3 = two.makeCircle(110, 121, 24);
var c4 = two.makeCircle(110, 179, 24);
var c5 = two.makeCircle(165, 198, 24);

c1.fill = '#FF8000';
c2.fill = '#FFE74C';
c3.fill = '#38618C';
c4.fill = '#35A7FF';
c5.fill = '#FF5964';

var circleGroup = two.makeGroup(c1, c2, c3, c4, c5);
circleGroup.noStroke();
circleGroup.linewidth = 5;


// Don't forget to tell two to render everything
// to the screen
two.update();