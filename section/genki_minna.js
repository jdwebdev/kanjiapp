GenkiWord.categoryList["Nom"] = "Nom";
GenkiWord.categoryList["い Adj"] = "い Adj";
GenkiWord.categoryList["な Adj"] = "な Adj";
GenkiWord.categoryList["U-Vb"] = "U-Vb";
GenkiWord.categoryList["Ru-Vb"] = "Ru-Vb";
GenkiWord.categoryList["Irr-Vb"] = "Irr-Vb";
GenkiWord.categoryList["Adv"] = "Adv";
GenkiWord.categoryList["Nb"] = "Nb";
GenkiWord.categoryList["Loc"] = "Loc";
GenkiWord.categoryList["Exp"] = "Exp";

const gmFilter = { all: 1, word: 0, gram: 0, example: 0 };
const gmFilter_all = id("gmFilter_all");
const gmFilter_word = id("gmFilter_word");
const gmFilter_gram = id("gmFilter_gram");
const gmFilter_example = id("gmFilter_example");

let exactGramArr = [];
let includingGramArr = [];
let includingExampleArr = [];
let bFilters = false;
const gm_filters = id("gm_filters");
const gmFilter_cat = id("gmFilter_cat");
const gmFilter_lesson = id("gmFilter_lesson");
const open_filters_dot_1 = id("open_filters_dot_1");
const open_filters_dot_2 = id("open_filters_dot_2");
const open_filters_dot_3 = id("open_filters_dot_3");

const catFilters = [];
catFilters["Nom"] = 0;
catFilters["いAdj"] = 0;
catFilters["なAdj"] = 0;
catFilters["U-Vb"] = 0;
catFilters["Ru-Vb"] = 0;
catFilters["Irr-Vb"] = 0;
catFilters["Adv"] = 0;
catFilters["Nb"] = 0;
catFilters["Loc"] = 0;
catFilters["Exp"] = 0;
let bSearchByCat = false;
let bSearchByLesson = false;
let bgmFullLetter = false;
let bgmFullKana = false;
const genkiLessonFilters = [];
for (let i = 0; i < 12; i++) {
	genkiLessonFilters["lesson_"+(i+1)] = 0;
}
const minnaLessonFilters = [];
for (let i = 0; i < 25; i++) {
	minnaLessonFilters["lesson_"+(i+1)] = 0;
}

function checkGMFilterContainer(pElement) {
	if (pElement == "BODY") closeFilterContainer();
}

function changeGMFilter(pFilter, pbToZero = false) {
	switch(pFilter) {
		case 0:
			if (pbToZero) gmFilter.all = 0;
			if (gmFilter.all == 0) {
				gmFilter.all = 1;
				gmFilter.word = 0;
				gmFilter.gram = 0;
				gmFilter.example = 0;
				editClass(gmFilter_all, "active");
				editClass(gmFilter_word, "active", false);
				editClass(gmFilter_word, "semi_active");
				editClass(gmFilter_gram, "active", false);
				editClass(gmFilter_gram, "semi_active");
				editClass(gmFilter_example, "active", false);
				editClass(gmFilter_example, "semi_active");
			}
			break;
		case 1:
			if (gmFilter.word == 0) {
				if (gmFilter.gram == 0 || gmFilter.example == 0) {
					if (gmFilter.all == 1) {
						editClass(gmFilter_gram, "semi_active", false);
						editClass(gmFilter_example, "semi_active", false);
					}
					gmFilter.all = 0;
					gmFilter.word = 1;
					editClass(gmFilter_all, "active", false);
					editClass(gmFilter_word, "active");
					editClass(gmFilter_word, "semi_active", false);
				} else if (gmFilter.gram == 1 && gmFilter.example == 1) {
					changeGMFilter(0,true);
				}
			} else {
				if (gmFilter.gram == 1 || gmFilter.example == 1) {
					gmFilter.word = 0;
					editClass(gmFilter_word, "active", false);
				} else {
					changeGMFilter(0,true);
				}
			}
			break;
		case 2:
			if (gmFilter.gram == 0) {
				if (gmFilter.word == 0 || gmFilter.example == 0) {
					if (gmFilter.all == 1) {
						editClass(gmFilter_word, "semi_active", false);
						editClass(gmFilter_example, "semi_active", false);
					}
					gmFilter.all = 0;
					gmFilter.gram = 1;
					editClass(gmFilter_all, "active", false);
					editClass(gmFilter_gram, "active");
					editClass(gmFilter_gram, "semi_active", false);
				} else if (gmFilter.word == 1 && gmFilter.example == 1) {
					changeGMFilter(0,true);
				}
			} else {
				if (gmFilter.word == 1 || gmFilter.example == 1) {
					gmFilter.gram = 0;
					editClass(gmFilter_gram, "active", false);
				} else {
					changeGMFilter(0,true);
				}
			}
			break;
		case 3:
			if (gmFilter.example == 0) {
				if (gmFilter.word == 0 || gmFilter.gram == 0) {
					if (gmFilter.all == 1) {
						editClass(gmFilter_word, "semi_active", false);
						editClass(gmFilter_gram, "semi_active", false);
					}
					gmFilter.all = 0;
					gmFilter.example = 1;
					editClass(gmFilter_all, "active", false);
					editClass(gmFilter_example, "active");
					editClass(gmFilter_example, "semi_active", false);
				} else if (gmFilter.word == 1 && gmFilter.gram == 1) {
					changeGMFilter(0,true);
				}
			} else {
				if (gmFilter.word == 1 || gmFilter.gram == 1) {
					gmFilter.example = 0;
					editClass(gmFilter_example, "active", false);
				} else {
					changeGMFilter(0,true);
				}
			}
			break;
	}
}

