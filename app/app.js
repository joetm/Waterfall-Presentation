/*global $, framework_ctrl, pages_array, setTimeout, nunjucks, document, window, arbor, console, alert, d3, MyD3anim*/

//'use strict';

var pages_ctrl, quizzes_ctrl, setup_arbor, setup_sort, setup_procons, setup_agile, setup_d3anim; //functions (jslint-fix)

var current_alternative_container = 1;

/**
 * Array shuffle function. See http://stackoverflow.com/a/2450976/426266
 *
 * @param {array} arr - The array to be shuffled
 * @return {array} arr - The shuffled array
 */
function shuffle(arr) {
    'use strict';
    var currentIndex = arr.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
    }
    return arr;
}//shuffle arr

function redraw_steps_graph() {
    'use strict';
    var w = $('#box').width(),
        h = $('#box').height();
    $('#waterfall_steps_d3 svg').width(w).height(h);
}

function redraw_alternative_container() {
    'use strict';
    //set initial height of agile container
    //get height of current .wrap container
    var h = $('#agile_left #model_container .wrap:nth-child(' + current_alternative_container + ')').height() + 30;
    //console.log($("#agile_left .wrap:first"));
    //alert(h);
    $('#agile_left #model_container').height(h);
}

function position_circle() {
    'use strict';
    //(re-)position circle

    var img = $('#animation_container img'),
        //circle_size = $('#animation_container img').height() * 0.15,
        offset_top = $('#animation_container img').height() * 0.2,
        offset_left = $(img).css('margin-left');

    //$('svg#circle').attr('radius', circle_size);
    $('svg#circle').css('top', offset_top);

    $('#anim_constrainer').css({'left': offset_left, 'width': $(img).width()}); //image is centered
}

