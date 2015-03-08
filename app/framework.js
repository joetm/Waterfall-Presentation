/*global $, pages_ctrl, nunjucks, setTimeout, console, alert*/

//'use strict';

//the canvas element is a wrapper and holds all the pages
var canvas = $("#canvas");

/* navigation menu, chapter and nav button logic */
var framework_ctrl = {
    /**
     * Animate the 'Next >' button
     *
     * @param {number} reps - The number of repetitions
     */
    flare_next_button: function () {
        'use strict';

        return;

        //var anim_css_1 = "flare_button 1s";
            //w = $('.next').width(),
            //i = 1,

        //alert('flaring');

        //IE does not like this
        //if (w < 50) { w = 50; }

        /*
        $(".next").css({
            opacity          : 1,
            WebkitTransition : 'opacity 1s ease-in-out',
            MozTransition    : 'opacity 1s ease-in-out',
            MsTransition     : 'opacity 1s ease-in-out',
            OTransition      : 'opacity 1s ease-in-out',
            transition       : 'opacity 1s ease-in-out'
        */

    },
    /**
     * An alias for pages_ctrl.transitionPage('prev');
     *
     */
    prev_page: function () {
        'use strict';
        pages_ctrl.transitionPage('prev');
    },
    /**
     * An alias for pages_ctrl.transitionPage('next');
     *
     */
    next_page: function () {
        'use strict';
        pages_ctrl.transitionPage('next');
    },
    /**
     * Hide the 'previous' navigation link
     *
     */
    hide_prev: function () {
        'use strict';
        $('#pagelinks .prev').hide();
    },
    /**
     * Overwrite the 'Next >' link text
     *
     * @param {string} txt - The new text for the link
     */
    overwrite_navlink_next: function (txt) {
        'use strict';
        //alert($("#wrapper #pagelinks .next").text());
        $("#wrapper #pagelinks .next").text(txt);
    },
    unlock_chapter: function () {
        'use strict';

        var curr_chapter = $('#sidebar .navchapter:nth-child(' + pages_ctrl.currpage + ')');


        //set chapter title in sidebar
        $(curr_chapter).html(
            //pages_ctrl.pages[pages_ctrl.currpage].chapter_title
            nunjucks.render('partial_navbar_chaptertitle.html', {
                'index': pages_ctrl.currpage,
                'title': pages_ctrl.pages[pages_ctrl.currpage].chapter_title
            })
        );

        if ($(curr_chapter).hasClass('locked')) {

            $(curr_chapter).removeClass('locked').addClass('unlocked');

            //attach the page number to the chapter
            $(curr_chapter).data('pagenum', pages_ctrl.currpage);

            //bind click event to this new chapter
            $(curr_chapter).on('click', function () {
                var tp = $(curr_chapter).data('pagenum');
                //console.log('going to page ' + tp);
                pages_ctrl.transitionPage(tp);
            });

        }

        //highlight the current chapter
        $('#sidebar .navchapter').removeClass('active');
        $(curr_chapter).addClass('active');

    },//unlock_chapter
    /**
     * Output a success/error message at the top left of the screen
     *
     * @param {string} type - Type of message: success or failure
     * @param {string} message - The message to show
     */
    growl: function (type, message) {
        'use strict';
        var color = '#FF0000';
        if (type === 'success') { color = 'green'; }
        $('#growl').html(message).css('background-color', color).show();
        setTimeout(function () { $('#growl').hide(); }, 1500);
    }//growl
};

/*
$(framework_ctrl).on("flare_next", function () {
    framework_ctrl.flare_next_button();
});
*/