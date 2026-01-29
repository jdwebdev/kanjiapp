class Word {

	static list = [];
	static wordList = [];
	static imiList = [];
	
	constructor(pId, pWord, pYomi, pImi, pInfo) {
		this.id = pId;
		this.word = pWord;
		Word.wordList.push(this.word);
		this.yomi = pYomi;
		this.yomiRaw = this.yomi.replaceAll("(", "");
		this.yomiRaw = this.yomiRaw.replaceAll(")", "");
		this.yomiRaw = this.yomiRaw.replaceAll("～", "");

		this.imi = pImi;
		Word.imiList.push(this.imi.toLowerCase());
		this.kanjiList = [];
		this.yojijukugo = (pInfo == 4);

		Word.list.push(this);
	}

	setKanji(pKanji) {
		this.kanjiList.push(pKanji);
	}

}