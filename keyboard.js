class Kana {
    static list = [];
    static originHiraList = ["あ","い","う","え","お","か","き","く","け","こ","さ","し","す","せ","そ","た","ち","つ","て","と","な","に","ぬ","ね","の","は","ひ","ふ","へ","ほ","ま","み","む","め","も","や","ゆ","よ","ら","り","る","れ","ろ","わ","を","ん"];
    static originKataList = ["ア","イ","ウ","エ","オ","カ","キ","ク","ケ","コ","サ","シ","ス","セ","ソ","タ","チ","ツ","テ","ト","ナ","二","ヌ","ネ","ノ","ハ","ヒ","フ","ヘ","ホ","マ","ミ","ム","メ","モ","ヤ","ユ","ヨ","ラ","リ","ル","レ","ロ","ワ","ヲ","ン"];
    constructor(pNormal, pSmall = "", pTenten = "", pMaru = "") {
        this.normal = pNormal;
        this.small = pSmall;
        this.tenten = pTenten;
        this.maru = pMaru;
    }

    static search(pKana, pbHiragana) { //? あ　ぁ　っ　づ　い etc.
        let kanaToReturn = "";
        if (pbHiragana) {
            Kana.originHiraList.forEach(k => {
                if (kanaToReturn == "") {
                    if (Kana.list[k].normal == pKana || Kana.list[k].small == pKana || Kana.list[k].tenten == pKana || Kana.list[k].maru == pKana) kanaToReturn = Kana.list[k].normal;
                }
            });
        } else {
            Kana.originKataList.forEach(k => {
                if (kanaToReturn == "") {
                    if (Kana.list[k].normal == pKana || Kana.list[k].small == pKana || Kana.list[k].tenten == pKana || Kana.list[k].maru == pKana) kanaToReturn = Kana.list[k].normal;
                }
            });
        }
        return kanaToReturn;
    }

    next(pKana) {
        if (pKana == this.normal) {
            if (this.small != "") return this.small;
            if (this.tenten != "") return this.tenten;
        } else if (pKana == this.small) {
            if (this.tenten != "") return this.tenten;
        } else if (pKana == this.tenten) {
            if (this.maru != "") return this.maru;
        }
        return this.normal;
    }

}

Kana.list["あ"] = new Kana("あ","ぁ");        // "a"
Kana.list["い"] = new Kana("い","ぃ");        // "i"
Kana.list["う"] = new Kana("う","ぅ");        // "u"
Kana.list["え"] = new Kana("え","ぇ");        // "e"
Kana.list["お"] = new Kana("お","ぉ");        // "o"
Kana.list["か"] = new Kana("か","が");       // "ka"
Kana.list["き"] = new Kana("き","ぎ");       // "ki"
Kana.list["く"] = new Kana("く","ぐ");       // "ku"
Kana.list["け"] = new Kana("け","げ");       // "ke"
Kana.list["こ"] = new Kana("こ","ご");       // "ko"
Kana.list["さ"] = new Kana("さ","ざ");       // "sa"
Kana.list["し"] = new Kana("し","じ");      // "shi"
Kana.list["す"] = new Kana("す","ず");       // "su"
Kana.list["せ"] = new Kana("せ","ぜ");       // "se"
Kana.list["そ"] = new Kana("そ","ぞ");       // "so"
Kana.list["た"] = new Kana("た","だ");       // "ta"
Kana.list["ち"] = new Kana("ち","ぢ");      // "chi"
Kana.list["つ"] = new Kana("つ","っ","づ"); // "tsu"
Kana.list["て"] = new Kana("て","で");       // "te"
Kana.list["と"] = new Kana("と","ど");       // "to"
Kana.list["な"] = new Kana("な");            // "na"
Kana.list["に"] = new Kana("に");            // "ni"
Kana.list["ぬ"] = new Kana("ぬ");            // "nu"
Kana.list["ね"] = new Kana("ね");            // "ne"
Kana.list["の"] = new Kana("の");            // "no"
Kana.list["は"] = new Kana("は","ば","ぱ");  // "ha"
Kana.list["ひ"] = new Kana("ひ","び","ぴ");  // "hi"
Kana.list["ふ"] = new Kana("ふ","ぶ","ぷ");  // "hu"
Kana.list["へ"] = new Kana("へ","べ","ぺ");  // "he"
Kana.list["ほ"] = new Kana("ほ","ぼ","ぽ");  // "ho"
Kana.list["ま"] = new Kana("ま");            // "ma"
Kana.list["み"] = new Kana("み");            // "mi"
Kana.list["む"] = new Kana("む");            // "mu"
Kana.list["め"] = new Kana("め");            // "me"
Kana.list["も"] = new Kana("も");            // "mo"
Kana.list["や"] = new Kana("や","ゃ");       // "ya"
Kana.list["ゆ"] = new Kana("ゆ","ゅ");       // "yu"
Kana.list["よ"] = new Kana("よ","ょ");       // "yo"
Kana.list["ら"] = new Kana("ら");            // "ra"
Kana.list["り"] = new Kana("り");            // "ri"
Kana.list["る"] = new Kana("る");            // "ru"
Kana.list["れ"] = new Kana("れ");            // "re"
Kana.list["ろ"] = new Kana("ろ");            // "ro"
Kana.list["わ"] = new Kana("わ");            // "wa"
Kana.list["を"] = new Kana("を");            // "wo"
Kana.list["ん"] = new Kana("ん");             // "n"

