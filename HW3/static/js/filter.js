;(function() {
	'use strict';

	/* get all the datas in the table 
	 */
	function getTableData(tabledom) {
		var allTr = tabledom.getElementsByTagName('tr')
		var dataArray = [];

		for(var i = 0;i < allTr.length;i++) {
			if (allTr[i].getElementsByTagName('th').length == 0) {
				dataArray.push(allTr[i].cloneNode(true));
			}
		}
		return dataArray;
	}

	function makeFilterable(tabledom) {
		var inputIdName = "table-filter";
		var tableData = getTableData(tabledom);

		/*
		 Highligh the text
		 */
		function highlightText(keyword,td) {
			var text = td.innerHTML; 
			var newText = text.replace(keyword, ('<span class="mark-keyword">' + keyword + '</span>'));
			td.innerHTML = newText;
		}


		function emptyTbody() {
			var tableBody = tabledom.getElementsByTagName('tbody')[0];
			var allTheTr = tableBody.getElementsByTagName('tr');
			var tempTr = [].slice.call(allTheTr);
			var len = tempTr.length; 
			for(var i = 0;i < len;i++) {
				tableBody.removeChild(tempTr[i])
			}
		}
		/* highlight the keyword and remove the invaild rows
		 */
		function filterText() {
			var keyword = this.value;
			var matchRows = {};
			var matchTrs = [];
			for (var i = 0;i < tableData.length;i++) {
				var tempTr = tableData[i].cloneNode(true) 
				var allTd = tempTr.getElementsByTagName('td');
				for(var j = 0; j < allTd.length;j++) {
					if (allTd[j].innerHTML.indexOf(keyword) > -1) {
						highlightText(keyword,allTd[j]);
						if (matchRows[i] == undefined) {
							matchRows[i] = tempTr;
						}
					}
				}
			}
			emptyTbody();
			var tableBody = tabledom.getElementsByTagName('tbody')[0];
			for(var col in matchRows) {
				tableBody.appendChild(matchRows[col]);
			}
		}
		/* Add filter input before the table
		 */
		function addFilterInput() {
			var label = document.createElement('label');
			var input = document.createElement('input');
			var parentNode = tabledom.parentNode;
			input.id = inputIdName;

			parentNode.insertBefore(input, tabledom);
			return document.getElementById(inputIdName);
		}

		/* Bind event
		 */
		function init() {
			var input = addFilterInput();
			input.addEventListener('keyup', filterText, false);
		}

		init();
	}
	window.onload = function() {
        var todo = document.getElementById('todo');
        makeFilterable(todo);
    }
})(document)