/* global objects for pages, page related parameters and actions */
var pages_ctrl = {

    //current page
    currpage: 0,

    //the page position (only used in iteration)
    pagepos_offset_iterator: 0,

    //the width of the page
    pagewidth: $("#box").width(),

    resize: function () {
        'use strict';
        this.pagewidth = $("#box").width();
    },
    /* array to hold all the pages */
    pages: [],
    /**
     * Set the boundary box height
     *
     */
    set_box_size: function () {
        'use strict';
        var window_height = $(window).height(),
//            headline_height = $('.pagetitle').height(),
//            pagelinks_height = $('#pagelinks').height();
            navbar_height = $('#sidebar').height(),
            pagetitle_height = $('.pagetitle').height();

        //alert(pagetitle_height);

        //console.log('window_height: ' + window_height + ', headline_height: ' + headline_height);
        $('#box').height(window_height - navbar_height - 2 * pagetitle_height);

        redraw_steps_graph();

        //alert('box height: ' + $('#box').height());
    },
    /**
     * Transition the page
     *
     * @param {string|number} target_page - Either 'next', 'prev' or a page number
     */
    transitionPage: function (target_page) {
        'use strict';

        var target;

        console.log('target page: ' + target_page);

        switch (target_page) {
        case 'next':
            this.currpage = this.currpage + 1;
            break;
        case 'prev':
            this.currpage = this.currpage - 1;
            break;
        default:
            this.currpage = target_page;
            break;
        }

        if (this.currpage < 0) {
            this.currpage = 0;
        }

        //offset for the page
        target = this.currpage * this.pagewidth;


        //this could enhance the speed
        //init_page(this.currpage);


        //unlock sidebar menu chapters
        framework_ctrl.unlock_chapter();


        //show both prev and next after the second page
        if (this.currpage > 1) {
            $("#pagelinks div").show();
        }
        //on last page: hide next link
        if (this.pages.length === this.currpage + 1) {
            $("#pagelinks .next").hide();
        }

        //set page title
        $('.pagetitle').text(this.pages[this.currpage].title);

        //clean up any elements that should no longer show
        $('.pagetrans_hide').hide();

        //hardcoded page actions per page_type
        switch (this.pages[this.currpage].page_type) {

        case 'quiz':
            framework_ctrl.overwrite_navlink_next("Skip");
            break;

        case 'procons':
            framework_ctrl.overwrite_navlink_next("Skip");

            //alert the user that this step can be skipped
            framework_ctrl.flare_next_button(2); //2 repetitions

            break;

        case 'sort':
            framework_ctrl.overwrite_navlink_next("Skip");

            //alert the user that this step can be skipped
            framework_ctrl.flare_next_button(2); //2 repetitions

            break;

        case 'application':
            framework_ctrl.overwrite_navlink_next("Next");
            position_circle();
            break;

        case 'agile':
            framework_ctrl.overwrite_navlink_next("Skip");

            redraw_alternative_container();

            break;

        case 'd3':
            break;

        case 'intro':
            //hide previous link on first page
            framework_ctrl.hide_prev();
            break;

        default:
            framework_ctrl.overwrite_navlink_next("Next");
            break;
        }

        //go to the page
        //works as a jump: $('#canvas').css('left', -target);

        //TweenLite.to(canvas, 0.3, {left: -target});
        //html5 animation
        //$('#canvas').css('transform', 'translateX(' + (-1 * target) + ')');
        //jquery animation
        $('#canvas').animate({left: -target}, 300);

    },
    /**
     * Redraw the pages
     *
     */
    redraw_pages: function () {
        'use strict';

        //new pagewidth
        this.resize();

        redraw_alternative_container();

        redraw_steps_graph();

        position_circle();

        //need this tmp variable to access 'this' in the $.each loop
        var pw = this.pagewidth,
            poi = 0,
            p_offset = this.currpage * this.pagewidth;

        //reset page position iterator

        $.each($(".page"), function (key, p) {
            console.log('redrawing - page: ' + key + ', offset: ' + poi);
            $(p).css("width", pw);
            $(p).css("left", poi);
            poi = poi + pw;
        });

        //pages have been resized
        //now move to the current page again
        console.log('moving to page: ' + this.currpage + ' (offset ' + p_offset + ')');
        $('#canvas').css("left", -1 * p_offset);

    },
    /**
     * Initialise the pages
     *
     * @param {number} index - Page index
     */
    init_pages: function () {
        'use strict';

        var p,//page index
            s = this.pages.length,
            chapter_class,
            transition_clickhandler;

        //set up all pages
        for (p = 0; p < s; p = p + 1) {

            //console.log('setting up page ' + p);

            //add the chapters to sidebar menu and unlock them
            if (p !== 0) {
                if (p === 1) {
                    chapter_class = 'active unlocked';
                    transition_clickhandler = " onclick='pages_ctrl.transitionPage(1);'";
                } else {
                    chapter_class = 'locked';
                    transition_clickhandler = '';
                }

                $("#sidebar").append(nunjucks.render('partial_navbar_chapter.html',
                    {
                        'chapter_class': chapter_class,
                        'transition_clickhandler': transition_clickhandler,
                        'index': p
                    }
                    ));
            }

            //a wrapper for each page
            this.pages[p].container = $("<div/>", {"id": "page" + p, "class": "page"});

            //add the page container to the DOM
            $('#canvas').append(this.pages[p].container);

            //set the page width
            $("#page" + p).css("width", this.pagewidth);
            $("#page" + p).css("left", this.pagepos_offset_iterator);

            //offset for this page (it is 0 initially)
            this.pagepos_offset_iterator = this.pagepos_offset_iterator + this.pagewidth;
            //console.log(this.pagepos_offset_iterator);

            //fill the page
            switch (this.pages[p].page_type) {


            case 'arbor':
                setup_arbor("#page" + p);
                break;

            case 'quiz':
                quizzes_ctrl.setup_quiz("#page" + p, this.pages[p].content);
                break;

            case 'sort':
                setup_sort("#page" + p, p, this.pages[p].content);
                break;

            case 'procons':
                setup_procons("#page" + p, this.pages[p].content);
                break;

            case 'agile':
                setup_agile("#page" + p, this.pages[p].content);
                break;

            case 'd3':
                setup_d3anim("#page" + p);
                break;

            default:

                //if page has a template, render the template
                if (this.pages[p].template !== undefined) {
                    $("#page" + p).html(
                        nunjucks.render(this.pages[p].template, this.pages[p].content)
                    );
                } else {
                    $("#page" + p).html(
                        this.pages[p].content
                    );
                }
                break;

            }//switch (this.pages[p].page_type)
        }//for

        //hide previous link on first page
        if (this.currpage === 0) {
            framework_ctrl.hide_prev();
        }

        this.set_box_size();

    }//init_pages
};


var quizzes_ctrl = {
    //counter of quizzes (to generate a unique id)
    quiznum: 0,
    increase_quiznum: function () {
        'use strict';
        this.quiznum = this.quiznum + 1;
        //return this.quiznum;
    },
    /**
     * Action to perform when quiz was successfully solved
     *
     * @param {object} the_page - DOM element of the current page
     */
    quiz_success: function (the_page) {
        'use strict';
        //console.log('correct answer');
        framework_ctrl.growl('success', "Correct! ");
        framework_ctrl.overwrite_navlink_next("Next");

        //does this page have an answer text?
        if (pages_ctrl.pages[pages_ctrl.currpage].content.hasOwnProperty('answer_text')) {

            //$(the_page).html(pages_ctrl.pages[pages_ctrl.currpage].content.answer_text);
            $(the_page).html(nunjucks.render('quiz_success.html', pages_ctrl.pages[pages_ctrl.currpage].content.answer_text));

        } else {

            //no answer_text to show
            //skip to next page
            framework_ctrl.next_page();

        }
    },
    /**
     * Action to perform when quiz was not solved
     *
     */
    quiz_fail: function () {
        'use strict';
        //console.log('wrong answer');
        framework_ctrl.growl('danger', "Wrong answer!<br />Try again! ");
    },
    /**
     * Set up the Quiz
     *
     * @param {object} the_page - DOM element of the current page
     * @param {object} the_quiz - Object containing the quiz content and metadata
     */
    setup_quiz: function (the_page, the_quiz) {
        'use strict';

        //assign a unique id to the quiz
        quizzes_ctrl.increase_quiznum();
        the_quiz.quiznum = quizzes_ctrl.quiznum;

        //console.log(the_quiz.questions);
        //shuffle(the_quiz.questions);

        $(the_page).html(nunjucks.render('quiz.html', the_quiz));

        //click button event
        $(document).on('click', '#solvebutton' + the_quiz.quiznum, function () {

            console.log('Your answer: ' + $("input[name=quiz]:checked").val() + ', correct answer: ' + the_quiz.answer);

            if (the_quiz.answer === parseInt($("input[name=quiz]:checked").val(), 10)) {
                quizzes_ctrl.quiz_success(the_page);
            } else {
                quizzes_ctrl.quiz_fail();
            }
        });
    }//setup_quiz
};