function searchGMMode(pWord) {	
	closeFilterContainer();

	bgmFullLetter = false;

	exactGramArr = [];
	includingGramArr = [];
	includingExampleArr = [];

	bgmFullKana = false;
	pWord = pWord.trim();
	pWord = pWord.toLowerCase();
	if (pWord != "") {

		if (isFullLetter(pWord)) {
			bgmFullLetter = true;
		}

		if (isFullKana(pWord)) {
			bgmFullKana = true;
		}

		switch(currentMode) {
			case MODE.GENKI:
				searchGenkiMode(pWord);
				break;
			case MODE.MINNA:
				searchMinnaMode(pWord);
				break;
		}

		displayGMResult();
	} else {
		displayNoResult();
	}
}

function searchGenkiMode(pWord) {
	if (!bgmFullLetter && !bgmFullKana) {
		if (gmFilter.all == 1 || gmFilter.word == 1) {
			if (GenkiWord.wordList.includes(pWord)) {
				exactWordArr = GenkiWord.list.filter(w => w.word == pWord);
				includingWordArr = GenkiWord.list.filter(w => (w.word.includes(pWord) && w.word !== pWord));
			} else {
				includingWordArr = GenkiWord.list.filter(w => (w.word.includes(pWord) && w.word !== pWord));
			}
		}

	} else if (bgmFullLetter) {
		if (gmFilter.all == 1 || gmFilter.word == 1) {
			exactWordArr = GenkiWord.list.filter(w => w.imi.toLowerCase() == pWord);
			includingWordArr = GenkiWord.list.filter(w => (w.imi.toLowerCase().includes(pWord) && w.imi.toLowerCase() != pWord));
		}
	} else if (bgmFullKana) {
		if (gmFilter.all == 1 || gmFilter.word == 1) {
			exactWordArr = GenkiWord.list.filter(w => {
				if (w.yomiRaw != "" && w.yomiRaw == pWord) return true;
				if (w.yomiRaw == "" && w.word == pWord) return true;
			});
			includingWordArr = GenkiWord.list.filter(w => {
				if ((w.yomiRaw.includes(pWord) && w.yomiRaw != pWord)) return true
				if ((w.yomiRaw == "" && w.word.includes(pWord) && w.word != pWord)) return true
			});
		}
	}

	if (gmFilter.all == 1 || gmFilter.gram == 1) {
		if (GenkiGram.contentList.includes(pWord)) {
			exactGramArr = GenkiGram.list.filter(w => w.content.toLowerCase() == pWord);
			includingGramArr = GenkiGram.list.filter(w => (w.content.toLowerCase().includes(pWord) && w.content !== pWord));
		} else {
			includingGramArr = GenkiGram.list.filter(w => (w.content.toLowerCase().includes(pWord) && w.content !== pWord));
		}
	}

	if (gmFilter.all == 1 || gmFilter.example == 1) {
		includingExampleArr = GenkiExample.list.filter(w => (w.content.includes(pWord)));
	}

	
}
function searchMinnaMode(pWord) {
	if (!bgmFullLetter && !bgmFullKana) {
		if (gmFilter.all == 1 || gmFilter.word == 1) {
			if (MinnaWord.wordList.includes(pWord)) {
				exactWordArr = MinnaWord.list.filter(w => w.word == pWord);
				includingWordArr = MinnaWord.list.filter(w => (w.word.includes(pWord) && w.word !== pWord));
			} else {
				includingWordArr = MinnaWord.list.filter(w => (w.word.includes(pWord) && w.word !== pWord));
			}
		}

	} else if (bgmFullLetter) {
		if (gmFilter.all == 1 || gmFilter.word == 1) {
			exactWordArr = MinnaWord.list.filter(w => w.imi.toLowerCase() == pWord);
			includingWordArr = MinnaWord.list.filter(w => (w.imi.toLowerCase().includes(pWord) && w.imi.toLowerCase() != pWord));
		}
	} else if (bgmFullKana) {
		if (gmFilter.all == 1 || gmFilter.word == 1) {
			exactWordArr = MinnaWord.list.filter(w => {
				if (w.yomiRaw != "" && w.yomiRaw == pWord) return true;
				if (w.yomiRaw == "" && w.word == pWord) return true;
			});
			includingWordArr = MinnaWord.list.filter(w => {
				if ((w.yomiRaw.includes(pWord) && w.yomiRaw != pWord)) return true
				if ((w.yomiRaw == "" && w.word.includes(pWord) && w.word != pWord)) return true
			});
		}
	}

	if (gmFilter.all == 1 || gmFilter.gram == 1) {
		if (MinnaGram.contentList.includes(pWord)) {
			exactGramArr = MinnaGram.list.filter(w => w.content.toLowerCase() == pWord);
			includingGramArr = MinnaGram.list.filter(w => (w.content.toLowerCase().includes(pWord) && w.content !== pWord));
		} else {
			includingGramArr = MinnaGram.list.filter(w => (w.content.toLowerCase().includes(pWord) && w.content !== pWord));
		}
	}

	if (gmFilter.all == 1 || gmFilter.example == 1) {
		includingExampleArr = MinnaExample.list.filter(w => (w.content.includes(pWord)));
	}
}

