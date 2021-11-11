var _pageData = JSON.parse(_pageData);
delete _pageData._id;
var canvasStyleData = _pageData.content.canvasStyleData;
var newHeight = window.innerWidth;
let p = newHeight / canvasStyleData.height
document.getElementById("editor").style.transform = "scale(" + p + ")";
document.getElementById("editor").style.transformOrigin = "top";
