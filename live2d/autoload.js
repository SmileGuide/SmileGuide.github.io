// live2d_path 参数建议使用绝对路径
const live2d_path = "https://cdn.jsdelivr.net/gh/SmileGuide/live2d-on-website@latest/";
//const live2d_path = "/live2d-widget/";

// 封装异步加载资源的方法
function loadExternalResource(url, type) {
	return new Promise((resolve, reject) => {
		let tag;

		if (type === "css") {
			tag = document.createElement("link");
			tag.rel = "stylesheet";
			tag.href = url;
		}
		else if (type === "js") {
			tag = document.createElement("script");
			tag.src = url;
		}
		if (tag) {
			tag.onload = () => resolve(url);
			tag.onerror = () => reject(url);
			document.head.appendChild(tag);
		}
	});
}

// 加载 waifu.css live2d.min.js waifu-tips.js
if (screen.width >= 768) {
	Promise.all([
		loadExternalResource(live2d_path + "waifu.css", "css"),
		loadExternalResource(live2d_path + "live2d.min.js", "js"),
		loadExternalResource(live2d_path + "waifu-tips.js", "js")
	]).then(() => {
		// 配置选项的具体用法见 README.md
		initWidget({
			waifuPath: live2d_path + "waifu-tips.json",
			apiPath: "https://live2d.fghrsh.net/api/",
			//cdnPath: "https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/",
			tools: ["hitokoto", "asteroids", "switch-model", "switch-texture", "photo", "info", "quit"],
        model: {
            scale: 1,
            hHeadPos: 0.5,
            vHeadPos: 0.618,
            jsonPath: 'https://cdn.jsdelivr.net/npm/live2d-widget-model-hibiki@1.0.5/assets/hibiki.model.json',       // xxx.model.json 的路径,换人物修改这个
        },
        display: {
            superSample: 3,     // 超采样等级
            width: 120,         // canvas的宽度
            height: 300,        // canvas的高度
            position: 'right',   // 显示位置：左或右
            hOffset: 0,         // canvas水平偏移
            vOffset: 0,         // canvas垂直偏移
        },
        mobile: {
            show: true,         // 是否在移动设备上显示
            scale: 1,           // 移动设备上的缩放
            motion: true,       // 移动设备是否开启重力感应
        },
        react: {
            opacityDefault: 1,  // 默认透明度
            opacityOnHover: 1,  // 鼠标移上透明度
        },
		});
	});
}

console.log(`
  く__,.ヘヽ.        /  ,ー､ 〉
           ＼ ', !-─‐-i  /  /´
           ／｀ｰ'       L/／｀ヽ､
         /   ／,   /|   ,   ,       ',
       ｲ   / /-‐/  ｉ  L_ ﾊ ヽ!   i
        ﾚ ﾍ 7ｲ｀ﾄ   ﾚ'ｧ-ﾄ､!ハ|   |
          !,/7 '0'     ´0iソ|    |
          |.从"    _     ,,,, / |./    |
          ﾚ'| i＞.､,,__  _,.イ /   .i   |
            ﾚ'| | / k_７_/ﾚ'ヽ,  ﾊ.  |
              | |/i 〈|/   i  ,.ﾍ |  i  |
             .|/ /  ｉ：    ﾍ!    ＼  |
              kヽ>､ﾊ    _,.ﾍ､    /､!
              !'〈//｀Ｔ´', ＼ ｀'7'ｰr'
              ﾚ'ヽL__|___i,___,ンﾚ|ノ
                  ﾄ-,/  |___./
                  'ｰ'    !_,.:
`);