function displayGMResult() {

	unset(footer_display_type);

	const word_result_container = id("word_result_container");
	const kanji_result_container = id("kanji_result_container");
	kanji_result_container.innerHTML = "";
	let wordHTML = "";

	if ((gmFilter.all == 1 || gmFilter.word == 1) || bSearchByCat || bSearchByLesson) {

		wordHTML = `<div class="kanji_result_header">単語 ${exactWordArr.length + includingWordArr.length}</div>`;
		exactWordArr = exactWordArr.concat(includingWordArr);

		exactWordArr.forEach((w, index) => {
			wordHTML += 
			`
			<div class="word_result" id="word_id_${w.id}">
				<div class="word_result_yomi_word">
					<div class="word_result_yomi">${w.yomi}</div>
					`;
			if (currentMode == MODE.GENKI) {
				wordHTML += `<div class="word_result_word">${w.word}</div>`;
			} else {
				wordHTML += `<div class="word_result_word">${w.word}<span class='minna_masu_form'> ${w.masuForm != "" ? "["+w.masuForm+"]" : ""}</span></div>`;
			}
			wordHTML += `
					<div class="word_result_imi">${w.imi} ${(w.particle != "") ? "<span class='gm_word_particle'> ("+w.particle+")</span>" : ""}</div>
				</div>
				<div class="gm_word_result_misc">
					<div class="gm_word_category">${w.category == "" ? "-" : w.category}</div>
					<div class="gm_word_lesson"><span class="gm_word_lesson_nb">${w.lesson}</span>課</div>
				</div>
			</div>
			`;
			if (index < exactWordArr.length-1) wordHTML += `<div class="gm_word_result_separator"></div>`;
		});

	}

	if ((gmFilter.all == 1 || gmFilter.gram == 1) && !bSearchByCat) {
		wordHTML += `<div class="kanji_result_header">文法 ${exactGramArr.length + includingGramArr.length}</div>`;
		exactGramArr = exactGramArr.concat(includingGramArr);

		exactGramArr.forEach((g, index) => {
			wordHTML += 
			`
			<div class="word_result" id="gram_id_${g.id}" onClick="gramInfo(${g.id}, this)">
				<div class="word_result_yomi_word">
					<div class="word_result_word">${g.content}</div>
				</div>
				<div class="gm_word_result_misc">
					<div class="gm_word_lesson"><span class="gm_word_lesson_nb">${g.lesson}-${g.nb}</span></div>
				</div>
			</div>
			`;
			if (index < exactGramArr.length-1) wordHTML += `<div class="gm_word_result_separator"></div>`;
		});
	}

	if ((gmFilter.all == 1 || gmFilter.example == 1) && !bSearchByCat) {
		wordHTML += `<div class="kanji_result_header">例文 ${includingExampleArr.length}</div>`;
		
		includingExampleArr.forEach((w, index) => {
			wordHTML += 
			`
			<div class="word_result" id="word_id_${w.id}">
				<div class="word_result_yomi_word">
					<div class="gm_example_result">${w.content}</div>
			`;

			if (currentMode == MODE.MINNA) {
				wordHTML += `<div class="minna_fr_example">${w.fr}</div>`;
			}

			wordHTML += `
				</div>
				<div class="gm_word_result_misc">
					<div class="gm_word_lesson"><span class="gm_word_lesson_nb">${w.lesson}-${w.nb}</span></div>
				</div>
			</div>
			`;
			if (index < includingExampleArr.length-1) wordHTML += `<div class="gm_word_result_separator"></div>`;
		});
	}

	bSearchByCat = false;
	bSearchByLesson = false;
	
	word_result_container.innerHTML = wordHTML;
}

