const tsvPath = "./tsv/漢字アプリ - ";
const tsvExt = ".tsv";
const STEP = Object.freeze({
	KANJI: 0,
	WORD: 1,
	GENKI_WORD: 2,
	GENKI_GRAM: 3,
	GENKI_EXAMPLE: 4,
	MINNA_WORD: 5,
	MINNA_GRAM: 6,
	MINNA_EXAMPLE: 7,
	START_APP: 8
});
const FILE = Object.freeze({
	KANJI: tsvPath + "漢字" + tsvExt,
	WORD: tsvPath + "語彙" + tsvExt,
	GENKI_WORD: tsvPath + "げんき・語彙" + tsvExt,
	GENKI_GRAM: tsvPath + "げんき・文法" + tsvExt,
	GENKI_EXAMPLE: tsvPath + "げんき・例文" + tsvExt,
	MINNA_WORD: tsvPath + "みんな・語彙" + tsvExt,
	MINNA_GRAM: tsvPath + "みんな・文法" + tsvExt,
	MINNA_EXAMPLE: tsvPath + "みんな・例文" + tsvExt
});

readFile(STEP.KANJI);

function readFile(pStep) {
	let fileToRead = "";
	switch(pStep) {
		case STEP.KANJI:
			fileToRead = FILE.KANJI;
			break;
		case STEP.WORD:
			fileToRead = FILE.WORD;
			break;
		case STEP.GENKI_WORD:
			fileToRead = FILE.GENKI_WORD;
			break;
		case STEP.GENKI_GRAM:
			fileToRead = FILE.GENKI_GRAM;
			break;
		case STEP.GENKI_EXAMPLE:
			fileToRead = FILE.GENKI_EXAMPLE;
			break;
		case STEP.MINNA_WORD:
			fileToRead = FILE.MINNA_WORD;
			break;
		case STEP.MINNA_GRAM:
			fileToRead = FILE.MINNA_GRAM;
			break;
		case STEP.MINNA_EXAMPLE:
			fileToRead = FILE.MINNA_EXAMPLE;
			break;
		case STEP.START_APP:
			startApp();
			return;
	}

	let rawFile = new XMLHttpRequest();
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

	let row = pRow;
    let test;
    for (let i = 0; i < row.length; i++) {
        row[i] = row[i].split('\t');
		//?                  A 0       B 1        C 2        D 3        E 4        F 5        G 6        J 9       K 10         L 11        M 12                                    
        //?                  漢字	   異体字      音読み	   訓読み	  画数	     意味        部首       学年       漢検　       辞典ページ  アニメーション
        //?             pId, pKanji,   pItaiji,   pOnYomi,   pKunYomi,  pKakusuu,  pImi,      pBushu,    pGakunen,  pKanken,    pJitenRef,  pPath
        test = new Kanji(i, row[i][0], row[i][1], row[i][2], row[i][3], row[i][4], row[i][5], row[i][6], row[i][9], row[i][10], row[i][11], row[i][12]);
    }
}

function createWord(pRow) {
	let row = pRow;
    let test;
    for (let i = 0; i < row.length; i++) {
        row[i] = row[i].split('\t');
        //?                  語彙	   読み	     意味	 
        //?             pId, pWord,   pYomi,     pImi,      pInfo,     pKanken
        test = new Word(i, row[i][0], row[i][1], row[i][2], row[i][3], row[i][4]);
    }

	LinkKanjiWords();
}

function createGenkiWord(pRow) {
	let row = pRow;
    let test;
    for (let i = 0; i < row.length; i++) {
        row[i] = row[i].split('\t');
        //?                  語彙	   読み	     意味	 
        //?             pId, pWord,   pYomi,     pImi,      
        test = new GenkiWord(i, row[i][0], row[i][1], row[i][2], row[i][3], row[i][4], row[i][5], row[i][6]);
    }

	// log(GenkiWord.list);

	Kanji.list.forEach(k => {
		GenkiWord.list.forEach(w => {
			if (w.word.includes(k.kanji)) {
				k.setWord(w.id);
				w.setKanji(k.id);
			}
		});
	});
}
function createGenkiGram(pRow) {
	let row = pRow;
    let test;
    for (let i = 0; i < row.length; i++) {
        row[i] = row[i].split('\t');
        test = new GenkiGram(i, row[i][0], row[i][1], row[i][2], row[i][3]);
    }

	// log(GenkiGram.list);
}
function createGenkiExample(pRow) {
	let row = pRow;
    let test;
    for (let i = 0; i < row.length; i++) {
        row[i] = row[i].split('\t');
        test = new GenkiExample(i, row[i][3], row[i][0], row[i][1], row[i][2]);
    }

	// log(GenkiExample.list);
	let gram = null;
	GenkiExample.list.forEach(ex => {
		gram = GenkiGram.list.find(g => g.gramID == ex.gramID);
		gram.addExample(ex.content);
	});
}

function createMinnaWord(pRow) {
	let row = pRow;
    let test;
    for (let i = 0; i < row.length; i++) {
        row[i] = row[i].split('\t');
        //?                  語彙	   読み	     意味	 
        //?             pId, pWord,   pYomi,     pImi,      
        test = new MinnaWord(i, row[i][0], row[i][1], row[i][2], row[i][3], row[i][4], row[i][5], row[i][6], row[i][7]);
    }

	// log(MinnaWord.list);

	Kanji.list.forEach(k => {
		MinnaWord.list.forEach(w => {
			if (w.word.includes(k.kanji)) {
				k.setWord(w.id);
				w.setKanji(k.id);
			}
		});
	});
}
function createMinnaGram(pRow) {
	let row = pRow;
    let test;
    for (let i = 0; i < row.length; i++) {
        row[i] = row[i].split('\t');
        test = new MinnaGram(i, row[i][0], row[i][1], row[i][2], row[i][3]);
    }

	// log(MinnaGram.list);
}
function createMinnaExample(pRow) {
	let row = pRow;
    let test;
    for (let i = 0; i < row.length; i++) {
        row[i] = row[i].split('\t');
        test = new MinnaExample(i, row[i][0], row[i][1], row[i][2], row[i][3], row[i][4]);
    }

	// log(MinnaExample.list);
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
}