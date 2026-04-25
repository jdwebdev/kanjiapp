let bMain = true;
const TRAINING_TYPE = Object.freeze({
	NONE: -1,
	KANKEN: 0,
	BUSHU: 1,
	SONOTA: 2
});
const KANKEN_CAT = Object.freeze({
	NONE: -1,
	WORD_YOMI: 0,
	WORD_KAKI: 1,
	KANJI: 2,
	BUSHU: 3,
	YOJI_YOMI: 4,
	YOJI_KAKI: 5,
});
let kankenCategory = KANKEN_CAT.NONE;
let currentTraining = TRAINING_TYPE.NONE;
let current = -1;
let kanjiTrainingList = [];
let kanjiIndexTrainingList = [];
let wrongList = "";
let wrongWordList = [];
let wordTrainingList = [];
let wordIndexTrainingList = [];
let kankenRangeStart = 0;
let kankenRangeEnd = 0;
let kankenLvl = "";
let bTrainingEnd = false;

const kanjiapp_training = "kanjiapp_training";


function openCategory(pCategory) {
	if (currentTraining > -1) return;

	const buttons = document.getElementsByClassName("training_type_btn");
	for (let i = 0; i < buttons.length; i++) {
		if (bMain) {
			if (buttons[i].innerText == pCategory) {
				editClass(buttons[i], "clicked_training_type_btn");
				buttons[i].innerHTML = `<span class="triangle triangle_left"></span>` + pCategory + `<span class="triangle triangle_right"></span>`;
			} else {
				editClass(buttons[i], "other_training_type_btn");
			}
		} else {
			buttons[i].innerHTML = buttons[i].innerText;
			editClass(buttons[i], "clicked_training_type_btn", false);
			editClass(buttons[i], "other_training_type_btn", false);
		}
	}
	if (bMain) {
		switch(pCategory) {
			case "漢検":
				block(id("kanken_container"));
				break;
			case "部首":
				break;
			case "その他":
				flex(id("sonota_container"));
				break;
		}
		none(id("training_continue"));
	} else {
		none(id("kanken_container"));
		none(id("sonota_container"));
		none(id("training_container"));
		if (localSaveData()) flex(id("training_continue"));
	}
	bMain = !bMain;
}
function openKankenDialog(pLvl,btn) {
	kankenLvl = pLvl;
	if (equal(pLvl, "10", "9", "8","7","6")) {
		none(id("yojijukugo_kaki_btn"));
		none(id("yojijukugo_yomi_btn"));
		id("kanken_dialog").style.height = "420px";
		id("kanken_dialog").children[1].style.height = "340px";
	} else {
		unset(id("yojijukugo_kaki_btn"));
		unset(id("yojijukugo_yomi_btn"));
		id("kanken_dialog").style.height = "470px";
		id("kanken_dialog").children[1].style.height = "390px";
	}

	editClass(btn, "active");
	unset(id("kanken_dialog"));
	id("kanken_dialog").showModal();
	setTimeout(() => {
		editClass(id("kanken_dialog"), "active");
	}, 100);

	id("kd_btn_yomi").blur();
}
function closeKankenDialog(btn = null) {
	kankenLvl = "";
	const btns = document.getElementsByClassName("kanken_lvl_btn");
	for (let i = 0; i < btns.length; i++) {
		if (btns[i].classList.contains("active")) {
			editClass(btns[i], "active", false);
		}
	}

	if (btn != null) pushBtn(btn);

	editClass(id("kanken_dialog"), "active", false);
	setTimeout(() => {
		if (btn != null) pushBtn(btn,false);
		id("kanken_dialog").close();
	}, 100);
}
function closeKankenSettingDialog(btn = null) {
	if (push(btn, closeKankenSettingDialog)) return;

	kankenRangeStart = 0;
	kankenRangeEnd = 0;
	id("kanken_setting_dialog").close();
}
function prepareKankenTest(pCategory, btn = null) {
	if (push(btn, prepareKankenTest, pCategory)) return;

	kankenCategory = pCategory;
	kanjiTrainingList = [];
	wordTrainingList = [];
	kanjiIndexTrainingList = [];
	wordIndexTrainingList = [];
	switch (kankenCategory) {
		case KANKEN_CAT.WORD_YOMI:
		case KANKEN_CAT.WORD_KAKI:
			wordTrainingList = Word.list.filter(w => (w.kanken == kankenLvl && !(w instanceof Yojijukugo)));
			break;
		case KANKEN_CAT.KANJI:
			kanjiTrainingList = Kanji.list.filter(k => k.kanken == kankenLvl);
			break;
		case KANKEN_CAT.YOJI_YOMI:
		case KANKEN_CAT.YOJI_KAKI:
			wordTrainingList = Word.list.filter(w => (w.kanken == kankenLvl && w instanceof Yojijukugo));
			break;
	}
	openKankenSettingDialog();
}

