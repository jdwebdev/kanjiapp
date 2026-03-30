class MinnaWord {
	static list = [];
	static wordList = [];
	static imiList = [];
	static categoryList = [];
	
	constructor(pId, pWord, pYomi, pImi, pBook, pLesson, pMasu, pCategory, pParticle) {
		this.id = pId;
		this.word = pWord;
		MinnaWord.wordList.push(this.word);
		this.yomi = pYomi;
		this.yomiRaw = this.yomi.replaceAll("(", "");
		this.yomiRaw = this.yomiRaw.replaceAll(")", "");
		this.yomiRaw = this.yomiRaw.replaceAll("～", "");

		this.imi = pImi;
		MinnaWord.imiList.push(this.imi.toLowerCase());
		this.kanjiList = [];

		this.book = pBook;
		this.lesson = pLesson;
		this.category = pCategory;
		this.particle = pParticle;
		this.masuForm = pMasu;

		MinnaWord.list.push(this);
	}

	setKanji(pKanji) {
		this.kanjiList.push(pKanji);
	}
}

class MinnaGram {
	static list = [];
	static contentList = [];
	
	constructor(pId, pBook, pLesson, pNb, pContent) {
		this.id = pId;
		this.content = pContent;
		this.book = pBook;
		this.lesson = pLesson;
		this.nb = pNb;
		this.gramID = this.book + "" + this.lesson + "" + this.nb;

		this.exampleList = [];
		
		MinnaGram.contentList.push(this.content);
		MinnaGram.list.push(this);
	}

	addExample(pExample) {
		this.exampleList.push(pExample);
	}
}

class MinnaExample {
	static list = [];
	static contentList = [];
	
	constructor(pId, pBook, pLesson, pNb, pContent, pFr) {
		this.id = pId;
		this.content = pContent;
		this.fr = pFr;
		this.book = pBook;
		this.lesson = pLesson;
		this.nb = pNb;
		this.gramID = this.book + "" + this.lesson + "" + this.nb;
		
		MinnaExample.contentList.push(this.content);
		MinnaExample.list.push(this);
	}
}