/*global $, console, d3anim, pages_ctrl*/

//'use strict';

/*********** quizzes ***********/
var quizzes = {
    quiz1 : {
        "title": "Royce saw the application of the waterfall model in which area?",
        "intro_text": "Royce saw the application of waterfall in which area?",
        "questions": {
            '0': "Operation of complex IT services",
            '1': "Large software development projects",
            '2': "Supplier management",
            '3': "Computer manufacturing"
        },
        "answer": 1
    },
    quiz2 : {
        "title": "What is the major shortcoming of the waterfall model, according to Royce?",
        "intro_text": "What is the major shortcoming of the waterfall model, according to Royce?",
        "questions": {
            '0': "It is too expensive",
            '1': "Design iterations are done only between successive steps",
            '2': "It requires too many resources (people, equipment, finances)",
            '3': "It increases the risk of a project"
        },
        "answer": 1,
        "answer_text": {
            paragraphs: [
                'The steps of the model are undertaken in sequential order, with only consecutive steps exchanging information.',
                'If the requirements change late in the project, one has to go back to earlier stages.',
                'Time and money will be lost in adapting the work to the changed requirements.',
                'Such a change in requirements is called &quot;scope creep&quot;.'

            ]
        }
    },
    quiz3 : {
        "title": "Which step takes the most resources in a project, according to Royce?",
        "intro_text": "What takes the most resources in a project, according to Royce?",
        "questions": {
            '0': "Requirement Elicitation",
            '1': "Requirement Analysis",
            '2': "Program Design",
            '3': "Program Implementation",
            '4': "Testing"
        },
        "answer": 4
    },
    quiz4 : {
        "title": "Which stakeholder did Royce suggest to involve in the process?",
        "intro_text": "Which stakeholder did Royce suggest to involve in the process?",
        "questions": {
            '0': "Project Sponsor",
            '1': "Project Manager",
            '2': "Program Director",
            '3': "Customer",
            '4': "Frontend Designer",
            '5': "Pizza Delivery Guy",
            '6': "Software Engineer",
            '7': "System Architect"
        },
        "answer": 3
    }
};


/******* Sortables *******/
var sortable_steps = {
    'left': [
        {label: 'Requirements', sp: 1},
//        {label: 'Software Requirements', sp: 2},
        {label: 'Analysis', sp: 2},
        {label: 'Program Design', sp: 3},
        {label: 'Coding', sp: 4},
        {label: 'Testing', sp: 5},
        {label: 'Operations', sp: 6}
    ],
    'right': [
        {label: 'Project Start', sp: 0},
        {label: 'Project End', sp: 7}
    ]
};

var sortable_procons = {
    items: [
        {label: 'When risk must be tightly controlled', type: 'pro'},
        {label: 'When there are frequent changes to the project scope', type: 'con'},
        //{label: 'Large scale system projects', type: 'pro'},
        {label: 'If high level of documentation is required', type: 'pro'},
        {label: 'Web Development projects', type: 'con'},
        {label: 'When completion of all deliverables must be ensured', type: 'pro'},
        {label: 'Requirements are not well understood', type: 'con'},
        //{label: 'Project is similar to past project', type: 'pro'},
        {label: 'Doing well-defined enhancements of systems', type: 'pro'}
    ],
    answer_text: 'Royce suggested five solutions to overcome the Waterfall model\'s shortcomings. ' +
        'On the following page, you can explore the five improvements that Royce suggested in his paper.'
};