function openKankenSettingDialog() {
	changeKankenRange();

	if (!equal(kankenCategory, KANKEN_CAT.YOJI_YOMI, KANKEN_CAT.YOJI_KAKI)) {
		none(id("kanken_yoji_priority"));
		none(id("kanken_yoji_priority_separator"));
	} else {
		unset(id("kanken_yoji_priority"));
		unset(id("kanken_yoji_priority_separator"));
	}
	
	id("kanken_setting_dialog").showModal();
	id("kanken_all_btn").blur();
}

function changeKankenRange() {
	const kanken_list_possibilities = id("kanken_list_possibilities");
	kanken_list_possibilities.innerHTML = "";

	let range = id("kanken_range_input").value;
	if (range == "" || range == 0) {
		range = 100;
		id("kanken_range_input").value = 100;
	}
	range = Number(range);

	let listHTML = "";
	
	let tmpList = [];
	let bWord = false;
	if (wordTrainingList.length > 0) {
		tmpList = wordTrainingList;
		bWord = true;
	} else if (kanjiTrainingList.length > 0) {
		tmpList = kanjiTrainingList;
	}
	let nbLines = Math.floor((tmpList.length / range)) + 1;
	let rest = tmpList.length % range;

	let line = 0;
	for (let i = 0; i < nbLines; i++) {
		if (i < nbLines-1) {
			if (bWord) {
				listHTML += `<li class="kanken_possibilities" onClick="chooseKankenRange(this, ${line+1}, ${line+range})">${line+1} - ${line+range} (${tmpList[line].word} - ${tmpList[line+(range-1)].word})</li>`;
			} else {
				listHTML += `<li class="kanken_possibilities" onClick="chooseKankenRange(this, ${line+1}, ${line+range})">${line+1} - ${line+range} (${tmpList[line].kanji} - ${tmpList[line+(range-1)].kanji})</li>`;
			}
			line += range;
		} else {
			if (bWord) {
				listHTML += `<li class="kanken_possibilities" onClick="chooseKankenRange(this, ${line+1}, ${line+rest})">${line+1} - ${line+rest} (${tmpList[line].word} - ${tmpList[line-1+rest].word})</li>`;
			} else {
				listHTML += `<li class="kanken_possibilities" onClick="chooseKankenRange(this, ${line+1}, ${line+rest})">${line+1} - ${line+rest} (${tmpList[line].kanji} - ${tmpList[line-1+rest].kanji})</li>`;
			}
		}
	}

	kanken_list_possibilities.innerHTML = listHTML;
}

function chooseKankenRange(pElement, pStart, pEnd) {
	kankenRangeStart = pStart;
	kankenRangeEnd = pEnd;
	const elements = document.getElementsByClassName("kanken_possibilities");
	for(let i = 0; i < elements.length; i++) {
		editClass(elements[i], "active", false);
	}
	editClass(pElement, "active");

}

function priorityKankenStart(btn = null) {
	if (push(btn, priorityKankenStart)) return;

	wordTrainingList = wordTrainingList.filter(w => w.bPriority);
	wordTrainingList = randomizeList(wordTrainingList);
	wordTrainingList.forEach(w => wordIndexTrainingList.push(w.id));
	none(id("kanken_dialog"));
	closeKankenDialog();
	closeKankenSettingDialog(id("kanken_yoji_priority"));

	switch(kankenCategory) {
		case KANKEN_CAT.YOJI_YOMI:
			yomiStart();
			break;
		case KANKEN_CAT.YOJI_KAKI:
			tangoStart();
			break;
	}
}

