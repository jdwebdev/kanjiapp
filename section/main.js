
let log = console.log.bind();

const main_section = id("main_section");
const training_section = id("training_section");
const furigana_section = id("furigana_section");
const main_button = id("main_button");
const training_button = id("training_button");
const BLUE = "rgb(0,118,188)";
const BLACK = "rgb(50, 50, 50)";
const WHITE = "rgb(230, 230, 230)";

let params = new URLSearchParams(document.location.search);
let kanji_id = params.get("kanji");
// log("kanji id param: " + kanji_id);

let currentIndex = 0;
let pathList = null;
const h = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽゔっゎぁぃぅぇぉゃゅょゐゑ";
const k = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポヴッヮァィゥェォャュョヰヱー";
const letterList = "abcdefghijklmnopqrstuvwxyzçàâäéèêëîïôöûüù'- ";
const numberList = "0123456789０１２３４５６７８９";
const otherChars = "、（）()";
const kana = h+k;

const SECTION = Object.freeze({
	MAIN: 0,
	TRAINING: 1
});
const MODE = Object.freeze({
	MAIN: 0,
	GENKI: 1,
	MINNA: 2
});
const KANJI_BY = Object.freeze({
	STROKE: 0,
	BUSHU: 1,
	KANKEN: 2
});

let currentSection = "main";
let currentMode = MODE.MAIN;
const kanjiapp_mode = "kanjiapp_mode";


let bSearching = false;
let bDisplayType1 = true;
const footer_display_type = id("footer_display_type");
none(footer_display_type);
let bFooterOpen = false;
const search_input = id("search_input");
const search_btn = id("search_btn");
const stop_search_btn = id("stop_search_btn");
let bModal = false;
let bModalOpened = false;
const modal_container = id("modal_container");
modal_container.style.height = (window.innerHeight-50) + "px";
main_section.style.height = (window.innerHeight-50) + "px";

const alert_dialog = id("alert_dialog");
let displayList = [];

id("header").addEventListener("click", e => {
	if (bModal) closeModal();
});
search_input.addEventListener("click", e => {
	// log("input click");
	bSearching = true;
	if (bFooterOpen) footerMainBtn();
	// e.preventDefault();
	none(search_btn);
	unset(stop_search_btn);
	let len = search_input.value.length;
    if (search_input.setSelectionRange) {
        search_input.focus();
        search_input.setSelectionRange(len, len);
    }
	if (currentSection != "main") {
		changeSection("main");
	}

	if (currentMode == MODE.GENKI || currentMode == MODE.MINNA) {
		editClass(id("gmFilter_container"), "active");
	}

	e.stopPropagation();
});

search_btn.addEventListener("click", e => {
	// log("search btn click"); // 1
	if (bSearching) {
		bSearching = false;
		none(stop_search_btn);
		unset(search_btn);
		search(search_input.value);
		e.preventDefault();
		e.stopPropagation();
		search_input.blur();
	} else {
		bSearching = true;
		e.preventDefault();
		e.stopPropagation();
		let len = search_input.value.length;
		if (search_input.setSelectionRange) {
			search_input.focus();
			search_input.setSelectionRange(len, len);
		}
		none(search_btn);
		unset(stop_search_btn);
		if (currentSection != "main") {
			changeSection("main");
		}
	}
});

function isFullKana(pWord) {
	let bFullKana = true;
	for (let i = 0; i < pWord.length; i++) {
		if (!kana.includes(pWord[i])) {
			bFullKana = false;
			i = pWord.length;
		}
	}
	return bFullKana;
}
function isFullLetter(pWord) {
	let bFullLetter = true;
	for (let i = 0; i < pWord.length; i++) {
		if (!letterList.includes(pWord[i].toLowerCase())) {
			bFullLetter = false;
			i = pWord.length;
		}
	}
	return bFullLetter;
}
function isFullKanji(pWord) {
	for (let i = 0; i < pWord.length; i++) {
		if (letterList.includes(pWord[i].toLowerCase())) return false;
		if (numberList.includes(pWord[i].toLowerCase())) return false;
		if (otherChars.includes(pWord[i].toLowerCase())) return false;
		if (kana.includes(pWord[i].toLowerCase())) return false;
	}
	return true;
}
function lastCharKana(pWord, pLastNumber) {
	let bOk = true;
	let bCheck = false;
	if (pLastNumber == 1) {
		if (kana.includes(pWord[pWord.length-1]) && (pWord.length > 1 && !kana.includes(pWord[pWord.length-2]))) {
			bCheck = true; 
		}
	} else if (pLastNumber == 2) {
		if (kana.includes(pWord[pWord.length-1]) && (pWord.length > 1 && kana.includes(pWord[pWord.length-2]) && (pWord.length > 2 && !kana.includes(pWord[pWord.length-3])))) {
			bCheck = true; 
		}
	}

	if (bCheck) {
		for (let i = 0; i < pWord.length; i++) {
			if (i < pWord.length-(pLastNumber+1)) {
				if (letterList.includes(pWord[i].toLowerCase())) bOk = false;
				if (numberList.includes(pWord[i].toLowerCase())) bOk = false;
				if (otherChars.includes(pWord[i].toLowerCase())) bOk = false;
				if (kana.includes(pWord[i].toLowerCase())) bOk = false;
			}
		}
	} else {
		bOk = false;
	}
	return bOk;
}

function startApp() {
	none(id("loading_container"));
	id("search_input").disabled = false;
	id("search_btn").disabled = false;
	training_button.disabled = false;
	unset(id("main_background"));

	let saveData = localStorage.getItem(kanjiapp_mode);
	if (saveData == null) return;
	saveData = JSON.parse(saveData);
	if (saveData.current == MODE.GENKI) {
		changeMainMode(MODE.GENKI, false);
	}

}

let foundKanjiList = [];
let exactWordArr = [];
let includingWordArr = [];
function search(pWord,pType = "") {
	if (bModal) closeModal();
	foundKanjiList = [];
	exactWordArr = [];
	includingWordArr = [];

	main_section.scrollTo(0,0);

	if (pWord.toLowerCase() == "furigana()") {
		furiganaTest();
		return;
	}
	if (pWord.toLowerCase() == "check()") {
		displayCheckNewWords();
		return;
	}

	switch (currentMode) {
		case MODE.MAIN:
			searchMainMode(pWord,pType);
			break;
		case MODE.GENKI:
			searchGMMode(pWord);
			break;
		case MODE.MINNA:
			searchGMMode(pWord);
			break;
	}
}

