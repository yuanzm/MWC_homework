require ['require','./helper/table'], (require) ->
	table = require('./helper/table')
	
	allTable = table.getAllTables()
	table.makeAllTableSortable(allTable)