function filteredKankenStart(btn = null,bFilter = true) {
	const bYomi = equal(kankenCategory, KANKEN_CAT.WORD_YOMI, KANKEN_CAT.YOJI_YOMI);
	if (bFilter && kankenRangeStart == 0 && kankenRangeEnd == 0) return;
	switch (kankenCategory) {
		case KANKEN_CAT.WORD_YOMI:
		case KANKEN_CAT.YOJI_YOMI:
		case KANKEN_CAT.WORD_KAKI:
		case KANKEN_CAT.YOJI_KAKI:
			if (bFilter) wordTrainingList = wordTrainingList.filter((w,index) => (index >= kankenRangeStart-1 && index < kankenRangeEnd));
			wordTrainingList = randomizeList(wordTrainingList);
			wordTrainingList.forEach(w => wordIndexTrainingList.push(w.id));

			none(id("kanken_dialog"));
			closeKankenDialog();
			closeKankenSettingDialog(btn);
			if (bYomi) {
				yomiStart();
			} else {
				tangoStart();
			}
			break;
		case KANKEN_CAT.KANJI:
			if (bFilter) kanjiTrainingList = kanjiTrainingList.filter((k,index) => (index >= kankenRangeStart-1 && index < kankenRangeEnd));
			kanjiTrainingList = randomizeList(kanjiTrainingList);

			none(id("kanken_dialog"));
			closeKankenDialog();
			closeKankenSettingDialog(btn);
			kanjiStart(TRAINING_TYPE.KANKEN);
			break;
	}
}

function kanjiStart(pType, btn = null) {
	if (push(btn, kanjiStart, pType)) return;

	switch(pType) {
		case TRAINING_TYPE.SONOTA:
			kanjiTrainingList = [];
			kanjiIndexTrainingList = [];

			currentTraining = TRAINING_TYPE.SONOTA;
			let trainingList = id("sonota_input").value;
			
			let kanji = null;
			for (let i = 0; i < trainingList.length; i++) {
				kanji = Kanji.list.find(k => k.kanji == trainingList[i]);
				if (kanji !== undefined) kanjiTrainingList.push(kanji);
			}
			
			if (trainingList.length == 0) {
				alertDialog("Liste vide !");
				currentTraining = TRAINING_TYPE.NONE;
				return;
			}
			if (kanjiTrainingList.length == 0) {
				alertDialog("Aucun kanji connu détecté !");
				currentTraining = TRAINING_TYPE.NONE;
				return;
			}
			
			none(id("sonota_container"));
			break;
		case TRAINING_TYPE.KANKEN:
			currentTraining = TRAINING_TYPE.KANKEN;
			none(id("kanken_container"));
			break;
	}

	kanjiTrainingList.forEach(k => kanjiIndexTrainingList.push(k.id));

	block(id("training_container"));
	
	current = -1;
	wrongList = "";
	
	id("training_progression").innerHTML = (current+1) + "/" + kanjiTrainingList.length;
	id("progress_bar").style.width = "0%";

	next();
}
function trainingContinue(btn = null) {
	if (push(btn, trainingContinue)) return;

	none(id("training_continue"));
	let saveData = localStorage.getItem(kanjiapp_training);
	if (saveData == null) return;

	saveData = JSON.parse(saveData);

	let trainingListLength;

	switch(saveData.trainingType) {
		case TRAINING_TYPE.KANKEN:
			switch (saveData.category) {
				case KANKEN_CAT.WORD_YOMI:
				case KANKEN_CAT.YOJI_YOMI:
				case KANKEN_CAT.WORD_KAKI:
				case KANKEN_CAT.YOJI_KAKI:
					for (let i = 0; i < saveData.wordList.length; i++) {
						wordTrainingList.push(Word.list.find(w => w.id == saveData.wordList[i]));
					}
					wordTrainingList.forEach(w => wordIndexTrainingList.push(w.id));
					trainingListLength = wordTrainingList.length;
					wrongWordList = saveData.wrongList;
					break;
				case KANKEN_CAT.KANJI:
					for (let i = 0; i < saveData.kanjiList.length; i++) {
						kanjiTrainingList.push(Kanji.list.find(k => k.id == saveData.kanjiList[i]));
					}
					kanjiTrainingList.forEach(k => kanjiIndexTrainingList.push(k.id));
					trainingListLength = kanjiTrainingList.length;
					wrongList = saveData.wrongList;
					break;
			}
			kankenCategory = saveData.category;
			openCategory("漢検");
			none(id("kanken_container"));
			break;
		case TRAINING_TYPE.BUSHU:
			break;
		case TRAINING_TYPE.SONOTA:
			for (let i = 0; i < saveData.kanjiList.length; i++) {
				kanjiTrainingList.push(Kanji.list.find(k => k.id == saveData.kanjiList[i]));
			}
			kanjiTrainingList.forEach(k => kanjiIndexTrainingList.push(k.id));
			trainingListLength = kanjiTrainingList.length;
			wrongList = saveData.wrongList;
			openCategory("その他");
			none(id("sonota_container"));
			break;
	}

	currentTraining = saveData.trainingType;

	block(id("training_container"));

	current = saveData.current-1;

	id("training_progression").innerHTML = (current+1) + "/" + trainingListLength;
	id("progress_bar").style.width = ((current+1) / trainingListLength * 100) + "%";

	switch(saveData.trainingType) {
		case TRAINING_TYPE.KANKEN:
			kankenCategory = saveData.category;
			switch(saveData.category) {
				case KANKEN_CAT.WORD_YOMI:
				case KANKEN_CAT.YOJI_YOMI:
					if (saveData.checkDone) {
						yomiNext(saveData);
						none(id("check_btn"));
						block(id("next_btn"));
						yomiCheck(null, true, saveData.correct, saveData.incorrectWord);
					} else {
						yomiNext();
					}
					break;
				case KANKEN_CAT.WORD_KAKI:
				case KANKEN_CAT.YOJI_KAKI:
					if (saveData.checkDone) {
						tangoNext(saveData);
						tangoCheck();
					} else {
						tangoNext();
					}
					break;
				case KANKEN_CAT.KANJI:
					if (saveData.checkDone) {
						next();
						check();
					} else {
						next();
					}
					break;
			}
			break;
		case TRAINING_TYPE.SONOTA: 
			if (saveData.checkDone) {
				next();
				check();
			} else {
				next();
			}
			break;
	}

}