/*******************/
/* D3ANIM SPECIFIC */
/*******************/

var d3a, force;

var tmp_node_step1, tmp_node_step3, tmp_link_step3;


/**
 * Activate a step in the graph
 *
 * @param {number} num - The number of the step to activate
 * @param {object} d3a - The D3 object
 */
function add_step(num, d3a) {
    'use strict';

    //console.log(d3a);

    var i, j, s, k, o, step_charge;

    switch (num) {

    /*****/
    //PRELIMINARY DESIGN
    /*****/
    case 1:

        //needed in any case
        tmp_node_step1 = d3a.nodes.shift();


        //add step 1
        if (!d3a.step_active[1]) {

            d3a.log_step('add', num);

            //add new node
            d3a.nodes.unshift({name: 'Preliminary Design', color: '#FF0000', step: 1});
            d3a.nodes.unshift(tmp_node_step1);

            //modify the links
            d3a.links.push({source: d3a.nodes[1], target: d3a.nodes[2], type: "arc", step: 1});
            d3a.links[0] = {source: d3a.nodes[0], target: d3a.nodes[1], type: "arc"};

            d3a.step_active[1] = true;

            $('#step' + num).text('Remove Step ' + num).addClass('active');

            d3a.set_step_description();

            d3a.refresh_step(60, d3a.step_charges[1]);

        //remove step 1
        } else {

            d3a.log_step('remove', num);

            //add new node
            //remove all nodes belonging to group 1
            d3a.remove_nodes(1);

//            d3a.nodes.shift();
            d3a.nodes.unshift(tmp_node_step1);

            //modify the links
            //d3a.links.pop();
            d3a.remove_links(1);

            //add the first connection again
            d3a.links[0] = {source: d3a.nodes[0], target: d3a.nodes[1], type: "arc"};

            $('#step' + num).text('Add Step ' + num).removeClass('active');

            d3a.set_step_description();

            d3a.step_active[1] = false;

            if (d3a.step_active[2]) {
                step_charge = d3a.step_charges[2];
            } else {
                step_charge = d3a.step_charges[1];
            }

            d3a.refresh_step(60, step_charge);
        }

        break;

    /*****/
    //DOCUMENTATION
    /*****/
    case 2:

        //add step 2
        if (!d3a.step_active[2]) {

            d3a.log_step('add', num);

            //add new nodes
            s = d3a.nodes.length;
            i = 1;
            for (i; i <= s; i = i + 1) {
                d3a.nodes.push({name: 'Document No. ' + i, color: "#00FF00", step: 2});
            }

            //modify the links
            i = 0;
            o = d3a.nodes.length; //10
            s = o / 2; //1 node + 1 doc node = twice the number of original nodes
            //step_2_node_num = s;
            k = s;
            //console.log(d3a.nodes);
            for (i; i < s; i = i + 1) {
                d3a.links.push({source: d3a.nodes[i], target: d3a.nodes[o - k], type: "arc", color: "green", step: 2});
                k = k - 1;
            }

            d3a.step_active[2] = true;

            $('#step' + num).text('Remove Step ' + num).addClass('active');

            d3a.set_step_description();

            d3a.refresh_step(50, -900);

        //remove step 2
        } else {

            d3a.log_step('remove', num);

            //remove all nodes belonging to group 2
            d3a.remove_nodes(2);
            d3a.remove_links(2);

            d3a.step_active[2] = false;

            $('#step' + num).text('Add Step 2').removeClass('active');

            d3a.set_step_description();

            if (d3a.step_active[3]) {
                step_charge = d3a.step_charges[3];
            } else if (d3a.step_active[2]) {
                step_charge = d3a.step_charges[2];
            } else if (d3a.step_active[5]) {
                step_charge = d3a.step_charges[5];
            } else if (d3a.step_active[4]) {
                step_charge = d3a.step_charges[4];
            } else {
                step_charge = d3a.step_charges[1];
            }

            d3a.refresh_step(60, step_charge);
        }

        break;

    /*****/
    //STEP 3
    /*****/
    case 3:

        //add step 3
        if (!d3a.step_active[3]) {

            d3a.log_step('add', num);

            //add new nodes

            //preserve the last node ('Operation')
            tmp_node_step3 = d3a.nodes.pop();
            //add new nodes
            d3a.nodes.push({name: 'Preliminary Program Design', color: '#FFFF00', step: 3});
            d3a.nodes.push({name: 'Analysis', color: '#FFFF00', step: 3});
            d3a.nodes.push({name: 'Program Design', color: '#FFFF00', step: 3});
            d3a.nodes.push({name: 'Coding', color: '#FFFF00', step: 3});
            d3a.nodes.push({name: 'Testing', color: '#FFFF00', step: 3});
            d3a.nodes.push({name: 'Operations', color: '#FFFF00', step: 3});

            //preserve the last link
            tmp_link_step3 = d3a.links.pop();
            //add new links
            d3a.links.push({source: d3a.nodes[d3a.nodes.length - 7], target: d3a.nodes[d3a.nodes.length - 6],
                type: "arc", step: 3});
            d3a.links.push({source: d3a.nodes[d3a.nodes.length - 6], target: d3a.nodes[d3a.nodes.length - 5],
                type: "arc", step: 3});
            d3a.links.push({source: d3a.nodes[d3a.nodes.length - 5], target: d3a.nodes[d3a.nodes.length - 4],
                type: "arc", step: 3});
            d3a.links.push({source: d3a.nodes[d3a.nodes.length - 4], target: d3a.nodes[d3a.nodes.length - 3],
                type: "arc", step: 3});
            d3a.links.push({source: d3a.nodes[d3a.nodes.length - 3], target: d3a.nodes[d3a.nodes.length - 2],
                type: "arc", step: 3});
            d3a.links.push({source: d3a.nodes[d3a.nodes.length - 2], target: d3a.nodes[d3a.nodes.length - 1],
                type: "arc", step: 3});

            d3a.step_active[3] = true;

            $('#step' + num).text('Remove Step ' + num).addClass('active');

            d3a.set_step_description();

            d3a.refresh_step(40, d3a.step_charges[3]);

        //remove step 3
        } else {

            d3a.log_step('remove', num);

            d3a.remove_nodes(3);
            d3a.remove_links(3);

            //add the last node preserved in the previous case
            d3a.nodes.push(tmp_node_step3);
            //add the last link preserved in the previous case
            d3a.links.push(tmp_link_step3);

            d3a.step_active[3] = false;

            $('#step' + num).text('Add Step ' + num).removeClass('active');

            d3a.set_step_description();

            d3a.refresh_step(60, d3a.step_charges[1]);

        }

        break;

    /*****/
    //STEP 4
    /*****/
    case 4:

        //add step 4
        if (!d3a.step_active[4]) {

            d3a.log_step('add', num);

            //add this to design node
            d3a.nodes.push({name: 'Plan Testing Process', color: '#00FFFF', step: 4});
            i = d3a.findNode('Design', d3a.nodes);
            if (false !== i) {
                d3a.links.push({source: d3a.nodes[i], target: d3a.nodes[d3a.nodes.length - 1],
                    type: "arc", step: 4});
            }

            //add these to testing node
            i = d3a.findNode('Test', d3a.nodes);
            if (false !== i) {
                d3a.nodes.push({name: 'Visually Inspect Code', color: '#00FFFF', step: 4});
                d3a.links.push({source: d3a.nodes[i], target: d3a.nodes[d3a.nodes.length - 1],
                    type: "arc", step: 4});
                d3a.nodes.push({name: 'Test every logic path', color: '#00FFFF', step: 4});
                d3a.links.push({source: d3a.nodes[i], target: d3a.nodes[d3a.nodes.length - 1],
                    type: "arc", step: 4});
                d3a.nodes.push({name: 'Use product assurance techniques', color: '#00FFFF', step: 4});
                d3a.links.push({source: d3a.nodes[i], target: d3a.nodes[d3a.nodes.length - 1],
                    type: "arc", step: 4});
            }

            d3a.step_active[4] = true;

            $('#step' + num).text('Remove Step ' + num).addClass('active');

            d3a.set_step_description();

            d3a.refresh_step(40, d3a.step_charges[4]);

        //remove step 4
        } else {

            d3a.log_step('remove', num);

            d3a.remove_nodes(4);
            d3a.remove_links(4);

            d3a.step_active[4] = false;

            $('#step' + num).text('Add Step ' + num).removeClass('active');

            d3a.set_step_description();

            d3a.refresh_step(60, d3a.step_charges[1]);

        }

        break;

    /*****/
    //STEP 5
    /*****/
    case 5:

        //add step 5
        if (!d3a.step_active[5]) {

            //step 5 needs an active step 1
            if (!d3a.step_active[1]) {
                add_step(1, d3a);
            }

            d3a.log_step('add', num);

            //add this to specification node
            d3a.nodes.push({name: 'Requirements Generation', color: '#9090FF', step: 5});
            d3a.links.push({source: d3a.nodes[d3a.nodes.length - 1], target: d3a.nodes[0],
                type: "arc", step: 5});

            //add this to operations node
            d3a.nodes.push({name: 'Final Acceptance Review', color: '#9090FF', step: 5});
            d3a.links.push({source: d3a.nodes[d3a.nodes.length - 1], target: d3a.nodes[d3a.nodes.length - 3],
                type: "arc", step: 5});
            d3a.links.push({source: d3a.nodes[d3a.nodes.length - 4], target: d3a.nodes[d3a.nodes.length - 1],
                type: "arc", step: 5});

            //find the prelim design node
            i = d3a.findNode('Preliminary Design', d3a.nodes);
            if (false !== i) {
                d3a.nodes.push({name: 'Preliminary Software Review', color: '#9090FF', step: 5});
                d3a.links.push({source: d3a.nodes[i], target: d3a.nodes[d3a.nodes.length - 1],
                    type: "arc", step: 5});
                d3a.links.push({source: d3a.nodes[d3a.nodes.length - 1], target: d3a.nodes[i + 1],
                    type: "arc", step: 5});
            }

            //find the program design node
            i = d3a.findNode('Design', d3a.nodes);
            if (false !== i) {
                d3a.nodes.push({name: 'Software Review', color: '#9090FF', step: 5});
                d3a.links.push({source: d3a.nodes[i], target: d3a.nodes[d3a.nodes.length - 1],
                    type: "arc", step: 5});
                j = d3a.findNode('Code', d3a.nodes);
                if (false !== j) {
                    d3a.links.push({source: d3a.nodes[d3a.nodes.length - 1], target: d3a.nodes[j],
                        type: "arc", step: 5});
                }
            }

            d3a.step_active[5] = true;

            $('#step' + num).text('Remove Step ' + num).addClass('active');

            d3a.set_step_description();

            d3a.refresh_step(40, d3a.step_charges[5]);

            //hide links
//            i = d3a.findLink('Preliminary Design', 'Analyse', d3a.links);
//            if (false !== i) {
                  //alert(i);
                  //console.log(d3a.svg.select(d3a.links[i]));
                  //$("#paths").style('display', 'none');

            d3a.hide_step5_links();
//             $('*[data-source="Preliminary Design"][data-target="Analyse"]').hide();
//             $('*[data-source="Design"][data-target="Code"]').hide();
//             $('*[data-source="Test"][data-target="Operate"]').hide();

                //$('#step_svg g#paths path:nth-child(' + i + ')').hide();

//            }

        //remove step 5
        } else {

            //step 5 deactives step 1
            add_step(1, d3a);

            d3a.log_step('remove', num);

            d3a.remove_nodes(5);
            d3a.remove_links(5);

            d3a.step_active[5] = false;

            $('#step' + num).text('Add Step ' + num).removeClass('active');

            d3a.set_step_description();

            d3a.refresh_step(60, d3a.step_charges[1]);

        }

        break;
    }


}//add_step


