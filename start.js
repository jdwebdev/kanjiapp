const tsvPath = "./tsv/漢字アプリ - ";
const tsvExt = ".tsv";
const STEP = Object.freeze({
	KANJI: "漢字",
	WORD: "語彙",
	YOJIJUKUGO: "四字熟語",
	GENKI_WORD: "げんき・語彙",
	GENKI_GRAM: "げんき・文法",
	GENKI_EXAMPLE: "げんき・例文",
	MINNA_WORD: "みんな・語彙",
	MINNA_GRAM: "みんな・文法",
	MINNA_EXAMPLE: "みんな・例文",
	START_APP: "S"
});

readFile(STEP.KANJI);

function readFile(pStep) {
	if (pStep == STEP.START_APP) {
		startApp()
		return;
	}
	const fileToRead = tsvPath + pStep + tsvExt;

	const rawFile = new XMLHttpRequest();
    rawFile.open("GET", fileToRead, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                tsvFile = rawFile.responseText;
				const row = tsvFile.split(/\r\n|\n/);
				switch(pStep) {
					case STEP.KANJI:
						createKanji(row);
						readFile(STEP.WORD);
						break;
					case STEP.WORD:
						createWord(row);
						readFile(STEP.YOJIJUKUGO);
						break;
					case STEP.YOJIJUKUGO:
						createYojijukugo(row);
						readFile(STEP.GENKI_WORD);
						break;
					case STEP.GENKI_WORD:
						createGenkiWord(row);
						readFile(STEP.GENKI_GRAM);
						break;
					case STEP.GENKI_GRAM:
						createGenkiGram(row);
						readFile(STEP.GENKI_EXAMPLE);
						break;
					case STEP.GENKI_EXAMPLE:
						createGenkiExample(row);
						readFile(STEP.MINNA_WORD);
						break;
					case STEP.MINNA_WORD:
						createMinnaWord(row);
						readFile(STEP.MINNA_GRAM);
						break;
					case STEP.MINNA_GRAM:
						createMinnaGram(row);
						readFile(STEP.MINNA_EXAMPLE);
						break;
					case STEP.MINNA_EXAMPLE:
						createMinnaExample(row);
						readFile(STEP.START_APP);
						break;
					default:
				}
            }
        }
    }
    rawFile.send(null);
}

function createKanji(pRow) {

	Kanji.gakunenList["一"] = [];
	Kanji.gakunenList["二"] = [];
	Kanji.gakunenList["三"] = [];
	Kanji.gakunenList["四"] = [];
    Kanji.gakunenList["五"] = [];
	Kanji.gakunenList["六"] = [];

	const row = pRow;
    let test;
    for (let i = 0; i < row.length; i++) {
        row[i] = row[i].split('\t');
		//?                  A 0       B 1        C 2        D 3        E 4        F 5        G 6        J 9       K 10         L 11        M 12                                    
        //?                  漢字	   異体字      音読み	   訓読み	  画数	     意味        部首       学年       漢検　       辞典ページ  アニメーション
        //?             pId, pKanji,   pItaiji,   pOnYomi,   pKunYomi,  pKakusuu,  pImi,      pBushu,    pGakunen,  pKanken,    pJitenRef,  pPath
        test = new Kanji(i, row[i][0], row[i][1], row[i][2], row[i][3], row[i][4], row[i][5], row[i][6], row[i][9], row[i][10], row[i][11], row[i][12]);
    }
	Kanji.setKanjibyList();
}

function createWord(pRow) {
	const row = pRow;
    let test;
    for (let i = 1; i < row.length; i++) {
        row[i] = row[i].split('\t');
        //?                  語彙	   読み	     意味	 
        //?             pId, pWord,   pYomi,     pImi,      pInfo,     pKanken,   pFurigana,   pRef,      pRuigigo,  pTaigigo,  pSonota
        test = new Word(i-1, row[i][0], row[i][1], row[i][2], row[i][3], row[i][4], row[i][5], row[i][6], row[i][7], row[i][8], row[i][9]);
    }
	Word.setSynonymAntonym();
}

