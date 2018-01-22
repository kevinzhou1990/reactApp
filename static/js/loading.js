define([
	"jquery"
], function($){
	"use strict";

	// 默认设置
	var defaultSettings = {
		num : 8,
		begin: 20,
		old: 60,
		lineWidth: 10,
		lineCap: "round",
		color: [
			"rgb(0, 0, 0)",
			"rgb(20, 20, 20)",
			"rgb(40, 40, 40)",
			"rgb(60, 60, 60)",
			"rgb(80, 80, 80)",
			"rgb(100, 100, 100)",
			"rgb(120, 120, 120)",
			"rgb(140, 140, 140)"
		]
	};

	/**
	 <div class="modal fade" data-backdrop="static" role="dialog">
		 <div class="modal-dialog loading text-center  modal-sm" role="document">
		  <canvas id = "canvas" ></canvas>
		 </div>
	 </div>
	 */
	var model = '__newcare_loading_model_id',
			canvas = '__newcare_loading_canvas_id',
			defaultTemplate = [
		'<div class="modal fade" id="'+ model +'" data-backdrop="static" role="dialog">',
			'<div class="modal-dialog loading text-center  modal-sm" role="document">',
				'<canvas id = "'+ canvas +'" ></canvas>',
			'</div>',
		'</div>'
	];

	var Loading = function (canvas, options) {
		this.canvas = document.getElementById(canvas);
		this.options = {};
		options = options || {};
		$.extend(this.options, defaultSettings, options);
	};

	$.extend(Loading.prototype, {
		show: function () {
			var canvas = this.canvas,
					begin = this.options.begin,
					old = this.options.old,
					lineWidth = this.options.lineWidth,
					canvasCenter = {x: canvas.width / 2, y: canvas.height / 2},
					ctx = canvas.getContext("2d"),
					color = this.options.color,
					num = this.options.num,
					angle = 0,
					lineCap = this.options.lineCap,
					CONST_PI = Math.PI * (360 / num) / 180;
			this.ctx = ctx;
			window.timer =  setInterval(function () {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				for (var i = 0; i < num; i += 1) {
					ctx.beginPath();
					ctx.strokeStyle = color[num - 1 - i];
					ctx.lineWidth = lineWidth;
					ctx.lineCap= lineCap;
					ctx.moveTo(canvasCenter.x + Math.cos(CONST_PI * i + angle) *
						begin, canvasCenter.y + Math.sin(CONST_PI * i + angle) * begin);
					ctx.lineTo(canvasCenter.x + Math.cos(CONST_PI * i + angle) *
						old, canvasCenter.y + Math.sin(CONST_PI * i + angle) * old);
					ctx.stroke();
					ctx.closePath();
				}
				angle += CONST_PI;
			},50);
			$("#" + model).modal("show");
		},

		hide: function () {
			$("#" + model).modal("hide");
			clearInterval(window.timer);
		}

	});
	Loading.getInstance = function(opts){
		if(window.newcare_loadingInstance){
			return window.newcare_loadingInstance;
		}
		$(document.body).append(defaultTemplate.join(""));
		window.newcare_loadingInstance = new Loading(canvas, opts);
		return window.newcare_loadingInstance ;
	}


	return Loading.getInstance();
});