/**
 * Set up the D3 animation
 *
 * @param {object} the_page - DOM element that holds the current page
 */
function setup_d3anim(the_page) {
    'use strict';

    //setup the d3 graph
    var d3a = new MyD3anim(),
        charge,
        linkdistance,
        dw,
        dh,
        r;

    console.log('appending d3anim');

    $(the_page).html(nunjucks.render('d3anim.html', {}));

    //control button events
    $('#d3_button_controls #step1').on('click', function () { add_step(1, d3a); });
    $('#d3_button_controls #step2').on('click', function () { add_step(2, d3a); });
    $('#d3_button_controls #step3').on('click', function () { add_step(3, d3a); });
    $('#d3_button_controls #step4').on('click', function () { add_step(4, d3a); });
    $('#d3_button_controls #step5').on('click', function () { add_step(5, d3a); });


    d3a.setupSVG(the_page);
    d3a.init_graph();




    //duplicate code
    charge = -5000;
    linkdistance = 60;
    dw = $(window).width();
    dh = $(window).height();
    r = dh / dw * 3;
    charge = charge / r;
    linkdistance = linkdistance / r;
    d3a.step_charges[1] = charge;
    d3a.refresh_step(linkdistance, charge);






    //window resize events
    //change 'gravity' of d3 animation on resize event
    $(window).on('resize', function () {

        //initials
        charge = -5000;
        linkdistance = 60;
        dw = $(window).width();
        dh = $(window).height();
        r = dh / dw * 3;

        charge = charge / r;
        linkdistance = linkdistance / r;

        //set new base charge
        d3a.step_charges[1] = charge;

        //set new link distance
        d3a.refresh_step(linkdistance, charge);

    });

}//setup_d3anim

