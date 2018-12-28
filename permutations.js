// Logic for picking colors, applying permutations, and drawing results to the screen

PENTAGON_PTS_SMALL = [ [105,35],[172,83],[146,162],[64,162], [38,83] ];
PENTAGON_PTS_BIG = [ [150,50],[245,119],[209,231],[91,231], [55,119] ];
CIRC_RADIUS_BIG = 30;
CIRC_RADIUS_SMALL = 18;
COLORS = ['#AA71FF', '#A4C61A', '#FDAE33', '#208EA3', '#E8384F']

// color_map: a coloring of the n points
var color_map = COLORS.slice();
// subgroup: the list of permutations acting on the preimage
var subgroup = [[1, 2, 3, 4, 5]];
var img_circles = [];

// creates and manages the subgroup selection menu
window.onload=function() {
  document.getElementById("subgroup_menu").onchange=function() {
    var subgroup_name = this.value;
    // reset the global subgroup array
    subgroup = [];
    // load the desired subgroup
    chosen_subgroup = SUBGROUPS[subgroup_name];
    subgroup = chosen_subgroup.slice();
    update_images();
    return;
} 
update_images();
}

// Make an instance of two for the image list
// We draw the permuted images to this canvas and then capture them as pngs 
var img_canvas = document.getElementById('img_canvas');
var params = { domElement: img_canvas, width: 200, height: 200};
var imgs = new Two(params);

function update_images() {
    // clear the display region so the old images don't persist 
    document.getElementById("img_display").innerHTML = "";

    // for each subgroup element, apply it and append the image to the output div
    for (i = 0; i < subgroup.length; i++) {
        perm = subgroup[i];

        // apply the group element to the points
        permuted_color_map = color_map.slice();
        for (j = 0; j < permuted_color_map.length; j++) {
            permuted_color_map[j] = color_map[perm[j]-1];
        }

        // draw the permuted circles to the canvas
        imgs.clear();
        for (j = 0; j < PENTAGON_PTS_SMALL.length; j++) {
            x = PENTAGON_PTS_SMALL[j][0];
            y = PENTAGON_PTS_SMALL[j][1];
            r = CIRC_RADIUS_SMALL;
            img_circles[j] = imgs.makeCircle(x, y, r);
            img_circles[j].fill = permuted_color_map[j];
            img_circles[j].noStroke();
        }
        imgs.update();

        // capture the canvas to a png and add it to the display div
        var canvas = document.getElementById("img_canvas");
        var img_to_append = canvas.toDataURL("image/png");
        var output_div = document.getElementById('img_display');
        output_div.innerHTML += '<div class="ma3 tc"><img src="'+img_to_append+'" class="ba br3 shadow-5 "/></div>';
    }

    return 0;
}

// Make an instance of two for the color picker
var cp_canvas = document.getElementById('colorpicker');
var params = { width: 300, height: 300};
var cp = new Two(params).appendTo(cp_canvas);

cp_circles = []
for (i = 0; i < PENTAGON_PTS_BIG.length; i++) {
    x = PENTAGON_PTS_BIG[i][0];
    y = PENTAGON_PTS_BIG[i][1];
    r = CIRC_RADIUS_BIG;
    cp_circles[i] = cp.makeCircle(x, y, r);
    cp_circles[i].fill = color_map[i];
}

var cpCircles = cp.makeGroup(cp_circles);
cpCircles.noStroke();

// render the color picker
cp.update();

function getNextColor(n) {
    return COLORS[(n+1) % 5];
}

function changeColor(pt) {
    // update the color picker display
    current_color = COLORS.indexOf(cp_circles[pt].fill);
    new_color = getNextColor(current_color);
    cp_circles[pt].fill = new_color;
    cp.update();

    // update the global color map and reload the permutation images
    color_map[pt] = new_color;
    update_images();
}

// click handling for color changing
$(cp_circles[0]._renderer.elem)
.css('cursor', 'pointer')
.click(function() {
    changeColor(0);    
});
$(cp_circles[1]._renderer.elem)
.css('cursor', 'pointer')
.click(function() {
    changeColor(1);    
});
$(cp_circles[2]._renderer.elem)
.css('cursor', 'pointer')
.click(function() {
    changeColor(2);    
});
$(cp_circles[3]._renderer.elem)
.css('cursor', 'pointer')
.click(function() {
    changeColor(3);    
});
$(cp_circles[4]._renderer.elem)
.css('cursor', 'pointer')
.click(function() {
    changeColor(4);    
});
