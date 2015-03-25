;var util = function(doc) {
	'use strict';
	
	/*
	*/
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

	function createXMLHttpRequest() {
		var xmlHttp;
		if (window.XMLHttpRequest) {
			return xmlHttp = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			return xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
	}

	function callback(xmlHttp, success) {
		if (xmlHttp.readyState == 4) {
			if (xmlHttp.status == 200) {
				var text = xmlHttp.responseText;
				success(text);
			}
		}
	}

	function Ajax(option) {
		var xmlHttp = createXMLHttpRequest();

		if(xmlHttp != null) {
			xmlHttp.onreadystatechange = function() {
				callback(xmlHttp, option.success);
			}
			xmlHttp.open(option.methods, option.url, true);
			xmlHttp.send();
		}
	}

	function getElementsByClassName(tagName, className) {
		var result = [];
		var alltag = document.getElementsByTagName(tagName);

		for (var i = 0;i < alltag.length;i++) {
			if (hasClass(alltag[i], className)) {
				result.push(alltag[i]);
			}
		}

		return result;
	}

	return {
		Ajax: Ajax,
		hasClass: hasClass,
		addClass: addClass,
		removeClass: removeClass,
		getElementsByClassName: getElementsByClassName
	}
}(document)

