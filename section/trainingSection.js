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
const BUSHU_CAT = Object.freeze({
	NONE: -1,
	BUSHU_YOMI: 0,
	BUSHU: 1,
});
const SONOTA_CAT = Object.freeze({
	NONE: -1,
	KANJI: 0,
	KOTOWAZA_YOMI: 1,
	KOTOWAZA_KAKI: 2,
	ATEJI_YOMI: 3,
	ATEJI_KAKI: 4,
	ITAIJI: 5,
	WORD_YOMI: 6,
	WORD_KAKI: 7
});
let kankenCategory = KANKEN_CAT.NONE;
let bushuCategory = BUSHU_CAT.NONE;
let sonotaCategory = SONOTA_CAT.NONE;
let currentTraining = TRAINING_TYPE.NONE;
let current = -1;
let kanjiTrainingList = [];
let kanjiIndexTrainingList = [];
let wrongList = "";
let wrongWordList = [];
let wordTrainingList = [];
let wordIndexTrainingList = [];
let bushuTrainingList = [];
let bushuIndexTrainingList = [];
let wrongBushuList = [];
let kankenRangeStart = 0;
let kankenRangeEnd = 0;
let kankenLvl = "";
let bTrainingEnd = false;

const kanjiapp_training = "kanjiapp_training";

function trainingResetAll() {
	currentTraining = TRAINING_TYPE.NONE;
	kankenCategory = KANKEN_CAT.NONE;
	bushuCategory = BUSHU_CAT.NONE;
	sonotaCategory = SONOTA_CAT.NONE;
	current = -1;
	kanjiTrainingList = [];
	kanjiIndexTrainingList = [];
	wrongList = "";
	wrongWordList = [];
	wordTrainingList = [];
	wordIndexTrainingList = [];
	bushuTrainingList = [];
	bushuIndexTrainingList = [];
	wrongBushuList = [];
	kankenRangeStart = 0;
	kankenRangeEnd = 0;
	kankenLvl = "";
	bTrainingEnd = false;
}

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
				flex(id("bushu_container"));
				break;
			case "その他":
				flex(id("sonota_container"));
				break;
		}
		none(id("training_continue"));
	} else {
		none(id("kanken_container"));
		none(id("bushu_container"));
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
	const btns = document.getElementsByClassName("kanken_lvl_btn");
	for (let i = 0; i < btns.length; i++) {
		if (btns[i].classList.contains("active")) {
			editClass(btns[i], "active", false);
		}
	}

	if (btn != null) {
		trainingResetAll();
		pushBtn(btn);
	}

	editClass(id("kanken_dialog"), "active", false);
	setTimeout(() => {
		if (btn != null) pushBtn(btn,false);
		id("kanken_dialog").close();
	}, 100);
}
function closeKankenSettingDialog(btn = null) {
	if (push(btn, closeKankenSettingDialog)) return;

	if (Yojijukugo.bPrioTraining && id("kanken_setting_yoji_prio_switch").style.display == "unset") {
		Yojijukugo.bPrioTraining = false;
		switchBtn(id("kanken_setting_yoji_prio_switch"), null);
		editClass(id("kanken_setting_yoji_prio_switch_btn"),"disable", false);
	}

	kankenRangeStart = 0;
	kankenRangeEnd = 0;
	id("kanken_setting_dialog").close();
	id("kanken_dialog").blur();
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
		case KANKEN_CAT.BUSHU:
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
		none(id("kanken_setting_yoji_prio_switch"));
	} else {
		unset(id("kanken_setting_yoji_prio_switch"));
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
		} else if (line < tmpList.length) {
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

function priorityKankenStart() {
	Yojijukugo.bPrioTraining = !Yojijukugo.bPrioTraining;

	if (Yojijukugo.bPrioTraining) {
		wordTrainingList = wordTrainingList.filter(w => w.bPriority);
	} else {
		wordTrainingList = Word.list.filter(w => (w.kanken == kankenLvl && w instanceof Yojijukugo));
		setTimeout(() => {
			editClass(id("kanken_setting_yoji_prio_switch_btn"),"disable",false);
		}, 300);
	}

	changeKankenRange();
}

function filteredKankenStart(btn = null, bFilter = true) {
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
		case KANKEN_CAT.BUSHU:
			if (bFilter) kanjiTrainingList = kanjiTrainingList.filter((k,index) => (index >= kankenRangeStart-1 && index < kankenRangeEnd));
			kanjiTrainingList = randomizeList(kanjiTrainingList);
			none(id("kanken_dialog"));
			closeKankenDialog();
			closeKankenSettingDialog(btn);
			kanjiStart(TRAINING_TYPE.KANKEN);
			break;
	}
}