Kana.list["ア"] = new Kana("ア","ァ");        // "a"
Kana.list["イ"] = new Kana("イ","ィ");        // "i"
Kana.list["ウ"] = new Kana("ウ","ゥ");        // "u"
Kana.list["エ"] = new Kana("エ","ェ");        // "e"
Kana.list["オ"] = new Kana("オ","ォ");        // "o"
Kana.list["カ"] = new Kana("カ","ガ");       // "ka"
Kana.list["キ"] = new Kana("キ","ギ");       // "ki"
Kana.list["ク"] = new Kana("ク","グ");       // "ku"
Kana.list["ケ"] = new Kana("ケ","ゲ");       // "ke"
Kana.list["コ"] = new Kana("コ","ゴ");       // "ko"
Kana.list["サ"] = new Kana("サ","ザ");       // "sa"
Kana.list["シ"] = new Kana("シ","ジ");      // "shi"
Kana.list["ス"] = new Kana("ス","ズ");       // "su"
Kana.list["セ"] = new Kana("セ","ゼ");       // "se"
Kana.list["ソ"] = new Kana("ソ","ゾ");       // "so"
Kana.list["タ"] = new Kana("タ","ダ");       // "ta"
Kana.list["チ"] = new Kana("チ","ヂ");      // "chi"
Kana.list["ツ"] = new Kana("ツ","ッ","ヅ"); // "tsu"
Kana.list["テ"] = new Kana("テ","デ");       // "te"
Kana.list["ト"] = new Kana("ト","ド");       // "to"
Kana.list["ナ"] = new Kana("ナ");            // "na"
Kana.list["二"] = new Kana("二");            // "ni"
Kana.list["ヌ"] = new Kana("ヌ");            // "nu"
Kana.list["ネ"] = new Kana("ネ");            // "ne"
Kana.list["ノ"] = new Kana("ノ");            // "no"
Kana.list["ハ"] = new Kana("ハ","バ","パ");  // "ha"
Kana.list["ヒ"] = new Kana("ヒ","ビ","ピ");  // "hi"
Kana.list["フ"] = new Kana("フ","ブ","プ");  // "hu"
Kana.list["ヘ"] = new Kana("ヘ","べ","ぺ");  // "he"
Kana.list["ホ"] = new Kana("ホ","ボ","ポ");  // "ho"
Kana.list["マ"] = new Kana("マ");            // "ma"
Kana.list["ミ"] = new Kana("ミ");            // "mi"
Kana.list["ム"] = new Kana("ム");            // "mu"
Kana.list["メ"] = new Kana("メ");            // "me"
Kana.list["モ"] = new Kana("モ");            // "mo"
Kana.list["ヤ"] = new Kana("ヤ","ャ");       // "ya"
Kana.list["ユ"] = new Kana("ユ","ュ");       // "yu"
Kana.list["ヨ"] = new Kana("ヨ","ョ");       // "yo"
Kana.list["ラ"] = new Kana("ラ");            // "ra"
Kana.list["リ"] = new Kana("リ");            // "ri"
Kana.list["ル"] = new Kana("ル");            // "ru"
Kana.list["レ"] = new Kana("レ");            // "re"
Kana.list["ロ"] = new Kana("ロ");            // "ro"
Kana.list["ワ"] = new Kana("ワ");            // "wa"
Kana.list["ヲ"] = new Kana("ヲ");            // "wo"
Kana.list["ン"] = new Kana("ン");             // "n"


