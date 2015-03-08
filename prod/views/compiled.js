(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["agile.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class='subtitle center' style='margin-bottom:00px;'>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "sub_title"), env.autoesc);
output += "</div>\r\n\r\n<!--\r\n<div class='page_text'>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "page_text"), env.autoesc);
output += "</div>\r\n-->\r\n\r\n<div class=\"col-xs-12 col-sm-8 col-md-9 col-lg-8 connectedSortable\" id=\"agile_left\">\r\n\t<div id=\"model_container\">\r\n    ";
output += runtime.suppressValue((lineno = 8, colno = 18, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "sortitems")),"join", env.autoesc), "sortitems[\"join\"]", [""])), env.autoesc);
output += "\r\n\t</div>\r\n</div>\r\n\r\n<div style='margin:10px 0px 10px 0px'>Drag the models on the boxes</div>\r\n\r\n<ul class=\"col-xs-12 col-sm-4 col-md-3 col-lg-4 connectedSortable\" id=\"agile_models_list\">\r\n    ";
output += runtime.suppressValue((lineno = 15, colno = 23, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "rightside_list")),"join", env.autoesc), "rightside_list[\"join\"]", [""])), env.autoesc);
output += "\r\n</ul>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["credits.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div id='credits'>\r\n\r\n<h3>Credits and Technologies used:</h3>\r\n\r\n";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "tplcontent");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("c", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\r\n\t<h4>";
output += runtime.suppressValue(runtime.memberLookup((t_4),"title", env.autoesc), env.autoesc);
output += "</h4>\r\n\t";
frame = frame.push();
var t_7 = runtime.memberLookup((t_4),"listitems", env.autoesc);
if(t_7) {var t_6 = t_7.length;
for(var t_5=0; t_5 < t_7.length; t_5++) {
var t_8 = t_7[t_5];
frame.set("item", t_8);
frame.set("loop.index", t_5 + 1);
frame.set("loop.index0", t_5);
frame.set("loop.revindex", t_6 - t_5);
frame.set("loop.revindex0", t_6 - t_5 - 1);
frame.set("loop.first", t_5 === 0);
frame.set("loop.last", t_5 === t_6 - 1);
frame.set("loop.length", t_6);
output += "\r\n\t<ul>\r\n\t  <li>";
if(runtime.memberLookup((t_8),"link", env.autoesc)) {
output += "<a href=\"";
output += runtime.suppressValue(runtime.memberLookup((t_8),"link", env.autoesc), env.autoesc);
output += "\" target=\"_blank\">";
output += runtime.suppressValue(runtime.memberLookup((t_8),"title", env.autoesc), env.autoesc);
output += "</a>";
;
}
else {
output += runtime.suppressValue(runtime.memberLookup((t_8),"title", env.autoesc), env.autoesc);
;
}
output += "</li>\r\n\t</ul>\r\n\t";
;
}
}
frame = frame.pop();
output += "\r\n";
;
}
}
frame = frame.pop();
output += "\r\n\r\n</div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["d3anim.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "\r\n<div class='clearfix'>\r\n    <div id='d3_button_controls' style='color:#FFF'><!--CONTROLS-->\r\n        <button id='step1' class='btn btn-default'>Add Step 1</button>\r\n        <button id='step2' class='btn btn-default'>Add Step 2</button>\r\n        <button id='step3' class='btn btn-default'>Add Step 3</button>\r\n        <button id='step4' class='btn btn-default'>Add Step 4</button>\r\n        <button id='step5' class='btn btn-default'>Add Step 5</button>\r\n    </div>\r\n    <div id='d3_step_descr'></div>\r\n</div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["definition.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class='main_title' style='width:80%'>\r\n\tWaterfall Software Development:\r\n</div>\r\n<div class='main_title' style='width:80%'>\r\n\tA sequential design process used in software development and many other industries.\r\n</div>\r\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["imagemap.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<img src='img/waterfall.png' id='waterfall_img' class='img-responsive' alt='Waterfall model' usemap='#waterfall'>\r\n<!--explanation box template-->\r\n<div id='expl_box_templ' class='pagetrans_hide'>\r\n\t<div class='title'></div>\r\n\t<div class='content'></div>\r\n</div>\r\n<map name=\"waterfall\" id=\"waterfall_map\">\r\n\t<area id=\"wf_map_system\" alt=\"System Requirements\" title=\"System Requirements\" href=\"#\" shape=\"rect\" coords=\"17,10,236,121\" style=\"outline:none;\">\r\n\t<area id=\"wf_map_software\" alt=\"Software Requirements\" title=\"Software Requirements\" href=\"#\" shape=\"rect\" coords=\"224,140,443,251\" style=\"outline:none;\">\r\n\t<area id=\"wf_map_analysis\" alt=\"Analysis\" title=\"Analysis\" href=\"#\" shape=\"rect\" coords=\"440,272,659,383\" style=\"outline:none;\">\r\n\t<area id=\"wf_map_design\" alt=\"Design\" title=\"Design\" href=\"#\" shape=\"rect\" coords=\"660,409,879,520\" style=\"outline:none;\">\r\n\t<area id=\"wf_map_coding\" alt=\"Coding\" title=\"Coding\" href=\"#\" shape=\"rect\" coords=\"877,542,1096,653\" style=\"outline:none;\">\r\n\t<area id=\"wf_map_testing\" alt=\"Testing\" title=\"Testing\" href=\"#\" shape=\"rect\" coords=\"1089.8000001907349,679.3999938964844,1308.8000001907349,790.3999938964844\" style=\"outline:none;\">\r\n\t<area id=\"wf_map_operations\" alt=\"Operations\" title=\"Operations\" href=\"#\" shape=\"rect\" coords=\"1308,814,1527,925\" style=\"outline:none;\">\r\n</map>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["intro.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class='main_title'>Software Engineering</div>\r\n\r\n<div class='content'>with the <strong>Waterfall</strong> Process Model</div>\r\n\r\n<div class='subtext'>Explore Winston W. Royce's influential paper from 1970</div>\r\n\r\n<button class='startbutton btn btn-warning' onclick='framework_ctrl.next_page();'>Let's Get Started!</button>\r\n\r\n<div class=\"subtext\" style='margin-top:20px;'>[Click the next button or navigate with the keyboard arrow keys.]</div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["partial_navbar_chapter.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class='navchapter ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "chapter_class"), env.autoesc);
output += "' ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "transition_clickhandler"), env.autoesc);
output += ">\r\n    <span class='visible-xs visible-sm visible-md hidden-lg'><span class=\"hidden-xs\">Ch.</span> ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "index"), env.autoesc);
output += "</span>\r\n    <span class='hidden-xs hidden-sm hidden-md visible-lg'>Chapter ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "index"), env.autoesc);
output += "</span>\r\n</div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["partial_navbar_chaptertitle.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<span class='visible-xs hidden-sm hidden-md hidden-lg'>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "index"), env.autoesc);
output += "</span>\r\n<span class='hidden-xs visible-sm visible-md visible-lg'>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "title"), env.autoesc);
output += "</span>\r\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["quiz - Copy.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class='subtitle'>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "title"), env.autoesc);
output += "</div>\r\n\r\n<ul class=\"quiz_list clearfix\">\r\n";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "questions");
if(t_3) {var t_1;
if(runtime.isArray(t_3)) {
var t_2 = t_3.length;
for(t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1][0]
frame.set("key", t_3[t_1][0]);
var t_5 = t_3[t_1][1]
frame.set("lbl", t_3[t_1][1]);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\r\n\t<li id='q_";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "quiznum"), env.autoesc);
output += "_";
output += runtime.suppressValue(t_4, env.autoesc);
output += "'>\r\n\t<input name='quiz' type='radio' id='r";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "quiznum"), env.autoesc);
output += "_";
output += runtime.suppressValue(t_4, env.autoesc);
output += "' value='";
output += runtime.suppressValue(t_4, env.autoesc);
output += "' />\r\n\t<label for='r";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "quiznum"), env.autoesc);
output += "_";
output += runtime.suppressValue(t_4, env.autoesc);
output += "'>";
output += runtime.suppressValue(t_5, env.autoesc);
output += "</label>\r\n\t</li>\r\n";
;
}
} else {
t_1 = -1;
var t_2 = runtime.keys(t_3).length;
for(var t_6 in t_3) {
t_1++;
var t_7 = t_3[t_6];
frame.set("key", t_6);
frame.set("lbl", t_7);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\r\n\t<li id='q_";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "quiznum"), env.autoesc);
output += "_";
output += runtime.suppressValue(t_6, env.autoesc);
output += "'>\r\n\t<input name='quiz' type='radio' id='r";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "quiznum"), env.autoesc);
output += "_";
output += runtime.suppressValue(t_6, env.autoesc);
output += "' value='";
output += runtime.suppressValue(t_6, env.autoesc);
output += "' />\r\n\t<label for='r";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "quiznum"), env.autoesc);
output += "_";
output += runtime.suppressValue(t_6, env.autoesc);
output += "'>";
output += runtime.suppressValue(t_7, env.autoesc);
output += "</label>\r\n\t</li>\r\n";
;
}
}
}
frame = frame.pop();
output += "\r\n</ul>\r\n\r\n<button id='solvebutton";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "quiznum"), env.autoesc);
output += "' class='solvebutton btn btn-warning'>Solve</button>\r\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["quiz.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class=\"col-xs-12 col-sm-offset-1 col-sm-10 col-md-offset-2 col-md-8\">\r\n\r\n<div class='subtitle'>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "title"), env.autoesc);
output += "</div>\r\n\r\n<ul class=\"quiz_list clearfix\">\r\n";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "questions");
if(t_3) {var t_1;
if(runtime.isArray(t_3)) {
var t_2 = t_3.length;
for(t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1][0]
frame.set("key", t_3[t_1][0]);
var t_5 = t_3[t_1][1]
frame.set("lbl", t_3[t_1][1]);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\r\n\t<li id='q_";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "quiznum"), env.autoesc);
output += "_";
output += runtime.suppressValue(t_4, env.autoesc);
output += "'>\r\n\t<input name='quiz' type='radio' id='r";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "quiznum"), env.autoesc);
output += "_";
output += runtime.suppressValue(t_4, env.autoesc);
output += "' value='";
output += runtime.suppressValue(t_4, env.autoesc);
output += "' />\r\n\t<label for='r";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "quiznum"), env.autoesc);
output += "_";
output += runtime.suppressValue(t_4, env.autoesc);
output += "'>";
output += runtime.suppressValue(t_5, env.autoesc);
output += "</label>\r\n\t</li>\r\n";
;
}
} else {
t_1 = -1;
var t_2 = runtime.keys(t_3).length;
for(var t_6 in t_3) {
t_1++;
var t_7 = t_3[t_6];
frame.set("key", t_6);
frame.set("lbl", t_7);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\r\n\t<li id='q_";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "quiznum"), env.autoesc);
output += "_";
output += runtime.suppressValue(t_6, env.autoesc);
output += "'>\r\n\t<input name='quiz' type='radio' id='r";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "quiznum"), env.autoesc);
output += "_";
output += runtime.suppressValue(t_6, env.autoesc);
output += "' value='";
output += runtime.suppressValue(t_6, env.autoesc);
output += "' />\r\n\t<label for='r";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "quiznum"), env.autoesc);
output += "_";
output += runtime.suppressValue(t_6, env.autoesc);
output += "'>";
output += runtime.suppressValue(t_7, env.autoesc);
output += "</label>\r\n\t</li>\r\n";
;
}
}
}
frame = frame.pop();
output += "\r\n</ul>\r\n\r\n<button id='solvebutton";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "quiznum"), env.autoesc);
output += "' class='solvebutton btn btn-warning'>Solve</button>\r\n\r\n</div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["quiz_procons.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div id=\"wrap-procons\" class=\"row clearfix\">\r\n\r\n    <div class=\"row\">\r\n        <ul class=\"col-xs-4 connectedSortablePC\" id=\"proconlist\">\r\n\t\t\t<li class=\"nodrag\">Sort the steps</li>\r\n            ";
output += runtime.suppressValue((lineno = 5, colno = 26, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "sortitems")),"join", env.autoesc), "sortitems[\"join\"]", [""])), env.autoesc);
output += "\r\n        </ul>\r\n        <ul class=\"col-xs-4 connectedSortablePC\" id=\"prolist\">\r\n            <li class=\"nodrag\" data-header='1'>Use</li>\r\n        </ul>\r\n        <ul class=\"col-xs-4 connectedSortablePC\" id=\"conlist\">\r\n            <li class=\"nodrag\" data-header='1'>Don&apos;t Use</li>\r\n        </ul>\r\n    </div>\r\n\r\n</div>\r\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["quiz_success.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class='subtitle center'>Correct!</div>\r\n\r\n";
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "paragraphs");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("txt", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\r\n<div class='page_text biglist'>";
output += runtime.suppressValue(t_4, env.autoesc);
output += "</div>\r\n";
;
}
}
frame = frame.pop();
output += "\r\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["sort_steps.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class='subtitle center'>Sort the Steps</div>\r\n\r\n<div id=\"sortablesteps\" class=\"row clearfix\" />\r\n\r\n    <ul id=\"sortable1\" class=\"col-xs-6 col-md-offset-1 col-md-5 col-lg-offset-2 col-lg-4 connectedSortable\">\r\n        ";
frame = frame.push();
var t_3 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "sortlists")),"left", env.autoesc);
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("item", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\r\n        <li data-sp=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"sp", env.autoesc), env.autoesc);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"label", env.autoesc), env.autoesc);
output += "</li><!--id=\"sort_";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loop")),"index", env.autoesc), env.autoesc);
output += "\"-->\r\n        ";
;
}
}
frame = frame.pop();
output += "\r\n    </ul>\r\n\r\n    <ul id=\"sortable2\" class=\"col-xs-6 col-md-5 col-lg-4 connectedSortable\">\r\n        ";
frame = frame.push();
var t_7 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "sortlists")),"right", env.autoesc);
if(t_7) {var t_6 = t_7.length;
for(var t_5=0; t_5 < t_7.length; t_5++) {
var t_8 = t_7[t_5];
frame.set("item", t_8);
frame.set("loop.index", t_5 + 1);
frame.set("loop.index0", t_5);
frame.set("loop.revindex", t_6 - t_5);
frame.set("loop.revindex0", t_6 - t_5 - 1);
frame.set("loop.first", t_5 === 0);
frame.set("loop.last", t_5 === t_6 - 1);
frame.set("loop.length", t_6);
output += "\r\n        <li class=\"step-nd\" data-sp=\"";
output += runtime.suppressValue(runtime.memberLookup((t_8),"sp", env.autoesc), env.autoesc);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_8),"label", env.autoesc), env.autoesc);
output += "</li>\r\n        ";
;
}
}
frame = frame.pop();
output += "\r\n    </ul>\r\n\r\n</div>\r\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["sort_steps_html5.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div class='subtitle center'>Sort the Steps</div>\r\n\r\n<script>\r\nfunction allowDrop(ev) {\r\n    ev.preventDefault();\r\n}\r\n\r\nfunction drag(ev) {\r\n    ev.dataTransfer.setData(\"text\", ev.target.id);\r\n}\r\n\r\nfunction drop(ev) {\r\n    ev.preventDefault();\r\n    var data = ev.dataTransfer.getData(\"text\");\r\n    ev.target.appendChild(document.getElementById(data));\r\n}\r\n</script>\r\n</head>\r\n<body>\r\n\r\n<div id=\"div1\" ondrop=\"drop(event)\" ondragover=\"allowDrop(event)\"></div>\r\n\r\n\r\n<div id=\"sortablesteps\" class=\"row clearfix\" />\r\n\r\n    <ul id=\"html5_sortable1\" class=\"col-xs-6 col-md-offset-1 col-md-5 col-lg-offset-2 col-lg-4\">\r\n        <li id=\"sort_0\" draggable=\"true\" ondragstart=\"drag(event)\" data-sp=\"0\">System Requirements</li>\r\n        <li id=\"sort_0\" draggable=\"true\" ondragstart=\"drag(event)\" data-sp=\"0\">Operations</li>\r\n        <li id=\"sort_0\" draggable=\"true\" ondragstart=\"drag(event)\" data-sp=\"0\">Program Design</li>\r\n        <li id=\"sort_0\" draggable=\"true\" ondragstart=\"drag(event)\" data-sp=\"0\">Testing</li>\r\n        <li id=\"sort_0\" draggable=\"true\" ondragstart=\"drag(event)\" data-sp=\"0\">Coding</li>\r\n        <li id=\"sort_0\" draggable=\"true\" ondragstart=\"drag(event)\" data-sp=\"0\">Software Requirements</li>\r\n        <li id=\"sort_0\" draggable=\"true\" ondragstart=\"drag(event)\" data-sp=\"0\">Analysis</li>\r\n    </ul>\r\n\r\n    <ul id=\"html5_sortable2\" class=\"col-xs-6 col-md-5 col-lg-4\">\r\n        <li class=\"step-nd\" data-sp=\"0\">Project Start</li>\r\n        <li class=\"step-nd\" draggable=\"true\" ondrop=\"drop(event)\" ondragover=\"allowDrop(event)\"></li>\r\n        <li class=\"step-nd\" data-sp=\"8\">Project End</li>\r\n    </ul>\r\n\r\n</div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["summary.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "tplcontent");
if(t_3) {var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("txt", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "\r\n<div class='page_text biglist'>\r\n";
output += runtime.suppressValue(t_4, env.autoesc);
output += "\r\n</div>\r\n";
;
}
}
frame = frame.pop();
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["waterfall_application.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div id=\"applications\" class=\"center\" style='margin-top:5px;font-size:0.9em'>\r\n\r\n\t<div class='page_text'>\r\n\t\tThe phase-gate process of innovation and product development\r\n\t</div>\r\n\r\n\t<div class='page_text'>\r\n\t\tExample: a process to create new IT services\r\n\t</div>\r\n\r\n\t<div class='page_text' id=\"animation_container\">\r\n\t\t<div id='anim_constrainer' class=\"clearfix\">\r\n    \t    <svg id=\"circle\" height=\"60\" width=\"60\">\r\n    \t        <circle cx=\"30\" cy=\"30\" r=\"30\" stroke=\"#000000\" stroke-width=\"3\" fill=\"#FFFFFF\" />\r\n    \t    </svg>\r\n        </div>\r\n\t\t<img class='img-responsive img-80' src='img/stage-gate-process/Slide12.PNG' alt='stage-gate process' />\r\n\t</div>\r\n\t<!--\r\n\t<div class='page_text' style='margin-bottom:5px;'>\r\n\t\tThe project has several milestones.\r\n\t\tAt any of the gate reviews S1 to S4, a decision is made to either progress with the product or cease development.\r\n\t</div>\r\n\t-->\r\n</div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["waterfall_popularity.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div style='margin-top:5px;font-size:0.9em'>\r\n\r\n\t<div class='page_text'>\r\n\t\t<ul class=\"main_title\"><!--biglist-->\r\n\t\t\t<li>Logic and intuitive</li>\r\n\t\t\t<li>Planning</li>\r\n\t\t\t<li>Budgeting</li>\r\n\t\t</ul>\r\n\t\t<!--\r\n\t\tManagers love to estimate progress.\r\n\t\tThey have both their customers and shareholders in mind when making decisions.\r\n\t\tCorporate organisations operate on quarterly and yearly budget cycles.\r\n\t\tWithout planning, no budget can be allocated to a project in advance.\r\n\t\t-->\r\n\t</div>\r\n\r\n</div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["waterfall_steps.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<canvas id=\"arbor_viewport\" width=\"800\" height=\"450\" style=\"border:1px solid red;max-width:100%;\"></canvas>\r\n<img id=\"exciting_picture\" src=\"images/focus-group.jpg\" alt=\"\" />";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["waterfall_steps_test.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div id=\"waterfall_steps_d3\">\r\n\r\n\t<div id=\"step_description\"></div>\r\n\r\n    <img src=\"images/clear.gif\" id=\"exciting_picture\" alt=\"\" />\r\n\r\n</div>";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