function searchMainMode(pWord,pType) {
	let bFullLetter = false;
	let bFullKana = false;
	pWord = pWord.trim();
	pWord = pWord.toLowerCase();
	if (pWord != "") {

		if (isFullLetter(pWord)) {
			bFullLetter = true;
		}

		if (isFullKana(pWord)) {
			bFullKana = true;
		}

		if (!bFullLetter && !bFullKana) {
			for (let i = 0; i < pWord.length; i++) {
				if (Kanji.kanjiList.includes(pWord[i])) {
					const kanji = Kanji.list.find(k => k.kanji == pWord[i]);
					foundKanjiList.push(kanji.id);
				}
			}
	
			if (Word.wordList.includes(pWord)) {
				exactWordArr = Word.list.filter(w => w.word == pWord);
				includingWordArr = Word.list.filter(w => (w.word.includes(pWord) && w.word !== pWord));
			} else {
				includingWordArr = Word.list.filter(w => (w.word.includes(pWord) && w.word !== pWord));
			}

		} else if (bFullLetter) {
			let tempArr = Kanji.list.filter(k => k.imi.toLowerCase().includes(pWord));
			tempArr.forEach(k => {
				foundKanjiList.push(k.id);
			});
			
			exactWordArr = Word.list.filter(w => w.imi.toLowerCase() == pWord);
			includingWordArr = Word.list.filter(w => (w.imi.toLowerCase().includes(pWord) && w.imi.toLowerCase() != pWord));
		} else if (bFullKana) {
			let tempArr = Kanji.list.filter(k => k.kunYomiRaw.includes(pWord));
			tempArr.forEach(k => {
				foundKanjiList.push(k.id);
			});
			
			exactWordArr = Word.list.filter(w => w.yomiRaw == pWord);
			includingWordArr = Word.list.filter(w => (w.yomiRaw.includes(pWord) && w.yomiRaw != pWord));
		}

		displayResult();
	} else {
		if (pType != "") {
			footerMainBtn();
			exactWordArr = Word.list.filter(w => w.info == pType);
			displayResult();
		} else {
			displayNoResult();
		}
	}
}

function displayResult(bFromDisplayTypeBtn = false) {

	unset(footer_display_type);
	let kanjiHTML = `<div class="kanji_result_header">漢字 ${foundKanjiList.length}</div>`;
	const kanji_result_container = id("kanji_result_container");
	
	main_section.scrollTo(0,0);

	if (bDisplayType1) {
		foundKanjiList.forEach( (k, index) => {
			let yomi = `${Kanji.list[k].onYomi}${(Kanji.list[k].onYomi.length > 0 && Kanji.list[k].kunYomi.length > 0) ? " | " : ""}${Kanji.list[k].kunYomi}`;
			if (yomi.length >= 46) {
				yomi = yomi.slice(0, 45);
				yomi += "...";
			}
			let imi = `${Kanji.list[k].imi}`;
			if (imi.length >= 106) {
				imi = imi.slice(0, 104);
				imi += "...";
			}

			kanjiHTML +=
			`
			<div class="kanji_result" id="kanji_id_${k}" onClick="kanjiInfo(${k}, 'k')">
				<div class="kanji_result_kanji">${Kanji.list[k].kanji}</div>
				<div class="kanji_result_yomi_imi">
					<div class="kanji_result_yomi">${yomi}</div>
					<div class="kanji_result_imi">${imi}</div>
				</div>
				<div class="kanji_result_misc">
					<ul class="kanji_result_ul">
						<li class="kanji_result_itaiji">${Kanji.list[k].itaiji}</li>
						<li class="kanji_result_kakusuu">${Kanji.list[k].kakusuu}画</li>
						<li class="kanken_lvl">
							<div class="kanken_left">${Kanji.list[k].kanken}</div>
							<div class="kanken_right">級</div>
						</li>
					</ul>
				</div>
			</div>
			`;
			if (index < foundKanjiList.length-1) kanjiHTML += `<div class="kanji_result_separator"></div>`;
		});
		kanjiHTML += "</div>";
	} else {
		kanjiHTML += `<div class="kanji_result_display_type2">`;
		let count = 0;
		foundKanjiList.forEach((k, index) => {
			if (count == 0) {
				kanjiHTML += `<div class="kr_one_line">`;
			}
			kanjiHTML += `<div class="kr_one_kanji" onClick="kanjiInfo(${k}, 'k')">${Kanji.list[k].kanji}</div>`
			count++;
			if (count == 6) {
				count = 0;
				kanjiHTML += `</div>`;
			} else if (count < 6 && index == foundKanjiList.length-1) {
				let nb = 6 - count;
				for (let i = 0; i < nb; i++) {
					kanjiHTML += `<div class="kr_one_kanji none" onClick="">　</div>`;
				}
			}
		});
		kanjiHTML += `</div>`;
	}
	kanji_result_container.innerHTML = kanjiHTML;
	id("loading_dialog").close();
	
	if (!bFromDisplayTypeBtn) {
		const word_result_container = id("word_result_container");
		let wordHTML = `<div class="kanji_result_header">単語 ${exactWordArr.length + includingWordArr.length}</div>`;
		exactWordArr = exactWordArr.concat(includingWordArr);
		exactWordArr.forEach((w, index) => {
			wordHTML += `
				<div class="word_result" id="word_id_${w.id}" onClick="wordInfo(${w.id}, 'w')">
					<div class="word_result_yomi_word">
						<div class="word_result_yomi">${w.yomi}</div>
						<div class="word_result_word">${w.word}</div>
			`;
	
			if (w.wRef != null) {
				wordHTML += `<div class="word_result_imi"><span class="word_result_ref_word">>>> [${w.wRef.word}]</span> ${w.wRef.imi}</div>`;
			} else {
				wordHTML += `<div class="word_result_imi">${w.imi}</div>`;
			}
			
			wordHTML += `
				</div>
				<div class="word_result_misc">
			`;
			if (w.yojijukugo) {
				if (w.bPriority) {
					wordHTML += `<span class="word_priority">・</span>`;
				}
				wordHTML += `
					<div class="yojijukugo">四</div>
				`;
				if (w.kanken != "") {
					wordHTML += `
					<div class="kanken_lvl word_kanken">
						<div class="kanken_left">${w.kanken}</div>
						<div class="kanken_right">級</div>
					</div>
					`;
				}
			}
			wordHTML += `
					</div>
				</div>
			`;
			if (index < exactWordArr.length-1) wordHTML += `<div class="word_result_separator"></div>`;
		});
	
		word_result_container.innerHTML = wordHTML;
	}
}

function displayNoResult() {
	none(footer_display_type);
	const kanji_result_container = id("kanji_result_container");
	const word_result_container = id("word_result_container");
	kanji_result_container.innerHTML = `
	<div class="kanji_result_header">漢字 0</div>
	<p class="no_result">No result</p>
	`;
	word_result_container.innerHTML = `
	<div class="kanji_result_header">単語 0</div>
	<p class="no_result">No result</p>
	`;
}

