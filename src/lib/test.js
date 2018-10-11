const say = function() {
	var div = document.createElement('div');
	div.innerHTML = "<strong>Hello teacher</strong>, have a nice day :)";
	div.style.width = 750;
	div.style.fontSize = 45;
	div.style.padding =150;
	div.style.backgroundColor = "#7FFF00";
	document.body.appendChild(div);
};

export default say;
