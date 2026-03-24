class GenkiWord {
	static list = [];
	static wordList = [];
	static imiList = [];
	static categoryList = [];
	
	constructor(pId, pWord, pYomi, pImi, pBook, pLesson, pCategory, pParticle = "") {
		this.id = pId;
		this.word = pWord;
		GenkiWord.wordList.push(this.word);
		this.yomi = pYomi;
		this.yomiRaw = this.yomi.replaceAll("(", "");
		this.yomiRaw = this.yomiRaw.replaceAll(")", "");
		this.yomiRaw = this.yomiRaw.replaceAll("～", "");

		this.imi = pImi;
		GenkiWord.imiList.push(this.imi.toLowerCase());
		this.kanjiList = [];

		this.book = pBook;
		this.lesson = pLesson;
		this.category = pCategory;
		this.particle = pParticle;

		GenkiWord.list.push(this);
	}

	setKanji(pKanji) {
		this.kanjiList.push(pKanji);
	}
}

class GenkiGram {
	static list = [];
	static contentList = [];
	
	constructor(pId, pContent, pBook, pLesson, pNb) {
		this.id = pId;
		this.content = pContent;
		this.book = pBook;
		this.lesson = pLesson;
		this.nb = pNb;
		this.gramID = this.book + "" + this.lesson + "" + this.nb;

		this.exampleList = [];
		
		GenkiGram.contentList.push(this.content);
		GenkiGram.list.push(this);
	}

	addExample(pExample) {
		this.exampleList.push(pExample);
	}

}

class GenkiExample {
	static list = [];
	static contentList = [];
	
	constructor(pId, pContent, pBook, pLesson, pNb) {
		this.id = pId;
		this.content = pContent;
		this.book = pBook;
		this.lesson = pLesson;
		this.nb = pNb;
		this.gramID = this.book + "" + this.lesson + "" + this.nb;
		
		GenkiExample.contentList.push(this.content);
		GenkiExample.list.push(this);
	}
}