function displayKankenList(pLevel) {
	foundKanjiList = [];
	exactWordArr = [];
	includingWordArr = [];

	main_section.scrollTo(0,0);

	Kanji.list.forEach(k => {
		if (k.kanken == pLevel) foundKanjiList.push(k.id);
	});
	exactWordArr = Word.list.filter(w => w.kanken == pLevel);

	if (currentMode != MODE.MAIN) {
		changeMainMode(MODE.MAIN);
	} else {
		footerMainBtn();
	}

	displayResult();

}

function displayKanjiBy(pType) {
	const kanji_result_container = id("kanji_result_container");
	const word_result_container = id("word_result_container");
	let html = "";
	let list = [];
	switch(pType) {
		case KANJI_BY.STROKE:
			list = Kanji.kanjiByStrokeList;
			break;
		case KANJI_BY.BUSHU:
			list = Kanji.kanjiByBushuList;
			break;
		case KANJI_BY.KANKEN:
			list = Kanji.kanjiByKankenList;
			break;
	}

	list.forEach((s,index)=> {
		html += `<div class="kanji_by_category">`;

		if (pType == KANJI_BY.BUSHU) {
			html += `<button class="kanji_by_category_btn" onClick="openKanjiByCat(${index})">${Kanji.bushuList[index].bushu} (${s.kanjiList.length}字)</button>`;
		} else {
			html += `<button class="kanji_by_category_btn" onClick="openKanjiByCat(${index})">${s.by} (${s.kanjiList.length}字)</button>`;
		}
		
		
		html += `<div id="kanji_by_category_content_${index}" class="kanji_by_category_content">`;
		
		if (pType == KANJI_BY.BUSHU) {
			html += `<div class="kanji_by_category_bushu">${Kanji.bushuList[index].yomi}</div>`;
		}

		let count = 0;
		s.kanjiList.forEach((k, index) => {
			if (count == 0) {
				html += `<div class="kr_one_line">`;
			}
			html += `<div class="kr_one_kanji" onClick="kanjiInfo(${k.id}, 'k')">${k.kanji}</div>`;
			count++;
			if (count == 6) {
				count = 0;
				html += `</div>`;
			} else if (count < 6 && index == s.kanjiList.length-1) {
				let nb = 6 - count;
				for (let i = 0; i < nb; i++) {
					html += `<div class="kr_one_kanji none" onClick="">　</div>`;
				}
			}
		});
		html += `
					</div>
				</div>
			</div>
		`;
	});
	
	main_section.scrollTo(0,0);

	kanji_result_container.innerHTML = html;
	word_result_container.innerHTML = "";
	footerMainBtn();
}

function displayAllKanji() {
	id("loading_dialog").showModal();
	id("loading_dialog").blur();
	foundKanjiList = [];
	Kanji.list.forEach(k => foundKanjiList.push(k.id));
	footerMainBtn();
	setTimeout(() => {
		displayResult();
	}, 100);
}

function displayYojijukugo(pbFromSwitchBtn = false) {
	const word_result_container = id("word_result_container");
	let html = "";
	let activeClass = "";
	let disableClass = "";
	if (Yojijukugo.bPrio) activeClass = "active";
	if (pbFromSwitchBtn && !Yojijukugo.bPrio) {
		disableClass = "disable";
	}

	html += `
		<div id="yoji_priority_btn_container" class="switch_btn_container ${activeClass}" onClick="switchBtn(this, yojiPriority)">
			<div id="yoji_priority_btn" class="switch_btn ${activeClass} ${disableClass}"></div>
			<p class="switch_btn_label ${activeClass}">優先</p>
		</div>
	`;

	let yojijukugoByKankenList = [];

	let tmpArr = [];
	for (let i = 5; i < Kanji.kankenList.length; i++) {
		tmpArr = [];
		tmpArr = Yojijukugo.list.filter(y => {
			if (y.kanken == Kanji.kankenList[i]) {
				if (Yojijukugo.bPrio && y.bPriority) {
					return true;
				} else if (!Yojijukugo.bPrio) {
					return true;
				}
			}
		});
		yojijukugoByKankenList.push({kanken: Kanji.kankenList[i]+"級", yojiList: tmpArr});
	}

	for (let i = 0; i < yojijukugoByKankenList.length; i++) {
		html += `
			<div class="kanji_by_category">
				<button  class="kanji_by_category_btn" onClick="openKanjiByCat(${i})">${yojijukugoByKankenList[i].kanken} (${yojijukugoByKankenList[i].yojiList.length})</button>
			</div>
			<div id="kanji_by_category_content_${i}" class="kanji_by_category_content">
		`;
		yojijukugoByKankenList[i].yojiList.forEach((w,index)=> {

			html += `
				<div class="word_result" id="word_id_${w.id}" onClick="wordInfo(${w.id}, 'w')">
					<div class="word_result_yomi_word">
						<div class="word_result_yomi">${w.yomi}</div>
						<div class="word_result_word">${w.word}</div>
			`;

			if (w.wRef != null) {
				html += `<div class="word_result_imi"><span class="word_result_ref_word">>>> [${w.wRef.word}]</span> ${w.wRef.imi}</div>`;
			} else {
				html += `<div class="word_result_imi">${w.imi}</div>`;
			}
			
			html += `
				</div>
				<div class="word_result_misc">
			`;
			
			if (w.bPriority) {
				html += `<span class="word_priority">・</span>`;
			}
			html += `
				<div class="yojijukugo">四</div>
			`;
			if (w.kanken != "") {
				html += `
				<div class="kanken_lvl word_kanken">
					<div class="kanken_left">${w.kanken}</div>
					<div class="kanken_right">級</div>
				</div>
				`;
			}
			
			html += `
					</div>
				</div>
			`;
			if (index < yojijukugoByKankenList[i].yojiList.length-1) html += `<div class="word_result_separator"></div>`;

		});
		html += `</div>`;
	}


	id("kanji_result_container").innerHTML = "";
	word_result_container.innerHTML = html;

	setTimeout(() => {
		editClass(id("yoji_priority_btn"), "disable", false);
	}, 300);

	if (!pbFromSwitchBtn) footerMainBtn();
}

function openKanjiByCat(pId) {
	const kanji_by_category_content = id("kanji_by_category_content_"+pId);
	if (kanji_by_category_content.classList[1] == "open") {
		editClass(kanji_by_category_content, "open", false);
	} else {
		editClass(kanji_by_category_content, "open");
	}
}

