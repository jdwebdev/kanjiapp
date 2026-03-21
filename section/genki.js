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

const genkiFilter = { all: 1, word: 0, gram: 0, example: 0 };
const genki_filter_all = id("genki_filter_all");
const genki_filter_word = id("genki_filter_word");
const genki_filter_gram = id("genki_filter_gram");
const genki_filter_example = id("genki_filter_example");

let exactGramArr = [];
let includingGramArr = [];
let includingExampleArr = [];
let bFilters = false;
const genki_filters = id("genki_filters");
const genki_filter_cat = id("genki_filter_cat");
const genki_filter_lesson = id("genki_filter_lesson");
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
const lessonFilters = [];
for (let i = 0; i < 12; i++) {
	lessonFilters["lesson_"+(i+1)] = 0;
}

function changeGenkiFilter(pFilter, pbToZero = false) {
	switch(pFilter) {
		case 0:
			if (pbToZero) genkiFilter.all = 0;
			if (genkiFilter.all == 0) {
				genkiFilter.all = 1;
				genkiFilter.word = 0;
				genkiFilter.gram = 0;
				genkiFilter.example = 0;
				editClass(genki_filter_all, "active");
				editClass(genki_filter_word, "active", false);
				editClass(genki_filter_word, "semi_active");
				editClass(genki_filter_gram, "active", false);
				editClass(genki_filter_gram, "semi_active");
				editClass(genki_filter_example, "active", false);
				editClass(genki_filter_example, "semi_active");
			}
			break;
		case 1:
			if (genkiFilter.word == 0) {
				if (genkiFilter.gram == 0 || genkiFilter.example == 0) {
					if (genkiFilter.all == 1) {
						editClass(genki_filter_gram, "semi_active", false);
						editClass(genki_filter_example, "semi_active", false);
					}
					genkiFilter.all = 0;
					genkiFilter.word = 1;
					editClass(genki_filter_all, "active", false);
					editClass(genki_filter_word, "active");
					editClass(genki_filter_word, "semi_active", false);
				} else if (genkiFilter.gram == 1 && genkiFilter.example == 1) {
					changeGenkiFilter(0,true);
				}
			} else {
				if (genkiFilter.gram == 1 || genkiFilter.example == 1) {
					genkiFilter.word = 0;
					editClass(genki_filter_word, "active", false);
				} else {
					changeGenkiFilter(0,true);
				}
			}
			break;
		case 2:
			if (genkiFilter.gram == 0) {
				if (genkiFilter.word == 0 || genkiFilter.example == 0) {
					if (genkiFilter.all == 1) {
						editClass(genki_filter_word, "semi_active", false);
						editClass(genki_filter_example, "semi_active", false);
					}
					genkiFilter.all = 0;
					genkiFilter.gram = 1;
					editClass(genki_filter_all, "active", false);
					editClass(genki_filter_gram, "active");
					editClass(genki_filter_gram, "semi_active", false);
				} else if (genkiFilter.word == 1 && genkiFilter.example == 1) {
					changeGenkiFilter(0,true);
				}
			} else {
				if (genkiFilter.word == 1 || genkiFilter.example == 1) {
					genkiFilter.gram = 0;
					editClass(genki_filter_gram, "active", false);
				} else {
					changeGenkiFilter(0,true);
				}
			}
			break;
		case 3:
			if (genkiFilter.example == 0) {
				if (genkiFilter.word == 0 || genkiFilter.gram == 0) {
					if (genkiFilter.all == 1) {
						editClass(genki_filter_word, "semi_active", false);
						editClass(genki_filter_gram, "semi_active", false);
					}
					genkiFilter.all = 0;
					genkiFilter.example = 1;
					editClass(genki_filter_all, "active", false);
					editClass(genki_filter_example, "active");
					editClass(genki_filter_example, "semi_active", false);
				} else if (genkiFilter.word == 1 && genkiFilter.gram == 1) {
					changeGenkiFilter(0,true);
				}
			} else {
				if (genkiFilter.word == 1 || genkiFilter.gram == 1) {
					genkiFilter.example = 0;
					editClass(genki_filter_example, "active", false);
				} else {
					changeGenkiFilter(0,true);
				}
			}
			break;
	}
}