function prepareSonotaTraining(pType, btn) {
	if (push(btn, prepareSonotaTraining, pType)) return;

	const sonota_dialog = id("sonota_dialog");
	let html = ""
	if (pType == "ateji") {
		html = `
			<button class="normal_btn dialog_btn" onClick="sonotaTraining(SONOTA_CAT.ATEJI_YOMI,this)">当て字・読み</button>
			<button class="normal_btn dialog_btn" onClick="sonotaTraining(SONOTA_CAT.ATEJI_KAKI,this)">当て字・書き</button>
		`;
	} else if (pType == "kotowaza") {
		html = `
			<button class="normal_btn dialog_btn" onClick="sonotaTraining(SONOTA_CAT.KOTOWAZA_YOMI,this)">諺・読み</button>
			<button class="normal_btn dialog_btn" onClick="sonotaTraining(SONOTA_CAT.KOTOWAZA_KAKI,this)">諺・書き</button>
		`;
	} else if (pType == "word") {
		let value = id("sonota_word_input").value;
		if (value == "") {
			alertDialog("リスト空っぽです！");
			return;
		}
		html = `
			<button class="normal_btn dialog_btn" onClick="sonotaTraining(SONOTA_CAT.WORD_YOMI,this)">単語・読み</button>
			<button class="normal_btn dialog_btn" onClick="sonotaTraining(SONOTA_CAT.WORD_KAKI,this)">単語・書き</button>
		`;
	}
	id("sonota_dialog_btn_container").innerHTML = html
	editClass(sonota_dialog, "active");
	sonota_dialog.showModal();
}

function closeSonotaDialog(btn = null) {
	if (push(btn, closeSonotaDialog)) return;
	editClass(id("sonota_dialog"), "active", false);
	id("sonota_dialog").close();
}

function sonotaTraining(pCat, btn = null) {
	if (push(btn, sonotaTraining, pCat)) return;
	
	sonotaCategory = pCat;
	wordTrainingList = [];
	wordIndexTrainingList = [];

	if (equal(sonotaCategory, SONOTA_CAT.ATEJI_YOMI, SONOTA_CAT.ATEJI_KAKI)) {
		wordTrainingList = Word.list.filter(w => w.ateji);
	} else if (equal(sonotaCategory, SONOTA_CAT.KOTOWAZA_YOMI, SONOTA_CAT.KOTOWAZA_KAKI)) {
		wordTrainingList = Word.list.filter(w => w.kotowaza);
	} else if (equal(sonotaCategory, SONOTA_CAT.WORD_YOMI, SONOTA_CAT.WORD_KAKI)) {
		let trainingList = id("sonota_word_input").value;
		trainingList = trainingList.split(";");
		
		let word = null;
		for (let i = 0; i < trainingList.length; i++) {
			word = Word.list.find(w => w.word == trainingList[i]);
			if (word !== undefined) wordTrainingList.push(word);
		}

		if (trainingList.length == 0) {
			alertDialog("リスト空っぽです！");
			currentTraining = TRAINING_TYPE.NONE;
			sonotaCategory = SONOTA_CAT.NONE;
			return;
		}
		if (wordTrainingList.length == 0) {
			alertDialog("単語が見つかりませんでした！");
			currentTraining = TRAINING_TYPE.NONE;
			sonotaCategory = SONOTA_CAT.NONE;
			return;
		}

	}

	wordTrainingList = randomizeList(wordTrainingList);
	wordTrainingList.forEach(w => wordIndexTrainingList.push(w.id));

	switch (pCat) {
		case SONOTA_CAT.ATEJI_YOMI:
		case SONOTA_CAT.KOTOWAZA_YOMI:
		case SONOTA_CAT.WORD_YOMI:
			yomiStart(true);
			break;
		case SONOTA_CAT.ATEJI_KAKI:
		case SONOTA_CAT.KOTOWAZA_KAKI:
		case SONOTA_CAT.WORD_KAKI:
			tangoStart(true);
			break;
	}

	closeSonotaDialog();
}