function kanjiInfo(pIndex, pElementFrom = "", pbBack = false) {

	if (pElementFrom != "" && !pbBack) {
		if (pElementFrom == "w") {
			displayList.push(Word.list[pIndex]);
		} else if (pElementFrom == "k") {
			displayList.push(Kanji.list[pIndex]);
		}
	} else if (pbBack) {
		displayList.pop();
	}

	let html = 
	`
	<div id="modal">
		<div class="modal_header">
			<div class="modal_kanji">${Kanji.list[pIndex].kanji}</div>
			<div class="modal_kanji_info">
				<div class="modal_stroke_bushu">
					<p class="modal_stroke">${Kanji.list[pIndex].kakusuu}画</p>
	`;

	if (Kanji.list[pIndex].bushu != "") {
		html += `
							<span id="modal_bushu">${Kanji.bushuList[Kanji.list[pIndex].bushu-1].bushu}<span
								class="modal_tooltip_bushu">${Kanji.bushuList[Kanji.list[pIndex].bushu-1].yomi}</span>
							</span>
		`;

	}
	html += `
				</div>
				<div class="modal_plus_alpha">
					<div class="kanken_lvl word_kanken">
						<div class="kanken_left">${Kanji.list[pIndex].kanken}</div>
						<div class="kanken_right">級</div>
					</div>
					<p class="modal_kanken_page">(${Kanji.list[pIndex].jitenRef})</p>
				</div>
				<div class="modal_itaiji">${Kanji.list[pIndex].itaiji}</div>

			</div>
			<div class="modal_anim_container">
				<div id="kanji_animation">
					<div id="kai_bg"></div>
					<div id="kai"></div>
				</div>
			</div>
		</div>
		<div class="modal_main">
			<p class="modal_separator">音読み</p>
			<p class="modal_onyomi">${Kanji.list[pIndex].onYomi != "" ? Kanji.list[pIndex].onYomi : "<span class='no_yomi'>&nbsp-</span>"}</p>
			<p class="modal_separator">訓読み</p>
			<p class="modal_kunyomi">${Kanji.list[pIndex].kunYomi != "" ? Kanji.list[pIndex].kunYomi : "<span class='no_yomi'>&nbsp-</span>"}</p>
			<p class="modal_separator">意味</p>
			<p class="modal_imi">${Kanji.list[pIndex].imi}</p>
			<p class="modal_separator">単語・熟語</p>
			<div class="modal_words">
	`;

	let no_border = "";
	let w = null;
	Kanji.list[pIndex].wordList.forEach((i,index) => {
		w = Word.list[i];

		html += `
		<div class="word_result" id="word_id_${i}" onClick="wordInfo(${w.id}, 'w')">
			<div class="word_result_yomi_word">
				<div class="word_result_yomi">${w.yomi}</div>
				<div class="word_result_word">${w.word}</div>
		`;

		if (w.wRef != null) {
			html += `<div class="word_result_imi"><span class="word_result_ref_word">>>> [${w.wRef.word}]</span> ${w.wRef.imi}</div>`;
		} else {
			html += `<div class="word_result_imi">${w.imi}</div>`;
		}

		html += `
			</div>
		</div>
		`;

		if (index < Kanji.list[pIndex].wordList.length-1) html += `<div class="word_result_separator"></div>`;
	});
	html +=
	`
			</div>
		</div>
	`;

	if (displayList.length > 1) { // Au moins 2
		html += `<div class="modal_back">`;
		let previousElement = "";

		if (displayList[displayList.length-2] instanceof Kanji) {
			html += `<button class="modal_back_btn" onClick="kanjiInfo(${displayList[displayList.length-2].id}, '', true)">`;
			previousElement = displayList[displayList.length-2].kanji;
		} else if (displayList[displayList.length-2] instanceof Word) {
			html += `<button class="modal_back_btn" onClick="wordInfo(${displayList[displayList.length-2].id}, '', true)">`;
			previousElement = displayList[displayList.length-2].word;
		}
		html += `
				<span class="modal_back_arrow_1"></span>
				<span class="modal_back_arrow_2"></span>
				<span class="modal_back_arrow_3"></span>
				<span class="modal_back_element">${previousElement}</span>
			</button>
		</div>`;
	}

	html += `
		</div>
	`;
	modal_container.innerHTML = html;

	id("modal").addEventListener("click", event => {
		event.stopPropagation();
	});
	openModal();
	test(pIndex);
}