function yomiStart() {
	currentTraining = TRAINING_TYPE.KANKEN;
	none(id("kanken_container"));
	block(id("training_container"));

	current = -1;
	wrongWordList = [];

	id("training_progression").innerHTML = (current+1) + "/" + wordTrainingList.length;
	id("progress_bar").style.width = "0%";

	yomiNext();
}

function yomiNext(pSaveData = null) {
	current++;
	let obj = {current: current, checkDone: pSaveData?.checkDone, wordList: wordIndexTrainingList, wrongList: wrongWordList, trainingType: currentTraining, category: kankenCategory, correct: pSaveData?.correct, incorrectWord: pSaveData?.incorrectWord };
	localStorage.setItem(kanjiapp_training, JSON.stringify(obj));

	const training_zone = id("training_zone");

	//? End
	if (current >= wordTrainingList.length) {
		displayEndTraining();
		return;
	}

	editClass(training_zone, "yomi");
	const w = wordTrainingList[current];
	training_zone.innerHTML = "";
	let html =
	`
	<div id="yomi_training_word_${w.id}" class="yomi_training_word">${w.word}</div>
	`;

	if (w.wRef != null) {
		html += `<div id="yomi_training_imi">[${w.wRef.word}] ${w.wRef.imi}</div>`;
	} else {
		html += `<div id="yomi_training_imi">${w.imi}</div>`;
	}
	
	html += keyboard_html;

	html += `
		<div class="training_check_zone">
			<div id="check_btn_container">
				<button id="check_btn" class="normal_btn" onClick="yomiCheck(this)">確認</button>
				<button id="next_btn" class="normal_btn" onClick="nextBtn(this)">NEXT</button>
			</div>
			<div id="maru_batsu_btns" style="display:none">
				<button id="batsu_btn" class="maru_batsu_btn" onClick="maruBatsu(false,this)">
					<span id="batsu_btn_cross_left"></span>
					<span id="batsu_btn_cross_right"></span>
				</button>
				<button id="maru_btn" class="maru_batsu_btn" onClick="maruBatsu(true,this)">
					<span id="maru_btn_maru"></span>
				</button>
			</div>
		</div>
	`;
	//✘〇
	training_zone.innerHTML = html;

	activeKeyboard();
}

