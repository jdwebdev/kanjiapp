// const slide_test = id("slide_test");
// none(slide_test);
// slide_test.style.left = window.innerWidth-1 + "px";

function slideTest(pType) {
	// log("type: " + pType);
	// unset(slide_test);
	// let width = 1;
	// let position = window.innerWidth-1;
	// let bStop = false;
	// let interval = setInterval(() => {
	// 	if (!bStop) {
	// 		if (width >= window.innerWidth) {
	// 			log("???")
	// 			width = window.innerWidth;
	// 			position = 0;
	// 			clearInterval(interval);
	// 		}

	// 		slide_test.style.left = position + "px";
	// 		slide_test.style.width = width + "px";
	// 		width += 15;
	// 		position -= 15;
	// 	}
	// }, 10);


}

let bMain = true;
const TRAINING_TYPE = Object.freeze({
	KANKEN: 0,
	BUSHU: 1,
	SONOTA: 2
});
let currentTraining = -1;
let current = -1;
let kanjiTrainingList = [];
let wrongList = "";


function openCategory(pType) {
	if (currentTraining > -1) return;

	const buttons = document.getElementsByClassName("training_type_btn");
	log(pType);
	for (let i = 0; i < buttons.length; i++) {
		if (bMain) {
			if (buttons[i].innerText == pType) {
				editClass(buttons[i], "clicked_training_type_btn");
				buttons[i].innerHTML = `<span class="triangle triangle_left"></span>` + pType + `<span class="triangle triangle_right"></span>`;
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
		switch(pType) {
			case "漢検":
				block(id("kanken_container"));
				break;
			case "部首":
				break;
			case "その他":
				flex(id("sonota_container"));
				break;
		}
	} else {
		none(id("kanken_container"));
		none(id("sonota_container"));
		none(id("training_container"));
	}
	bMain = !bMain;
}

function sonotaStart() {
	currentTraining = TRAINING_TYPE.SONOTA;
	let trainingList = id("sonota_input").value;
	let bOrder = id("sonota_order_box").checked;
	log(trainingList);
	kanjiTrainingList = [];
	
	for (let i = 0; i < trainingList.length; i++) {
		kanjiTrainingList.push(Kanji.list.find(k => k.kanji == trainingList[i]));
	}
	
	log(kanjiTrainingList);

	none(id("sonota_container"));
	block(id("training_container"));
	
	current = -1;
	wrongList = "";
	next();
}

function next() {
	current++;
	const training_zone = id("training_zone");
	let html = "";

	if (current >= kanjiTrainingList.length) {
		log("STOP !!!!");
		log(wrongList);

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
	log("next()");

	id("training_progression").innerHTML = (current+1) + "/" + kanjiTrainingList.length;
	id("progress_bar").style.width = ((current+1) / kanjiTrainingList.length * 100) + "%";

	
	
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
}

function maruBatsu(pbMaru) {
	if (pbMaru) {

	} else {
		wrongList += kanjiTrainingList[current].kanji;
	}
	none(id("maru_batsu_btns"));
	next();
}

function trainingBack() {
	switch(currentTraining) {
		case TRAINING_TYPE.SONOTA:
			flex(id("sonota_container"));
			none(id("training_container"));
			break;
	}
	currentTraining = -1;
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