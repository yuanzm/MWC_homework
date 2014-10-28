require ['require','./helper/table','./style'], (require) ->
	table = require('./helper/table')
	style = require('./style')

	allTable = table.getAllTables()
	style.lineStyle(allTable)
	table.makeAllTableSortable(allTable)
	style.changeBackIcon();
