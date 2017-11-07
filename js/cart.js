var vm = new Vue ({
	el: '#app',
	data: {
		productList: [],
		totalMoney: 0,
		checkAllFlag: false,
		totalPrice: 0,
		delFlag: false,
		curProduct: '',
		isChecked: false
	},
	filters: {
		formatMoney: function (val) {
			return '¥'+val.toFixed(2);
		}
	},
	mounted: function () {
		this.$nextTick(function () {
			this.cartView();
		});
	},
	methods: {
		cartView: function () {
			var _this=this;
			this.$http.get("data/cartData.json").then(function (res) {
				_this.productList = res.data.result.list;
				_this.totalMoney = res.data.result.totalMoney;
			}, function() {alert('出错了！')});
		},
		changeMoney: function (product, way) {
			if(way>0) {
				product.productQuantity++;
			} else {
				product.productQuantity--;
				if(product.productQuantity<2) product.productQuantity=1;
			}
			this.calcTotalPrice();
		},
		selectedProduct: function (item) {
			if(typeof item.checked == "undefined") {
				Vue.set(item,"checked",true); //全局
				//this.$set(item,"checked",true) 局部
			} else {
				item.checked = !item.checked; 
			}
			this.calcTotalPrice();

		},
		checkedAll: function (flag) {
			this.checkAllFlag = flag;
			this.isChecked=flag;
			var _this=this;
			this.productList.forEach(function(item,index) {
				if(typeof item.checked == "undefined") {
					_this.$set(item,"checked",_this.checkAllFlag);
				//this.$set(item,"checked",true) 局部
			} else {
				item.checked = _this.checkAllFlag; 
			}
			});
			this.calcTotalPrice();
		},
		calcTotalPrice: function () {
			var _this = this;
			this.totalPrice=0;
			this.productList.forEach(function(item, index) {
				if(item.checked) {
					_this.totalPrice += item.productPrice*item.productQuantity;
				}
			});
		},
		delConfirm: function (item) {
			this.delFlag = true;
			this.curProduct = item;
		},
		delProduct: function () {
			var index = this.productList.indexOf(this.curProduct);
			this.productList.splice(index,1);
			this.delFlag = false;
		}
	}
});