function kanjiStart(pType, pCat, btn = null) {
	if (push(btn, kanjiStart, pType, pCat)) return;

	switch(pType) {
		case TRAINING_TYPE.SONOTA:
			kanjiTrainingList = [];
			kanjiIndexTrainingList = [];

			currentTraining = TRAINING_TYPE.SONOTA;
			sonotaCategory = pCat;

			switch(sonotaCategory) {
				case SONOTA_CAT.KANJI:
					let trainingList = id("sonota_kanji_input").value;
					
					let kanji = null;
					for (let i = 0; i < trainingList.length; i++) {
						kanji = Kanji.list.find(k => k.kanji == trainingList[i]);
						if (kanji !== undefined) kanjiTrainingList.push(kanji);
					}
					
					if (trainingList.length == 0) {
						alertDialog("リスト空っぽです！");
						currentTraining = TRAINING_TYPE.NONE;
						return;
					}
					if (kanjiTrainingList.length == 0) {
						alertDialog("漢字が見つかりませんでした！");
						currentTraining = TRAINING_TYPE.NONE;
						return;
					}
					break;
				case SONOTA_CAT.ITAIJI:
					kanjiTrainingList = Kanji.list.filter(k => k.itaiji != "");
					break;
			}

			kanjiTrainingList = randomizeList(kanjiTrainingList);
			
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

	if (kankenCategory == KANKEN_CAT.BUSHU) {
		kanjiBushuNext();
	} else {
		next();
	}
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
			kankenCategory = saveData.category;
			switch (kankenCategory) {
				case KANKEN_CAT.WORD_YOMI:
				case KANKEN_CAT.YOJI_YOMI:
				case KANKEN_CAT.WORD_KAKI:
				case KANKEN_CAT.YOJI_KAKI:
					wordTrainingList = [];
					wordIndexTrainingList = [];
					for (let i = 0; i < saveData.wordList.length; i++) {
						wordTrainingList.push(Word.list.find(w => w.id == saveData.wordList[i]));
					}
					wordTrainingList.forEach(w => wordIndexTrainingList.push(w.id));
					trainingListLength = wordTrainingList.length;
					wrongWordList = saveData.wrongList;
					break;
				case KANKEN_CAT.KANJI:
				case KANKEN_CAT.BUSHU:
					kanjiTrainingList = [];
					kanjiIndexTrainingList = [];
					for (let i = 0; i < saveData.kanjiList.length; i++) {
						kanjiTrainingList.push(Kanji.list.find(k => k.id == saveData.kanjiList[i]));
					}
					kanjiTrainingList.forEach(k => kanjiIndexTrainingList.push(k.id));
					trainingListLength = kanjiTrainingList.length;
					wrongList = saveData.wrongList;
					break;
			}
			openCategory("漢検");
			none(id("kanken_container"));
			break;
		case TRAINING_TYPE.BUSHU:
			bushuCategory = saveData.category;
			bushuTrainingList = [];
			bushuIndexTrainingList = [];
			for (let i = 0; i < saveData.wordList.length; i++) {
				bushuTrainingList.push(Kanji.bushuList.find(b => b.id == saveData.wordList[i]));
			}
			bushuTrainingList.forEach(b => bushuIndexTrainingList.push(b.id));
			trainingListLength = bushuTrainingList.length;
			wrongBushuList = saveData.wrongList;

			openCategory("部首");
			none(id("bushu_container"));
			break;
		case TRAINING_TYPE.SONOTA:
			sonotaCategory = saveData.category;
			switch(sonotaCategory) {
				case SONOTA_CAT.KANJI:
				case SONOTA_CAT.ITAIJI:
					kanjiTrainingList = [];
					kanjiIndexTrainingList = [];
					for (let i = 0; i < saveData.kanjiList.length; i++) {
						kanjiTrainingList.push(Kanji.list.find(k => k.id == saveData.kanjiList[i]));
					}
					kanjiTrainingList.forEach(k => kanjiIndexTrainingList.push(k.id));
					trainingListLength = kanjiTrainingList.length;
					wrongList = saveData.wrongList;
					break;
				case SONOTA_CAT.KOTOWAZA_YOMI:
				case SONOTA_CAT.KOTOWAZA_KAKI:
				case SONOTA_CAT.WORD_YOMI:
				case SONOTA_CAT.WORD_KAKI:
				case SONOTA_CAT.ATEJI_YOMI:
				case SONOTA_CAT.ATEJI_KAKI:
					wordTrainingList = [];
					wordIndexTrainingList = [];
					for (let i = 0; i < saveData.wordList.length; i++) {
						wordTrainingList.push(Word.list.find(w => w.id == saveData.wordList[i]));
					}
					wordTrainingList.forEach(w => wordIndexTrainingList.push(w.id));
					trainingListLength = wordTrainingList.length;
					wrongWordList = saveData.wrongList;
					break;
			}
			openCategory("その他");
			none(id("sonota_container"));
			break;
	}

	block(id("training_container"));

	currentTraining = saveData.trainingType; //! Ne pas déplacer
	current = saveData.current-1;

	id("training_progression").innerHTML = (current+1) + "/" + trainingListLength;
	id("progress_bar").style.width = ((current+1) / trainingListLength * 100) + "%";

	switch(currentTraining) {
		case TRAINING_TYPE.KANKEN:
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
					next();
					if (saveData.checkDone) check();
					break;
				case KANKEN_CAT.BUSHU:
					kanjiBushuNext();
					if (saveData.checkDone) kanjiBushuCheck();
					break;
			}
			break;

		case TRAINING_TYPE.BUSHU:
			bushuNext();
			if (saveData.checkDone) bushuCheck();
			break;

		case TRAINING_TYPE.SONOTA: 
			switch(sonotaCategory) {
				case SONOTA_CAT.KANJI:
				case SONOTA_CAT.ITAIJI:
					next();
					if (saveData.checkDone) check();
					break;
				case SONOTA_CAT.KOTOWAZA_YOMI:
					if (saveData.checkDone) {
						yomiNext();
						kotowazaYomiCheck(null);
					} else {
						yomiNext();
					}
					break;
				case SONOTA_CAT.WORD_YOMI:
				case SONOTA_CAT.ATEJI_YOMI:
					if (saveData.checkDone) {
						yomiNext(saveData);
						none(id("check_btn"));
						block(id("next_btn"));
						yomiCheck(null, true, saveData.correct, saveData.incorrectWord);
					} else {
						yomiNext();
					}
					break;
				case SONOTA_CAT.KOTOWAZA_KAKI:
				case SONOTA_CAT.WORD_KAKI:
				case SONOTA_CAT.ATEJI_KAKI:
					if (saveData.checkDone) {
						tangoNext(saveData);
						tangoCheck();
					} else {
						tangoNext();
					}
					break;
			}
			
			break;
	}

}