let kanaList = ["a","ka","sa","ta","na","ha","ma","ya","ra","wa"];

let table_hira = [];
table_hira["a"] = ["あ","い","う","え","お"];
table_hira["ka"] = ["か","き","く","け","こ"];
table_hira["sa"] = ["さ","し","す","せ","そ"];
table_hira["ta"] = ["た","ち","つ","て","と"];
table_hira["na"] = ["な","に","ぬ","ね","の"];
table_hira["ha"] = ["は","ひ","ふ","へ","ほ"];
table_hira["ma"] = ["ま","み","む","め","も"];
table_hira["ya"] = ["や","ゆ","よ"];
table_hira["ra"] = ["ら","り","る","れ","ろ"];
table_hira["wa"] = ["わ","を","ん","ー"];

let table_kata = [];
table_kata["a"] = ["ア","イ","ウ","エ","オ"];
table_kata["ka"] = ["カ","キ","ク","ケ","コ"];
table_kata["sa"] = ["サ","シ","ス","セ","ソ"];
table_kata["ta"] = ["タ","チ","ツ","テ","ト"];
table_kata["na"] = ["ナ","二","ヌ","ネ","ノ"];
table_kata["ha"] = ["ハ","ヒ","フ","ヘ","ホ"];
table_kata["ma"] = ["マ","ミ","ム","メ","モ"];
table_kata["ya"] = ["ヤ","ユ","ヨ"];
table_kata["ra"] = ["ラ","リ","ル","レ","ロ"];
table_kata["wa"] = ["ワ","ヲ","ン","ー"];
let currentBtn;
let current_index = 0;
let bCurrent = false;
let timeOutID = null;
let bHiragana = true;
let kanaBtnList = [];
let touchTimeOut;
let bKP = false;

