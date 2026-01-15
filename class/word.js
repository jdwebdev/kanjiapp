class Word {

	static list = [];
	static wordList = [];
	
	constructor(pId, pWord, pYomi, pImi, pInfo) {
		this.id = pId;
		this.word = pWord;
		Word.wordList.push(this.word);
		this.yomi = pYomi;
		this.imi = pImi;
		this.kanjiList = [];
		this.yojijukugo = (pInfo == 4);

		Word.list.push(this);
	}

	setKanji(pKanji) {
		this.kanjiList.push(pKanji);
	}

}