function yomiStart(pbSonota = false) {

	if (pbSonota) {
		currentTraining = TRAINING_TYPE.SONOTA;
		none(id("sonota_container"));
	} else {
		currentTraining = TRAINING_TYPE.KANKEN;
		none(id("kanken_container"));
	}


	block(id("training_container"));

	current = -1;
	wrongWordList = [];

	id("training_progression").innerHTML = (current+1) + "/" + wordTrainingList.length;
	id("progress_bar").style.width = "0%";

	yomiNext();
}

function yomiNext(pSaveData = null) {
	current++;
	const bkotowazaYomi = (currentTraining == TRAINING_TYPE.SONOTA && sonotaCategory == SONOTA_CAT.KOTOWAZA_YOMI);

	const currentCategory = (currentTraining == TRAINING_TYPE.KANKEN) ? kankenCategory : sonotaCategory;
	let obj;
	if (bkotowazaYomi) {
		obj = {current: current, checkDone: false, wordList: wordIndexTrainingList, wrongList: wrongWordList, trainingType: currentTraining, category: currentCategory };
	} else {
		obj = {current: current, checkDone: pSaveData?.checkDone, wordList: wordIndexTrainingList, wrongList: wrongWordList, trainingType: currentTraining, category: currentCategory, correct: pSaveData?.correct, incorrectWord: pSaveData?.incorrectWord };
	}
	saveTraining(obj);

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


	
	let yomiCheckFunc = "yomiCheck(this)";
	if (!bkotowazaYomi) {
		if (w.wRef != null) {
			html += `<div id="yomi_training_imi">[${w.wRef.word}] ${w.wRef.imi}</div>`;
		} else {
			html += `<div id="yomi_training_imi">${w.imi}</div>`;
		}
		html += keyboard_html;
	} else {
		html += `<div id="tango_training_imi" class="normal_btn" onClick="showTangoImi(this)">意味確認</div>`;
		html += `<div id="kotowaza_training_yomi"></div>`;
		yomiCheckFunc = "kotowazaYomiCheck(this)";
	}

	html += `
		<div class="training_check_zone">
			<div id="check_btn_container">
				<button id="check_btn" class="normal_btn" onClick="${yomiCheckFunc}">確認</button>
				<button id="next_btn" class="normal_btn" onClick="nextBtn(this)">次へ</button>
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

	if (!bkotowazaYomi) activeKeyboard();
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
	const keyboard_result = id("keyboard_result");
	keyboard_result.innerHTML = wordTrainingList[current].yomiRaw;
	none(keyboard_part);
	none(keyboard_input);

	setTimeout(() => {
		block(keyboard_result);
	}, 50);

	let yomiRaw = toHira(wordTrainingList[current].yomiRaw);
	
	const possibleAnswers = yomiRaw.split("、");
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
		const currentCategory = (currentTraining == TRAINING_TYPE.KANKEN) ? kankenCategory : sonotaCategory;
		const obj = {current: current, checkDone: true, wordList: wordIndexTrainingList, wrongList: wrongWordList, trainingType: currentTraining, category: currentCategory, correct: bCorrect, incorrectWord: bCorrect ? "" : keyboard_input.value };
		saveTraining(obj);
	}

}

function kotowazaYomiCheck(btn = null) {
	if (btn != null) {
		if (btn.classList.contains("active")) return;
		pushBtn(btn);
		setTimeout(() => {
			pushBtn(btn,false);
			none(btn);
			block(id("next_btn"));
		}, 100);
	}

	showTangoImi();
	id("kotowaza_training_yomi").innerHTML = wordTrainingList[current].yomi;

	none(id("check_btn_container"));
	flex(id("maru_batsu_btns"));

	id("training_progression").innerHTML = (current+1) + "/" + wordTrainingList.length;
	id("progress_bar").style.width = ((current+1) / wordTrainingList.length * 100) + "%";

	const currentCategory = SONOTA_CAT.KOTOWAZA_YOMI;
	const obj = {current: current, checkDone: true, wordList: wordIndexTrainingList, wrongList: wrongWordList, trainingType: currentTraining, category: currentCategory };
	saveTraining(obj);
}

function tangoStart(pbSonota = false) {
	if (pbSonota) {
		currentTraining = TRAINING_TYPE.SONOTA;
		none(id("sonota_container"));
	} else {
		currentTraining = TRAINING_TYPE.KANKEN;
		none(id("kanken_container"));
	}

	block(id("training_container"));

	current = -1;
	wrongWordList = [];

	id("training_progression").innerHTML = (current+1) + "/" + wordTrainingList.length;
	id("progress_bar").style.width = "0%";

	tangoNext();
}

function tangoNext(pSaveData = null) {
	current++;
	const currentCategory = (currentTraining == TRAINING_TYPE.KANKEN) ? kankenCategory : sonotaCategory;
	const obj = {current: current, checkDone: pSaveData?.checkDone, wordList: wordIndexTrainingList, wrongList: wrongWordList, trainingType: currentTraining, category: currentCategory, correct: pSaveData?.correct, incorrectWord: pSaveData?.incorrectWord };
	saveTraining(obj);

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

	const currentCategory = (currentTraining == TRAINING_TYPE.KANKEN) ? kankenCategory : sonotaCategory;
	const obj = {current: current, checkDone: true, wordList: wordIndexTrainingList, wrongList: wrongWordList, trainingType: currentTraining, category: currentCategory };
	saveTraining(obj);
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
	pushBtn(btn);
	setTimeout(() => {
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
	const currentCategory = (currentTraining == TRAINING_TYPE.KANKEN) ? kankenCategory : sonotaCategory;
	const obj = {current: current, checkDone: false, kanjiList: kanjiIndexTrainingList, wrongList: wrongList, trainingType: currentTraining, category: currentCategory };
	saveTraining(obj);

	const training_zone = id("training_zone");
	training_zone.innerHTML = "";

	//? End
	if (current >= kanjiTrainingList.length) {
		displayEndTraining();
		return;
	}

	let itaijiNb = "";
	if (kanjiTrainingList[current].itaiji.length > 1) itaijiNb = " (" + kanjiTrainingList[current].itaiji.length + ")";

	let html =
	`
	<div id="training_kanji_${kanjiTrainingList[current].id}" class="training_kanji">?</div>
	<div id="training_itaiji">${kanjiTrainingList[current].itaiji != "" ? `?${itaijiNb}` : "-"}</div>
	<div id="training_onyomi">${kanjiTrainingList[current].onYomi}</div>
	<div id="training_kunyomi">${kanjiTrainingList[current].kunYomi}</div>
	<div id="training_imi">${kanjiTrainingList[current].imi}</div>
	<div id="training_wordlist">
	`;
	let classLast = "";
	kanjiTrainingList[current].wordList.forEach((i,index)=> {
		classLast = "";
		if (index == kanjiTrainingList[current].wordList.length-1) classLast = "last"
		html += `
			<div class="word_result ${classLast}" id="word_id_${Word.list[i].id}">
				<div class="word_result_yomi_word">
					<div class="word_result_yomi">${Word.list[i].yomi}</div>
					<div class="word_result_word hidden_words">${Word.list[i].word.replaceAll(kanjiTrainingList[current].kanji, '<span class="hidden_kanji">？</span>')}</div>
					<div class="word_result_imi">${Word.list[i].imi}</div>
				</div>
			</div>
		`;
		html += ``;
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

	const currentCategory = (currentTraining == TRAINING_TYPE.KANKEN) ? kankenCategory : sonotaCategory;
	const obj = {current: current, checkDone: true, kanjiList: kanjiIndexTrainingList, wrongList: wrongList, trainingType: currentTraining, category: currentCategory };
	saveTraining(obj);
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

	if ((currentTraining == TRAINING_TYPE.SONOTA && equal(sonotaCategory, SONOTA_CAT.KANJI, SONOTA_CAT.ITAIJI)) 
		|| (currentTraining == TRAINING_TYPE.KANKEN && kankenCategory == KANKEN_CAT.KANJI)) {
		if (!pbMaru) wrongList += kanjiTrainingList[current].kanji;
		next();
	} else if (currentTraining == TRAINING_TYPE.KANKEN && kankenCategory == KANKEN_CAT.BUSHU) {
		if (!pbMaru) wrongList += kanjiTrainingList[current].kanji;
		kanjiBushuNext();
	} else if ((currentTraining == TRAINING_TYPE.SONOTA && equal(sonotaCategory, SONOTA_CAT.ATEJI_KAKI, SONOTA_CAT.KOTOWAZA_KAKI, SONOTA_CAT.WORD_KAKI)) 
		|| (currentTraining == TRAINING_TYPE.KANKEN && equal(kankenCategory, KANKEN_CAT.WORD_KAKI, KANKEN_CAT.YOJI_KAKI))) {
		if (!pbMaru) wrongWordList.push(wordTrainingList[current].id);
		tangoNext();
	} else if (currentTraining == TRAINING_TYPE.SONOTA && sonotaCategory == SONOTA_CAT.KOTOWAZA_YOMI) {
		if (!pbMaru) wrongWordList.push(wordTrainingList[current].id);
		yomiNext();
	} else if (currentTraining == TRAINING_TYPE.BUSHU && bushuCategory == BUSHU_CAT.BUSHU_YOMI) {
		if (!pbMaru) wrongBushuList.push(bushuTrainingList[current].id);
		bushuNext();
	}
}

function displayEndTraining() {
	bTrainingEnd = true;
	const training_zone = id("training_zone");
	let html = "";
	let goodLength;
	let trainingLength;
	let bEndTypeKanji = false;
	let bEndTypeWord = false;
	switch(currentTraining) {
		case TRAINING_TYPE.KANKEN:
			switch(kankenCategory) {
				case KANKEN_CAT.WORD_YOMI:
				case KANKEN_CAT.WORD_KAKI:
				case KANKEN_CAT.YOJI_YOMI:
				case KANKEN_CAT.YOJI_KAKI:
					bEndTypeWord = true;
					break;
				case KANKEN_CAT.KANJI:
				case KANKEN_CAT.BUSHU:
					bEndTypeKanji = true;
					break;
			}
			break;
		case TRAINING_TYPE.BUSHU:
			goodLength = bushuTrainingList.length-wrongBushuList.length;
			trainingLength = bushuTrainingList.length;

			if (wrongBushuList.length > 0) {
				let bushuList = "";
				let bushuIDList = "";
				wrongBushuList.forEach(id => {
					bushuList += Kanji.bushuList[id-1].bushu + "、";
					bushuIDList += id + ";";
				});
				bushuList = bushuList.slice(0, -1);
				bushuIDList = bushuIDList.slice(0, -1);
				html = `
				<div id="training_result">
					<div id="training_mark">
						<p>${goodLength}/${trainingLength}</p>
					</div>
					<div class="training_wrong_list_container">
						<div class="training_wrong_title">WRONG</div>
						<div class="bushu_wrong_list">${bushuList}</div>
						<div class="bushu_id_wrong_list">${bushuIDList}</div>
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
		case TRAINING_TYPE.SONOTA: 
			if (equal(sonotaCategory, SONOTA_CAT.KANJI, SONOTA_CAT.ITAIJI)) {
				bEndTypeKanji = true;
			} else if (equal(sonotaCategory, SONOTA_CAT.ATEJI_KAKI, SONOTA_CAT.ATEJI_YOMI, SONOTA_CAT.KOTOWAZA_KAKI, SONOTA_CAT.KOTOWAZA_YOMI, SONOTA_CAT.WORD_KAKI, SONOTA_CAT.WORD_YOMI)) {
				bEndTypeWord = true;
			}
			break;
	}

	if (bEndTypeKanji) {
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
								onClick="copyWrongList(this)">Copy</button>
							<button id="training_see_btn" class="normal_btn training_copy_see_btns"
								onClick="seeWrongList(this)">See</button>
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
	} else if (bEndTypeWord) {
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
							<button id="training_see_btn" class="normal_btn training_copy_see_btns" onClick="seeWrongList(this)">See</button>
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
			block(id("kanken_container"));
			break;
		case TRAINING_TYPE.BUSHU:
			flex(id("bushu_container"));
			break;
		case TRAINING_TYPE.SONOTA:
			flex(id("sonota_container"));
			break;
	}

	trainingResetAll();
}