const keyboard_html = `
	<section id="n_keyboard_container">
		<div id="keyboard_result"></div>
		<div id="keyboard_my_answer"></div>

		<input id="keyboard_input" class="keyboard_input" disabled type="text">
		<div id="keyboard">
			<div id="keyboard_plus" class="keyboard_plus">
				<div class="kp_row">
					<div class="void_btn">　</div>
					<div id="kp_top_btn" class="kp_btn">う</div>
					<div class="void_btn">　</div>
				</div>
				<div class="kp_row">
					<div id="kp_left_btn" class="kp_btn">い</div>
					<div id="kp_center_btn" class="kp_btn">あ</div>
					<div id="kp_right_btn" class="kp_btn">え</div>
				</div>
				<div class="kp_row">
					<div class="void_btn">　</div>
					<div id="kp_bottom_btn" class="kp_btn">お</div>
					<div class="void_btn">　</div>
				</div>
			</div>
			<div class="keyboard_row" id="row1Test">
				<button class="kana_btn" id="btn_a" onClick="handleKeyboard('a',event)">あ</button>
				<button class="kana_btn" id="btn_ka" onClick="handleKeyboard('ka',event)">か</button>
				<button class="kana_btn" id="btn_sa" onClick="handleKeyboard('sa',event)">さ</button>
				<button class="kana_btn" id="btn_return" onClick="handleKeyboard('return',event)">←</button>
			</div>
			<div class="keyboard_row">
				<button class="kana_btn" id="btn_ta" onClick="handleKeyboard('ta',event)">た</button>
				<button class="kana_btn" id="btn_na" onClick="handleKeyboard('na',event)">な</button>
				<button class="kana_btn" id="btn_ha" onClick="handleKeyboard('ha',event)">は</button>
				<button class="invisible_kana_btn">　</button>
			</div>
			<div class="keyboard_row">
				<button class="kana_btn" id="btn_ma" onClick="handleKeyboard('ma',event)">ま</button>
				<button class="kana_btn" id="btn_ya" onClick="handleKeyboard('ya',event)">や</button>
				<button class="kana_btn" id="btn_ra" onClick="handleKeyboard('ra',event)">ら</button>
				<button class="invisible_kana_btn">　</button>
				
			</div>
			<div class="keyboard_row">
				<button class="kana_btn" id="btn_modif" onClick="handleKeyboard('modif',event)">
					<span class="btn_modif_content">
						<span class="small_btn">小</span>゛
					</span>
				</button>
				<button class="kana_btn" id="btn_wa" onClick="handleKeyboard('wa',event)">わ</button>
				<button class="kana_btn small_btn" id="btn_switch" onClick="switchKana(event)">あア</button>
				<button class="invisible_kana_btn">　</button>
			</div>
		</div>
	</section>
`;

const kpbtnSize = { w: 66, h: 54 };
const kbBtnSize = { w: 60, h: 50 };

const leftBtn = { x: 0, y: kpbtnSize.h };
const rightBtn = { x: kpbtnSize.w*2, y: kpbtnSize.h };
const centerBtn = { x: kpbtnSize.w, y: kpbtnSize.h };
const topBtn = { x: kpbtnSize.w, y: 0 };
const bottomBtn = { x: kpbtnSize.w, y: kpbtnSize.h*2 };

const idleColor = "rgb(255,255,255)";
const hoverColor = BLUE;

let bLeftHover = false;
let bRightHover = false;
let bCenterHover = false;
let bTopHover = false;
let bBottomHover = false;
// left: -50px;
// top: -40px;
const ichibanLeft = -58; // Entre les btns : 8px
const ichibanTop = -46; // 50: header's height. Entre les btns : 5px
const col1 = ichibanLeft + "px";
const col2 = ichibanLeft + kbBtnSize.w + 8 + "px";
const col3 = ichibanLeft + (kbBtnSize.w + 8)*2 + "px";
const line1 = ichibanTop + "px";
const line2 = ichibanTop + kbBtnSize.h + 5 + "px";
const line3 = ichibanTop + (kbBtnSize.h + 5)*2 + "px";
const line4 = ichibanTop + (kbBtnSize.h + 5)*3 + "px";

let keyboard_container = null;
let keyboard_input = null;
let keyboard_part = null;
let kp = null;

let kp_left_btn = null;
let kp_right_btn = null;
let kp_center_btn = null;
let kp_top_btn = null;
let kp_bottom_btn = null;

let keyboardBtnList = null;