function createYojijukugo(pRow) {
	const row = pRow;
    let test;
    for (let i = 0; i < row.length; i++) {
        row[i] = row[i].split('\t');
		if (i > 0) {
			//?                   pId, pWord,   pYomi,     pImi,      pKanken,   pPage,     pSynonym,  pAntonym,  pBetsuYomi, pRef,     pPlus,     pPriority
			test = new Yojijukugo(i, row[i][0], row[i][1], row[i][2], row[i][3], row[i][4], row[i][5], row[i][6], row[i][7], row[i][8], row[i][9], row[i][10]);
		}
    }

	Yojijukugo.linkRef();

	LinkKanjiWords();
}

function createGenkiWord(pRow) {
	const row = pRow;
    let test;
    for (let i = 0; i < row.length; i++) {
        row[i] = row[i].split('\t');
        //?                  語彙	   読み	     意味	 
        //?             pId, pWord,   pYomi,     pImi,      
        test = new GenkiWord(i, row[i][0], row[i][1], row[i][2], row[i][3], row[i][4], row[i][5], row[i][6]);
    }

	Kanji.list.forEach(k => {
		GenkiWord.list.forEach(w => {
			if (w.word.includes(k.kanji)) {
				w.setKanji(k.id);
			}
		});
	});
}
function createGenkiGram(pRow) {
	const row = pRow;
    let test;
    for (let i = 0; i < row.length; i++) {
        row[i] = row[i].split('\t');
        test = new GenkiGram(i, row[i][0], row[i][1], row[i][2], row[i][3]);
    }
}
function createGenkiExample(pRow) {
	const row = pRow;
    let test;
    for (let i = 0; i < row.length; i++) {
        row[i] = row[i].split('\t');
        test = new GenkiExample(i, row[i][3], row[i][0], row[i][1], row[i][2]);
    }

	let gram = null;
	GenkiExample.list.forEach(ex => {
		gram = GenkiGram.list.find(g => g.gramID == ex.gramID);
		gram.addExample(ex.content);
	});
}

function createMinnaWord(pRow) {
	const row = pRow;
    let test;
    for (let i = 0; i < row.length; i++) {
        row[i] = row[i].split('\t');
        //?                  語彙	   読み	     意味	 
        //?             pId, pWord,   pYomi,     pImi,      
        test = new MinnaWord(i, row[i][0], row[i][1], row[i][2], row[i][3], row[i][4], row[i][5], row[i][6], row[i][7]);
    }
	const tmpList = [];
	Kanji.list.forEach(k => {
		MinnaWord.list.forEach(w => {
			if (w.word.includes(k.kanji)) {
				k.setMinnaWord(w.id);
				w.setKanji(k.id);
				if (!tmpList.includes(k.id)) {
					tmpList.push(k.id);
					Kanji.minnaList.push(k);
				}
			}
		});
	});
}
function createMinnaGram(pRow) {
	const row = pRow;
    let test;
    for (let i = 0; i < row.length; i++) {
        row[i] = row[i].split('\t');
        test = new MinnaGram(i, row[i][0], row[i][1], row[i][2], row[i][3]);
    }
}
function createMinnaExample(pRow) {
	const row = pRow;
    let test;
    for (let i = 0; i < row.length; i++) {
        row[i] = row[i].split('\t');
        test = new MinnaExample(i, row[i][0], row[i][1], row[i][2], row[i][3], row[i][4]);
    }

	let gram = null;
	MinnaExample.list.forEach(ex => {
		gram = MinnaGram.list.find(g => g.gramID == ex.gramID);
		gram.addExample(ex.content);
	});
}

function LinkKanjiWords() {
	Kanji.list.forEach(k => {
		Word.list.forEach(w => {
			if (w.word.includes(k.kanji)) {
				k.setWord(w.id);
				w.setKanji(k.id);
			}
		});
	});

	Word.list.forEach(w => {
		if (w.tmpKanjiList.length > 0) {
			for (let i = 0; i < w.word.length; i++) {
				if (!kana.includes(w.word[i]) && !letterList.includes(w.word[i].toLowerCase()) ) {
					w.tmpKanjiList.forEach(id => {
						if (Kanji.list[id].kanji == w.word[i] && !w.kanjiList.includes(id)) {
							w.kanjiList.push(id);
						}
					});
				}
			}
		}
	});
}