/*****************/


/******************/
/* AGILE SPECIFIC */
/******************/

/**
 * Set up the Agile Drag&Drop riddle
 *
 * @param {object} the_page - DOM element of the current page
 * @param {object} content - Object containing the riddle's content and metadata
 */
function setup_agile(the_page, content) {
    'use strict';

    var cumulative_target = 0,
        current_riddle = 0,
        solved = [false, false, false, false];

    //shuffle answers
    content.rightside_list = shuffle(content.rightside_list);

    $(the_page).html(nunjucks.render('agile.html', content));
    //$(the_page).append(content);

    $("#agile_models_list .step-ag").draggable({
        revert: true, //"valid"
        start: function () {
            $(this).data("origPosition", $(this).position());
        }
    });

    $("#agile_left .wrap").droppable({
        accept: '#agile_models_list .step-ag',
        drop: function (event, ui) {

            var target = 0,
                text_box = $(this).children('.agile_dropcontainer')[0];

            $(text_box).
                addClass("agile_dropped-state-highlight").
                html(ui.draggable.text());

            $(text_box).data('answer', ui.draggable.data('answer'));

            if ($(text_box).data('answer') === $(text_box).data('solution')) {

                solved[current_riddle] = true;
                current_riddle = current_riddle + 1;

                //scroll to next container
                target = $(this).height() + 30; //20 for margin-top and 10 for padding of text box
                cumulative_target = cumulative_target + target;





                console.log('solved');

                current_alternative_container = current_alternative_container + 1;

                redraw_alternative_container();

                $('#agile_left #model_container').animate({top: -cumulative_target}, 300);
            } else {
                //growl failure
                quizzes_ctrl.quiz_fail();
            }


/*
            //loop through all models to see if whole riddle is solved
            $.each($('#agile_left .agile_dropcontainer'), function (key, value) {

                //var value = $(this);

                if ($(text_box).data('solution') === $(value).data('answer')) { solved[i] = true; }
                i = i + 1;

                console.log(solved);
            });
*/

            //console.log(solved);

            if (solved[0] && solved[1] && solved[2] && solved[3]) {

                //reset the riddle
                current_alternative_container = 1;
                $('#agile_left #model_container').animate({top: 0}, 300);
                //add a scrollbar so that the solutions can be reviewed
                //$('#agile_left #model_container').css('overflow', 'overflow-y');

                framework_ctrl.growl('success', 'Correct!');
                framework_ctrl.flare_next_button(2); //2 repetitions
                framework_ctrl.overwrite_navlink_next("Next");

                //make the menu appear in motion
                $('#agile_models_list').css('transform', 'rotate(-7deg)');

                framework_ctrl.next_page();

                //reset menu
                $('#agile_models_list').css('transform', 'rotate(0deg)');

                //reset position of the agile model pics
                $('#agile_left #model_container').animate({top: 0}, 0);

            }

            //revert position
            ui.draggable.animate(ui.draggable.data().origPosition, "slow");

            return event; //.type = null; //jslint error
        }
    });

} //setup_agile