function yomiCheck(btn = null, pbTrainingContinue = false, pbContinueCorrect = false, pIncorrectWord = "") {

	if (btn != null) {
		if (btn.classList.contains("active")) return;
		pushBtn(btn);
		setTimeout(() => {
			pushBtn(btn,false);
			none(btn);
			block(id("next_btn"));
		}, 100);
	}

	const word = id("yomi_training_word_" + wordTrainingList[current].id);

	word.style.color = WHITE;
	
	// log("yomiRaw: " + wordTrainingList[current].yomiRaw);

	const keyboard_result = id("keyboard_result");
	keyboard_result.innerHTML = wordTrainingList[current].yomiRaw;
	none(keyboard_part);
	none(keyboard_input);

	setTimeout(() => {
		block(keyboard_result);
	}, 50);

	let yomiRaw = toHira(wordTrainingList[current].yomiRaw);
	
	const possibleAnswers = yomiRaw.split("、");
	// log(possibleAnswers);
	let bCorrect;
	if (possibleAnswers.includes(keyboard_input.value) || pbContinueCorrect) {
		keyboard_result.style.color = "rgb(0,128,0)";
		word.style.color = "rgb(0,128,0)";
		setTimeout(() => {
			editClass(keyboard_result, "ok");
		},100);
		bCorrect = true;
	} else {
		keyboard_result.style.color = "rgb(128,0,0)";
		word.style.backgroundColor = "rgb(128,0,0)";
		setTimeout(() => {
			editClass(keyboard_result, "ok");
			block(id("keyboard_my_answer"));
			if (pbTrainingContinue) {
				id("keyboard_my_answer").innerText = pIncorrectWord;
			} else {
				id("keyboard_my_answer").innerText = keyboard_input.value;
			}
			word.style.color = "rgb(128,0,0)";
			word.style.backgroundColor = "transparent";
		}, 100);
		if (!pbTrainingContinue) wrongWordList.push(wordTrainingList[current].id);
		bCorrect = false;
	}

	id("training_progression").innerHTML = (current+1) + "/" + wordTrainingList.length;
	id("progress_bar").style.width = ((current+1) / wordTrainingList.length * 100) + "%";

	if (!pbTrainingContinue) {
		let obj = {current: current, checkDone: true, wordList: wordIndexTrainingList, wrongList: wrongWordList, trainingType: currentTraining, category: kankenCategory, correct: bCorrect, incorrectWord: bCorrect ? "" : keyboard_input.value };
		localStorage.setItem(kanjiapp_training, JSON.stringify(obj))
	}

}

function tangoStart() {
	currentTraining = TRAINING_TYPE.KANKEN;
	none(id("kanken_container"));
	block(id("training_container"));

	current = -1;
	wrongWordList = [];

	id("training_progression").innerHTML = (current+1) + "/" + wordTrainingList.length;
	id("progress_bar").style.width = "0%";

	tangoNext();
}

function tangoNext(pSaveData = null) {
	current++;
	let obj = {current: current, checkDone: pSaveData?.checkDone, wordList: wordIndexTrainingList, wrongList: wrongWordList, trainingType: currentTraining, category: kankenCategory, correct: pSaveData?.correct, incorrectWord: pSaveData?.incorrectWord };
	localStorage.setItem(kanjiapp_training, JSON.stringify(obj));

	const training_zone = id("training_zone");

	//? End
	if (current >= wordTrainingList.length) {
		displayEndTraining();
		return;
	}

	editClass(training_zone, "yomi");

	let fontSize = ""; //? 30
	if (wordTrainingList[current].word.length > 15) fontSize = "tango_training_font_size_tokubetsu"; //? 20
	
	training_zone.innerHTML = "";
	let html = "";
	html +=
	`
	<div id="tango_training_word_${wordTrainingList[current].id}" class="tango_training_word ${fontSize}">${wordTrainingList[current].yomi}</div>
	<div id="tango_training_imi" class="normal_btn" onClick="showTangoImi(this)">意味確認</div>
	`;

	html += `
		<div class="training_check_zone">
			<div id="check_btn_container">
				<button id="check_btn" class="normal_btn" onClick="tangoCheck(this)">確認</button>
			</div>
			<div id="maru_batsu_btns" style="display:none">
				<button id="batsu_btn" class="maru_batsu_btn" onClick="maruBatsu(false,this)">
					<span id="batsu_btn_cross_left"></span>
					<span id="batsu_btn_cross_right"></span>
				</button>
				<button id="maru_btn" class="maru_batsu_btn" onClick="maruBatsu(true,this)">
					<span id="maru_btn_maru"></span>
				</button>
			</div>
		</div>
	`;

	training_zone.innerHTML = html;
}

function tangoCheck(btn = null) {
	if (push(btn, tangoCheck)) return;

	const word = id("tango_training_word_" + wordTrainingList[current].id);
	word.innerHTML = wordTrainingList[current].word;

	showTangoImi();

	none(id("check_btn_container"));
	flex(id("maru_batsu_btns"));

	id("training_progression").innerHTML = (current+1) + "/" + wordTrainingList.length;
	id("progress_bar").style.width = ((current+1) / wordTrainingList.length * 100) + "%";

	let obj = {current: current, checkDone: true, wordList: wordIndexTrainingList, wrongList: wrongWordList, trainingType: currentTraining, category: kankenCategory };
	localStorage.setItem(kanjiapp_training, JSON.stringify(obj));
}

