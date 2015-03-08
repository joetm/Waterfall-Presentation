/*global $, console, d3, MyD3anim, detect_InternetImplorer*/

var MyD3anim; //jslint error without this

function MyD3anim() {
    'use strict';

    this.nodes = [
        //1
        {name: 'Specify Requirements', color: '#F0F0F0'},
        //2
        {name: 'Analyse', color: '#F0F0F0'},
        //3
        {name: 'Design', color: '#F0F0F0'},
        //4
        {name: 'Code', color: '#F0F0F0'},
        //5
        {name: 'Test', color: '#F0F0F0'},
        //6
        {name: 'Operate', color: '#F0F0F0'}
    ];

    //link = {source: a, target: b, type: arrow}
    this.links = [
        {source: this.nodes[0], target: this.nodes[1], type: "arc"},
        {source: this.nodes[1], target: this.nodes[2], type: "arc"},
        {source: this.nodes[2], target: this.nodes[3], type: "arc"},
        {source: this.nodes[3], target: this.nodes[4], type: "arc"},
        {source: this.nodes[4], target: this.nodes[5], type: "arc"}
    ];

//    this.width = 960;
//    this.height = 500;

    this.width  = $('#box').width();
    this.height = $('#box').height() - $('#d3_button_controls').height() - 2 * 40;

    this.linkdistance = 60;
    this.charge = -9000;

}//MyD3anim

/**
 * Remove nodes from D3 graph
 *
 * @param {number} step_num - The active step number = the group of nodes to remove
 * @param {object} d3a - D3 object
 * @return {object} d3a - D3 object, with nodes removed
 */
MyD3anim.prototype.remove_nodes = function (step_num) {
    'use strict';
    var i = this.nodes.length - 1,
        s = 0;
    // looping in reversed order will not get the array confused
    for (i; i >= s; i = i - 1) {
        if (this.nodes[i].step === step_num) {
            //remove new nodes
            this.nodes.splice(i, 1);
            //this.nodes.pop();
        }
    }
    //return this;
};//remove_nodes

/**
 * Remove links (arcs) from D3 graph
 *
 * @param {number} step_num - The active step number = the group of nodes to remove
 * @param {object} d3a - D3 object
 * @return {object} d3a - D3 object, with links removed
 */
MyD3anim.prototype.remove_links = function (step_num) {
    'use strict';
    var i = this.links.length - 1,
        s = 0;
    // looping in reversed order will not get the array confused
    for (i; i >= s; i = i - 1) {
        if (this.links[i].step === step_num) {
            //remove the links
            this.links.splice(i, 1);
            //this.links.pop();
        }
    }
    //return this;
};//remove_links

/**
 * Output the step action ('add / remove step') to console
 *
 * @param {string} what - Identifier: either 'add' or 'remove'
 * @param {number} num - The step number
 */
MyD3anim.prototype.log_step = function (what, num) {
    'use strict';
    if (what === 'add') {
        console.log('adding step ' + num);
    } else {
        console.log('removing step ' + num);
    }
};

/**
 * Set the description of the step when the step is activated. This will always show the description of the highest active step.
 *
 * @param {string} msg - The text to show as step description
 */
MyD3anim.prototype.set_step_description = function (msg) {
    'use strict';
    var step_texts = [
        'Program Design comes first',
        'Document the design in all steps',
        'Do the job twice: deliver the second program version',
        'Plan, control and monitor Testing',
        'Involve the customer'
    ],
        have_active_steps = false;

    //show the highest active button's text as description
    if (msg === undefined) {
        $.each($('#d3_button_controls .btn'), function (index, value) {
            if ($(value).hasClass('active')) {
                $('#d3_step_descr').text(step_texts[index]);
                have_active_steps = true;
                //value = $(value); //go away, jslint error
            }
        });
    } else {
        $('#d3_step_descr').text(msg);
    }
    //clear the step description text if there are no active steps
    if (!have_active_steps) {
        $('#d3_step_descr').text('');
    }
};

/**
 * Function used to animate the D3 graph
 *
 * @param {object} d3a - D3 object
 */
function tick(d3a) {
    'use strict';
    //fixed position for first node
    d3a.nodes[0].x = 40;
    d3a.nodes[0].y = 30;
    d3a.path.attr("d", d3a.linkArc);
    d3a.circle.attr("transform", d3a.transform);
    d3a.text.attr("transform", d3a.transform);
}//tick

/**
 * Helper function to produce the curved arcs
 *
 * @param {object} d - Link arc object
 * @return {string} string - Translation attribute of the svg path
 */
MyD3anim.prototype.transform = function (d) {
    'use strict';
    return "translate(" + d.x + "," + d.y + ")";
};//MyD3anim.prototype.transform

/**
 * Helper function to produce the curved arcs
 *
 * @param {object} d - Link arc object
 * @return {string} string - Mathematical description of the arc, to be added to svg path
 */
MyD3anim.prototype.linkArc = function (d) {
    'use strict';
    var dx = d.target.x - d.source.x, dy = d.target.y - d.source.y, dr = Math.sqrt(dx * dx + dy * dy);
    return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
};//MyD3anim.prototype.linkArc


