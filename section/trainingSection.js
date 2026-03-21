let bMain = true;
const TRAINING_TYPE = Object.freeze({
	NONE: -1,
	KANKEN: 0,
	BUSHU: 1,
	SONOTA: 2
});
const KANKEN_CAT = Object.freeze({
	NONE: -1,
	YOMI: 0,
	TANGO: 1,
	KANJI: 2,
	BUSHU: 3,
	YOJI: 4
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
		none(id("yojijukugo_btn"));
	} else {
		unset(id("yojijukugo_btn"));
	}

	editClass(btn, "active");
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

	// if (btn != null) editClass(btn, "active", true);
	if (btn != null) pushBtn(btn);

	editClass(id("kanken_dialog"), "active", false);
	setTimeout(() => {
		if (btn != null) pushBtn(btn,false);
		id("kanken_dialog").close();
		// if (btn != null) editClass(btn, "active", false);
	}, 100);
}
function prepareKankenTest(pCategory, btn = null) {
	if (btn != null) {
		// editClass(btn, "active");
		pushBtn(btn);
		setTimeout(() => {
			// editClass(btn, "active", false);
			pushBtn(btn,false);
			prepareKankenTest(pCategory);
		}, 100);
		return;
	}

	kankenCategory = pCategory;
	kanjiTrainingList = [];
	wordTrainingList = [];
	switch (kankenCategory) {
		case KANKEN_CAT.YOMI:
			wordTrainingList = Word.list.filter(w => w.kanken == kankenLvl);
			wordTrainingList = randomizeList(wordTrainingList);
			wordTrainingList.forEach(w => {
				wordIndexTrainingList.push(w.id);
			});
			closeKankenDialog();
			yomiStart();
			break;
	}
}