function gramInfo(pGramIndex, pElement) {
	closeFilterContainer();


	let gram = null;
	switch(currentMode) {
		case MODE.GENKI:
			gram = GenkiGram.list.find(g => g.id == pGramIndex);
			break;
			case MODE.MINNA:
			gram = MinnaGram.list.find(g => g.id == pGramIndex);
			break;
	}

	let html = "";

	html = `
		<div id="modal">
			<p class="modal_gram_lesson">第${gram.lesson}課・${gram.nb}</p>
			<h1 class="modal_gram_content">${gram.content}</h1>
			<ul class="modal_gram_ul">
	`;

	gram.exampleList.forEach(ex => {
		html += `<li class="modal_gram_li">・${ex}</li>`;
	});
	html += `
			</ul>
		</div>
	`;

	modal_container.innerHTML = html;

	openModal();

}

function closeFilterContainer() {
	editClass(id("gmFilter_container"), "active", false);
	if (bFilters) openFilters();
}

//? Category / Lesson -------
function openFilters() {
	if (!bFilters) {
		flex(gm_filters);
		setTimeout(() => {
			editClass(gm_filters, "open");
			editClass(open_filters_dot_1, "open");
			editClass(open_filters_dot_2, "open");
			editClass(open_filters_dot_3, "open");
			setTimeout(() => {
				flex(gmFilter_cat);
				editClass(gmFilter_cat, "open");

				//timeout 300
				flex(gmFilter_lesson);
				editClass(gmFilter_lesson, "open");
				setTimeout(() => {
				}, 300);
			},100);
		}, 100);
	} else {
		editClass(gmFilter_cat, "open", false);
		editClass(gmFilter_lesson, "open", false);

		editClass(open_filters_dot_1, "open", false);
		editClass(open_filters_dot_2, "open", false);
		editClass(open_filters_dot_3, "open", false);

		setTimeout(() => {
			editClass(gm_filters, "open", false);
			setTimeout(() => {
			}, 200);
		}, 100);
	}

	bFilters = !bFilters;
}

