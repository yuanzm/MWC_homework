/*
 * sorter.js
 *
 * A JavaScript to make all table sortable
 *
 * @author     yuanzm
 * @version    0.0.1
 * @copyright  Copyright 2014 yuanzm
*/


(function() {
  var EventUtil, addClass, changeBackIcon, each, getAllTables, getELementChild, getNthChild, getSiblingNode, hasClass, makeAllTableSortable, removeClass, replaceNode, sortTr, toArray;

  window.onload = function() {
    var table;
    table = getAllTables();
    makeAllTableSortable(table);
    return changeBackIcon();
  };

  /*
  * an object to Compatible with the event handler
  */


  EventUtil = {
    addHandler: function(element, type, handler) {
      if (element.attachEvent) {
        element.attachEvent("on" + type, handler);
      }
      if (element.addEventListener) {
        return element.addEventListener(type, handler, false);
      } else {
        return element["on" + type] = handler;
      }
    },
    removeHandler: function(element, type, handler) {
      if (element.detachEvent) {
        element.detachEvent("on" + type, handler);
      }
      if (element.removeEventListener) {
        return element.removeEventListener(type, handler, false);
      } else {
        return element["on" + type] = null;
      }
    }
  };

  /*
  * convert an object to array
  * @param _object: an array to be converted
  * @return       : an array
  */


  toArray = function(_object) {
    return Array.prototype.slice.call(_object);
  };

  /*
  * traverse an array
  * @param _array: an array to be traversed
  * @param _callback: a function to be call when traversing the array
  */


  each = function(_array, _callback) {
    var length, _results;
    length = _array.length;
    _results = [];
    while (length) {
      length -= 1;
      _results.push(_callback.call(this, _array[length], length));
    }
    return _results;
  };

  /*
  * get the element children node for a given node
  * @param node : a node to be dealed with
  * @return     : an array consists of the element children node of the given node
  */


  getELementChild = function(node) {
    var child, childNode, _i, _len, _ref;
    childNode = [];
    _ref = node.childNodes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      if (child.nodeType === 1) {
        childNode.push(child);
      }
    }
    return childNode;
  };

  /*
  * If there are three params passed to this function,the result will be the nth element node for given type .
  * If there are two params passed to this function and the second param is a string of tagname, 
    the result will be an array consists of the element children node in type of the second param
  * If there two params passed to this function and the second param is a number,
    the result will be the nth element children node of the given node
  * @param parent : a node to be dealed with
  * @param ele    : a string of tagname
  * @param num    : a number to indicate the nth element children node you want
  
  * get the nth element node of the given node
  */


  getNthChild = function(parent, ele, num) {
    var child, _ele;
    _ele = null;
    child = getELementChild(parent);
    if (arguments.length === 2) {
      if (typeof arguments[1] === "string") {
        _ele = Array.prototype.slice.call(parent.getElementsByTagName(arguments[1]));
      }
      if (typeof arguments[1] === "number") {
        _ele = child[arguments[1]];
      }
    }
    if (arguments.length === 3) {
      _ele = Array.prototype.slice.call(parent.getElementsByTagName(ele))[num];
    }
    return _ele;
  };

  getSiblingNode = function(node) {
    var allSibling, parentNode, sibling, siblings, _i, _len;
    siblings = [];
    parentNode = node.parentNode;
    allSibling = getELementChild(parentNode);
    for (_i = 0, _len = allSibling.length; _i < _len; _i++) {
      sibling = allSibling[_i];
      if (sibling !== node) {
        siblings.push(sibling);
      }
    }
    return siblings;
  };

  /*
  * Bubble sort for an array consist of "object HTMLCollection". 
    The "object HTMLCollection" is the collection of all "tr" element nodes in a "table" element node.
    After sorting, the array will be arranged in an ascending order or an descending order
  * @param _array : an array consist of "object HTMLCollection"
  * @param col    : an number to indicate which column you want to sort
  * @param flag   : an flag to indicate the rule of sort
  * @return       : an array that arrange in an ascending order or an descending order
  */


  sortTr = function(_array, col, flag) {
    var i1, i2, v1, v2, _i, _j, _len, _len1, _ref, _ref1, _temp1, _temp2;
    for (i1 = _i = 0, _len = _array.length; _i < _len; i1 = ++_i) {
      v1 = _array[i1];
      for (i2 = _j = 0, _len1 = _array.length; _j < _len1; i2 = ++_j) {
        v2 = _array[i2];
        _temp1 = getNthChild(v1, "td", col).innerHTML;
        _temp2 = getNthChild(v2, "td", col).innerHTML;
        if (flag === "up") {
          if (_temp2 > _temp1) {
            _ref = [_array[i1], _array[i2]], _array[i2] = _ref[0], _array[i1] = _ref[1];
          }
        }
        if (flag === "down") {
          if (_temp2 < _temp1) {
            _ref1 = [_array[i1], _array[i2]], _array[i2] = _ref1[0], _array[i1] = _ref1[1];
          }
        }
      }
    }
    return _array;
  };

  /*
  * a function to check if a node has specific class
  * @param ele : the node to be dealed with
  * @param cla : a string of className
  */


  hasClass = function(ele, cls) {
    var className, reg;
    reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    className = ele.getAttribute("class") ? ele.className : "";
    return reg.test(className);
  };

  /*
  * a function to add a class to the given node
  * @param ele : the node to be added
  * @param cla : a string of className
  */


  addClass = function(ele, cls) {
    if (!hasClass(ele, cls)) {
      return ele.className += ' ' + cls;
    }
  };

  /*
  * a function to remove a class of the given node
  * @param ele : a node to be dealed with
  * @patam cls : a string of className
  */


  removeClass = function(ele, cls) {
    var reg;
    if (hasClass(ele, cls)) {
      reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      return ele.className = ele.className.replace(reg, ' ');
    }
  };

  /*
  * empty the body of table and replace with an array consist of new table body
  * @param oldParentNode : the root node of table
  * @param newNode : an array consist of a new table body
  * @param type    : a flag to indicate the type of table,which means if the value of type is 1,the table has "THEAD" child node,and if the value of type is 2, the table has no "THEAD" child node.
  */


  replaceNode = function(oldParentNode, newNode, type) {
    var allTr, node, tbody, temp, tr, _i, _j, _len, _len1, _results;
    allTr = [];
    if (type === 1) {
      tbody = oldParentNode.getElementsByTagName('tbody')[0];
      allTr = getELementChild(tbody);
    }
    if (type === 2) {
      tbody = oldParentNode;
      temp = getNthChild(oldParentNode, 'tr');
      allTr = temp.slice(1, temp.length);
    }
    for (_i = 0, _len = allTr.length; _i < _len; _i++) {
      tr = allTr[_i];
      tbody.removeChild(tr);
    }
    _results = [];
    for (_j = 0, _len1 = newNode.length; _j < _len1; _j++) {
      node = newNode[_j];
      _results.push(tbody.appendChild(node));
    }
    return _results;
  };

  /*
  * get all the tables in the page
  */


  getAllTables = function() {
    var allTable, allTr, child, i, tab, table, temp, _i, _len, _tb;
    allTable = [];
    i = 0;
    table = document.getElementsByTagName("table");
    for (_i = 0, _len = table.length; _i < _len; _i++) {
      tab = table[_i];
      temp = {};
      _tb = [];
      child = getELementChild(tab);
      if (child[0].tagName === "THEAD" && child[child.length - 1].tagName === "TBODY") {
        temp.head = child[0].getElementsByTagName("tr")[0];
        temp.body = child[child.length - 1].getElementsByTagName("tr");
        temp.type = 1;
      }
      if (child[0].tagName === 'TBODY') {
        allTr = toArray(child[0].getElementsByTagName('tr'));
        temp.head = allTr[0];
        temp.body = allTr.slice(1, allTr.length);
        temp.type = 2;
      }
      each(toArray(temp.body), function(_arg) {
        _tb.push(_arg.cloneNode(true));
        return temp.body = _tb;
      });
      allTable.push(temp);
    }
    return allTable;
  };

  /*
  * The interface of this script.It bind an event handler for every table's head.that is,if you click the table's head,two things  will be executed,one is sort the table's body,two is replace the table's body
  * @param table : an array consists of objects,and the object contain datas of every table.
  */


  makeAllTableSortable = function(table) {
    var index, parent, _body, _i, _len, _results, _tab, _td, _type;
    _results = [];
    for (_i = 0, _len = table.length; _i < _len; _i++) {
      _tab = table[_i];
      _results.push((function() {
        var _j, _len1, _ref, _results1;
        _ref = getELementChild(_tab.head);
        _results1 = [];
        for (index = _j = 0, _len1 = _ref.length; _j < _len1; index = ++_j) {
          _td = _ref[index];
          _body = _tab.body;
          _type = _tab.type;
          if (_type === 1) {
            parent = _td.parentNode.parentNode.parentNode;
          }
          if (_type === 2) {
            parent = _td.parentNode.parentNode;
          }
          _results1.push((function(num, body, parent, type) {
            return EventUtil.addHandler(_td, 'click', function() {
              var a;
              if (hasClass(this, 'up')) {
                removeClass(this, 'up');
              } else {
                addClass(this, 'up');
              }
              if (hasClass(this, 'up')) {
                a = sortTr(toArray(body), num, 'up');
              } else {
                a = sortTr(toArray(body), num, 'down');
              }
              return replaceNode(parent, a, type);
            });
          })(index, _body, parent, _type));
        }
        return _results1;
      })());
    }
    return _results;
  };

  /*
  * when click the table header, the header will changge its style
  */


  changeBackIcon = function() {
    var allTh, th, _i, _len, _results;
    allTh = document.getElementsByTagName("th");
    _results = [];
    for (_i = 0, _len = allTh.length; _i < _len; _i++) {
      th = allTh[_i];
      _results.push(EventUtil.addHandler(th, 'click', function() {
        var sib, siblings, _j, _len1;
        siblings = getSiblingNode(this);
        for (_j = 0, _len1 = siblings.length; _j < _len1; _j++) {
          sib = siblings[_j];
          removeClass(sib, 'up');
          removeClass(sib, 'ascend');
          removeClass(sib, 'descend');
        }
        if (hasClass(this, 'up')) {
          removeClass(this, 'descend');
          return addClass(this, 'ascend');
        } else {
          removeClass(this, 'ascend');
          return addClass(this, 'descend');
        }
      }));
    }
    return _results;
  };

}).call(this);