function push(btn = null, f = null, ...pArgs) {
	if (btn != null) {
		pushBtn(btn);
		setTimeout(() => {
			pushBtn(btn,false);
			if (pArgs.length > 0) {
				if (pArgs.length == 1) {
					f(pArgs[0]);
				} else {
					f(pArgs[0], pArgs[1]);
				}
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

function copyWrongList(btn = null) {
	if (push(btn, copyWrongList)) return;
	
	let list = id("training_wrong_list").innerText;
	copyToClipboard(list);
}

function seeWrongList(btn = null) {

	if (push(btn, seeWrongList)) return;

	changeSection("main");
	let bTypeKanji = false;
	let bTypeWord = false;
	switch(currentTraining) {
		case TRAINING_TYPE.KANKEN:
			switch(kankenCategory) {
				case KANKEN_CAT.WORD_YOMI:
				case KANKEN_CAT.WORD_KAKI:
				case KANKEN_CAT.YOJI_YOMI:
				case KANKEN_CAT.YOJI_KAKI:
					bTypeWord = true;
					break;
				case KANKEN_CAT.KANJI:
				case KANKEN_CAT.BUSHU:
					bTypeKanji = true;
					break;
			}
			break;
		case TRAINING_TYPE.SONOTA:
			bTypeKanji = equal(sonotaCategory, SONOTA_CAT.KANJI, SONOTA_CAT.ITAIJI);
			bTypeWord = equal(sonotaCategory, SONOTA_CAT.ATEJI_KAKI, SONOTA_CAT.ATEJI_YOMI, SONOTA_CAT.KOTOWAZA_KAKI, SONOTA_CAT.KOTOWAZA_YOMI, SONOTA_CAT.WORD_KAKI, SONOTA_CAT.WORD_YOMI);
			break;
	}
	if (bTypeKanji) {
		const list = id("training_wrong_list").innerText;
		search(list);
	} else if (bTypeWord) {
		foundKanjiList = [];
		includingWordArr = [];
		exactWordArr = [];
		wrongWordList.forEach(id => {
			exactWordArr.push(Word.list[id]);
		});
		displayResult();
	}
}

function saveTraining(obj) {
	localStorage.setItem(kanjiapp_training, JSON.stringify(obj));
}


function bushuStart(pbAll = true) {

	bushuTrainingList = [];
	bushuIndexTrainingList = [];

	currentTraining = TRAINING_TYPE.BUSHU;
	bushuCategory = BUSHU_CAT.BUSHU_YOMI;

	if (pbAll) {
		bushuTrainingList = randomizeList(Kanji.bushuList);
	} else {
		const bushu_input = id("bushu_input");
		if (bushu_input.value == "") {
			alertDialog("リスト空っぽです！");
			currentTraining = TRAINING_TYPE.NONE;
			bushuCategory = BUSHU_CAT.NONE;
			return;
		} else {
			let list = bushu_input.value.split(";");
			let bushu = null;
			for (let i = 0; i < list.length; i++) {
				bushu = Kanji.bushuList.find(b => b.id == list[i]);
				if (bushu != null) {
					bushuTrainingList.push(bushu);
				}
			}
			if (bushuTrainingList.length == 0) {
				alertDialog("部首が見つかりませんでした！");
				currentTraining = TRAINING_TYPE.NONE;
				bushuCategory = BUSHU_CAT.NONE;
				return;
			}
			bushuTrainingList = randomizeList(bushuTrainingList);
		}
	}

	none(id("bushu_container"));

	bushuTrainingList.forEach(w => bushuIndexTrainingList.push(w.id));

	block(id("training_container"));

	current = -1;
	wrongBushuList = [];

	id("training_progression").innerHTML = (current+1) + "/" + bushuTrainingList.length;
	id("progress_bar").style.width = "0%";

	bushuNext();
}

function bushuNext() {
	current++;
	const currentCategory = bushuCategory;
	const obj = {current: current, checkDone: false, wordList: bushuIndexTrainingList, wrongList: wrongBushuList, trainingType: currentTraining, category: currentCategory };
	saveTraining(obj);

	const training_zone = id("training_zone");
	editClass(training_zone, "yomi");

	//? End
	if (current >= bushuTrainingList.length) {
		displayEndTraining();
		return;
	}

	const b = bushuTrainingList[current];
	training_zone.innerHTML = "";
	let html = `
		<div id="yomi_training_word" class="yomi_training_word">${b.bushu}</div>
		<div id="bushu_yomi_answer_${current}" class="bushu_yomi_answer"></div>
		<div id="bushu_kanji_list"></div>

	`;

	html += `
		<div class="training_check_zone">
			<div id="check_btn_container">
				<button id="check_btn" class="normal_btn" onClick="bushuCheck()">確認</button>
				<button id="next_btn" class="normal_btn" onClick="nextBtn(this)">次へ</button>
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

function bushuCheck(btn = null) {

	if (push(btn, bushuCheck)) return;

	const bushuAnswer = id("bushu_yomi_answer_" + current);
	bushuAnswer.innerHTML = bushuTrainingList[current].yomi;
	const answerKanjiList = Kanji.kanjiByBushuList.filter(k => k.by == bushuTrainingList[current].id)[0].kanjiList;
	if (answerKanjiList.length > 0) {
		let html = "";
		answerKanjiList.forEach(k => {
			html += k.kanji;
		});
		id("bushu_kanji_list").innerHTML = html;
		flex(id("bushu_kanji_list"));
	}
	
	none(id("check_btn_container"));
	flex(id("maru_batsu_btns"));

	id("training_progression").innerHTML = (current+1) + "/" + bushuTrainingList.length;
	id("progress_bar").style.width = ((current+1) / bushuTrainingList.length * 100) + "%";


	const currentCategory = bushuCategory;
	const obj = {current: current, checkDone: true, wordList: bushuIndexTrainingList, wrongList: wrongBushuList, trainingType: currentTraining, category: currentCategory };
	saveTraining(obj);
}

function kanjiBushuNext() {
	current++;
	const currentCategory = (currentTraining == TRAINING_TYPE.KANKEN) ? kankenCategory : sonotaCategory;
	const obj = {current: current, checkDone: false, kanjiList: kanjiIndexTrainingList, wrongList: wrongList, trainingType: currentTraining, category: currentCategory };
	saveTraining(obj);

	const training_zone = id("training_zone");
	editClass(training_zone, "yomi");
	training_zone.innerHTML = "";

	//? End
	if (current >= kanjiTrainingList.length) {
		displayEndTraining();
		return;
	}

	let html = `
		<div id="training_kanji_${kanjiTrainingList[current].id}" class="training_kanji">${kanjiTrainingList[current].kanji}</div>
		<div id="bushu_answer"></div>
	`;

	html += `
		<div class="training_check_zone">
			<div id="check_btn_container">
				<button id="check_btn" class="normal_btn" onClick="kanjiBushuCheck(this)">確認</button>
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

function kanjiBushuCheck(btn = null) {
	if (push(btn, kanjiBushuCheck)) return;

	const kanji = id("training_kanji_" + kanjiTrainingList[current].id);
	id("bushu_answer").innerHTML = `
		<div class="bushu_yomi_answer">${Kanji.bushuList[kanjiTrainingList[current].bushu-1].bushu}</div>
		<div class="bushu_yomi_answer">${Kanji.bushuList[kanjiTrainingList[current].bushu-1].yomi}</div>
	`;

	none(id("check_btn_container"));
	flex(id("maru_batsu_btns"));

	id("training_progression").innerHTML = (current+1) + "/" + kanjiTrainingList.length;
	id("progress_bar").style.width = ((current+1) / kanjiTrainingList.length * 100) + "%";

	const currentCategory = kankenCategory;
	const obj = {current: current, checkDone: true, kanjiList: kanjiIndexTrainingList, wrongList: wrongList, trainingType: currentTraining, category: currentCategory };
	saveTraining(obj);
}