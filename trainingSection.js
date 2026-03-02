let bMain = true;
const TRAINING_TYPE = Object.freeze({
	KANKEN: 0,
	BUSHU: 1,
	SONOTA: 2
});
let currentTraining = -1;
let current = -1;
let kanjiTrainingList = [];
let kanjiIndexTrainingList = [];
let wrongList = "";
const kanjiapp_training = "kanjiapp_training";


function openCategory(pCategory) {
	if (currentTraining > -1) return;

	const buttons = document.getElementsByClassName("training_type_btn");
	// log(pCategory);
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

function sonotaStart() {
	currentTraining = TRAINING_TYPE.SONOTA;
	let trainingList = id("sonota_input").value;
	let bOrder = id("sonota_order_box").checked;
	// log(trainingList);
	kanjiTrainingList = [];
	kanjiIndexTrainingList = [];
	
	for (let i = 0; i < trainingList.length; i++) {
		kanjiTrainingList.push(Kanji.list.find(k => k.kanji == trainingList[i]));
	}
	kanjiTrainingList.forEach(k => {
		kanjiIndexTrainingList.push(k.id);
	});
	
	// log(kanjiTrainingList);
	// log(kanjiIndexTrainingList);

	none(id("sonota_container"));
	block(id("training_container"));
	
	current = -1;
	wrongList = "";
	
	id("training_progression").innerHTML = (current+1) + "/" + kanjiTrainingList.length;
	id("progress_bar").style.width = "0%";

	next();
}

function trainingContinue() {
	none(id("training_continue"));
	let saveData = localStorage.getItem(kanjiapp_training);
	if (saveData == null) return;

	saveData = JSON.parse(saveData);
	// log(saveData);

	//? SONOTA START()
	for (let i = 0; i < saveData.kanjiList.length; i++) {
		kanjiTrainingList.push(Kanji.list.find(k => k.id == saveData.kanjiList[i]));
	}
	kanjiTrainingList.forEach(k => {
		kanjiIndexTrainingList.push(k.id);
	});

	switch(saveData.trainingType) {
		case TRAINING_TYPE.SONOTA: 
			openCategory("その他");
			none(id("sonota_container"));
		break;
	}

	currentTraining = saveData.trainingType;

	block(id("training_container"));

	current = saveData.current-1;
	wrongList = saveData.wrongList;

	id("training_progression").innerHTML = (current+1) + "/" + kanjiTrainingList.length;
	id("progress_bar").style.width = ((current+1) / kanjiTrainingList.length * 100) + "%";

	if (saveData.checkDone) {
		next();
		check();
	} else {
		next();
	}

}

function next() {
	current++;
	let obj = {current: current, checkDone: false, kanjiList: kanjiIndexTrainingList, wrongList: wrongList, trainingType: currentTraining };
	localStorage.setItem(kanjiapp_training, JSON.stringify(obj));

	const training_zone = id("training_zone");
	let html = "";

	if (current >= kanjiTrainingList.length) {
		// log("STOP !!!!");
		// log(wrongList);

		if (wrongList.length != "") {
			html = `
				<div id="training_result">
					<div id="training_mark">
						<p>${kanjiTrainingList.length-wrongList.length}/${kanjiTrainingList.length}</p>
					</div>
					<div class="training_wrong_list_container">
						<div class="training_wrong_title">WRONG</div>
						<p id="training_wrong_list">${wrongList}</p>
						<div class="training_btns">
							<button id="training_copy_btn" class="training_sopy_see_btns"
								onClick="copyWrongList()">Copy</button>
							<button id="training_see_btn" class="training_sopy_see_btns"
								onClick="seeWrongList()">See</button>
						</div>
					</div>
				</div>
			`;
		} else {
			html = `
				<div id="training_result">
					<div id="training_mark">
						<p>${kanjiTrainingList.length-wrongList.length}/${kanjiTrainingList.length}</p>
					</div>
					<div class="training_perfect">PERFECT!</div>
				</div>
			`;
		}

		training_zone.innerHTML = html;

		return;
	}
	// log("next()");


	
	
	training_zone.innerHTML = "";
	html =
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
				<button id="check_btn" onClick="check()">確認</button>
			</div>
			<div id="maru_batsu_btns" style="display:none">
				<button id="batsu_btn" onClick="maruBatsu(false)">✘</button>
				<button id="maru_btn" onClick="maruBatsu(true)">〇</button>
			</div>
		</div>
	`;
	training_zone.innerHTML = html;

}

function check(pThis) {
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

function maruBatsu(pbMaru) {
	if (pbMaru) {

	} else {
		wrongList += kanjiTrainingList[current].kanji;
	}
	none(id("maru_batsu_btns"));
	next();
}

function trainingBackBtn() {
	id("dialog").showModal();
}

function trainingBack(pAction) {
	id("dialog").close();
	switch (pAction) {
		case 0:
			localStorage.removeItem(kanjiapp_training);
			break;
		case 1:
			// let obj = {current: current, checkDone: false, kanjiList: kanjiIndexTrainingList, wrongList: wrongList, trainingType: currentTraining };
			// localStorage.setItem(kanjiapp_training, JSON.stringify(obj));
			break;
		default: 
			
			return;
	}
	none(id("training_container"));
	switch(currentTraining) {
		case TRAINING_TYPE.SONOTA:
			flex(id("sonota_container"));
			break;
	}
	currentTraining = -1;
}

function localSaveData() {
	return (localStorage.getItem(kanjiapp_training) != null)
}

function deleteTrainingData() {
	localStorage.removeItem(kanjiapp_training);
	none(id("training_continue"));
}

function copyWrongList() {
	let list = id("training_wrong_list").innerText;
	copyToClipboard(list);
}

function seeWrongList() {
	let list = id("training_wrong_list").innerText;
	changeSection("main");
	search(list);
}