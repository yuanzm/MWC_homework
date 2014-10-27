###
 * sorter.js
 *
 * A JavaScript to make all table sortable
 *
 * @author     yuanzm
 * @version    0.0.1
 * @copyright  Copyright 2014 yuanzm
###

window.onload = ->
	table = getAllTables()
	makeAllTableSortable(table)
	changeBackIcon()
###
* an object to Compatible with the event handler 
###
EventUtil =
	addHandler: (element, type, handler)->
		if element.attachEvent
			element.attachEvent("on" + type,handler)
		if element.addEventListener
			element.addEventListener(type,handler,false)
		else
			element["on" + type] = handler
	removeHandler: (element, type,handler) ->
		if element.detachEvent
			element.detachEvent("on" + type,handler)
		if element.removeEventListener
			element.removeEventListener(type,handler,false)
		else
			element["on" + type] = null

###
* convert an object to array
* @param _object: an array to be converted
* @return       : an array
###
toArray = (_object)->
	Array.prototype.slice.call(_object);

###
* traverse an array
* @param _array: an array to be traversed
* @param _callback: a function to be call when traversing the array
###
each = (_array, _callback) ->
	length = _array.length
	while length
		length -= 1
		_callback.call(this,_array[length], length)

###
* get the element children node for a given node
* @param node : a node to be dealed with
* @return     : an array consists of the element children node of the given node
###
getELementChild = (node) ->
	childNode = []
	for child in node.childNodes
		if child.nodeType == 1
			childNode.push child
	return childNode

###
* If there are three params passed to this function,the result will be the nth element node for given type .
* If there are two params passed to this function and the second param is a string of tagname, 
  the result will be an array consists of the element children node in type of the second param
* If there two params passed to this function and the second param is a number,
  the result will be the nth element children node of the given node
* @param parent : a node to be dealed with
* @param ele    : a string of tagname
* @param num    : a number to indicate the nth element children node you want

* get the nth element node of the given node
###
getNthChild = (parent, ele, num)->
	_ele = null
	child = getELementChild(parent)
	if arguments.length == 2
		if typeof arguments[1] == "string"
			_ele = Array.prototype.slice.call(parent.getElementsByTagName(arguments[1]))
		if typeof arguments[1] == "number"
			_ele = child[arguments[1]]
	if arguments.length == 3
		_ele = Array.prototype.slice.call(parent.getElementsByTagName(ele))[num]

	return _ele

getSiblingNode = (node) ->
	siblings = []
	parentNode = node.parentNode
	allSibling = getELementChild(parentNode)
	for sibling in allSibling
		if sibling != node
			siblings.push(sibling)
	return siblings

###
* Bubble sort for an array consist of "object HTMLCollection". 
  The "object HTMLCollection" is the collection of all "tr" element nodes in a "table" element node.
  After sorting, the array will be arranged in an ascending order or an descending order
* @param _array : an array consist of "object HTMLCollection"
* @param col    : an number to indicate which column you want to sort
* @param flag   : an flag to indicate the rule of sort
* @return       : an array that arrange in an ascending order or an descending order
###
sortTr = (_array, col, flag) ->
	for v1,i1 in _array
		for v2, i2 in _array
			_temp1 = getNthChild(v1,"td", col).innerHTML 
			_temp2 = getNthChild(v2,"td", col).innerHTML
			if flag == "up"
				if _temp2 > _temp1
					[_array[i2],_array[i1]]=[_array[i1],_array[i2]]		
			if flag == "down"
				if _temp2 < _temp1
					[_array[i2],_array[i1]]=[_array[i1],_array[i2]]
	return _array

###
* a function to check if a node has specific class
* @param ele : the node to be dealed with
* @param cla : a string of className
###
hasClass = (ele, cls) ->
	reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
	className = if ele.getAttribute("class") then ele.className else ""
	return reg.test(className)

###
* a function to add a class to the given node
* @param ele : the node to be added
* @param cla : a string of className 
###
addClass = (ele, cls) ->
	if not hasClass(ele, cls)
		ele.className += ' ' + cls

###
* a function to remove a class of the given node
* @param ele : a node to be dealed with
* @patam cls : a string of className 
###
removeClass = (ele,cls) ->
	if hasClass(ele, cls)
		reg = new RegExp('(\\s|^)'+cls+'(\\s|$)')
		ele.className = ele.className.replace(reg,' ')

###
* empty the body of table and replace with an array consist of new table body
* @param oldParentNode : the root node of table
* @param newNode : an array consist of a new table body
* @param type    : a flag to indicate the type of table,which means if the value of type is 1,the table has "THEAD" child node,and if the value of type is 2, the table has no "THEAD" child node.
###
replaceNode = (oldParentNode, newNode, type)->
	allTr = []
	if type == 1
		tbody = oldParentNode.getElementsByTagName('tbody')[0]
		allTr = getELementChild(tbody)
	if type == 2
		tbody = oldParentNode
		temp = getNthChild(oldParentNode, 'tr')
		allTr = temp.slice(1,temp.length)
	for tr in allTr
		tbody.removeChild(tr)
	for node in newNode
		tbody.appendChild(node)

###
* get all the tables in the page
###
getAllTables = ->
	allTable = []
	i = 0
	table = document.getElementsByTagName("table")
	for tab in table
		temp = {}
		_tb = []

		child = getELementChild(tab)
		if child[0].tagName == "THEAD" and child[child.length - 1].tagName == "TBODY"
			temp.head = child[0].getElementsByTagName("tr")[0]
			temp.body = child[child.length - 1].getElementsByTagName("tr")
			temp.type = 1
		if child[0].tagName == 'TBODY'
			allTr = toArray child[0].getElementsByTagName('tr')
			temp.head = allTr[0]
			temp.body = allTr.slice(1,allTr.length)
			temp.type = 2	
		each toArray(temp.body), (_arg) ->
			_tb.push(_arg.cloneNode(true))
			temp.body = _tb
		allTable.push(temp)
	return allTable

###
* The interface of this script.It bind an event handler for every table's head.that is,if you click the table's head,two things  will be executed,one is sort the table's body,two is replace the table's body
* @param table : an array consists of objects,and the object contain datas of every table. 
###
makeAllTableSortable = (table)->
	for _tab in table
		for _td,index in getELementChild(_tab.head)
			_body = _tab.body
			_type = _tab.type
			if _type == 1
				parent = _td.parentNode.parentNode.parentNode
			if _type == 2
				parent = _td.parentNode.parentNode
			((num,body,parent,type) ->
				EventUtil.addHandler _td, 'click', ->
					if hasClass(@, 'up') then removeClass(@, 'up') else addClass(@,'up')	
					if hasClass(@, 'up')
						a = sortTr(toArray(body), num, 'up')
					else
						a = sortTr(toArray(body), num,'down')
					replaceNode(parent, a, type)
			)(index,_body,parent,_type)

###
* when click the table header, the header will changge its style 
###
changeBackIcon = ->
	allTh = document.getElementsByTagName("th")
	for th in allTh
		EventUtil.addHandler th, 'click', ->
			siblings = getSiblingNode(@)
			for sib in siblings
				removeClass(sib, 'up')
				removeClass(sib, 'ascend')
				removeClass(sib, 'descend')
			if hasClass(@, 'up')
				removeClass(@, 'descend')
				addClass(@, 'ascend')
			else
				removeClass(@, 'ascend')
				addClass(@, 'descend')
		