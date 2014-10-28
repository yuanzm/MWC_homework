define ->
	_result = {
		###
		* convert an object to array
		* @param _object: an array to be converted
		* @return       : an array
		###
		toArray : (_object)->
			Array.prototype.slice.call(_object)

		###
		* traverse an array
		* @param _array: an array to be traversed
		* @param _callback: a function to be call when traversing the array
		###
		each : (_array, _callback) ->
			length = _array.length
			while length
				length -= 1
				_callback.call(this,_array[length], length)

		checkType: (str) ->
			check = []
			num = 3
			type = ['float', 'integer','hasChinese',"notChinese"]

			#check whether a string is a floating-point number
			check.push /^\d+(\.\d+)?$/
			#check whether a string is a positive integer
			check.push /^[0-9]*[1-9][0-9]*$/
			#check whether a string contains Chinese word
			check.push /.*[\u4e00-\u9fa5]+.*$/
			
			for _check, index in check
				if _check.test(str)
					num = index
			type[num]
	}