function wordInfo(pIndex, pElementFrom = "", pbBack = false) {

	if (pElementFrom != "" && !pbBack) {
		if (pElementFrom == "w") {
			displayList.push(Word.list[pIndex]);
		} else if (pElementFrom == "k") {
			displayList.push(Kanji.list[pIndex]);
		}
	} else if (pbBack) {
		displayList.pop();
	}

	const word = Word.list[pIndex];

	let fontSize = "";
	if (word.word.length > 9) {
		fontSize = "font_size_furigana";
		if (word.word.length > 15) {
			fontSize = "font_size_furigana_tokubetsu";
		}
	}

	let html = `
	<div id="modal">
	<div class="modal_header modal_header_word">
		<div class="modal_word_word ${fontSize}">${word.furigana}</div>
	`;

	if (word.bInfoSup) {
		html += `<div class="modal_word_infos">`;

		html += word.ateji ? `<div class="word_type modal_word_ateji">当て字</div>` : "";

		let priority = "";
		if (word.bPriority) priority = "yoji_priority";
		html += word.yojijukugo ? `<div class="word_type modal_word_ichimoji ${priority}">四</div>` : "";

		html += word.kotowaza ? `<div class="word_type modal_word_ichimoji">諺</div>` : "";
		html += word.kanyoku ? `<div class="word_type modal_word_ichimoji">慣</div>` : "";
		html += word.nandoku ? `<div class="word_type modal_word_ateji">難読</div>` : "";

		if (word.kanken != "") {
			html += `
				<div class="kanken_lvl word_kanken">
					<div class="kanken_left">${word.kanken}</div>
					<div class="kanken_right">級</div>
				</div>
			`;
		}
		html += `</div>`;
	}

	html += `
	</div>
	<div class="modal_main">
		<p class="modal_separator">意味</p>
	`;

	if (word.wRef != null) {
		html += `<p class="modal_imi modal_ref_imi"><button class="ref_link" onClick="wordInfo(${word.wRef.id}, 'w')">${word.wRef.word} ➤</button> ${word.wRef.imi}</p>`;
	} else {
		html += `<p class="modal_imi">${word.imi}</p>`;
	}

	if (word instanceof Yojijukugo) {
		if (word.betsuYomiList.length > 0) {
			html += `
				<p class="modal_separator">別の読み</p>
				<p class="modal_imi">${word.betsuYomiRaw}</p>
			`;
		}
		if (word.synonymList.length > 0) {
			html += `
				<p class="modal_separator">類義語</p>
				<div class="modal_imi">
			`;
	
			word.synonymList.forEach((s, index) => {
				const syn = Yojijukugo.list.find(y2 => y2.word == s);
				if (syn != null) {
					html += `<button class="ref_link" onClick="wordInfo(${syn.id}, 'w')">${syn.word} ➤</button>`;
				} else {
					html += `${s}`;
				}
				if (index < word.synonymList.length - 1) {
					html += "、";
				}
			});
			html += `</div>`;
		}
		if (word.antonymList.length > 0) {
			html += `
				<p class="modal_separator">対義語</p>
				<div class="modal_imi">
			`;
			word.antonymList.forEach((a, index) => {
				const ant = Yojijukugo.list.find(y2 => y2.word == a);
				if (ant != null) {
					html += `<button class="ref_link" onClick="wordInfo(${ant.id}, 'w')">${ant.word} ➤</button>`;
				} else {
					html += `${a}`;
				}
				if (index < word.antonymList.length - 1) {
					html += "、";
				}
			});
			html += `</div>`;
		}
	} else {
		html += `
			<p class="modal_separator">読み</p>
			<p class="modal_imi">${word.yomi}</p>
		`;
	}

	html += `<div class="modal_words">`;

	let no_border = "";
	if (word.kanjiList.length > 0) html += `<p class="modal_separator">漢字</p>`;

	word.kanjiList.forEach( (k, index) => {
		let yomi = `${Kanji.list[k].onYomi}${(Kanji.list[k].onYomi.length > 0 && Kanji.list[k].kunYomi.length > 0) ? " | " : ""}${Kanji.list[k].kunYomi}`;
		if (yomi.length >= 46) {
			yomi = yomi.slice(0, 45);
			yomi += "...";
		}
		let imi = `${Kanji.list[k].imi}`;
		if (imi.length >= 106) {
			imi = imi.slice(0, 104);
			imi += "...";
		}

		html +=
		`
		<div class="kanji_result" id="kanji_id_${k}" onClick="kanjiInfo(${k},'k')">
			<div class="kanji_result_kanji">${Kanji.list[k].kanji}</div>
			<div class="kanji_result_yomi_imi">
				<div class="kanji_result_yomi">${yomi}</div>
				<div class="kanji_result_imi">${imi}</div>
			</div>
			<div class="kanji_result_misc">
				<ul class="kanji_result_ul">
					<li class="kanji_result_itaiji">${Kanji.list[k].itaiji}</li>
					<li class="kanji_result_kakusuu">${Kanji.list[k].kakusuu}画</li>
					<li class="kanken_lvl">
						<div class="kanken_left">${Kanji.list[k].kanken}</div>
						<div class="kanken_right">級</div>
					</li>
				</ul>
			</div>
		</div>
		`;
		if (index < word.kanjiList.length-1) html += `<div class="kanji_result_separator"></div>`;
	});
	html += "</div>";

	html += `
		</div>
	`;

	if (displayList.length > 1) { // Au moins 2

		html += `<div class="modal_back">`;
		let previousElement = "";

		if (displayList[displayList.length-2] instanceof Kanji) {
			html += `<button class="modal_back_btn" onClick="kanjiInfo(${displayList[displayList.length-2].id}, '', true)">`;
			previousElement = displayList[displayList.length-2].kanji;
		} else if (displayList[displayList.length-2] instanceof Word) {
			html += `<button class="modal_back_btn" onClick="wordInfo(${displayList[displayList.length-2].id}, '', true)">`;
			previousElement = displayList[displayList.length-2].word;
		}
		html += `
				<span class="modal_back_arrow_1"></span>
				<span class="modal_back_arrow_2"></span>
				<span class="modal_back_arrow_3"></span>
				<span class="modal_back_element">${previousElement}</span>
			</button>
		</div>`;
	}

	html += `
	</div>
	`;

	modal_container.innerHTML = html;

	id("modal").addEventListener("click", event => {
		event.stopPropagation();
	});
	openModal();
}

stop_search_btn.addEventListener("click", e => {
	// log("stop_search_btn click"); // 1
	none(stop_search_btn);
	unset(search_btn);
	search_input.value = "";
	e.preventDefault();
	e.stopPropagation();
});

document.body.addEventListener("click", e => {
	// log("click body"); //2
	// log(e);
	if (bSearching) {
		// log("go stop searching"); //3
		bSearching = false;
		unset(search_btn);
		none(stop_search_btn);
		if (currentMode == MODE.GENKI || currentMode == MODE.MINNA) {
			checkGMFilterContainer(e.target.tagName);
		}
	} else {
		// log("no action");
		if (currentMode == MODE.GENKI || currentMode == MODE.MINNA) {
			checkGMFilterContainer(e.target.tagName);
		}
	}
});

modal_container.addEventListener("click", e => {
	if (bModal) closeModal();
});

function openModal() {
	if (bFooterOpen) {
		footerMainBtn();
	}
	bModal = true;
	bModalOpened = true;
	flex(modal_container);
	setTimeout(() => {
		editClass(modal_container, "modal_open");
		editClass(id("modal"), "modal_open");
	},0.1);

	editClass(id("span_1"), "span_1_arrow");
	editClass(id("span_2"), "span_2_arrow");
	editClass(id("span_3"), "span_3_arrow");
	none(footer_display_type);
}
function closeModal() {
	bModal = false;
	modal_container.innerHTML = "";
	none(modal_container);
	editClass(modal_container, "modal_open", false);
	pathList = null;
	displayList = [];

	editClass(id("span_1"), "span_1_arrow", false);
	editClass(id("span_2"), "span_2_arrow", false);
	editClass(id("span_3"), "span_3_arrow", false);
	unset(footer_display_type);
}