//? Category ----------------
function pushFilterCat(pName, pElement) {
	editClass(pElement, "active");
	if (catFilters[pName]) {
		editClass(pElement, "active", false);
		catFilters[pName] = 0;
	} else {
		editClass(pElement, "active");
		catFilters[pName] = 1;
	}
}

function searchByCat() {
	
	exactWordArr = [];
	includingWordArr = [];

	let catToSearch = [];
	for (let cat in catFilters) {
		if (catFilters[cat] == 1) {
			catToSearch.push(cat);
		}
	}
	if (catToSearch.length == 0) return;
	bSearchByCat = true;

	const unorderedWord = [];

	switch (currentMode) {
		case MODE.GENKI:
			GenkiWord.list.forEach(w => {
				if (catToSearch.includes(w.category)) {
					unorderedWord.push(w);
				}
			});
			break;
		case MODE.MINNA:
			MinnaWord.list.forEach(w => {
				if (catToSearch.includes(w.category)) {
					unorderedWord.push(w);
				}
			});
			break;
	}

	catToSearch.forEach(c => {
		unorderedWord.forEach(w => {
			if (w.category == c) {
				exactWordArr.push(w);
			}
		});
	});
	
	closeFilterContainer();

	displayGMResult();
}

//? Lesson ------------------
function pushFilterLesson(pLesson, pElement) {
	editClass(pElement, "active");
	switch (currentMode) {
		case MODE.GENKI:
			if (genkiLessonFilters["lesson_"+pLesson]) {
				editClass(pElement, "active", false);
				genkiLessonFilters["lesson_"+pLesson] = 0;
			} else {
				editClass(pElement, "active");
				genkiLessonFilters["lesson_"+pLesson] = 1;
			}
			break;
		case MODE.MINNA:
			if (minnaLessonFilters["lesson_"+pLesson]) {
				editClass(pElement, "active", false);
				minnaLessonFilters["lesson_"+pLesson] = 0;
			} else {
				editClass(pElement, "active");
				minnaLessonFilters["lesson_"+pLesson] = 1;
			}
			break;
	}
	
}

function searchByLesson() {
	
	exactWordArr = [];
	includingWordArr = [];
	exactGramArr = [];
	includingExampleArr = [];

	let lessonToSearch = [];

	switch(currentMode) {
		case MODE.GENKI:
			for (let lesson in genkiLessonFilters) {
				if (genkiLessonFilters[lesson] == 1) {
					lessonToSearch.push(lesson.split("_")[1]);
				}
			}
			if (lessonToSearch.length == 0) return;
			bSearchByLesson = true;
		
			GenkiWord.list.forEach(w => {
				if (lessonToSearch.includes(w.lesson)) {
					exactWordArr.push(w);
				}
			});
			GenkiGram.list.forEach(g => {
				if (lessonToSearch.includes(g.lesson)) {
					exactGramArr.push(g);
				}
			});
			GenkiExample.list.forEach(ex => {
				if (lessonToSearch.includes(ex.lesson)) {
					includingExampleArr.push(ex);
				}
			});
			break;
		case MODE.MINNA:
			for (let lesson in minnaLessonFilters) {
				if (minnaLessonFilters[lesson] == 1) {
					lessonToSearch.push(lesson.split("_")[1]);
				}
			}
			if (lessonToSearch.length == 0) return;
			bSearchByLesson = true;
		
			MinnaWord.list.forEach(w => {
				if (lessonToSearch.includes(w.lesson)) {
					exactWordArr.push(w);
				}
			});
			MinnaGram.list.forEach(g => {
				if (lessonToSearch.includes(g.lesson)) {
					exactGramArr.push(g);
				}
			});
			MinnaExample.list.forEach(ex => {
				if (lessonToSearch.includes(ex.lesson)) {
					includingExampleArr.push(ex);
				}
			});

			break;
	}


	closeFilterContainer();

	displayGMResult();
}