function searchGenkiMode(pWord) {
	editClass(id("genki_filter_container"), "active", false);
	if (bFilters) openFilters();

	let bFullLetter = false;

	exactGramArr = [];
	includingGramArr = [];
	includingExampleArr = [];

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
			if (genkiFilter.all == 1 || genkiFilter.word == 1) {
				if (GenkiWord.wordList.includes(pWord)) {
					exactWordArr = GenkiWord.list.filter(w => w.word == pWord);
					includingWordArr = GenkiWord.list.filter(w => (w.word.includes(pWord) && w.word !== pWord));
				} else {
					includingWordArr = GenkiWord.list.filter(w => (w.word.includes(pWord) && w.word !== pWord));
				}
			}

		} else if (bFullLetter) {
			if (genkiFilter.all == 1 || genkiFilter.word == 1) {
				exactWordArr = GenkiWord.list.filter(w => w.imi.toLowerCase() == pWord);
				includingWordArr = GenkiWord.list.filter(w => (w.imi.toLowerCase().includes(pWord) && w.imi.toLowerCase() != pWord));
			}
		} else if (bFullKana) {
			if (genkiFilter.all == 1 || genkiFilter.word == 1) {
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

		if (genkiFilter.all == 1 || genkiFilter.gram == 1) {
			if (GenkiGram.contentList.includes(pWord)) {
				exactGramArr = GenkiGram.list.filter(w => w.content == pWord);
				includingGramArr = GenkiGram.list.filter(w => (w.content.includes(pWord) && w.content !== pWord));
			} else {
				includingGramArr = GenkiGram.list.filter(w => (w.content.includes(pWord) && w.content !== pWord));
			}
		}

		if (genkiFilter.all == 1 || genkiFilter.example == 1) {
			includingExampleArr = GenkiExample.list.filter(w => (w.content.includes(pWord)));
		}

		displayGenkiResult();
	} else {
		displayNoResult();
	}
}

function displayGenkiResult() {

	unset(footer_display_type);

	const word_result_container = id("word_result_container");
	const kanji_result_container = id("kanji_result_container");
	kanji_result_container.innerHTML = "";
	// word_result_container.innerHTML = "";
	let wordHTML = "";

	if ((genkiFilter.all == 1 || genkiFilter.word == 1) || bSearchByCat || bSearchByLesson) {

		wordHTML = `<div class="kanji_result_header">単語 ${exactWordArr.length + includingWordArr.length}</div>`;
		exactWordArr = exactWordArr.concat(includingWordArr);

		exactWordArr.forEach((w, index) => {
			wordHTML += 
			`
			<div class="word_result" id="word_id_${w.id}">
				<div class="word_result_yomi_word">
					<div class="word_result_yomi">${w.yomi}</div>
					<div class="word_result_word">${w.word}</div>
					<div class="word_result_imi">${w.imi}</div>
				</div>
				<div class="genki_word_result_misc">
					<div class="genki_word_category">${w.category == "" ? "-" : w.category}</div>
					<div class="genki_word_lesson"><span class="genki_word_lesson_nb">${w.lesson}</span>課</div>
				</div>
			</div>
			`;
			if (index < exactWordArr.length-1) wordHTML += `<div class="genki_word_result_separator"></div>`;
		});

		// word_result_container.innerHTML = wordHTML;
	}

	if ((genkiFilter.all == 1 || genkiFilter.gram == 1) && !bSearchByCat && !bSearchByLesson) {
		// const word_result_container = id("word_result_container");
		wordHTML += `<div class="kanji_result_header">文法 ${exactGramArr.length + includingGramArr.length}</div>`;
		exactGramArr = exactGramArr.concat(includingGramArr);

		exactGramArr.forEach((g, index) => {
			wordHTML += 
			`
			<div class="word_result" id="gram_id_${g.id}" onClick="gramInfo(${g.id}, this)">
				<div class="word_result_yomi_word">
					<div class="word_result_word">${g.content}</div>
				</div>
				<div class="genki_word_result_misc">
					<div class="genki_word_lesson"><span class="genki_word_lesson_nb">${g.lesson}-${g.nb}</span></div>
				</div>
			</div>
			`;
			if (index < exactGramArr.length-1) wordHTML += `<div class="genki_word_result_separator"></div>`;
		});
	}

	if ((genkiFilter.all == 1 || genkiFilter.example == 1) && !bSearchByCat && !bSearchByLesson) {
		wordHTML += `<div class="kanji_result_header">例文 ${includingExampleArr.length}</div>`;
		
		includingExampleArr.forEach((w, index) => {
			wordHTML += 
			`
			<div class="word_result" id="word_id_${w.id}">
				<div class="word_result_yomi_word">
					<div class="genki_example_result">${w.content}</div>
				</div>
				<div class="genki_word_result_misc">
					<div class="genki_word_lesson"><span class="genki_word_lesson_nb">${w.lesson}-${w.nb}</span></div>
				</div>
			</div>
			`;
			if (index < includingExampleArr.length-1) wordHTML += `<div class="genki_word_result_separator"></div>`;
		});
	}

	bSearchByCat = false;
	bSearchByLesson = false;
	
	word_result_container.innerHTML = wordHTML;
}

