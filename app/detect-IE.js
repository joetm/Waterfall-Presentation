/*global $, document*/

//Internet Explorer detection
//from http://www.pinlady.net/PluginDetect/IE/
function detect_InternetImplorer() {
    'use strict';
    var tmp = document.documentMode, isIE;
    try {document.documentMode = ""; } catch (ignore) {  }
    isIE = typeof document.documentMode === "number" || eval("/*@cc_on!@*/!1"); //evil? So is IE!
    try {document.documentMode = tmp; } catch (ignore) { }
    return isIE;
}//detect_InternetImplorer
