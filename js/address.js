new Vue ({
	el: '.container',
	data: {
		limitNumber: 3,
		addressList: [],
		currentIndex: 0,
		delFlag: false,
		currentAddress:'',
		shippingMethod: 1,
		addAddress: false,
		overlayFlag: false,
		isDefault: true

	},
	mounted: function () {
		this.$nextTick(function () {
			this.getAddressList();
		});
	},
	computed: {
		filterAddress: function () {
			return this.addressList.slice(0,this.limitNumber);
		}
	},
	methods: {
		getAddressList: function () {
			var _this=this;
			this.$http.get("data/address.json").then(function (response) {
				var res=response.data;
				if(res.status=='0') {
					_this.addressList = res.result;
				}
		    }, function() {alert('出错了！')});
		},
		setDefault: function (adddressId) {
			this.addressList.forEach(function(address, index){
				if(address.addressId == adddressId) {
					address.isDefault = true;
				} else {
					address.isDefault = false;
				}
			})
		},
		delConfirm: function (item) {
			this.delFlag=true;
			this.overlayFlag=true;
			this.currentAddress=item;
		},
		closeTab: function (type, flag) {
			if(type==1) {
				this.delFlag=flag;
			} else {
				this.addAddress=flag;
			}
			this.overlayFlag=flag;
		},
		delAddress: function () {
			var index = this.addressList.indexOf(this.currentAddress);
			this.addressList.splice(index,1);
			this.delFlag=false;
			this.overlayFlag=false;
		},
		loadMore: function () {
			if(this.limitNumber==3) {
				this.limitNumber=this.addressList.length;
			} else {
				this.limitNumber=3;
			}
		},
		addAddre: function (flag) {
			this.overlayFlag=flag;
			this.addAddress=flag;
		}
	}
});