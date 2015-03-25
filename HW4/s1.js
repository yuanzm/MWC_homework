;(function(doc) {
	'use strict';

	var btnClass = {
		littleBtn: 'button',
		initialMsg: 'unread',
		clickAble: 'active',
		unClickAble: 'not-active'
	}

	function HumanInteraction() {
		this.allLittleBtn = util.getElementsByClassName('li', btnClass.littleBtn);
		this.bigBubble = document.getElementById('big-bubble');
		this.wrapper = document.getElementById('button');
		this.len = this.allLittleBtn.length;
	}
	HumanInteraction.prototype = {
		constructor: HumanInteraction,
		init: function() {
			this.enAbleBigBubble();

			var self = this;
			for(var i = 0;i < this.len;i++) {
				(function(index) {
					var elem = self.allLittleBtn[index]; 
					elem.onclick = function() {
						if (!util.hasClass(elem, btnClass.unClickAble)) {
							self.showCorrespondCircle(elem);
							self.getRandomNumber(function(data) {
								self.displayRandomNum(elem, data);
								self.enAbleOtherBtn();
								self.disableSelfButton(elem);

								var flag = self.checkAllGetNumber();
								console.log(flag);
								if (flag) {
									self.disableBigBbble();
								}

							})
						}
					}
				})(i)
			}

			this.bigBubble.onclick = function() {
				if(util.hasClass(this, 'big-active')) {
					this.innerHTML = self.calculateAllNumber();
				}
			}

			this.wrapper.onmouseleave = function() {
				self.resetAll();
			}
		},
		showCorrespondCircle: function(elem) {	
			var span = elem.getElementsByTagName('span')[0];
			util.removeClass(span, 'hide');
			util.addClass(elem, btnClass.clickAble);

			this.disableOtherBtn();
		},
		displayRandomNum: function(elem, number) {
			var span = elem.getElementsByTagName('span')[0];
			span.innerHTML = number;
		},
		disableSelfButton: function(elem) {
			util.addClass(elem, btnClass.unClickAble);
		},
		disableOtherBtn: function() {
			for(var i = 0;i < this.len;i++) {
				if (!util.hasClass(this.allLittleBtn[i], btnClass.clickAble)) {
					util.addClass(this.allLittleBtn[i], btnClass.unClickAble);
				}
			}
		},
		enAbleOtherBtn: function() {
			for(var i = 0;i < this.len;i++) {
				if (!util.hasClass(this.allLittleBtn[i], btnClass.clickAble)) {
					util.removeClass(this.allLittleBtn[i], btnClass.unClickAble);
				}
			}
		},
		checkAllGetNumber: function() {
			var flag = true;

			for(var i = 0;i < this.len;i++) {
				var span = this.allLittleBtn[i].getElementsByTagName('span')[0];
				if (span.innerHTML === '...') {
					flag = false;
					break;
				}
			}
			return flag;
		},
		disableBigBbble: function() {
			util.removeClass(this.bigBubble, 'big-not-active');
			util.addClass(this.bigBubble, 'big-active');
		},
		enAbleBigBubble: function() {
			util.addClass(this.bigBubble, 'big-not-active');
			util.removeClass(this.bigBubble, 'big-active');
		},
		getRandomNumber: function(callback) {
			util.Ajax({
				methods: "GET",
				url: "/random",
				success: function(data) {
					callback(data);
				}
			});
		},
		calculateAllNumber: function() {
			var sum = 0,temp;

			for(var i = 0;i < this.len;i++) {
				temp = parseInt(this.allLittleBtn[i].getElementsByTagName('span')[0].innerHTML);
				sum += temp;
			}
			return sum;
		},
		resetAll: function() {
			for(var i = 0; i < this.len;i++) {
				util.removeClass(this.allLittleBtn[i], btnClass.clickAble);
				util.removeClass(this.allLittleBtn[i], btnClass.unClickAble);
				var span = this.allLittleBtn[i].getElementsByTagName('span')[0];
				span.innerHTML = "...";
				util.addClass(span, 'hide');
			}
			util.removeClass(this.bigBubble, 'big-active');
			util.removeClass(this.bigBubble, 'big-not-active');
			this.bigBubble.innerHTML = '';
		}
	}

	var human = new HumanInteraction();
	human.init();

})(document)