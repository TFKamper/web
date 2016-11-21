/** External Links **/

function externalLinks() { if (!document.getElementsByTagName) return; var anchors = document.getElementsByTagName("a"); for (var i=0; i<anchors.length; i++) { var anchor = anchors[i]; if (anchor.getAttribute("href") && anchor.getAttribute("rel") == "external") anchor.target = "_blank"; } } window.onload = externalLinks;


/** Gallery **/

$(document).ready(function(){	$("#gallerycont").easySlider({ controlsBefore:	'<p id="controls">', controlsAfter:	'</p>', auto: true, continuous: true }); });