function gramInfo(pGramIndex, pElement) {
	editClass(id("genki_filter_container"), "active", false);
	if (bFilters) openFilters();
	const gram = GenkiGram.list.find(g => g.id == pGramIndex);

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

//? Category / Lesson -------
function openFilters() {
	if (!bFilters) {
		flex(genki_filters);
		setTimeout(() => {
			editClass(genki_filters, "open");
			editClass(open_filters_dot_1, "open");
			editClass(open_filters_dot_2, "open");
			editClass(open_filters_dot_3, "open");
			setTimeout(() => {
				flex(genki_filter_cat);
				editClass(genki_filter_cat, "open");

				//timeout 300
				flex(genki_filter_lesson);
				editClass(genki_filter_lesson, "open");
				setTimeout(() => {
				}, 300);
			},100);
		}, 100);
	} else {
		// none(genki_filters);
		// none(genki_filter_cat);
		editClass(genki_filter_cat, "open", false);
		editClass(genki_filter_lesson, "open", false);

		editClass(open_filters_dot_1, "open", false);
		editClass(open_filters_dot_2, "open", false);
		editClass(open_filters_dot_3, "open", false);

		setTimeout(() => {

			editClass(genki_filters, "open", false);

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
	GenkiWord.list.forEach(w => {
		if (catToSearch.includes(w.category)) {
			unorderedWord.push(w);
		}
	});

	catToSearch.forEach(c => {
		unorderedWord.forEach(w => {
			if (w.category == c) {
				exactWordArr.push(w);
			}
		});
	});
	

	editClass(id("genki_filter_container"), "active", false);
	openFilters();

	displayGenkiResult();
}

//? Lesson ------------------
function pushFilterLesson(pLesson, pElement) {
	editClass(pElement, "active");
	if (lessonFilters["lesson_"+pLesson]) {
		editClass(pElement, "active", false);
		lessonFilters["lesson_"+pLesson] = 0;
	} else {
		editClass(pElement, "active");
		lessonFilters["lesson_"+pLesson] = 1;
	}
}

function searchByLesson() {
	
	exactWordArr = [];
	includingWordArr = [];

	let lessonToSearch = [];
	for (let lesson in lessonFilters) {
		if (lessonFilters[lesson] == 1) {
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

	editClass(id("genki_filter_container"), "active", false);
	openFilters();

	displayGenkiResult();
}