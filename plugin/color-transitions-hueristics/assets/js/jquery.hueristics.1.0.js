(function($) {  
	$.fn.hueristics = function(options){
		var settings = $.extend({
			property: 'background-color',
			startColor: '',
			hue: 0,
			saturation: 100,
			lightness: 50,
			alpha: 1,
			moveVal: 'hue',
			maxVal: 360,
			minVal: 0,
			speed: 70,
			step: 1,
			reverse:false
		}, options ),
		config = {
			'dir' : (settings.reverse) ? 'd' : 'u',
			'el' : $(this),
			'speed' : ((101-settings.speed) * 15) / 10
		},
		getHSLA = function(color){
			var rgb2hsl = function(r, g, b, a){
				r /= 255, g /= 255, b /= 255, a = a | 1;
				var max = Math.max(r, g, b), min = Math.min(r, g, b),
				h, s, l = (max + min) / 2;
				if (max == min) { h = s = 0; } 
				else {
					var d = max - min;
					s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
					switch (max){
						case r: h = (g - b) / d + (g < b ? 6 : 0); break;
						case g: h = (b - r) / d + 2; break;
						case b: h = (r - g) / d + 4; break;
					}
					h /= 6;
				}
				return [(h*360+0.5)|0, ((s*100+0.5)|0), ((l*100+0.5)|0), a];
			},
			hex2hsla = function(hex){
				var a,r,g,b;
				if(hex.length==4 || hex.length==8){
					a = (hex.length==4) ? parseInt(hex.substring(0,1).repeat(2), 16) : parseInt(hex.substring(0,2), 16);
					a = parseFloat((a/255).toFixed(2));
					r = (hex.length==4) ? parseInt(hex.substring(1,2).repeat(2), 16) : parseInt(hex.substring(2,4), 16);
			    	g = (hex.length==4) ? parseInt(hex.substring(2,3).repeat(2), 16) : parseInt(hex.substring(4,6), 16);
			    	b = (hex.length==4) ? parseInt(hex.substring(3,4).repeat(2), 16) : parseInt(hex.substring(6,8), 16);
				}
				else{
					a = 1;
					r = (hex.length==3) ? parseInt(hex.substring(0,1).repeat(2), 16) : parseInt(hex.substring(0,2), 16);
			    	g = (hex.length==3) ? parseInt(hex.substring(1,2).repeat(2), 16) : parseInt(hex.substring(2,4), 16);
			    	b = (hex.length==3) ? parseInt(hex.substring(2,3).repeat(2), 16) : parseInt(hex.substring(4,6), 16);
				}
			    return rgb2hsl(r,g,b,a);
			},
			rgbaHex = new RegExp(/(rgba?|hsla?)\s*\(\s*([1-2]?[0-9]{0,2}|[1-3]?[0-6]{0,2}|[1]?[0-9]{0,2}%?)\s*,\s*([1-2]?[0-9]+|[1]?[0-9]*\.?[0-9]*%?)\s*,\s*([1-2]?[0-9]+|[1]?[0-9]*\.?[0-9]*%?)\s*,?\s*([0-1]?\.?[0-9]*|[1]?[0-9]*\.?[0-9]*%?)\s*\)/,'i'),
			hexReg = new RegExp(/#?([a-f0-9]{8}|[a-f0-9]{6}|[a-f0-9]{4}|[a-f0-9]{3})/,'i'),
			isRGBAMatch = rgbaHex.test(color),
			isHEXMatch = hexReg.test(color);
			if(isRGBAMatch){
				switch(color.match(rgbaHex)[1]){
					case "rgb":
					case "rgba":
						return rgb2hsl(color.match(rgbaHex)[2], color.match(rgbaHex)[3], color.match(rgbaHex)[4], color.match(rgbaHex)[5]);
					case "hsl":
					case "hsla":
						return [color.match(rgbaHex)[2], color.match(rgbaHex)[3], color.match(rgbaHex)[4], (typeof color.match(rgbaHex)[5] === 'undefined' | color.match(rgbaHex)[5]==null | !color.match(rgbaHex)[5].length) ? 1 : color.match(rgbaHex)[5]];
				}
			}
			if (isHEXMatch) {
				if(hexReg.test(color)){
					return hex2hsla(color.match(hexReg)[1]);
				}
			}
			return [0,0,0,0];	
		},
		startVals = getHSLA(config.el.css(settings.property)),
		firstVals = (settings.startColor.length) ? getHSLA(settings.startColor) : [parseInt(settings.hue),parseInt(settings.saturation),parseInt(settings.lightness),parseInt(settings.alpha)],
		init = function(){
			moveTo(startVals,firstVals,doHue);
		},
		times = 0,
		moveTo = function(startColor,endColor,callback){
			var pos = 'up', neg = 'd',
				hueDirection = (startColor[0] < endColor[0]) ? pos : neg,
				satDirection = (startColor[1] < endColor[1]) ? pos : neg,
				lightDirection = (startColor[2] < endColor[2]) ? pos : neg,
				alphaDirection = (startColor[3] < endColor[3]) ? pos : neg,
				hueStep = Math.abs(startColor[0] - endColor[0]),
				satStep = Math.abs(startColor[1] - endColor[1]),
				lightStep = Math.abs(startColor[2] - endColor[2]),
				alphaStep = Math.abs(startColor[3] - endColor[3]),
				eachStep = Math.max(hueStep,satStep,lightStep,alphaStep)/settings.step;

			if(startColor[0]!=endColor[0] || startColor[1]!=endColor[1] || startColor[2]!=endColor[2] || startColor[3]!=endColor[3]){
				setTimeout(function(){
					var h = (h != endColor[0]) ? (hueDirection == 'd') ? ((startColor[0] - (hueStep/eachStep)) < endColor[0]) ? endColor[0] : startColor[0] - (hueStep/eachStep) : ((startColor[0] + 1) > endColor[0]) ? endColor[0] : startColor[0] + (hueStep/eachStep) : endColor[0],
					s = (s != endColor[1]) ? (satDirection == 'd') ? ((startColor[1] - (satStep/eachStep)) < endColor[1]) ? endColor[1] : startColor[1] - (satStep/eachStep) : ((startColor[1] + 1) > endColor[1]) ? endColor[1] : startColor[1] + (satStep/eachStep) : endColor[1],
					l = (l != endColor[2]) ? (lightDirection == 'd') ? ((startColor[2] - (lightStep/eachStep)) < endColor[2]) ? endColor[2] : startColor[2] - (lightStep/eachStep) : ((startColor[2] + 1) > endColor[2]) ? endColor[2] : startColor[2] + (lightStep/eachStep) : endColor[2],
					a = (a != endColor[3]) ? (alphaDirection == 'd') ? ((startColor[3] - (alphaStep/eachStep)) < endColor[3]) ? endColor[3] : startColor[3] - (alphaStep/eachStep) : ((startColor[3] + 1) > endColor[3]) ? endColor[3] : startColor[3] + (alphaStep/eachStep) : endColor[3];
					config.el.css(settings.property,'hsla('+h+','+s+'%,'+l+'%,'+a+')');
					moveTo([h,s,l,a],endColor);
				},config.speed)
			}
			else{
				doHue();
			}
		},
		doHue = function(){
			setInterval(function(){
	            settings[settings['moveVal']] = (config.dir=='u') ? settings[settings['moveVal']]-=settings.step : settings[settings['moveVal']]+=settings.step;
	            config.el.css(settings.property,'hsla('+settings.hue+','+settings.saturation+'%,'+settings.lightness+'%,'+settings.alpha+')');
	        },config.speed)
		};
		
		init();
	}
})(jQuery);