function footerMainBtn() {
	if (bModal) {
		closeModal();
	} else {
		if (bFooterOpen) {
			editClass(id("filter_panel"), "open", false);
			editClass(id("footer_zone"), "filter_open", false);

			setTimeout(() => {
				switch(currentMode) {
					case MODE.MAIN:
						editClass(id("filter_section_genki"), "active", false);
						editClass(id("filter_section_minna"), "active", false);
						break;
					case MODE.GENKI:
						editClass(id("filter_section_genki"), "active");
						editClass(id("filter_section_minna"), "active", false);
						break;
					case MODE.MINNA:
						editClass(id("filter_section_minna"), "active");
						editClass(id("filter_section_genki"), "active", false);
						break;
				}
			}, 300);

			editClass(id("span_1"), "span_1_arrow_filter", false);
			editClass(id("span_2"), "span_2_arrow_filter", false);
			editClass(id("span_3"), "span_3_arrow_filter", false);

			openKankenLvl(false);
		} else {

			editClass(id("filter_panel"), "open");
			editClass(id("footer_zone"), "filter_open");
			
			setTimeout(() => {
				switch(currentMode) {
					case MODE.MAIN:
						editClass(id("filter_section_genki"), "active", false);
						editClass(id("filter_section_minna"), "active", false);
						break;
					case MODE.GENKI:
						editClass(id("filter_section_genki"), "active");
						editClass(id("filter_section_minna"), "active", false);
						break;
					case MODE.MINNA:
						editClass(id("filter_section_minna"), "active");
						editClass(id("filter_section_genki"), "active", false);
						break;
				}
			}, 300);
			none(footer_display_type);
			
			editClass(id("span_1"), "span_1_arrow_filter");
			editClass(id("span_2"), "span_2_arrow_filter");
			editClass(id("span_3"), "span_3_arrow_filter");
		}
		bFooterOpen = !bFooterOpen;
	}
}

function openKankenLvl(pbOpen = true) {
	if (pbOpen) {
		if (id("filter_section_kanken").classList[0] == "open") {
			editClass(id("filter_section_kanken"), "open", false);
			editClass(id("kanken_lvl_btn"), "bottom", false);
			editClass(id("span_arrow_down_1_1"), "open", false);
			editClass(id("span_arrow_down_1_2"), "open", false);
			editClass(id("span_arrow_down_2_1"), "open", false);
			editClass(id("span_arrow_down_2_2"), "open", false);
		} else {
			editClass(id("filter_section_kanken"), "open");
			editClass(id("kanken_lvl_btn"), "bottom");
			editClass(id("span_arrow_down_1_1"), "open");
			editClass(id("span_arrow_down_1_2"), "open");
			editClass(id("span_arrow_down_2_1"), "open");
			editClass(id("span_arrow_down_2_2"), "open");
		}
	} else {		
		editClass(id("kanken_lvl_btn"), "bottom", false);
		editClass(id("filter_section_kanken"), "open", false);
		editClass(id("span_arrow_down_1_1"), "open", false);
		editClass(id("span_arrow_down_1_2"), "open", false);
		editClass(id("span_arrow_down_2_1"), "open", false);
		editClass(id("span_arrow_down_2_2"), "open", false);
	}
}

setInterval(() => {

	if (pathList !== null) {
		if (currentIndex == 0) {
			pathList.forEach(path => {
				const length = path.getTotalLength();
				path.style.transition = path.style.WebkitTransition = "none";
				path.style.strokeDasharray = length + " " + length;
				path.style.strokeDashoffset = length;
			});
		}
		
		const path = pathList[currentIndex];
		const length = path.getTotalLength();
		path.style.transition = path.style.WebkitTransition = "none";
		
		path.style.strokeDasharray = length + " " + length;
		path.style.strokeDashoffset = length;
		
		path.getBoundingClientRect();
		
		path.style.transition = path.style.WebkitTransition = "stroke-dashoffset 0.2s ease-in-out";
		
		path.style.strokeDashoffset = "0";
	
		currentIndex++;
		if (currentIndex >= pathList.length) {
			currentIndex = 0;
		}
	}
	
}, 500);


function displayFuriganaWords() {
	furiganaTest(id("furigana_input_start").value, id("furigana_input_end").value);
}
function furiganaTest(pStart = 0, pEnd = 0) {
	let start = pStart;
	let end = pEnd;
	if (start == 0 && end == 0) {
		start = Word.firstWordWithoutFurigana;
		end = Word.firstWordWithoutFurigana + 199;
	}

	let html = "";
	html = `
		<div class="furigana_header">
			<div class="furigana_input_container">
				<input id="furigana_input_start" class="furigana_input" type="text" placeholder="" value="${start}">
				<input id="furigana_input_end" class="furigana_input" type="text" placeholder="" value="${end}">
				<button id="display_furigana_words_btn" class="normal_btn" onClick="displayFuriganaWords()">GO</button>
				<button class="normal_btn furigana_export_btn" onClick="exportFurigana(${start}, ${end})">EXPORT</button>
			</div>
		</div>
		<div class="furigana_main">
	`;
	let checkClass = "";
	Word.list.forEach((w, index) => {
		if (!(w instanceof Yojijukugo) && index >= start && index <= end) {
			if (w.bFuriganaCheck) {
				checkClass = "furigana_check";
			} else if (w.furigana != "") {
				checkClass = "furigana_to_check";
			} else {
				checkClass = "";
			}
			
			html += `
			<div id="furigana_word_container_${w.id}" class="furigana_word_container ${checkClass}">
				<div class="add_furigana_btn_container">
					<button id="add_btn_${w.id}" class="add_furigana_btn" onClick="setFurigana(${w.id}, this)">+</button>
				</div>
				<div class="furigana_word_id">${w.id}</div>
				<div id="yomi_select_${w.id}" class="furigana_word_yomi_select none">${w.yomi}</div>

				<div class="furigana_word_origin_and_button">
					<div class="furigana_yomi_word_origin">
						<p class="furigana_word_yomi">${w.yomi}</p>
						<p class="furigana_word_word">${w.word}</p>
					</div>
					<div class="furigana_button_container">
						<button class="furigana_btn furigana_delete_btn" onClick="validFurigana(${w.id},'d')">✕</button>
						<button class="furigana_btn" onClick="validFurigana(${w.id},'b')">✕</button>
						<button class="furigana_btn" onClick="validFurigana(${w.id},'m')">〇</button>
					</div>
				</div>
				<div id="result_${w.id}" class="furigana_result">➤ ${w.furigana}</div>
			</div>
			`;
		}
	});
	html += `</div>`;

	none(main_section);
	furigana_section.innerHTML = html;
}
function displayCheckNewWords() {
	let html = "";
	html = `
		<div class="check_new_words_input_cont">
			<input id="new_words_input" class="normal_input" placeholder="単語１;単語２;単語３" type="text" />
			<button id="check_new_words_btn" class="normal_btn" onClick="checkNewWords()">確認</button>
		</div>
	`;
	main_section.innerHTML = html;
}
function checkNewWords() {
	let words = id("new_words_input").value;
	log(words);
	words = words.split(";");
	log(words);
	let foundWord = null;
	let foundWordList = [];
	words.forEach(wrd => {
		foundWord = Word.list.find(w => w.word == wrd);
		if (foundWord == undefined) foundWordList.push(wrd);
	});
	log(foundWordList);

	let content = `<div class="new_words_list_container">
	<textarea id="new_words_list" class="normal_input">`;

	foundWordList.forEach((w, index)=> {
			content += `${w}
`;
	});
	
	content += `</textarea>`;
	content += `
		<button id="copy_new_words_btn" class="normal_btn" onClick="copyNewWords(this)">コピー</button>
		</div>
	`;

	main_section.innerHTML = content;
}

