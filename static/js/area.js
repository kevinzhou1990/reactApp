define([
	"jquery",
	"lodash"
],function($, _){
	"use strict";
	// provinces  cities districts streets villages
	var provinces,
			cities,
			districts,
			streets,
			villages;
	var rootCode = '000000000000';
	var areaData = {};
	/**
	 * 地区级联
	 * @param settings
	 * {
	 *  url: 省市县等数据url,
	 *  $province: 省下拉jquery对象
	 *  $city: 市下拉jquery对象
	 *  $district: 区下拉jquery对象
	 *  $street: 街道下拉jquery对象
	 *  $village: 村下拉jquery对象
	 *  provinceCode： 初始化省code
	 *  cityCode： 初始化市code
	 *  districtCode： 初始化区code
	 *  streetCode： 初始化街道code
	 *  villageCode： 初始化村code
	 * }
	 * @constructor
	 */
	function Area(settings){
		var self = this;
		getAreaData(settings.url).done(function(result){
			result = result || {};
			provinces = result.provinces;
			cities = result.cities;
			districts = result.districts;
			streets = result.streets;
			villages = result.villages;

			$.extend(self, _.pick(settings, ["$province", "$city", "$district", "$street", "$village", "provinceCode", "cityCode", "districtCode", "streetCode", "villageCode"]));

			// self.provinceCode = self.provinceCode || provinces[0].code;
			self.render(Area.type.PROVINCES, rootCode, self.provinceCode);
			self.render(Area.type.CITIES, self.provinceCode, self.cityCode);
			self.render(Area.type.DISTRICTS, self.$city.val(), self.districtCode);

			self.$street && self.render(Area.type.STREETS, self.$district.val(), self.streetCode);
			self.$village && self.render(Area.type.VILLAGES, self.$street.val(), self.villageCode);

			self.bindEvent();
		});


	}

	/**
	 * 请求地址数据
	 * @param url
	 * @returns {*}
	 */
	function getAreaData(url){
		url = url || "../static/js/area.json";
		var promise = $.Deferred();
		if(JSON.stringify(areaData) === "{}") {
			$.getJSON(url, function(data){
				areaData = data;
				promise.resolve(areaData);
			});
		}else{
			promise.resolve(areaData);
		}
		return promise;
	}

	Area.type = {
		PROVINCES: 0,
		CITIES: 1,
		DISTRICTS: 2,
		STREETS: 3,
		VILLAGES: 4
	}


	$.extend(Area.prototype, {
		/**
		 * 渲染select
		 * @param type 该select类型 ex: 省、市
		 * @param parentCode 父类code
		 * @param defaultCode 自身默认code
		 */
		render: function(type, parentCode, defaultCode){
			var list = [],
				$el = {};
			switch(type){
				case Area.type.PROVINCES:
					list = provinces;
					$el = this.$province;
					break;
				case Area.type.CITIES:
					list = cities;
					$el = this.$city;
					break;
				case Area.type.DISTRICTS:
					list = districts;
					$el = this.$district;
					break;
				case Area.type.STREETS:
					list = streets;
					$el = this.$street;
					break;
				case Area.type.VILLAGES:
					list = villages;
					$el = this.$village;
					break;
			}
			if(JSON.stringify($el) === "{}") {
				return false;
			}
			var current = _.filter(list, function(item){
				return item.parent === parentCode;
			});
			var str = "<option value=''>请选择</option>";
			_.forEach(current, function(item){
				str += "<option value='"+ item.code +"'>"+ item.name +"</option>";
			});
			$el.empty().append(str);
			if(defaultCode){
				$el.val(defaultCode);
			}
		},
		/**
		 * 绑定事件
		 */
		bindEvent: function(){
			// 选择省时，生成市；
			this.$province.on("change", function(e){

				if(this.$city){
					var selectValue = e.target.value;
					this.render(Area.type.CITIES, selectValue);
					this.$city.trigger("change");
				}

			}.bind(this));



			// 选择市时，生成区
			this.$city.on("change", function(e){

				if(this.$district){
					var selectValue = e.target.value;
					this.render(Area.type.DISTRICTS, selectValue);
					this.$district.trigger("change");
				}

			}.bind(this));

			// 选择区时，生成街道
			this.$district && this.$district.on("change", function(e){

				if(this.$street){
					var selectValue = e.target.value;
					this.render(Area.type.STREETS, selectValue);
					this.$street.trigger("change");
				}

			}.bind(this));

      // 选择街道时，生成村
      this.$street && this.$street.on("change", function(e){

          if(this.$village){
              var selectValue = e.target.value;
              this.render(Area.type.VILLAGES, selectValue);
          }

      }.bind(this));

			// // 选择市时，生成县
			// this.$city.on("change", function(e){
			// 	var selectValue = e.target.value;
			// 	this.render(Area.type.DISTRICTS, selectValue);
			// }.bind(this));


		}
	});

	return Area;

});