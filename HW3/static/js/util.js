;var util = function(doc) {
	'use strict';
	
	var hasClass = function(ele, cls) {
		var className, reg;
		reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
		className = ele.getAttribute("class") ? ele.className : "";
		return reg.test(className);
	}
	var addClass = function(ele, cls) {
		if (!hasClass(ele, cls)) {
			return ele.className += ' ' + cls;
		}
	}

	var removeClass = function(ele, cls) {
		var reg;
		if (hasClass(ele, cls)) {
			reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
			return ele.className = ele.className.replace(reg, ' ');
		}
	}

	return {
		hasClass: hasClass,
		addClass: addClass,
		removeClass: removeClass
	}
}(document)