MyD3anim.prototype.setupSVG = function (the_page) {
    'use strict';

    var self = this;

    this.step_charges = [];
    this.step_charges[1] = -5000;
    this.step_charges[2] = -900;
    this.step_charges[3] = -700;
    this.step_charges[4] = -2500;
    this.step_charges[5] = -1200;

    this.force = d3.layout.force()
        .nodes(d3.values(this.nodes))
        .links(this.links)
        .size([this.width, this.height])
        .linkDistance(this.linkdistance)
        .charge(this.charge)
        //.chargeDistance(this.linkdistance)
        .on("tick", function () { tick(self); })
        .start();

    this.svg = d3.select(the_page).append("svg:svg")
        .attr("id", "step_svg")
        .attr("width", this.width)
        .attr("height", this.height);

    //settings (defs) for svg
    this.svg.append("svg:defs").selectAll("marker")
        .data(["arc"])
        .enter().append("svg:marker")
        .attr("id", function (d) { return d; })
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 15)
        .attr("refY", -1.5)
        .attr("fill", "#FFFFFF")
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("svg:path")
        .attr("d", "M0,-5L10,0L0,5");

    this.step_active = [false, false, false, false, false, false]; //index 0 is never used
    //var d3_step_active = [];
    //d3_step_active[1] = d3_step_active[2] = d3_step_active[3] = d3_step_active[4] = d3_step_active[5] = false;

};//setupSVG

MyD3anim.prototype.init_graph = function () {
    'use strict';

    console.log('init_graph');

    //add links and arrows
    this.path = this.svg.append("svg:g").attr('id', 'paths').selectAll("path")
        .data(this.force.links()).enter().append("svg:path")
        .attr("data-source", function (d) { return d.source.name; })
        .attr("data-target", function (d) { return d.target.name; })
        .attr("fill", "none")
        .attr("stroke", "#FFFFFF")
        .attr("stroke-width", "1.5px")
        .attr("class", function (d) { return "link " + d.type; });
    //    .attr("marker-end", function (d) { return "url(#" + d.type + ")"; });
    //IE does not show lines with markers (arrowheads)
    //http://stackoverflow.com/a/16450505/426266
    //http://jsfiddle.net/niaconis/3YsWY/8/
    if (typeof detect_InternetImplorer === 'function' && detect_InternetImplorer()) {
        console.log('You are using IE. You are missing out.');
    } else {
        this.path.attr("marker-end", function (d) { return "url(#" + d.type + ")"; });
    }

    //add nodes
    this.circle = this.svg.append("svg:g").attr('id', 'circles').selectAll("circle")
        .data(this.force.nodes()).enter().append("svg:circle")
        .attr("r", 6)
        .attr('stroke', '#333')
        .attr('stroke-width', '1.5px')
        .attr("fill", function (d) { return d.color; })
        .call(this.force.drag);

    //add text
    this.text = this.svg.append("svg:g").attr('id', 'texts').selectAll("text")
        .data(this.force.nodes()).enter().append("svg:text")
        .attr("x", 12)
        .attr("y", "-0.9em")
        .attr('pointer-events', 'none')
        //.style('fill', '#FFFFFF')
        .attr("fill", function (d) { if (d.color === undefined) { d.color = '#FFFFFF'; } return d.color; })
        .text(function (d) { return d.name; });

};//init_graph

MyD3anim.prototype.refresh_step = function (linkdistance, charge, gravity) {
    'use strict';

    if (linkdistance !== undefined) {
//        console.log('setting linkdistance: ' + linkdistance);
        this.force.linkDistance(linkdistance);
    }
    if (charge !== undefined) {
//        console.log('setting charge: ' + charge);
        this.force.charge(charge);
    }
    if (gravity !== undefined) {
//        console.log('setting gravity: ' + gravity);
        this.force.gravity(gravity);
    }

    this.force.nodes(d3.values(this.nodes))
        .links(this.links)
        .start();

    //clean up svg
    this.path.remove();
    $('svg #paths').remove();
    this.circle.remove();
    $('svg #circles').remove();
    this.text.remove();
    $('svg #texts').remove();

    this.init_graph();

    if (this.step_active[5]) {
        //hide the arcs on re-draw for step 5
        this.hide_step5_links();
    }

};//refresh_step

MyD3anim.prototype.hide_step5_links = function () {
    'use strict';
    $('*[data-source="Preliminary Design"][data-target="Analyse"]').hide();
    $('*[data-source="Design"][data-target="Code"]').hide();
    $('*[data-source="Test"][data-target="Operate"]').hide();
};

MyD3anim.prototype.findNode = function (search_term, nodes) {
    'use strict';

    var node_index = false,
        i = 0,
        s = nodes.length;

    for (i; i < s; i = i + 1) {
        //console.log(nodes[i].name);
        if (nodes[i].name === search_term) {
            node_index = i;
            break;
        }
    }

    return node_index;

};//findNode

MyD3anim.prototype.findLink = function (source, target, links) {
    'use strict';

    //console.log(links);

    var arc_index = false,
        i = 0,
        s = links.length;

    for (i; i < s; i = i + 1) {
        //console.log(links[i].source.name);
        if (links[i].source.name === source && links[i].target.name === target) {
            arc_index = i;
            break;
        }
    }

    return arc_index;

};//findLink