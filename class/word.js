class Word {
	static ID = 0;
	static list = [];
	static wordList = [];
	static imiList = [];
	static current = null;
	static previous = null;
	static firstWordWithoutFurigana = -1;
	
	constructor(pId, pWord, pYomi, pImi, pInfo, pKanken, pFurigana = "", pRef = "") {
		this.id = pId;
		Word.ID++;

		this.word = pWord;
		Word.wordList.push(this.word);
		this.yomi = pYomi;
		this.yomiRaw = this.yomi.replaceAll("(", "");
		this.yomiRaw = this.yomiRaw.replaceAll(")", "");
		this.yomiRaw = this.yomiRaw.replaceAll("～", "");

		this.imi = pImi;
		Word.imiList.push(this.imi.toLowerCase());
		this.kanjiList = [];
		this.tmpKanjiList = [];
		
		this.info = pInfo;
		this.yojijukugo = (pInfo == 4);
		this.ateji = (pInfo == "当て字");
		this.kotowaza = (pInfo == "諺");
		this.kanken = pKanken;
		this.furigana = pFurigana;
		this.bFuriganaCheck = (this.furigana != "");

		this.ref = pRef;
		this.wRef = null;

		if (this.furigana == "") {
			if (Word.firstWordWithoutFurigana == -1) {
				Word.firstWordWithoutFurigana = this.id;
			}
			if (isFullKanji(pWord)) {
				this.furigana = `<span class="kanji">${this.word}<span class="furigana">${this.yomi}</span></span>`;
			} else {
				if (lastCharKana(pWord, 1)) {
					this.furigana = `<span class="kanji">${this.word.slice(0,-1)}<span class="furigana">${this.yomi.slice(0,-1)}</span></span>${this.yomi[this.yomi.length-1]}`;
				} else if (lastCharKana(pWord, 2)) {
					this.furigana = `<span class="kanji">${this.word.slice(0,-2)}<span class="furigana">${this.yomi.slice(0,-2)}</span></span>${this.yomi[this.yomi.length-2]+this.yomi[this.yomi.length-1]}`;
				}
			}
		} else {
			if (this.furigana[0] == "<" && this.furigana.includes("furigana")) {
				let kanjiPart = this.furigana.split(`kanji">`)[1].split(`<span class="furigana">`)[0];
				let furiganaPart = this.furigana.split(`furigana">`)[1].split(`</span>`)[0];
				if (furiganaPart.length > kanjiPart.length*2+1) {
					this.furigana = this.furigana.split(`furigana`)[0] + "furigana furigana_left" + this.furigana.split(`furigana`)[1];
				}
			}
		}

		if (this.ref != "") {
			if (this.ref.includes("1_")) {
				this.wRef = Word.list.find(w => w.ref == "0_"+this.ref.split("1_")[1]);
			}
		}
		
		this.tmpFuriganaArr = [];
		this.furiganaArr = [];

		this.bInfoSup = (this.yojijukugo || this.ateji || this.kotowaza || this.kanken != "");

		Word.list.push(this);
	}

	setKanji(pKanji) {
		// this.kanjiList.push(pKanji);
		this.tmpKanjiList.push(pKanji);
	}

}

class Yojijukugo extends Word {
	static list = [];
	static wordList = [];
	static imiList = [];
	static bPrio = false;
	static bPrioTraining = false;

	constructor(pId, pWord, pYomi, pImi, pKanken, pPage, pSynonym, pAntonym, pBetsuYomi, pRef, pPlus, pPriority) {

		super(Word.ID, pWord, pYomi, pImi, 4, pKanken);

		Yojijukugo.wordList.push(this.word);
		Yojijukugo.imiList.push(this.imi);

		this.synonymRaw = "";
		this.synonymList = [];
		if (pSynonym != "" && pSynonym != "-") {
			this.synonymRaw = pSynonym;
			this.synonymList = pSynonym.split("、");
		}

		this.antonymRaw = "";
		this.antonymList = [];
		if (pAntonym != "" && pAntonym != "-") {
			this.antonymRaw = pAntonym;
			this.antonymList = pAntonym.split("、");
		}

		this.betsuYomiRaw = "";
		this.betsuYomiList = [];
		if (pBetsuYomi != "" && pBetsuYomi != "-") {
			this.betsuYomiRaw = pBetsuYomi;
			this.betsuYomiList = pBetsuYomi.split("、");
		}

		this.ref = pRef;
		this.wRef = null;
		this.page = pPage;
		this.plus = pPlus;
		this.bPriority = pPriority;
		
		if (this.yomi.length > this.word.length*2+1) {
			this.furigana = `<span class="kanji">${this.word}<span class="furigana furigana_left">${this.yomi}</span></span>`;
		} else {
			this.furigana = `<span class="kanji">${this.word}<span class="furigana">${this.yomi}</span></span>`;
		}

		Yojijukugo.list.push(this);
	}

	static linkRef() {
		Yojijukugo.list.forEach(y => {
			if (y.ref != "") {
				const yoji = Yojijukugo.list.find(y2 => y2.word == y.ref);
				if (yoji != null) y.wRef = yoji;
			}
		});
	}
}