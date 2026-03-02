
let log = console.log.bind();

const main_section = id("main_section");
const training_section = id("training_section");
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
const kana = h+k;

let currentSection = "main";
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
id("header").addEventListener("click", e => {
	if (bModal) closeModal();
});
search_input.addEventListener("click", e => {
	// log("input click");
	bSearching = true;
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

	e.stopPropagation();
});

search_btn.addEventListener("click", e => {
	// log("search btn click"); // 1
	if (bSearching) {
		bSearching = false;
		none(stop_search_btn);
		unset(search_btn);
		// search_input.value = "";
		// log(search_input.value);
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

function startApp() {
	none(id("loading_container"));
	id("search_input").disabled = false;
	id("search_btn").disabled = false;
	id("training_button").disabled = false;
	unset(id("main_background"));

	// changeSection("training");
}

let foundKanjiList = [];
let exactWordArr = [];
let includingWordArr = [];
function search(pWord) {
	if (bModal) closeModal();
	foundKanjiList = [];
	exactWordArr = [];
	includingWordArr = [];

	let bFullLetter = false;
	let bFullKana = false;
	pWord = pWord.trim();
	pWord = pWord.toLowerCase();
	if (pWord != "") {

		if (isFullLetter(pWord)) {
			bFullLetter = true;
		} else {
			// log("NOT FULL LETTER");
		}

		if (isFullKana(pWord)) {
			bFullKana = true;
		} else {
			// log("NOT FULL KANA");
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
			// log("found kanji list: ");
			// log(foundKanjiList);
			// if (Word.imiList.includes(pWord)) {
				// log("imiList includes pWord: " + pWord);
				exactWordArr = Word.list.filter(w => w.imi.toLowerCase() == pWord);
				includingWordArr = Word.list.filter(w => (w.imi.toLowerCase().includes(pWord) && w.imi.toLowerCase() != pWord));
			// }
		} else if (bFullKana) {
			let tempArr = Kanji.list.filter(k => k.kunYomiRaw.includes(pWord));
			tempArr.forEach(k => {
				foundKanjiList.push(k.id);
			});
			// log("found kanji list: ");
			// log(foundKanjiList);
			// if (Word.imiList.includes(pWord)) {
				// log("imiList includes pWord: " + pWord);
				exactWordArr = Word.list.filter(w => w.yomiRaw == pWord);
				includingWordArr = Word.list.filter(w => (w.yomiRaw.includes(pWord) && w.yomiRaw != pWord));
			// }
		}

		displayResult();
	} else {
		displayNoResult();
	}
}

function displayResult() {

	unset(footer_display_type);
	let kanjiHTML = `<div class="kanji_result_header">漢字 ${foundKanjiList.length}</div>`;
	const kanji_result_container = id("kanji_result_container");
	

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
			<div class="kanji_result" id="kanji_id_${k}" onClick="kanjiInfo(${k}, this)">
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
			kanjiHTML += `<div class="kr_one_kanji" onClick="kanjiInfo(${k})">${Kanji.list[k].kanji}</div>`
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

	// log(exactWordArr);
	// log(includingWordArr);
	
	const word_result_container = id("word_result_container");
	let wordHTML = `<div class="kanji_result_header">単語 ${exactWordArr.length + includingWordArr.length}</div>`;
	exactWordArr = exactWordArr.concat(includingWordArr);
	// log(exactWordArr);

	exactWordArr.forEach((w, index) => {
		wordHTML += 
		`
		<div class="word_result" id="word_id_${w.id}">
			<div class="word_result_yomi_word">
				<div class="word_result_yomi">${w.yomi}</div>
				<div class="word_result_word">${w.word}</div>
				<div class="word_result_imi">${w.imi}</div>
			</div>
			<div class="word_result_misc">
		`;
		if (w.yojijukugo) {
			wordHTML += 
			`
				<div class="yojijukugo">四字熟語</div>
				<div class="kanken_lvl word_kanken">
					<div class="kanken_left">5</div>
					<div class="kanken_right">級</div>
				</div>
			`;
		}
		wordHTML += `
				</div>
			</div>
			`;
		if (index < exactWordArr.length-1) wordHTML += `<div class="word_result_separator"></div>`;
	});

	word_result_container.innerHTML = wordHTML;
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

	Kanji.list.forEach(k => {
		if (k.kanken == pLevel) foundKanjiList.push(k.id);
	});
	exactWordArr = Word.list.filter(w => w.kanken == pLevel);
	// Word.list.forEach(w => {
	// 	if (w.kanken == pLevel) exactWordArr.push(w)
	// });
	// foundKanjiList = Kanji.list.filter(k => k.kanken == pLevel);
	footerMainBtn();

	displayResult();

}

function kanjiInfo(pIndex, e) {

	// log("KANJI INFO: " + pIndex);
	// log(Kanji.list[pIndex]);

	let html = 
	`
	<div id="modal">
		<!--<div class="modal_content">-->
			<div class="modal_header">
				<div class="modal_kanji">${Kanji.list[pIndex].kanji}</div>
				<div class="modal_kanji_info">
					<div class="modal_stroke_bushu">
						<p class="modal_stroke">${Kanji.list[pIndex].kakusuu}画</p>
						<!--<p class="modal_bushu">${Kanji.bushuList[Kanji.list[pIndex].bushu-1].bushu}</p>-->

						<span id="modal_bushu">${Kanji.bushuList[Kanji.list[pIndex].bushu-1].bushu}<span
							class="modal_tooltip_bushu">${Kanji.bushuList[Kanji.list[pIndex].bushu-1].yomi}</span>
						</span>

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

	let no_border = ""
	Kanji.list[pIndex].wordList.forEach((i,index) => {
		
		html +=
		`
		<div class="word_result" id="word_id_${i}">
			<div class="word_result_yomi_word">
				<div class="word_result_yomi">${Word.list[i].yomi}</div>
				<div class="word_result_word">${Word.list[i].word}</div>
				<div class="word_result_imi">${Word.list[i].imi}</div>
			</div>
		</div>
		`;
		if (index < Kanji.list[pIndex].wordList.length-1) html += `<div class="word_result_separator"></div>`;
	})
	html +=
	`
					</div>
				</div>
			<!--</div>-->
		</div>
	`;

	modal_container.innerHTML = html;

	

	id("modal").addEventListener("click", e => {
		e.stopPropagation();
	});
	openModal();
	test(pIndex);

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
	// log(e.target);
	// log("click body"); //2
	if (bSearching) {
		// log("go stop searching"); //3
		unset(search_btn);
		none(stop_search_btn);
	} else {
		// log("no action");
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
	flex(id("modal_container"));
	setTimeout(() => {
		editClass(id("modal_container"), "modal_open");
		editClass(id("modal"), "modal_open");
	},0.1);

	editClass(id("span_1"), "span_1_arrow");
	editClass(id("span_3"), "span_3_arrow");
	none(footer_display_type);
	
}
function closeModal() {
	bModal = false;
	modal_container.innerHTML = "";
	none(modal_container);
	editClass(modal_container, "modal_open", false);
	pathList = null;

	editClass(id("span_1"), "span_1_arrow", false);
	editClass(id("span_3"), "span_3_arrow", false);
	unset(footer_display_type);
}

function footerMainBtn() {
	if (bModal) {
		closeModal();
	} else {
		//TODO
		// log("menu filter");
		
		if (bFooterOpen) {
			editClass(id("footer_zone"),"open", false);
			none(id("footer_open"));
			editClass(id("span_1"), "span_1_arrow_right", false);
			editClass(id("span_3"), "span_3_arrow_right", false);

			openKankenLvl(false);
		} else {
			editClass(id("footer_zone"),"open");

			setTimeout(() => {
				flex(id("footer_open"));
			}, 300);
			none(footer_display_type);
			editClass(id("span_1"), "span_1_arrow_right");
			editClass(id("span_3"), "span_3_arrow_right");
		}
		bFooterOpen = !bFooterOpen;
	}
}

function openKankenLvl(pbOpen = true) {
	if (pbOpen) {
		// log(id("footer_kanken_lvl").classList[0]);
		if (id("footer_kanken_lvl").classList[0] == "open") {
			editClass(id("footer_kanken_lvl"), "open", false);
		} else {
			editClass(id("footer_kanken_lvl"), "open");
		}
	} else {
		editClass(id("footer_kanken_lvl"), "open", false);
	}
}
function openKankenDialog() {
	id("kanken_dialog").showModal();
	id("kd_btn_yomi").blur();
}
function closeKankenDialog() {
	id("kanken_dialog").close();
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



function test(pId) {
	// log(Kanji.list);
	// log(Kanji.list[pId]);
	
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
function changeDisplayType() {
	// log(bDisplayType1);
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
	displayResult();
}

function displayKanjiUrl() {
	if (kanji_id > 0) {
		test(kanji_id);
	}
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



// function addPath() {
// 	let test = content.split("\n");
// 	log(test);
// 	let final = "";
// 	Kanji.list.forEach(k => {
// 		test.forEach(t => {
// 			if (t[0] == k.kanji) {
// 				final += t.slice(1, t.length) + "\n";
// 			}
// 		});
// 	});
// 	log(final);
// }