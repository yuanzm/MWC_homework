(function() {
  require(['require', './helper/table'], function(require) {
    var allTable, table;
    table = require('./helper/table');
    allTable = table.getAllTables();
    return table.makeAllTableSortable(allTable);
  });

}).call(this);