/******* PAGE SETUP *********/
pages_ctrl.pages = [
    {
        'title': '',
        'page_type': 'intro',
        'chapter_title': 'Intro<span class="hidden-xs hidden-sm">duction</span>',
        'template': "intro.html"
    },
    {
        'title': 'What is it?', //Waterfall Software Development
        'page_type': 'text',
        'chapter_title': 'Intro<span class="hidden-xs hidden-sm hidden-md">duction</span>',
        'template': "definition.html"
    },
    {
        'title': 'The Waterfall Model Steps',
        'chapter_title': '<span class="hidden-xs hidden-sm hidden-md">The </span> Steps',
        'page_type': 'sort',
        'template': 'sort_steps.html',
        'content': sortable_steps
    },
    {
        'title': 'The Steps Explained',
        'chapter_title': '<!--<span class="hidden-xs hidden-sm hidden-md">The </span>-->Explained',
        'page_type': 'arbor',
        'template': 'waterfall_steps_test.html'
    },
/*
    {
        'title': 'The Waterfall Software Development Model',
        'chapter_title': '<span class="hidden-xs hidden-sm">The</span> Model',
        'subtitle': 'Click the boxes to learn more about each stage.',
        'page_type': 'text',
        'template': 'imagemap.html'
    },
*/
/*
    {
        'title': 'Test your knowledge',
        'chapter_title': 'Quiz',
        'page_type': 'quiz',
        'content': quizzes.quiz4 //which stakeholder to involve
    },
*/
    {
        'title': 'Test your knowledge',
        'chapter_title': 'Quiz',
        'page_type': 'quiz',
        'content': quizzes.quiz2 //major shortcoming of model: iterations
    },
    {
        'title': 'Test your knowledge',
        'chapter_title': 'Quiz',
        'page_type': 'quiz',
        'content': quizzes.quiz3 //step that takes the most resources
    },
    {
        'title': 'Project Cost',
        'chapter_title': 'Costs',
        'page_type': 'text',
        'content': '<div class="subtitle center">Correcting a software defect late in a project can cost 100 times more than fixing the defect early.</div>' +
            '<img src="images/cost-graph.png" class="img-responsive img-80" style="margin-top:20px" alt="Cost diagram" />'
    },
    {
        'title': 'Explore Royce\'s Steps of Improvement',
        'chapter_title': '<!--<span class="hidden-xs hidden-sm">Explore the</span> Steps-->Explore',
        'page_type': 'd3',
        'content': ''
    },
    {
        'title': 'Test your knowledge',
        'chapter_title': 'Quiz',
        'page_type': 'quiz',
        'content': quizzes.quiz1 //area of application
    },
    {
        'title': 'When to use the Waterfall Model?',
        'chapter_title': 'Uses',
        'page_type': 'procons',
        'content': sortable_procons
    },
    {
        'title' : 'Application of the Waterfall Method',
        'chapter_title': 'Application',
        'page_type': 'application',
        'template': 'waterfall_application.html'
    },
    {
        'title' : 'Why is the Waterfall Model so popular?',
        'chapter_title': 'Popularity',
        'page_type': 'text',
        'template': 'waterfall_popularity.html'
    },
    {
        'title' : 'What are the Alternatives?',
        'chapter_title': 'Alternatives',
        'page_type': 'agile',
        'content': {
            'sub_title': 'Identify the models',
            'page_text': "The deficiencies of the Waterfall model have inspired many thinkers to come up with new development models. Some of them try to improve the waterfall model (like the Spiral Model), others are more radical (like the agile development methods Extreme Programming and Scrum).",
            'sortitems' : [

                '<div class="wrap"><img src="img/spiral_model.png" class="img-responsive" alt="" />' +
                    '<div id="drop_model1" class="agile_dropcontainer" data-solution="1" data-answer="0"></div></div>',

                '<div class="wrap"><img src="img/scrum-framework2.png" class="img-responsive" alt="" />' +
                    '<div id="drop_model2" class="agile_dropcontainer" data-solution="2" data-answer="0"></div></div>',

                '<div class="wrap"><img src="img/rad.png" class="img-responsive" alt="" />' +
                    '<div id="drop_model3" class="agile_dropcontainer" data-solution="4" data-answer="0"></div></div>',

                '<div class="wrap"><img src="img/xp.png" class="img-responsive" alt="" />' +
                    '<div id="drop_model4" class="agile_dropcontainer" data-solution="3" data-answer="0"></div></div>'
            ],
            'rightside_list' : [
                '<li class="col-xs-6 step-ag" data-answer="0">V-Model</li>',
                '<li class="col-xs-6 step-ag" data-answer="2">Scrum</li>',
                '<li class="col-xs-6 step-ag" data-answer="3">Extreme Programming</li>',
                '<li class="col-xs-6 step-ag" data-answer="1">Spiral Development</li>',
                '<li class="col-xs-6 step-ag" data-answer="0">Feature-Driven Development</li>',
                '<li class="col-xs-6 step-ag" data-answer="4">Rapid Application Development</li>',
                '<li class="col-xs-6 step-ag" data-answer="5">Waterfall</li>',
                '<li class="col-xs-6 step-ag hidden-xs" data-answer="0">Unified Process</li>',
                '<li class="col-xs-6 step-ag hidden-xs" data-answer="0">Code and Fix</li>',
                '<li class="col-xs-6 step-ag hidden-xs hidden-md" data-answer="0">Chaos Model</li>'
            ]
        }
    },
    {
        'title' : 'Summary',
        'chapter_title': 'Summary',
        'page_type' : 'text',
        'template': 'summary.html',
        'content' : {
            tplcontent: [
                "The Waterfall model structures a complex task in logical steps.",
                "It has it's shortcomings.",
                "It is widely employed in many industries.",
                "Agile methods are becoming more popular."
            ]
        }
    },
    {
        'title': 'THE END',
        'chapter_title': 'Credits',
        'page_type': 'text',
        'template' : 'credits.html',
        'content': {
            tplcontent : [
                {
                    title: 'Basis',
                    listitems: [
                        {title: "JavaScript", link: null},
                        {title: "CSS3, Sass", link: 'http://sass-lang.com/'},
                        {title: "Bootstrap", link: 'http://getbootstrap.com/'}
                    ]
                },
                {
                    title: 'JavaScript libraries',
                    listitems: [
                        {title: "jQuery", link: 'http://jquery.com/'},
                        {title: "Nunjucks JavaScript templates", link: 'http://mozilla.github.io/nunjucks/'},
                        {title: "jQuery UI - Draggable, Droppable, Sortable", link: 'http://jqueryui.com/'},
                        {title: "D3.js", link: 'http://d3js.org/'}
                    ]
                },
                {
                    title: 'Miscellaneous',
                    listitems: [
                        {title: 'Google Fonts: Indie Flower', link: 'https://www.google.com/fonts/specimen/Indie+Flower'},
                        {title: '"Service Catalogue Management process", internal document, unpublished, 2013.', link: null},
                        {title: 'Blackboard background, found at mckelvies.com', link: 'http://mckelvies.com/dinner-menu/'}
                    ]
                }
            ]
        }
    }
];

quizzes = sortable_procons = sortable_steps = null;