function showTangoImi(btn = null) {
	if (push(btn, showTangoImi)) return;
	const w = wordTrainingList[current];
	const imi = id("tango_training_imi");

	if (w.wRef != null) {
		tango_training_imi.innerHTML = "["+ w.wRef.word + "] " + w.wRef.imi;
	} else {
		tango_training_imi.innerHTML = w.imi;
	}
	
	editClass(tango_training_imi, "normal_btn", false);
	editClass(tango_training_imi, "display");
}

function nextBtn(btn) {
	// editClass(btn, "active");
	pushBtn(btn);
	setTimeout(() => {
		// editClass(btn, "active", false);
		pushBtn(btn,false);
		none(btn);
		id("keyboard_my_answer").innerText = "";
		none(id("keyboard_my_answer"));
		block(id("check_btn"));
		yomiNext();
	}, 100);
}

function next() {

	current++;
	let obj = {current: current, checkDone: false, kanjiList: kanjiIndexTrainingList, wrongList: wrongList, trainingType: currentTraining, category: kankenCategory };
	localStorage.setItem(kanjiapp_training, JSON.stringify(obj));

	const training_zone = id("training_zone");
	training_zone.innerHTML = "";

	//? End
	if (current >= kanjiTrainingList.length) {
		displayEndTraining();
		return;
	}

	let html =
	`
	<div id="training_kanji_${kanjiTrainingList[current].id}" class="training_kanji">?</div>
	<div id="training_itaiji">${kanjiTrainingList[current].itaiji != "" ? "?" : "-"}</div>
	<div id="training_onyomi">${kanjiTrainingList[current].onYomi}</div>
	<div id="training_kunyomi">${kanjiTrainingList[current].kunYomi}</div>
	<div id="training_imi">${kanjiTrainingList[current].imi}</div>
	<div id="training_wordlist">
	`;
	kanjiTrainingList[current].wordList.forEach(i => {
		html += `
			<div class="word_result" id="word_id_${Word.list[i].id}">
				<div class="word_result_yomi_word">
					<div class="word_result_yomi">${Word.list[i].yomi}</div>
					<div class="word_result_word hidden_words">${Word.list[i].word.replaceAll(kanjiTrainingList[current].kanji, '<span class="hidden_kanji">？</span>')}</div>
					<div class="word_result_imi">${Word.list[i].imi}</div>
				</div>
				<div class="word_result_misc">
		`;
		html += `</div></div>`;
	});

	html += `</div>`;

	html += `
		<div class="training_check_zone">
			<div id="check_btn_container">
				<button id="check_btn" class="normal_btn" onClick="check(this)">確認</button>
			</div>
			<div id="maru_batsu_btns" style="display:none">
				<button id="batsu_btn" class="maru_batsu_btn" onClick="maruBatsu(false,this)">
					<span id="batsu_btn_cross_left"></span>
					<span id="batsu_btn_cross_right"></span>
				</button>
				<button id="maru_btn" class="maru_batsu_btn" onClick="maruBatsu(true,this)">
					<span id="maru_btn_maru"></span>
				</button>
			</div>
		</div>
	`;
	training_zone.innerHTML = html;

}

function check(btn = null) {
	if (push(btn, check)) return;

	const kanji = id("training_kanji_" + kanjiTrainingList[current].id);
	kanji.innerHTML = `
		${kanjiTrainingList[current].kanji}<span id="training_bushu">${Kanji.bushuList[kanjiTrainingList[current].bushu-1].bushu}<span
			class="tooltip_bushu">${Kanji.bushuList[kanjiTrainingList[current].bushu-1].yomi}</span>
		</span>
	`;
	if (kanjiTrainingList[current].itaiji != "") {
		id("training_itaiji").innerHTML = kanjiTrainingList[current].itaiji;
	}
	let hiddenWords = document.getElementsByClassName("hidden_words");
	
	for (let i = 0; i < hiddenWords.length; i++) {
		let html = hiddenWords[i].innerHTML;
		html = html.replaceAll('<span class="hidden_kanji">？</span>', kanjiTrainingList[current].kanji);
		hiddenWords[i].innerHTML = html;
	}

	none(id("check_btn_container"));
	flex(id("maru_batsu_btns"));

	id("training_progression").innerHTML = (current+1) + "/" + kanjiTrainingList.length;
	id("progress_bar").style.width = ((current+1) / kanjiTrainingList.length * 100) + "%";

	let obj = {current: current, checkDone: true, kanjiList: kanjiIndexTrainingList, wrongList: wrongList, trainingType: currentTraining, category: kankenCategory };
	localStorage.setItem(kanjiapp_training, JSON.stringify(obj));
}