function setFurigana(pId, pElement) {
	const selectionText = window.getSelection().toString();

	if (pElement.innerHTML == "F" && selectionText != "") {
		const yomiRAW = Word.list[pId].yomi;

		if (Word.list[pId].tmpFuriganaArr.length > 0) {
			let bFirst = true;
			let indexOfFirst = -1;
			Word.list[pId].tmpFuriganaArr.forEach((c,index) => {
				if (c.f == "@") {
					if (bFirst) {
						bFirst = false;
						c.f = selectionText;
						indexOfFirst = index;
					} else {
						c.f = indexOfFirst;
					}
				}
			});
		}
		pElement.innerHTML = "+";

		let html = "";
		let currentIndex = -1;
		
		Word.list[pId].tmpFuriganaArr.forEach((c, index) => {
			if (c.f == "" && !Number.isInteger(c.f)) {
				if (currentIndex > -1) {
					html += `<span class="furigana">${Word.list[pId].tmpFuriganaArr[currentIndex].f}</span></span>`;
					currentIndex = -1;
				}
				html += c.c;
			} else {
				if (Number.isInteger(c.f)) {
					html += `${c.c}`;
				} else {
					currentIndex = index;
					html += `<span class="kanji">${c.c}`;
				}
			}

			if (index == Word.list[pId].tmpFuriganaArr.length - 1) {
				if (currentIndex > -1) {
					html += `<span class="furigana">${Word.list[pId].tmpFuriganaArr[currentIndex].f}</span></span>`;
					currentIndex = -1;
				}
			}
		});
		Word.list[pId].furigana = html;
		id("result_" + pId).innerHTML = "➤ " + Word.list[pId].furigana;
		editClass(id("yomi_select_"+pId),"none");

		return;
	}
	
	const wordRAW = Word.list[pId].word;

	if (selectionText != "" && wordRAW.includes(selectionText)) {
		const range = window.getSelection().getRangeAt(0);
		let start = range.startOffset;
		let end = range.endOffset;
		
		let bFirst = false;
		if (Word.list[pId].tmpFuriganaArr.length == 0) bFirst = true;

		for (let i = 0; i < wordRAW.length; i++) {
			if (bFirst) Word.list[pId].tmpFuriganaArr.push({c: wordRAW[i], f: ""});
			if (i < start || i >= end) {
				
			} else {
				if (Word.list[pId].tmpFuriganaArr[i].f != "") {
					alert("NON");
					return;
				}
				Word.list[pId].tmpFuriganaArr[i] = {c: wordRAW[i], f: "@"};
			}
		}

		pElement.innerHTML = "F";

		editClass(id("yomi_select_"+pId),"none",false);
	}
}

function validFurigana(pId, pType) {
	switch(pType) {
		case "d":
			Word.list[pId].furigana = "";
			Word.list[pId].tmpFuriganaArr = [];
			id("result_"+pId).innerHTML = "➤ ";
			break;
		case "b":
			Word.list[pId].furigana = `<span class="kanji">${Word.list[pId].word}</span>`;
			id("result_"+pId).innerHTML = "➤ " + Word.list[pId].furigana;
			break;
		case "m": // そのまま
			Word.list[pId].bFuriganaCheck = true;
			editClass(id("furigana_word_container_" + pId), "furigana_check");
			editClass(id("furigana_word_container_" + pId), "furigana_to_check", false);

			if (Word.list[pId].furigana == "") {
				Word.list[pId].furigana = `<span class="kanji">${Word.list[pId].word}<span class="furigana">${Word.list[pId].yomi}</span></span>`;
				id("result_"+pId).innerHTML = "➤ " + Word.list[pId].furigana;
			}

			break;
	}
}

function exportFurigana(pStart, pEnd) {

	let content = "";
	Word.list.forEach((w, index)=> {
		if (!(w instanceof Yojijukugo) && index >= pStart && index <= pEnd) {
			content += `${w.furigana}
`;
		}
	});
	id("furigana_dialog_text").innerHTML = content;

	id("export_furigana_dialog").showModal();

}
function copyExport(btn = null) {
	if (push(btn, copyExport)) return;
	copyToClipboard(id("furigana_dialog_text").value);
}
function copyNewWords(btn = null) {
	if (push(btn, copyNewWords)) return;
	copyToClipboard(id("new_words_list").value);
}

function closeFuriganaDialog(btn = null) {
	if (push(btn, closeFuriganaDialog)) return;
	id("export_furigana_dialog").close();
}

function test(pId) {
	if (Kanji.list.length > 0 && Kanji.list[pId].pathList.length > 0) {
		let innerHTML = `<svg width="75" height="75" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" version="1.1" baseProfile="full">`;
		Kanji.list[pId].pathList.forEach(p => {
			innerHTML += `<path d="${p}" style="fill:none;stroke:rgba(220,220,220,1);stroke-width:5" />`
		});
		innerHTML += `</svg>`;
	
		let innerHTML2 = `<svg width="75" height="75" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" version="1.1" baseProfile="full">`;
		Kanji.list[pId].pathList.forEach(p => {
			innerHTML2 += `<path d="${p}" style="fill:none;stroke:rgba(0 118 188);stroke-width:5" />`
		});
		innerHTML2 += `</svg>`;
	
		let kai_bg = id("kai_bg");
		kai_bg.innerHTML = innerHTML;
		let kai = id("kai");
		kai.innerHTML = innerHTML2;

		pathList = document.querySelectorAll("#kai path");
		pathList.forEach(path => {
			const length = path.getTotalLength();
			path.style.transition = path.style.WebkitTransition = "none";
			path.style.strokeDasharray = length + " " + length;
			path.style.strokeDashoffset = length;
		});
		currentIndex = 0;
	}
}

function changeSection(pSection) {
	switch(pSection) {
		case "main":
			unset(main_section);
			none(training_section);
			editClass(training_button, "header_btn_active", false);
			show(id("footer_zone"));
			break;
		case "training":
			if (bFooterOpen) footerMainBtn();
			none(main_section);
			unset(training_section);
			editClass(training_button, "header_btn_active", true);
			hide(id("footer_zone"));
			if (bMain) {
				if (localSaveData())  flex(id("training_continue"));
			}
			break;
	}
	currentSection = pSection;
}