/*****************/
/* SORT SPECIFIC */
/*****************/

/**
 * Set up the Pros-Cons riddle
 *
 * @param {object} the_page - DOM element of the current page
 * @param {object} sortable_steps - Object containing the riddle's content and metadata
 */
function setup_procons(the_page, procons) {
    'use strict';

    //shuffle the list of items
    procons.items = shuffle(procons.items);

    var sortitems = [];
    $.each(procons.items, function (key, val) {
        sortitems.push("<li id='sort_" + key + "' data-type='" + val.type + "'>" + val.label + "</li>");
    });

    //render the page
    $(the_page).html(nunjucks.render('quiz_procons.html', {'sortitems': sortitems}));

    //make the two lists sortable
    $("#proconlist, #prolist, #conlist").sortable({
        connectWith: ".connectedSortablePC",
        cancel: ".nodrag", //headlines are not draggable
        update: function () {

            var counter = procons.items.length;

            $.each($('#prolist li'), function () {
                if ($(this).data('type') === 'pro') {
                    counter = counter - 1;
                    $(this).css('color', 'green').css('border-color', 'green');
                } else if ($(this).data('header') !== 1) {
                    $(this).css('color', 'red').css('border-color', 'red');
                }
            });

            $.each($('#conlist li'), function () {
                if ($(this).data('type') === 'con') {
                    counter = counter - 1;
                    $(this).css('color', 'green').css('border-color', 'green');
                } else if ($(this).data('header') !== 1) {
                    $(this).css('color', 'red').css('border-color', 'red');
                }
            });

            console.log('solved: ' + (sortitems.length - counter));

            if (counter === 0) {
                console.log('solved');
                framework_ctrl.growl('success', 'Correct!');
                framework_ctrl.flare_next_button(2); //2 repetitions
                framework_ctrl.overwrite_navlink_next("Next");
                //framework_ctrl.next_page();
            }

        }
    }).disableSelection();



}//setup_procons

