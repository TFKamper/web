/** External Links **/

function externalLinks() { if (!document.getElementsByTagName) return; var anchors = document.getElementsByTagName("a"); for (var i=0; i<anchors.length; i++) { var anchor = anchors[i]; if (anchor.getAttribute("href") && anchor.getAttribute("rel") == "external") anchor.target = "_blank"; } } window.onload = externalLinks;

/** Slider **/

$(document).ready(function() { $('#slideshow').cycle({ fx: 'fade', speed:  'slow', timeout: 5000, pager:  '#slider_nav', pagerAnchorBuilder: function(idx, slide) { return '#slider_nav li:eq(' + (idx) + ') a'; } }); });