function maruBatsu(pbMaru, btn = null) {
	if (btn != null) {
		pushBtn(btn);
		if (pbMaru) {
			editClass(id("maru_btn_maru"), "active");
		} else {
			editClass(id("batsu_btn_cross_left"), "active");
			editClass(id("batsu_btn_cross_right"), "active");
		}
		
		setTimeout(() => {
			pushBtn(btn,false);
			if (pbMaru) {
				editClass(id("maru_btn_maru"), "active", false);
			} else {
				editClass(id("batsu_btn_cross_left"), "active", false);
				editClass(id("batsu_btn_cross_right"), "active", false);
			}
			maruBatsu(pbMaru);
		}, 100);

		return;
	}

	none(id("maru_batsu_btns"));

	if (currentTraining == TRAINING_TYPE.SONOTA || (currentTraining == TRAINING_TYPE.KANKEN && kankenCategory == KANKEN_CAT.KANJI)) {
		if (!pbMaru) wrongList += kanjiTrainingList[current].kanji;
		next();
	} else if (currentTraining == TRAINING_TYPE.KANKEN && equal(kankenCategory, KANKEN_CAT.WORD_KAKI, KANKEN_CAT.YOJI_KAKI)) {
		if (!pbMaru) wrongWordList.push(wordTrainingList[current].id);
		tangoNext();
	}
}

function displayEndTraining() {
	bTrainingEnd = true;
	const training_zone = id("training_zone");
	let html = "";
	let goodLength;
	let trainingLength;
	switch(currentTraining) {
		case TRAINING_TYPE.KANKEN:
			switch(kankenCategory) {
				case KANKEN_CAT.WORD_YOMI:
				case KANKEN_CAT.WORD_KAKI:
				case KANKEN_CAT.YOJI_YOMI:
				case KANKEN_CAT.YOJI_KAKI:
					goodLength = wordTrainingList.length-wrongWordList.length;
					trainingLength = wordTrainingList.length;
					
					if (wrongWordList.length > 0) {
						html = `
							<div id="training_result">
								<div id="training_mark">
									<p>${goodLength}/${trainingLength}</p>
								</div>
								<div class="training_wrong_list_container">
									<div class="training_wrong_title">WRONG</div>
									<ul id="training_wrong_word_list">`;
									wrongWordList.forEach(w => {
										html += `<li>${Word.list[w].word}</li>`;
									});
						html += `</ul>
								<div class="training_btns">`;
						html += `
										<button id="training_see_btn" class="normal_btn training_copy_see_btns" onClick="seeWrongList()">See</button>
									</div>
								</div>
							</div>
						`;
					} else {
						html = `
							<div id="training_result">
								<div id="training_mark">
									<p>${goodLength}/${trainingLength}</p>
								</div>
								<div class="training_perfect">PERFECT!</div>
							</div>
						`;
					}
					break;
				
				case KANKEN_CAT.KANJI:
					goodLength = kanjiTrainingList.length-wrongList.length;
					trainingLength = kanjiTrainingList.length;
					if (wrongList.length != "") {
						html = `
							<div id="training_result">
								<div id="training_mark">
									<p>${goodLength}/${trainingLength}</p>
								</div>
								<div class="training_wrong_list_container">
									<div class="training_wrong_title">WRONG</div>
									<p id="training_wrong_list">${wrongList}</p>
									<div class="training_btns">
										<button id="training_copy_btn" class="normal_btn training_copy_see_btns"
											onClick="copyWrongList()">Copy</button>
										<button id="training_see_btn" class="normal_btn training_copy_see_btns"
											onClick="seeWrongList()">See</button>
									</div>
								</div>
							</div>
						`;
					} else {
						html = `
							<div id="training_result">
								<div id="training_mark">
									<p>${goodLength}/${trainingLength}</p>
								</div>
								<div class="training_perfect">PERFECT!</div>
							</div>
						`;
					}
					break;
			}
			break;
		case TRAINING_TYPE.BUSHU:
			break;
		case TRAINING_TYPE.SONOTA: 
			goodLength = kanjiTrainingList.length-wrongList.length;
			trainingLength = kanjiTrainingList.length;
			if (wrongList.length != "") {
				html = `
					<div id="training_result">
						<div id="training_mark">
							<p>${goodLength}/${trainingLength}</p>
						</div>
						<div class="training_wrong_list_container">
							<div class="training_wrong_title">WRONG</div>
							<p id="training_wrong_list">${wrongList}</p>
							<div class="training_btns">
								<button id="training_copy_btn" class="normal_btn training_copy_see_btns"
									onClick="copyWrongList()">Copy</button>
								<button id="training_see_btn" class="normal_btn training_copy_see_btns"
									onClick="seeWrongList()">See</button>
							</div>
						</div>
					</div>
				`;
			} else {
				html = `
					<div id="training_result">
						<div id="training_mark">
							<p>${goodLength}/${trainingLength}</p>
						</div>
						<div class="training_perfect">PERFECT!</div>
					</div>
				`;
			}
			break;
	}
	training_zone.innerHTML = html;
	const training_mark = id("training_mark");
	setTimeout(() => {
		editClass(training_mark.children[0], "active");
		if (trainingLength < 100) {
			training_mark.children[0].style.fontSize = "30px";
		} else if (trainingLength < 1000) {
			training_mark.children[0].style.fontSize = "25px";
		} else {
			training_mark.children[0].style.fontSize = "22px";
		}
	}, 10);
	let value = 0;
	let interval = setInterval(() => {
		training_mark.style.background = `conic-gradient(var(--blue), ${ ((value / trainingLength)*100) / 100 * 360}deg, var(--white) 0deg)`;
		value += (trainingLength/100);
		if (value >= goodLength) {
			value = goodLength;
			training_mark.style.background = `conic-gradient(var(--blue), ${ ((value / trainingLength)*100) / 100 * 360}deg, var(--white) 0deg)`;
			clearInterval(interval);
		}
	}, 10);
}