/**
 * Set up the Step-Sort riddle
 *
 * @param {object} the_page - DOM element of the current page
 * @param {object} sortable_steps - Object containing the riddle's content and metadata
 */
function setup_sort(the_page, index, sortable_steps) {
    'use strict';

    //console.log(sortable_steps);

    //shuffle the list of items
    sortable_steps.left = shuffle(sortable_steps.left);

    //render the page
    $(the_page).html(nunjucks.render(pages_ctrl.pages[index].template, {sortlists: sortable_steps}));


    //make the two lists sortable
    $("#sortable1, #sortable2").sortable({
        connectWith: ".connectedSortable"
    }).disableSelection();


    //set up the event listener
    $("#sortable2").sortable({
        update: function () {

            var solved = false,
                counter = 0;

            //loop through all items
            //skip ui-sortable-placeholder
            //compare the position of the items with their data value

            console.log("-----------");

            //:not(.ui-sortable-placeholder)
            $.each($("#sortable2 .ui-sortable-handle"), function (key, val) {


                //console.log(val);
                console.log("item key: " + key + " - data: " + $(val).data('sp'));

                if (key === parseInt($(val).data('sp'), 10)) {
                    //console.log('step correct');

                    counter = counter + 1;
                    solved = true;

                } else {
                    solved = false;
                    //return false; //break
                }

            });

            //this riddle is only solved if we went through the loop 9 times
            if (counter === 8 && solved) {
                console.log('---');
                console.log('solved!');

                framework_ctrl.overwrite_navlink_next("Next");

                framework_ctrl.flare_next_button(2); //2 repetitions

                framework_ctrl.growl('success', 'Solved! ');
            }

        }
    });//$("#sortable2").sortable

} //setup_sort



var vis;