function changeMainMode(pNewMode, pbFooter = true) {
	const header_title = id("header_title");

	const obj = { current: pNewMode };
	localStorage.setItem(kanjiapp_mode, JSON.stringify(obj));

	switch(pNewMode) {
		case MODE.MAIN:
			header_title.innerText = "漢字";
			search_input.placeholder = "検索";
			switch(currentMode) {
				case MODE.GENKI:
					editClass(header_title,"genki", false);
					closeFilterContainer();
					break;
				case MODE.MINNA: 
					editClass(header_title,"minna", false);
					closeFilterContainer();
					break;
			}
			footerMainBtn();
			break;
		case MODE.GENKI:
			if (currentMode == MODE.GENKI) {
				changeMainMode(MODE.MAIN);
				return;
			}
			editClass(header_title,"minna", false);
			header_title.innerText = "げんき";
			search_input.placeholder = "げんき内検索";
			search_input.focus();
			editClass(header_title,"genki");
			editClass(id("gmFilter_container"), "active");

			if (pbFooter) footerMainBtn();

			break;
		case MODE.MINNA:
			if (currentMode == MODE.MINNA) {
				changeMainMode(MODE.MAIN);
				return;
			}
			editClass(header_title,"genki", false);
			header_title.innerText = "みんな";
			search_input.placeholder = "みんなの日本語";
			search_input.focus();
			editClass(header_title,"minna");
			editClass(id("gmFilter_container"), "active");

			if (pbFooter) footerMainBtn();

			break;
	}
	currentMode = pNewMode;
}

function changeDisplayType() {
	if (bDisplayType1) {
		editClass(id("sdt_1_2"), "type2");
		editClass(id("sdt_2_2"), "type2");
		editClass(id("sdt_3_2"), "type2");
		bDisplayType1 = false;
	} else {
		editClass(id("sdt_1_2"), "type2", false);
		editClass(id("sdt_2_2"), "type2", false);
		editClass(id("sdt_3_2"), "type2", false);
		bDisplayType1 = true;
	}
	displayResult(true);
}

function displayKanjiUrl() {
	if (kanji_id > 0) {
		test(kanji_id);
	}
}

function alertDialog(pText) {
	id("alert_dialog_text").innerHTML = pText;
	alert_dialog.showModal();
	alert_dialog.style.backgroundColor = "rgb(255,0,0)";
	setTimeout(() => {
		alert_dialog.style.backgroundColor = "rgb(183, 207, 221)";
	}, 100);
}
function closeAlertDialog(btn = null) {
	if (push(btn, closeAlertDialog)) return;
	alert_dialog.close();
}

// ----------------------------------------
// UTILS ----------------------------------
// ----------------------------------------

function editClass(e, pClass, pAdd = true) {
    if (pAdd) {
        e.classList.add(pClass);
    } else {
        e.classList.remove(pClass);
    }
}
function pushBtn(btn, pbPush = true) {
	let height = btn.offsetHeight;
	if (pbPush) {
		height -= 3;
		btn.style.height = height + "px";
		editClass(btn, "active");
	} else {
		height += 3;
		btn.style.height = height + "px"
		editClass(btn, "active", false);
	}
}
function emptyInput() {
    let inputList = document.querySelectorAll("input");
    inputList.forEach(i => {
        i.value = "";
    });
}
function id(pId) {
    return document.getElementById(pId);
}
function show(element) {
	element.style.visibility = "visible";
}
function hide(element) {
	element.style.visibility = "hidden";
}
function none(element) {
    element.style.display = "none";
}
function unset(element) {
	element.style.display = "unset";
}
function flex(element) {
    element.style.display = "flex";
}
function block(element) {
    element.style.display = "block";
}
function rnd(pMin, pMax) {
    return Math.floor(Math.random() * ((pMax+1) - pMin)) + pMin;
}
function copyToClipboard(pString) {
	navigator.clipboard.writeText(pString);
}
function equal(value, ...pValues) { // value=2, pValue=[34, 56, 67, 32, 1]
	return pValues.includes(value)
}

function createPath(content) {
	let kanji = "";
	for (let i = 0; i < content.length; i++) {
		if (content[i] == "<" && content[i+1] == "k" && content[i+2] == "a") { //? <ka => <kanji ... >
			let bFirstG = false;
			let j = i+1;
			while (bFirstG == false) {
				if (content[j] == "<" && content[j+1] == "g") {
					bFirstG = true;
				}
				j++;
			}
			kanji += "\n" + content[j+30] + "";
		} else {
			if (content[i] == "<" && content[i+1] == "p" && content[i+2] == "a" && content[i+3] == "t" && content[i+4] == "h") {

				let bPathD = false;
				let j = i;
				let pathStartIndex = 0;
				while (!bPathD) {
					if (content[j] == " " && content[j+1] == "d" && content[j+2] == "=") {
						pathStartIndex = j+4;
						bPathD = true;
					}
					j++;
				}

				let bFound = false;
				j = i;
				while (bFound == false) {
					if (content[j] == ">") {
						bFound = true;
						kanji += content.slice(pathStartIndex, j-2);
						kanji += ";";
					}
					j++;
				}
			}
		}
	}
}
function toHira(pWord) {
	let newWord = "";
	for (let i = 0; i < pWord.length; i++) {
		if (h.includes(pWord[i])) {
			newWord += pWord[i];
		} else if (k.includes(pWord[i])) {
			let index = k.indexOf(pWord[i]);
			newWord += h[index];
		} else {
			newWord += pWord[i];
		}
	}
	return newWord;
}
function randomizeList(pList) {
	let tmp = 0;
	let rndIndex = 0;
	for (let i = 0; i < pList.length; i++) {
		rndIndex = rnd(0, pList.length-1);
		tmp = pList[i];
		pList[i] = pList[rndIndex];
		pList[rndIndex] = tmp;
	}
	return pList;
}

function switchBtn(e, func) {
	let bActive = false;
	if (e.classList.length > 1) {
		for (let i = 0; i < e.classList.length; i++) {
			if (e.classList[i] == "active") {
				editClass(e,"active", false);
				editClass(e.children[0],"active", false);
				editClass(e.children[0],"disable");
				editClass(e.children[1],"active", false);
				bActive = true;
			}
		}
	} 
	if (!bActive) {
		editClass(e,"active");
		editClass(e.children[0],"active");
		editClass(e.children[0],"disable", false);
		editClass(e.children[1],"active");
	}
	if (func != null) func();
}


function yojiPriority() {
	Yojijukugo.bPrio = !Yojijukugo.bPrio;
	displayYojijukugo(true);
}

function debug(pContent) {
	id("DEBUG").innerHTML = pContent;
	setTimeout(() => {
		id("DEBUG").innerHTML = "";
	},500);
}