function trainingBackBtn(btn = null) {
	if (btn != null) {
		pushBtn(btn);
		editClass(id("training_back_arrow_1"), "active");
		editClass(id("training_back_arrow_3"), "active");
		setTimeout(() => {
			pushBtn(btn,false);
			editClass(id("training_back_arrow_1"), "active", false);
			editClass(id("training_back_arrow_3"), "active", false);
			trainingBackBtn();
		}, 100);
		return;
	}
	if (!bTrainingEnd) {
		id("dialog").showModal();
	} else {
		trainingBack(0);
	}
}

function trainingBack(pAction, btn = null) {
	if (push(btn, trainingBack, pAction)) return;

	bTrainingEnd = false;
	id("dialog").close();
	switch (pAction) {
		case 0:
			localStorage.removeItem(kanjiapp_training);
			break;
		case 1:
			break;
		default: 
			return;
	}
	none(id("training_container"));
	switch(currentTraining) {
		case TRAINING_TYPE.KANKEN:
			kankenCategory = KANKEN_CAT.NONE;
			block(id("kanken_container"));
			break;
		case TRAINING_TYPE.SONOTA:
			flex(id("sonota_container"));
			break;
	}
	currentTraining = -1;
}

function push(btn = null, f = null, ...pArgs) {
	if (btn != null) {
		pushBtn(btn);
		setTimeout(() => {
			pushBtn(btn,false);
			if (pArgs.length > 0) {
				f(pArgs[0]);
			} else {
				f();
			}
		}, 100);
		return true;
	}
	return false;
}

function localSaveData() {
	return (localStorage.getItem(kanjiapp_training) != null)
}

function deleteTrainingData(btn = null) {
	if (push(btn, deleteTrainingData)) return;
	localStorage.removeItem(kanjiapp_training);
	none(id("training_continue"));
}

function copyWrongList() {
	let list = id("training_wrong_list").innerText;
	copyToClipboard(list);
}

function seeWrongList() {
	changeSection("main");
	switch(currentTraining) {
		case TRAINING_TYPE.KANKEN:
			switch(kankenCategory) {
				case KANKEN_CAT.WORD_YOMI:
				case KANKEN_CAT.WORD_KAKI:
				case KANKEN_CAT.YOJI_YOMI:
				case KANKEN_CAT.YOJI_KAKI:
					foundKanjiList = [];
					includingWordArr = [];
					exactWordArr = [];
					wrongWordList.forEach(id => {
						exactWordArr.push(Word.list[id]);
					});
					displayResult();
					break;
				case KANKEN_CAT.KANJI:
					const list = id("training_wrong_list").innerText;
					search(list);
					break;
			}
			break;
		case TRAINING_TYPE.SONOTA:
			const list = id("training_wrong_list").innerText;
			search(list);
			break;
	}
}