// arbor.js
function setup_arbor(the_page) {
    'use strict';

    $(the_page).html(nunjucks.render('waterfall_steps_test.html', {}));

    var w = $('#box').width(),
        h = $('#box').height(),
        //x_increment = '10%', //parseInt(w / 8, 10),
        //y_increment = '10%', //parseInt(h / 7, 10),
        text,
        i = 0,
        s,
        cols = [],
        rows = [],
        nodes,
        sub_nodes,
        links;

    cols[0] = '8';
    cols[1] = '23';
    cols[2] = '38';
    cols[3] = '53';
    cols[4] = '68';
    cols[5] = '83';

    rows[0] = '8';
    rows[1] = '23';
    rows[2] = '38';
    rows[3] = '53';
    rows[4] = '68';
    rows[5] = '83';

    nodes = [
        {id: '0', text: 'Requirements', x: cols[0] + '%', y: rows[0] + '%'},
        {id: '1', text: 'Analysis',     x: cols[1] + '%', y: rows[1] + '%'},
        {id: '2', text: 'Design',       x: cols[2] + '%', y: rows[2] + '%'},
        {id: '3', text: 'Coding',       x: cols[3] + '%', y: rows[3] + '%'},
        {id: '4', text: 'Testing',      x: cols[4] + '%', y: rows[4] + '%'},
        {id: '5', text: 'Operation',    x: cols[5] + '%', y: rows[5] + '%'}
    ];
    sub_nodes = [
        [
            {text: 'Focus Groups', x: cols[0] + '%', y: rows[2] + '%', src: './images/focus-group.jpg'},
            {text: 'Interviews',   x: cols[0] + '%', y: rows[3] + '%', src: './images/interview.jpg'},
            {text: 'Documents',    x: cols[0] + '%', y: rows[4] + '%', src: './images/documents2.jpg'},
            {text: 'Workshops',    x: cols[0] + '%', y: rows[5] + '%', src: './images/workshop.jpg'}
        ],
        [
            {text: 'Prioritise',   x: cols[1] + '%', y: rows[3] + '%', src: false},
            {text: 'Organise',     x: cols[1] + '%', y: rows[4] + '%', src: false},
            {text: 'Validate',     x: cols[1] + '%', y: rows[5] + '%', src: false}
            //{text: 'Verify',       x: cols[1] + '%', y: rows[5] + '%', src: false}
        ],
        [
            {text: 'Architecture', x: cols[2] + '%', y: rows[3] + '%', src: false},
            {text: 'Database',     x: cols[2] + '%', y: rows[4] + '%', src: false},
            {text: 'Interface',    x: cols[2] + '%', y: rows[5] + '%', src: false}
        ],
        [
        ],
        [
            {text: 'Verification',    x: cols[4] + '%', y: rows[0] + '%', src: false},
            {text: 'Component',    x: cols[4] + '%', y: rows[1] + '%', src: false},
            {text: 'Integration',  x: cols[4] + '%', y: rows[2] + '%', src: false},
            {text: 'System',       x: cols[4] + '%', y: rows[3] + '%', src: false},
            {text: 'Acceptance',   x: cols[4] + '%', y: rows[5] + '%', src: false}
        ]
    ];
    links = [
        {source: nodes[0], target: nodes[1]},
        {source: nodes[1], target: nodes[2]},
        {source: nodes[2], target: nodes[3]},
        {source: nodes[3], target: nodes[4]},
        {source: nodes[4], target: nodes[5]}
    ];


    vis = d3.select("#waterfall_steps_d3").
        append("svg");


    vis.attr("width", w).attr("height", h);


    function return_x(d) { return d.x; }
    function return_y(d) { return d.y; }
    function return_src(d) { return d.src; }
    function return_text(d) { return d.text; }
    function subnode_mouseover(d) {
        d3.select(this).style("fill", "red");
        var src = $(this).data('src'),
            x = d3.select(this)[0][0].cx.animVal.value,
            y = d3.select(this)[0][0].cy.animVal.value;
        if (src) {
            $('#waterfall_steps_d3 img').attr('src', src).show();
        }
        //console.log(d3.select(this)[0][0].cx.animVal.value);
        $('#waterfall_steps_d3 #step_description').css({'left': x + 30, 'top': y - 13});
        $('#waterfall_steps_d3 #step_description').text(d.text);
    }
    function subnode_mouseout() {
        d3.select(this).style("fill", "#AAAAAA");
        var src = $(this).data('src');
        if (src) {
            $('#waterfall_steps_d3 img').hide();
        }
        $('#waterfall_steps_d3 #step_description').text('');
    }


    //lines
    vis.selectAll(".line")
        .data(links)
        .enter()
        .append("line")
        .attr("x1", function (d) { return d.source.x; })
        .attr("y1", function (d) { return d.source.y; })
        .attr("x2", function (d) { return d.target.x; })
        .attr("y2", function (d) { return d.target.y; })
        .style("stroke", "rgb(6, 120, 155)");

    vis.selectAll("circle.nodes")
        .data(nodes)
        .enter()
        .append("svg:circle")
        .attr("cx", return_x)
        .attr("cy", return_y)
        .attr("id", function (d) { return 'crcl_' + d.id; })
        .attr("r", "30px")
        .style("fill", "#808080")
        .on("mouseover", function () {
            d3.select(this).style("fill", "red");
            $('.subnodes').hide();
            var id = $(this).attr('id');
            $('.subnodes_' + id.replace('crcl_', '')).show();
        })
        .on("mouseout", function () {
            d3.select(this).style("fill", "#808080");
        });

    text = vis.selectAll("text")
        .data(nodes)
        .enter()
        .append("text");
    text.attr("x", return_x)
        .attr("y", return_y)
        .text(return_text)
        .style("font-size", "20px")
        .attr("fill", "#FFFFFF");


    i = 0;
    s = sub_nodes.length;
    for (i; i < s; i = i + 1) {

        vis.selectAll("circle.nodes")
            .data(sub_nodes[i])
            .enter()
            .append("svg:circle")
            .attr("class", 'subnodes_' + i + ' subnodes')
            .attr("display", 'none')
            .attr("cx", return_x)
            .attr("cy", return_y)
            .attr("r", "25px")
            .attr("data-src", return_src)
            .attr("fill", "#FFFFFF")
            .on("mouseover", subnode_mouseover)
            .on("mouseout", subnode_mouseout);

    }

    //redraw_steps_graph();

    /*
    var subnode_text,
        i = 0,
        s = sub_nodes.length;
    for (i; i < s; i = i + 1) {

        //console.log(sub_nodes[i]);

        var subnode_text = vis.data(sub_nodes[i])
            .append("text");

        subnode_text
            .attr("x", return_x)
            .attr("y", return_y)
            .text(return_text)
            .attr("font-size", "20px");

    }//for
    */

}//setup_arbor


/**************************/
/* MAIN APPLICATION SETUP */
/**************************/
$(document).ready(function () {
    'use strict';

    /*****************/
    /*   APP SETUP   */
    /*****************/

    //template engine setup
    nunjucks.configure('views', {autoescape: false});

    //intialise all pages and the chapter navigation
    pages_ctrl.init_pages();

    //initial main box height
    pages_ctrl.set_box_size();


    /*****************/
    /*     EVENTS    */
    /*****************/

    /**
     * Event handler for window resizing
     *
     */
    $(window).on('resize', function () {

        //main box height
        pages_ctrl.set_box_size();

        //resize and redraw pages
        pages_ctrl.redraw_pages();

    });//resize


    /**
     * Keyboard navigation events. Based on Stackoverflow answer by user Sygmoral. See http://stackoverflow.com/a/6011119/426266.
     *
     */
    $(document).keydown(function (e) {

        switch (e.which) {
        case 37: // left
        case 38: // up
            if (pages_ctrl.currpage !== 0) {
                framework_ctrl.prev_page();
            }
            break;
        case 39: // right
        case 40: // down
            if (pages_ctrl.currpage !== pages_ctrl.pages.length - 1) {
                framework_ctrl.next_page();
            }
            break;
        default:
            return; // exit this handler for other keys
        }
        e.preventDefault();
    });//keydown


});//documentready
