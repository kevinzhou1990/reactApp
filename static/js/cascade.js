define([
	'jquery',
	'lodash'
], function($, _){
	"use strict";
	/**
	 * 级联
	 * @param opts
	 *  {
	 *    $primary:      主下拉元素
	 *    $secondary     次下拉元素
	 *    primaryData    主下拉元素项数据
	 *    secondaryData  次下拉元素项数据
	 *    parentId       父类编号
	 *    defaultPrimary 默认主下拉值
	 *    defaultSecondary 默认次下拉值
	 *  }
	 * @constructor
	 */
	function Cascade(opts){
		$.extend(this, _.pick(opts, [
			"$primary",
			"$secondary",
			"primaryData",
			"secondaryData",
			"parentId",
			"defaultPrimary",
			"defaultSecondary",
			"defaultPrimaryTip",
			"defaultSecondaryTip"
		]));
		//
		var currentPrimaryData = this.primaryData;

		// 如果该select元素有级联父级，取父级下的数据
		var cascade_parentId = this.$primary.attr("data-cascadeParentId");
		if(cascade_parentId){
			currentPrimaryData = [];
			var parentValue = $("[data-cascadeId='"+ cascade_parentId +"']").val();
			if(parentValue){
				currentPrimaryData = _.filter(this.primaryData, function(item){
					return item[this.parentId] === parentValue;
				}.bind(this));
			}
		}


		// 渲染级联元素
		this.render(this.$primary, currentPrimaryData, this.defaultPrimary, this.defaultPrimaryTip);
		var currentSecondaryData = _.filter(this.secondaryData, function(item){
			return item[this.parentId] === this.$primary.val();
		}.bind(this));
		this.render(this.$secondary, currentSecondaryData, this.defaultSecondary, this.defaultSecondaryTip);

		// 标识级联元素关系
		var uniqueId = _.uniqueId('cascade-');
		this.$primary.attr("data-cascadeId", uniqueId);
		this.$secondary.attr("data-cascadeParentId", uniqueId);

		this.bindEvent();

	}

	$.extend(Cascade.prototype, {
		render: function($select, data, defaultCode, defaultTip){
			var str = "<option value=''>"+ (defaultTip || "请选择") +"</option>";
			_.forEach(data, function(item){
				str += "<option value='"+ item.code +"'>"+ item.name +"</option>";
			});
			$select.empty().append(str);
			if(defaultCode){
				$select.val(defaultCode);
			}
			$select.trigger("change");
		},
		bindEvent: function(){
			var self = this;
			this.$primary.on("change", function(e){
				var value = e.target.value,
						currentSecondaryData = _.filter(self.secondaryData, function(item){
							return item[self.parentId] === value;
						});
				self.render(self.$secondary, currentSecondaryData,null ,self.defaultSecondaryTip);
			});
		}
	});

    Cascade.render = Cascade.prototype.render;

	return Cascade;
});