function activeKeyboard() {
	keyboard_container = id("n_keyboard_container");
	keyboard_input = id("keyboard_input");
	keyboard_part = id("keyboard");
	kp = id("keyboard_plus");

	kp_left_btn = id("kp_left_btn");
	kp_right_btn = id("kp_right_btn");
	kp_center_btn = id("kp_center_btn");
	kp_top_btn = id("kp_top_btn");
	kp_bottom_btn = id("kp_bottom_btn");

	keyboardBtnList = document.getElementsByClassName("kana_btn");
	for (let i = 0; i < keyboardBtnList.length; i++) {
		const btn = keyboardBtnList[i];
		btn.addEventListener("touchstart", e => {
			editClass(btn, "active");
		});
		btn.addEventListener("touchend", e => {
			editClass(btn, "active", false);
		});
		btn.addEventListener("click", e => {
			editClass(btn, "active", false);
		});
	}

	kanaList.forEach(k => {
		kanaBtnList[k] = id("btn_" + k);
		kanaBtnList[k].addEventListener("touchstart", e => {
			bCenterHover = true;
			touchTimeOut = setTimeout(() => {
				if (bCenterHover) {
					kp_left_btn.style.visibility = "visible";
					kp_right_btn.style.visibility = "visible";
					kp_bottom_btn.style.visibility = "visible";
					if (k == "ya") {
						kp_left_btn.innerText = "";
						kp_right_btn.innerText = "";
						kp_left_btn.style.visibility = "hidden";
						kp_right_btn.style.visibility = "hidden";
					} else if (k == "wa") {
						kp_bottom_btn.innerText = "";
						kp_bottom_btn.style.visibility = "hidden";
					}
					if (bHiragana) {
						if (k == "ya") {
							kp_center_btn.innerText = table_hira[k][0];
							kp_top_btn.innerText = table_hira[k][1];
							kp_bottom_btn.innerText = table_hira[k][2];
						} else {
							kp_left_btn.innerText = table_hira[k][1];
							kp_right_btn.innerText = table_hira[k][3];
							kp_center_btn.innerText = table_hira[k][0];
							kp_top_btn.innerText = table_hira[k][2];
							if (k != "wa") kp_bottom_btn.innerText = table_hira[k][4];
						}
					} else {
						if (k == "ya") {
							kp_center_btn.innerText = table_kata[k][0];
							kp_top_btn.innerText = table_kata[k][1];
							kp_bottom_btn.innerText = table_kata[k][2];
						} else {
							kp_left_btn.innerText = table_kata[k][1];
							kp_right_btn.innerText = table_kata[k][3];
							kp_center_btn.innerText = table_kata[k][0];
							kp_top_btn.innerText = table_kata[k][2];
							if (k != "wa") kp_bottom_btn.innerText = table_kata[k][4];
						}
					}

					switch (k) {
						case "a":
							kp.style.left = col1;
							kp.style.top = line1;
							break;
						case "ka":
							kp.style.left = col2;
							kp.style.top = line1;
							break;
						case "sa":
							kp.style.left = col3;
							kp.style.top = line1;
							break;
						case "ta":
							kp.style.left = col1;
							kp.style.top = line2
							break;
						case "na":
							kp.style.left = col2;
							kp.style.top = line2
							break;
						case "ha":
							kp.style.left = col3;
							kp.style.top = line2;
							break;
						case "ma":
							kp.style.left = col1;
							kp.style.top = line3;
							break;
						case "ya":
							kp.style.left = col2;
							kp.style.top = line3;
							break;
						case "ra":
							kp.style.left = col3;
							kp.style.top = line3;
							break;
						case "wa":
							kp.style.left = col2;
							kp.style.top = line4;
							break;
					}

					flex(kp);
					bKP = true;
					kp_center_btn.style.backgroundColor = hoverColor;
					kp_center_btn.style.color = WHITE;
				}
			}, 100);
		});
		kanaBtnList[k].addEventListener("touchmove", e => {
			const headerHeight = 50;
			const keyboardScreenX = keyboard_part.offsetLeft + kp.offsetLeft;
			const keyboardScreenY = keyboard_part.offsetTop + kp.offsetTop + headerHeight;
			// log("keyboard_container: " + keyboard_container.offsetTop);
			// log("keyboardScreenY: " + keyboardScreenY);

			const touchX = e.targetTouches[0].clientX;
			const touchY = e.targetTouches[0].clientY;
			// log("touchY: " + touchY);

			if (touchX >= (keyboardScreenX + centerBtn.x) && touchX < (keyboardScreenX + centerBtn.x + kpbtnSize.w) 
			&& touchY >= (keyboardScreenY + centerBtn.y) && touchY < (keyboardScreenY + centerBtn.y + kpbtnSize.h)) {
			} else {
				bCenterHover = false;
			}

		});
		kanaBtnList[k].addEventListener("touchend", e => {
			none(id("keyboard_plus"));
			
			if (bKP) {
				if (bLeftHover) {
					keyboard_input.value += kp_left_btn.innerText;
				}
				if (bRightHover) {
					keyboard_input.value += kp_right_btn.innerText;
				}
				if (bCenterHover) {
					keyboard_input.value += kp_center_btn.innerText;
				}
				if (bTopHover) {
					keyboard_input.value += kp_top_btn.innerText;
				}
				if (bBottomHover) {
					keyboard_input.value += kp_bottom_btn.innerText;
				}
			}
			bLeftHover = false;
			bRightHover = false;
			bCenterHover = false;
			bTopHover = false;
			bBottomHover = false;

			kp_left_btn.style.backgroundColor = idleColor;
			kp_right_btn.style.backgroundColor = idleColor;
			kp_center_btn.style.backgroundColor = idleColor;
			kp_top_btn.style.backgroundColor = idleColor;
			kp_bottom_btn.style.backgroundColor = idleColor;
			kp_left_btn.style.color = BLACK;
			kp_right_btn.style.color = BLACK;
			kp_center_btn.style.color = BLACK;
			kp_top_btn.style.color = BLACK;
			kp_bottom_btn.style.color = BLACK;

			bKP = false;

		});
		kanaBtnList[k].addEventListener("click", e => {
			clearTimeout(touchTimeOut);
			// none(id("keyboard_plus"));
		});
		
	});


	keyboard_container.addEventListener("touchmove", e => {
		if (bKP) {
			const headerHeight = 0; //? n_keyboard_container en position "fixed", la hauteur du header doit être prise en compte
			const keyboardScreenX = keyboard_part.offsetLeft + kp.offsetLeft;
			const keyboardScreenY = keyboard_container.offsetTop + keyboard_part.offsetTop + kp.offsetTop + headerHeight;

			const touchX = e.targetTouches[0].clientX;
			const touchY = e.targetTouches[0].clientY;


			if (touchX >= (keyboardScreenX + leftBtn.x) && touchX < (keyboardScreenX + leftBtn.x + kpbtnSize.w) 
			&& touchY >= (keyboardScreenY + leftBtn.y) && touchY < (keyboardScreenY + leftBtn.y + kpbtnSize.h)) {
				kp_left_btn.style.backgroundColor = hoverColor;
				kp_left_btn.style.color = WHITE;
				bLeftHover = true;
			} else {
				kp_left_btn.style.backgroundColor = idleColor;
				kp_left_btn.style.color = BLACK;
				bLeftHover = false;
			}

			if (touchX >= (keyboardScreenX + rightBtn.x) && touchX < (keyboardScreenX + rightBtn.x + kpbtnSize.w) 
			&& touchY >= (keyboardScreenY + rightBtn.y) && touchY < (keyboardScreenY + rightBtn.y + kpbtnSize.h)) {
				kp_right_btn.style.backgroundColor = hoverColor;
				kp_right_btn.style.color = WHITE;
				bRightHover = true;
			} else {
				kp_right_btn.style.backgroundColor = idleColor;
				kp_right_btn.style.color = BLACK;
				bRightHover = false;
			}

			if (touchX >= (keyboardScreenX + centerBtn.x) && touchX < (keyboardScreenX + centerBtn.x + kpbtnSize.w) 
			&& touchY >= (keyboardScreenY + centerBtn.y) && touchY < (keyboardScreenY + centerBtn.y + kpbtnSize.h)) {
				kp_center_btn.style.backgroundColor = hoverColor;
				kp_center_btn.style.color = WHITE;
				bCenterHover = true;
			} else {
				kp_center_btn.style.backgroundColor = idleColor;
				kp_center_btn.style.color = BLACK;
				bCenterHover = false;
			}

			if (touchX >= (keyboardScreenX + topBtn.x) && touchX < (keyboardScreenX + topBtn.x + kpbtnSize.w) 
			&& touchY >= (keyboardScreenY + topBtn.y) && touchY < (keyboardScreenY + topBtn.y + kpbtnSize.h)) {
				kp_top_btn.style.backgroundColor = hoverColor;
				kp_top_btn.style.color = WHITE;
				bTopHover = true;
			} else {
				kp_top_btn.style.backgroundColor = idleColor;
				kp_top_btn.style.color = BLACK;
				bTopHover = false;
			}

			if (touchX >= (keyboardScreenX + bottomBtn.x) && touchX < (keyboardScreenX + bottomBtn.x + kpbtnSize.w) 
			&& touchY >= (keyboardScreenY + bottomBtn.y) && touchY < (keyboardScreenY + bottomBtn.y + kpbtnSize.h)) {
				kp_bottom_btn.style.backgroundColor = hoverColor;
				kp_bottom_btn.style.color = WHITE;
				bBottomHover = true;
			} else {
				kp_bottom_btn.style.backgroundColor = idleColor;
				kp_bottom_btn.style.color = BLACK;
				bBottomHover = false;
			}

		}
	});
}


