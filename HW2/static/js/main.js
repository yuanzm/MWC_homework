(function() {
  require(['require', './helper/table', './style'], function(require) {
    var allTable, style, table;
    table = require('./helper/table');
    style = require('./style');
    allTable = table.getAllTables();
    style.lineStyle(allTable);
    table.makeAllTableSortable(allTable);
    return style.changeBackIcon();
  });

}).call(this);