function kanjiStart(pType, btn = null) {
	if (btn != null) {
		// editClass(btn, "active");
		pushBtn(btn);
		setTimeout(() => {
			// editClass(btn, "active", false);
			pushBtn(btn,false);
			kanjiStart(pType);
		}, 100);
		return;
	}

	kanjiTrainingList = [];
	kanjiIndexTrainingList = [];
	
	//! SONOTA ---------------------
	if (pType == "sonota") {
		currentTraining = TRAINING_TYPE.SONOTA;
		let trainingList = id("sonota_input").value;
		let bOrder = id("sonota_order_box").checked;
		
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
	}
	//! ----------------------------

	kanjiTrainingList.forEach(k => {
		kanjiIndexTrainingList.push(k.id);
	});

	block(id("training_container"));
	
	current = -1;
	wrongList = "";
	
	id("training_progression").innerHTML = (current+1) + "/" + kanjiTrainingList.length;
	id("progress_bar").style.width = "0%";

	next();
}
function trainingContinue(btn = null) {

	if (btn != null) {
		// editClass(btn, "active");
		pushBtn(btn);
		setTimeout(() => {
			// editClass(btn, "active", false);
			pushBtn(btn,false);
			trainingContinue();
		}, 100);
		return;
	}

	none(id("training_continue"));
	let saveData = localStorage.getItem(kanjiapp_training);
	if (saveData == null) return;

	saveData = JSON.parse(saveData);

	let trainingListLength;

	switch(saveData.trainingType) {
		case TRAINING_TYPE.KANKEN:
			//? KANKEN START()
			for (let i = 0; i < saveData.wordList.length; i++) {
				wordTrainingList.push(Word.list.find(w => w.id == saveData.wordList[i]));
			}
			wordTrainingList.forEach(w => {
				wordIndexTrainingList.push(w.id);
			});
			trainingListLength = wordTrainingList.length;
			openCategory("漢検");
			none(id("kanken_container"));
			wrongWordList = saveData.wrongList;
			break;
		case TRAINING_TYPE.BUSHU:
			break;
		case TRAINING_TYPE.SONOTA: 
			//? SONOTA START()
			for (let i = 0; i < saveData.kanjiList.length; i++) {
				kanjiTrainingList.push(Kanji.list.find(k => k.id == saveData.kanjiList[i]));
			}
			kanjiTrainingList.forEach(k => {
				kanjiIndexTrainingList.push(k.id);
			});
			trainingListLength = kanjiTrainingList.length;
			openCategory("その他");
			none(id("sonota_container"));
			wrongList = saveData.wrongList;
			break;
	}

	currentTraining = saveData.trainingType;

	block(id("training_container"));

	current = saveData.current-1;

	id("training_progression").innerHTML = (current+1) + "/" + trainingListLength;
	id("progress_bar").style.width = ((current+1) / trainingListLength * 100) + "%";

	switch(saveData.trainingType) {
		case TRAINING_TYPE.KANKEN:
			if (saveData.checkDone) {
				yomiNext(saveData);

				none(id("check_btn"));
				block(id("next_btn"));

				yomiCheck(null, true, saveData.correct, saveData.incorrectWord);
			} else {
				yomiNext();
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
	let obj = {current: current, checkDone: pSaveData?.checkDone, wordList: wordIndexTrainingList, wrongList: wrongWordList, trainingType: currentTraining, category: KANKEN_CAT.YOMI, correct: pSaveData?.correct, incorrectWord: pSaveData?.incorrectWord };
	localStorage.setItem(kanjiapp_training, JSON.stringify(obj));

	const training_zone = id("training_zone");

	//? End
	if (current >= wordTrainingList.length) {
		displayEndTraining();
		return;
	}

	editClass(training_zone, "yomi");
	
	training_zone.innerHTML = "";
	let html =
	`
	<div id="yomi_training_word_${wordTrainingList[current].id}" class="yomi_training_word">${wordTrainingList[current].word}</div>
	<div id="yomi_training_imi">${wordTrainingList[current].imi}</div>
	`;
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
		// editClass(btn, "active");
		pushBtn(btn);
		setTimeout(() => {
			// editClass(btn, "active", false);
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
		let obj = {current: current, checkDone: true, wordList: wordIndexTrainingList, wrongList: wrongWordList, trainingType: currentTraining, category: KANKEN_CAT.YOMI, correct: bCorrect, incorrectWord: bCorrect ? "" : keyboard_input.value };
		localStorage.setItem(kanjiapp_training, JSON.stringify(obj))
	}

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

//! next() SONOTA == KANKEN_KANJI
function next() {

	current++;
	let obj = {current: current, checkDone: false, kanjiList: kanjiIndexTrainingList, wrongList: wrongList, trainingType: currentTraining };
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

//! check() SONOTA == KANKEN_KANJI
function check(btn = null) {
	if (btn != null) {
		// editClass(btn, "active");
		pushBtn(btn);
		setTimeout(() => {
			// editClass(btn, "active", false);
			pushBtn(btn,false);
			check();
		}, 100);
		return;
	}

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

	let obj = {current: current, checkDone: true, kanjiList: kanjiIndexTrainingList, wrongList: wrongList, trainingType: currentTraining };
	localStorage.setItem(kanjiapp_training, JSON.stringify(obj));
}

//! maruBatsu() SONOTA == KANKEN_KANJI
function maruBatsu(pbMaru, btn = null) {
	if (btn != null) {
		// editClass(btn, "active");
		pushBtn(btn);
		if (pbMaru) {
			editClass(id("maru_btn_maru"), "active");
		} else {
			editClass(id("batsu_btn_cross_left"), "active");
			editClass(id("batsu_btn_cross_right"), "active");
		}
		
		setTimeout(() => {
			// editClass(btn, "active", false);
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
	if (pbMaru) {

	} else {
		wrongList += kanjiTrainingList[current].kanji;
	}
	none(id("maru_batsu_btns"));
	next();
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
				case KANKEN_CAT.YOMI:
					goodLength = wordTrainingList.length-wrongWordList.length;
					trainingLength = wordTrainingList.length;
					const copyBtn = `<button id="training_copy_btn" class="normal_btn training_copy_see_btns" onClick="copyWrongList()">Copy</button>`
					
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
						if (kankenCategory != KANKEN_CAT.YOMI) html += copyBtn; //! Temporaire
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
				case KANKEN_CAT.KANKEN_TANGO:
					break;
				case KANKEN_CAT.KANKEN_KANJI:
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
		// editClass(btn, "active");
		pushBtn(btn);
		editClass(id("training_back_arrow_1"), "active");
		editClass(id("training_back_arrow_3"), "active");
		setTimeout(() => {
			// editClass(btn, "active", false);
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
	
	if (btn != null) {
		// editClass(btn, "active");
		pushBtn(btn);
		
		setTimeout(() => {
			// editClass(btn, "active", false);
			pushBtn(btn,false);

			trainingBack(pAction);
		}, 100);
		return;
	}

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

function localSaveData() {
	return (localStorage.getItem(kanjiapp_training) != null)
}

function deleteTrainingData(btn = null) {
	if (btn != null) {
		// editClass(btn, "active");
		pushBtn(btn);
		setTimeout(() => {
			// editClass(btn, "active", false);
			pushBtn(btn,false);
			deleteTrainingData();
		}, 100);
		return;
	}
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
			if (kankenCategory == KANKEN_CAT.YOMI) {
				foundKanjiList = [];
				includingWordArr = [];
				exactWordArr = [];
				wrongWordList.forEach(id => {
					exactWordArr.push(Word.list[id]);
				});
				displayResult();
			}
			break;
		case TRAINING_TYPE.SONOTA:
			let list = id("training_wrong_list").innerText;
			search(list);
			break;
	}
}