function handleKeyboard(pKey, event) {
    event.preventDefault();
    let bClickOnKana = false;
    if (kanaList.includes(pKey)) {
        bClickOnKana = true;
        if (bCurrent && currentBtn == pKey) {
            current_index++;

            if (bHiragana) {
                if (current_index > table_hira[pKey].length-1) {
                    current_index = 0;
                }
                if (keyboard_input.value.length <= 1) {
                    keyboard_input.value = table_hira[pKey][current_index];
                } else if (keyboard_input.value.length >= 2) {
                    keyboard_input.value = keyboard_input.value.slice(0, keyboard_input.value.length-1) + table_hira[pKey][current_index];
                }
            } else {
                if (current_index > table_kata[pKey].length-1) {
                    current_index = 0;
                }
                if (keyboard_input.value.length <= 1) {
                    keyboard_input.value = table_kata[pKey][current_index];
                } else if (keyboard_input.value.length >= 2) {
                    keyboard_input.value = keyboard_input.value.slice(0, keyboard_input.value.length-1) + table_kata[pKey][current_index];
                }
            }

        } else {
            current_index = 0;
            currentBtn = pKey;
            if (bHiragana) {
                keyboard_input.value += table_hira[pKey][current_index];
            } else {
                keyboard_input.value += table_kata[pKey][current_index];
            }
        }
    }

    switch(pKey) {
        case "modif":
            bCurrent = false;
            current_index = 0;
            if (timeOutID != null) clearTimeout(timeOutID);            
            let last = keyboard_input.value[keyboard_input.value.length-1];
            let lastIndex = Kana.search(last, bHiragana);
            let kanaToWrite = Kana.list[lastIndex].next(last);

            if (keyboard_input.value.length <= 1) {
                keyboard_input.value = kanaToWrite;
            } else {
                keyboard_input.value = keyboard_input.value.slice(0, keyboard_input.value.length-1) + kanaToWrite;
            }
            break;
        case "return":
            bCurrent = false;
            current_index = 0;
			if (timeOutID != null) clearTimeout(timeOutID);
            if (keyboard_input.value.length <= 1) {
                keyboard_input.value = "";
            } else {
                keyboard_input.value = keyboard_input.value.slice(0, keyboard_input.value.length-1);
            }
            break;
        case "enter":
            
            break;
    }

    if (bClickOnKana) {
        if (!bCurrent) {
            bCurrent = true;
            timeOutID = setTimeout(() => {
                bCurrent = false;
                current_index = 0;
            }, 1000);
        } else {
            if (timeOutID != null) clearTimeout(timeOutID);
            timeOutID = setTimeout(() => {
                bCurrent = false;
                current_index = 0;
            }, 1000);
        }
    }

}

function switchKana(e) {
    e.preventDefault();
    if (bHiragana) {
        bHiragana = false;
        kanaList.forEach(k => {
            kanaBtnList[k].innerHTML = table_kata[k][0];
        });
    } else {
        bHiragana = true;
        kanaList.forEach(k => {
            kanaBtnList[k].innerHTML = table_hira[k][0];
        });
    }
}