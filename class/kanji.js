class Kanji {
	static list = [];
	static kanjiList = [];
	static gakunenList = [];
	static bushuList = [
		{ bushu: "一", yomi: "いち"},
		{ bushu: "｜", yomi: "ぼう・たてぼう"},
		{ bushu: "、", yomi: "てん"},
		{ bushu: "ノ", yomi: "の・はらいぼう"},
		{ bushu: "乙・乚", yomi: "おつ"},
		{ bushu: "亅", yomi: "はねぼう"},
		{ bushu: "二", yomi: "に"},
		{ bushu: "亠", yomi: "なべぶた・けいさんかんむり"},
		{ bushu: "人・亻", yomi: "ひと・にんべん・ひとやね"},
		{ bushu: "儿", yomi: "ひとあし・にんにょう"},
		{ bushu: "入", yomi: "いる"},
		{ bushu: "八", yomi: "はち・は"},
		{ bushu: "冂", yomi: "どうがまえ・けいがまえ・まきがまえ"},
		{ bushu: "冖", yomi: "わかんむり・ひらかんむり"},
		{ bushu: "冫", yomi: "にすい"},
		{ bushu: "几", yomi: "つくえ"},
		{ bushu: "凵", yomi: "うけばこ・かんがまえ"},
		{ bushu: "刀・刂", yomi: "かたな・りっとう"},
		{ bushu: "力", yomi: "ちから"},
		{ bushu: "勹", yomi: "つつみがまえ"},
		{ bushu: "匕", yomi: "ひ"},
		{ bushu: "匚", yomi: "はこがまえ"},
		{ bushu: "匸", yomi: "かくしがまえ"},
		{ bushu: "十", yomi: "じゅう"},
		{ bushu: "卜", yomi: "ぼく・と・うらない"},
		{ bushu: "卩・㔾", yomi: "わりふ・ふしづくり"},
		{ bushu: "厂", yomi: "がんだれ"},
		{ bushu: "厶", yomi: "む"},
		{ bushu: "又", yomi: "また"},
		{ bushu: "口", yomi: "くち・くちへん"},
		{ bushu: "囗", yomi: "くにがまえ"},
		{ bushu: "土", yomi: "つち・つちへん・どへん"},
		{ bushu: "士", yomi: "さむらい"},
		{ bushu: "夂", yomi: "ふゆがしら・ち・すいにょう"},
		{ bushu: "夕", yomi: "た・ゆうべ"},
		{ bushu: "大", yomi: "だい"},
		{ bushu: "女", yomi: "おんな"},
		{ bushu: "子", yomi: "こ"},
		{ bushu: "宀", yomi: "うかんむり"},
		{ bushu: "寸", yomi: "すん"},
		{ bushu: "小", yomi: "しょう"},
		{ bushu: "尢", yomi: "だいのまげあし"},
		{ bushu: "尸", yomi: "かばね・しかばね"},
		{ bushu: "屮", yomi: "てつ"},
		{ bushu: "山", yomi: "やま"},
		{ bushu: "川・巛", yomi: "かわ・まげかわ"},
		{ bushu: "工", yomi: "え・たくみ・たくみへん"},
		{ bushu: "己", yomi: "おのれ"},
		{ bushu: "巾", yomi: "はば・はばへん・きんべん"},
		{ bushu: "干", yomi: "かん・いちじゅう"},
		{ bushu: "幺", yomi: "よう・いとがしら"},
		{ bushu: "广", yomi: "まだれ"},
		{ bushu: "廴", yomi: "えんにょう・いんにょう"},
		{ bushu: "廾", yomi: "こまぬき・にじゅうあし"},
		{ bushu: "弋", yomi: "しきがまえ"},
		{ bushu: "弓", yomi: "ゆみ"},
		{ bushu: "彐・彑", yomi: "けいがしら"},
		{ bushu: "彡", yomi: "さんづくり"},
		{ bushu: "彳", yomi: "ぎょうにんべん"},
		{ bushu: "⺍", yomi: "つかんむり"},
		{ bushu: "心・忄・㣺", yomi: "こころ・りっしんべん・したごころ"},
		{ bushu: "戈", yomi: "ほこ・ほこづくり・ほこがまえ"},
		{ bushu: "戶・戸", yomi: "と・とだれ・とかんむり"},
		{ bushu: "手・扌", yomi: "て・てへん"},
		{ bushu: "支", yomi: "し・えだにょう"},
		{ bushu: "攵・攴", yomi: "のぶん・ぼくづくり"},
		{ bushu: "文", yomi: "ぶん"},
		{ bushu: "斗", yomi: "とます"},
		{ bushu: "斤", yomi: "きん・おのづくり"},
		{ bushu: "方", yomi: "ほう・ほうへん・かたへん"},
		{ bushu: "旡", yomi: "なし・ぶ・すでのつくり"},
		{ bushu: "日", yomi: "ひ・ひへん・にちへん"},
		{ bushu: "曰", yomi: "ひらび・いわく"},
		{ bushu: "月", yomi: "つき"},
		{ bushu: "木", yomi: "き"},
		{ bushu: "欠", yomi: "あくび・かける"},
		{ bushu: "止", yomi: "とめる"},
		{ bushu: "歹", yomi: "かばねへん・いちたへん・がつへん"},
		{ bushu: "殳", yomi: "るまた・ほこづくり"},
		{ bushu: "毌", yomi: "なかれ・ははのかん"},
		{ bushu: "比", yomi: "ならびひ・くらべる"},
		{ bushu: "毛", yomi: "け"},
		{ bushu: "氏", yomi: "うじ"},
		{ bushu: "气", yomi: "きがまえ"},
		{ bushu: "水・氵・氺", yomi: "みず・さんずい・したみず"},
		{ bushu: "火・灬", yomi: "ひ・ひへん・れんが・れっか"},
		{ bushu: "爪", yomi: "つめ・つめかんむり・つめがしら・そうにょう"},
		{ bushu: "父", yomi: "ちち"},
		{ bushu: "爻", yomi: "まじわる"},
		{ bushu: "爿", yomi: "しょうへん"},
		{ bushu: "片", yomi: "かた"},
		{ bushu: "牙", yomi: "きば"},
		{ bushu: "牛", yomi: "うし"},
		{ bushu: "犬・犭", yomi: "いぬ・けものへん"},
		{ bushu: "玄", yomi: "げん"},
		{ bushu: "玉・王", yomi: "たま・おう・おうへん・たまへん"},
		{ bushu: "瓜", yomi: "うり"},
		{ bushu: "瓦", yomi: "かわら"},
		{ bushu: "甘", yomi: "かん・あまい"},
		{ bushu: "生", yomi: "うまれる"},
		{ bushu: "用", yomi: "もちいる"},
		{ bushu: "田", yomi: "た"},
		{ bushu: "疋", yomi: "ひき"},
		{ bushu: "疒", yomi: "やまいだれ"},
		{ bushu: "癶", yomi: "はつがしら"},
		{ bushu: "白", yomi: "しろ"},
		{ bushu: "皮", yomi: "けがわ・ひのかわ"},
		{ bushu: "皿", yomi: "さら"},
		{ bushu: "目", yomi: "め"},
		{ bushu: "矛", yomi: "ほこ"},
		{ bushu: "矢", yomi: "や"},
		{ bushu: "石", yomi: "いし"},
		{ bushu: "示・礻", yomi: "しめす・しめすへん"},
		{ bushu: "禸", yomi: "じゅう"},
		{ bushu: "禾", yomi: "のぎ"},
		{ bushu: "穴", yomi: "あな"},
		{ bushu: "立", yomi: "たつ"},
		{ bushu: "竹・⺮", yomi: "たけ・たけかんむり"},
		{ bushu: "米", yomi: "こめ"},
		{ bushu: "糸", yomi: "いと"},
		{ bushu: "缶", yomi: "ほとぎ"},
		{ bushu: "网・罒", yomi: "あみがしら・あみめ・よこめ"},
		{ bushu: "羊", yomi: "ひつじ"},
		{ bushu: "羽", yomi: "はね"},
		{ bushu: "老・耂", yomi: "おいかんむり・おいがしら"},
		{ bushu: "而", yomi: "しかして・しこうして"},
		{ bushu: "耒", yomi: "すきへん・らいすき"},
		{ bushu: "耳", yomi: "みみ"},
		{ bushu: "聿", yomi: "ふでづくり"},
		{ bushu: "肉・月", yomi: "にく・にくづき"},
		{ bushu: "臣", yomi: "しん"},
		{ bushu: "自", yomi: "みずから"},
		{ bushu: "至", yomi: "いたる"},
		{ bushu: "臼", yomi: "うす"},
		{ bushu: "舌", yomi: "した"},
		{ bushu: "舛", yomi: "まいあし"},
		{ bushu: "舟", yomi: "ふね"},
		{ bushu: "艮", yomi: "ねづくり・こんづくり"},
		{ bushu: "色", yomi: "いろ"},
		{ bushu: "艸・艹", yomi: "くさ・くさかんむり・そうこう"},
		{ bushu: "虍", yomi: "とらがしら・とらかんむり"},
		{ bushu: "虫", yomi: "むし"},
		{ bushu: "血", yomi: "ち"},
		{ bushu: "行", yomi: "ぎょう・ぎょうがまえ・ゆきがまえ"},
		{ bushu: "衣・衤", yomi: "ころも・ころもへん"},
		{ bushu: "襾・西・覀", yomi: "おおいかんむり・にし"},
		{ bushu: "見", yomi: "みる"},
		{ bushu: "角", yomi: "かく・つの・つのへん"},
		{ bushu: "言", yomi: "げん・ごんべん"},
		{ bushu: "谷", yomi: "たに"},
		{ bushu: "豆", yomi: "まめ"},
		{ bushu: "豕", yomi: "ぶた・いのこ"},
		{ bushu: "豸", yomi: "むじなへん"},
		{ bushu: "貝", yomi: "かい・こがい"},
		{ bushu: "赤", yomi: "あか"},
		{ bushu: "走", yomi: "はしる"},
		{ bushu: "足・𧾷", yomi: "あし"},
		{ bushu: "身", yomi: "み"},
		{ bushu: "車", yomi: "くるま"},
		{ bushu: "辛", yomi: "からい"},
		{ bushu: "辰", yomi: "しんのたつ"},
		{ bushu: "辵・⻌・辶", yomi: "しんにょう・しんにゅう"},
		{ bushu: "邑・⻏", yomi: "おおざと"},
		{ bushu: "酉", yomi: "ひよみのとり・こよみのとり"},
		{ bushu: "釆", yomi: "のごめ"},
		{ bushu: "里", yomi: "さと"},
		{ bushu: "金", yomi: "かね"},
		{ bushu: "長", yomi: "ながい"},
		{ bushu: "門", yomi: "もん・もんがまえ"},
		{ bushu: "阜・阝", yomi: "おか・こざとへん"},
		{ bushu: "隶", yomi: "れいづくり"},
		{ bushu: "隹", yomi: "ふるとり"},
		{ bushu: "雨", yomi: "あめ・あめかんむり・あまかんむり"},
		{ bushu: "靑・青", yomi: "あお"},
		{ bushu: "非", yomi: "あらず・ひ"},
		{ bushu: "面", yomi: "めん"},
		{ bushu: "革", yomi: "かくのかわ・つくりがわ"},
		{ bushu: "韋", yomi: "なめしがわ"},
		{ bushu: "韭", yomi: "にら"},
		{ bushu: "音", yomi: "おと"},
		{ bushu: "頁", yomi: "おおがい"},
		{ bushu: "風", yomi: "かぜ"},
		{ bushu: "飛", yomi: "とぶ"},
		{ bushu: "食・飠", yomi: "しょく"},
		{ bushu: "首", yomi: "くび"},
		{ bushu: "香", yomi: "か・かおり"},
		{ bushu: "馬", yomi: "うま"},
		{ bushu: "骨", yomi: "ほね"},
		{ bushu: "高", yomi: "たかい"},
		{ bushu: "髟", yomi: "かみがしら・かみかんむり"},
		{ bushu: "鬥", yomi: "とうがまえ・たたかいがまえ"},
		{ bushu: "鬯", yomi: "ちょう"},
		{ bushu: "鬲", yomi: "かなえ"},
		{ bushu: "鬼", yomi: "おに・きにょう"},
		{ bushu: "魚", yomi: "うお・うおへん・さかなへん"},
		{ bushu: "鳥", yomi: "とり"},
		{ bushu: "鹵", yomi: "しお"},
		{ bushu: "鹿", yomi: "しか"},
		{ bushu: "麥・麦", yomi: "むぎ・ばくにょう"},
		{ bushu: "麻", yomi: "あさ"},
		{ bushu: "黃・黄", yomi: "き"},
		{ bushu: "黍", yomi: "きび"},
		{ bushu: "黑・黒", yomi: "くろ"},
		{ bushu: "黹", yomi: "ち・ふつへん"},
		{ bushu: "黽", yomi: "べんあし"},
		{ bushu: "鼎", yomi: "かなえ"},
		{ bushu: "鼓", yomi: "つづみ"},
		{ bushu: "鼠", yomi: "ねずみ"},
		{ bushu: "鼻", yomi: "はな"},
		{ bushu: "齊・斉", yomi: "せい"},
		{ bushu: "齒・歯", yomi: "は"},
		{ bushu: "龍・竜", yomi: "りゅう"},
		{ bushu: "龜・亀", yomi: "かめ"},
		{ bushu: "龠", yomi: "やく"}
	];
//?                  A 0     B 1      C 2      D 3       E 4      F 5    G 6     J 9       K 10     L 11       M 12                                    
//?                  漢字	 異体字    音読み	 訓読み	   画数	     意味   部首    学年       漢検　   辞典ページ  アニメーション
//?             pId, pKanji, pItaiji, pOnYomi, pKunYomi, pKakusuu, pImi, pBushu, pGakunen, pKanken, pJitenRef, pPath
	constructor(pId, pKanji, pItaiji, pOnYomi, pKunYomi, pKakusuu, pImi, pBushu, pGakunen, pKanken, pJitenRef, pPath) {
		this.id = pId;
        this.kanji = pKanji;
		Kanji.kanjiList.push(this.kanji);
        this.onYomiList = pOnYomi.split("、");
        this.kunYomiList = pKunYomi.split("、");
        this.onYomi = pOnYomi;
        this.kunYomi = pKunYomi;
        this.kakusuu = pKakusuu;
        this.itaiji = pItaiji;
		this.imi = pImi;
		this.bushu = pBushu;
		this.gakunen = pGakunen;
		this.kanken = pKanken;
		this.jitenRef = pJitenRef;
		this.pathList = pPath.split(";");
		this.pathList.pop();
		this.wordList = [];

		if (this.gakunen !== "") {
			Kanji.gakunenList[this.gakunen].push(this);
		}
		if (this.pathList.length > 0) {
			// log("path! " + this.kanji);
		}

		Kanji.list.push(this);
	}

	setWord(pWord) {
		this.wordList.push(pWord);
	}

}

readKANJIFile("./tsv/漢字と仮名 - 漢字.tsv");

function readKANJIFile(pFile) {
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", pFile, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                tsvFile = rawFile.responseText;
                createKanji(tsvFile);
            }
        }
    }
    rawFile.send(null);    
}

function createKanji(pFile) {

	Kanji.gakunenList["一"] = [];
	Kanji.gakunenList["二"] = [];
	Kanji.gakunenList["三"] = [];
	Kanji.gakunenList["四"] = [];
    Kanji.gakunenList["五"] = [];
	Kanji.gakunenList["六"] = [];

    let row = pFile.split(/\r\n|\n/);
    let test;
    for (let i = 0; i < row.length; i++) {
        row[i] = row[i].split('\t');
		//?                  A 0       B 1        C 2        D 3        E 4        F 5        G 6        J 9       K 10         L 11        M 12                                    
        //?                  漢字	   異体字      音読み	   訓読み	  画数	     意味        部首       学年       漢検　       辞典ページ  アニメーション
        //?             pId, pKanji,   pItaiji,   pOnYomi,   pKunYomi,  pKakusuu,  pImi,      pBushu,    pGakunen,  pKanken,    pJitenRef,  pPath
        test = new Kanji(i, row[i][0], row[i][1], row[i][2], row[i][3], row[i][4], row[i][5], row[i][6], row[i][9], row[i][10], row[i][11], row[i][12]);
    }
    // console.log(Kanji.list);
	// log(Kanji.gakunenList);

	readWORDFile("./tsv/漢字と仮名 - 語彙.tsv");
}

function readWORDFile(pFile) {
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", pFile, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                tsvFile = rawFile.responseText;
                createWord(tsvFile);
            }
        }
    }
    rawFile.send(null);    
}

function createWord(pFile) {

    let row = pFile.split(/\r\n|\n/);
    let test;
    for (let i = 0; i < row.length; i++) {
        row[i] = row[i].split('\t');
        //?                  語彙	   読み	     意味	 
        //?             pId, pWord,   pYomi,     pImi,      pInfo
        test = new Word(i, row[i][0], row[i][1], row[i][2], row[i][3]);
    }

	LinkKanjiWords();

	// const kanji_list = id("kanji_list");
	// let kanji_list_HTML = "";
	// Kanji.list.forEach(k => {
	// 	kanji_list_HTML += `<button onClick="test(${k.id})">${k.kanji}</button>`;
	// });
	// kanji_list.innerHTML = kanji_list_HTML;

	// displayKanjiUrl();




	none(id("loading_container"));
	id("search_input").disabled = false;
	id("search_btn").disabled = false;
	id("training_button").disabled = false;
	unset(id("main_background"));
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


/*

悪衣悪食	あくいあくしょく
悪因悪果	あくいんあっか
悪逆無道	あくぎゃくむどう
悪事千里	あくじせんり
悪人正機	あくにんしょうき
悪口雑言	あっこうぞうごん
安居危思	あんきょきし
安居楽業	あんきょらくぎょう
安心立命	あんじんりつめい（読み方四つ）
暗送秋波	あんそうしゅうは
安宅正路	あんたくせいろ
易往易行	いおういぎょう
意気投合	いきとうごう
異曲同工	いきょくどうこう
同工異曲	どうこういきょく
異口同音	いくどうおん
意在言外	いざいげんがい
医食同源	いしょくどうげん
以心伝心	いしんでんしん
衣帯中賛	いたいちゅうのさん
異体同心	いたいどうしん
衣帯不解	いたいふかい
不解衣帯	ふかいいたい
一意専心	いちいせんしん
一衣帯水	いちいたいすい
一往一来	いちおういちらい
一牛鳴地	いちぎゅうめいち
一言一行	いちげんいっこう
一言半句	いちごんはんく
一字千金	いちじせんきん
一日三秋	いちじつさんしゅう
一日千秋	いちじつせんしゅう
一字不説	いちじふせつ
一上一下	いちじょういちげ
*/




/*
----- 一 -----
    一二三四五六七八九十百千右雨円王音下火花貝学気休玉金空月犬見口校左山子糸字耳車手出女小上森人水正生青夕石赤川先早草足村大男竹中虫町天田土日入年白文木本名目立力林
----- 二 -----
    引羽雲園遠何科夏家歌画回会海絵外角楽活間丸岩顔汽記帰弓牛魚京強教近兄形計元言原戸古午後語工公広交光考行高黄合谷国黒今才細作算止市矢姉思紙寺自時室社弱首秋週春書少場色食心新親図数西声星晴切雪船線前組走多太体台地池知茶昼長鳥朝直通弟店点電刀冬当東答頭同道読内南肉馬売買麦半番父風分聞米歩母方北毎妹万明鳴毛門夜野友用曜来里理話
----- 三 -----
    悪安暗医委意育員院飲運泳駅央横屋温化荷界開階寒感漢館岸起期客究急級宮球去橋業曲局銀区苦具君係軽血決研県庫湖向幸港号根祭皿仕死使始指歯詩次事持式実写者主守取酒受州拾終習集住重宿所暑助昭消商章勝乗植申身神真深進世整昔全相送想息速族他打対待代第題炭短談着注柱丁帳調追定庭笛鉄転都度投豆島湯登等動童農波配倍箱畑発反坂板皮悲美鼻筆氷表秒病品負部服福物平返勉放味命面問役薬由油有遊予羊洋葉陽様落流旅両緑礼列練路和
----- 四 -----
    愛案以衣位囲胃印英栄塩億加果貨課芽改械害街各覚完官管関観願希季紀喜旗器機議求泣救給挙漁共S協鏡競極訓軍郡径型景芸欠結建健験固功好候航康告差菜最材昨札刷殺察参産散残士氏史司試児治辞失借種周祝順初松笑唱焼象照賞臣信成省清静席積折節説浅戦選然争倉巣束側続卒孫帯隊達単置仲貯兆腸低底停的典伝徒努灯堂働特得毒熱念敗梅博飯飛費必票標不夫付府副粉兵別辺変便包法望牧末満未脈民無約勇要養浴利陸良料量輪類令冷例歴連老労録
----- 五 -----
    圧移因永営衛易益液演応往桜恩可仮価河過賀快解格確額刊幹慣眼基寄規技義逆久旧居許境均禁句群経潔件券険検限現減故個護効厚耕鉱構興講混査再災妻採際在財罪雑酸賛支志枝師資飼示似識質舎謝授修述術準序招承証条状常情織職制性政勢精製税責績接設舌絶銭祖素総造像増則測属率損退貸態団断築張提程適敵統銅導徳独任燃能破犯判版比肥非備俵評貧布婦富武復複仏編弁保墓報豊防貿暴務夢迷綿輸余預容略留領
----- 六 -----
    異遺域宇映延沿我灰拡革閣割株干巻看簡危机揮貴疑吸供胸郷勤筋系敬警劇激穴絹権憲源厳己呼誤后孝皇紅降鋼刻穀骨困砂座済裁策冊蚕至私姿視詞誌磁射捨尺若樹収宗就衆従縦縮熟純処署諸除将傷障城蒸針仁垂推寸盛聖誠宣専泉洗染善奏窓創装層操蔵臓存尊宅担探誕段暖値宙忠著庁頂潮賃痛展討党糖届難乳認納脳派拝背肺俳班晩否批秘腹奮並陛閉片補暮宝訪亡忘棒枚幕密盟模訳郵優幼欲翌乱卵覧裏律臨朗論
----- 4 -----
握扱依威為偉違維緯壱芋陰隠影鋭越援煙鉛縁汚押奥憶菓暇箇雅介戒皆壊較獲刈甘汗乾勧歓監環鑑含奇祈鬼幾輝儀戯詰却脚及丘朽巨拠距御凶叫狂況狭恐響驚仰駆屈掘繰恵傾継迎撃肩兼剣軒圏堅遣玄枯誇鼓互抗攻更恒荒香項稿豪込婚鎖彩歳載剤咲惨旨伺刺脂紫雌執芝斜煮釈寂朱狩趣需舟秀襲柔獣瞬旬巡盾召床沼称紹詳丈畳殖飾触侵振浸寝慎震薪尽陣尋吹是井姓征跡占扇鮮訴僧燥騒贈即俗耐替沢拓濁脱丹淡嘆端弾恥致遅蓄沖跳徴澄沈珍抵堤摘滴添殿吐途渡奴怒到逃倒唐桃透盗塔稲踏闘胴峠突鈍曇弐悩濃杯輩拍泊迫薄爆髪抜罰般販搬範繁盤彼疲被避尾微匹描浜敏怖浮普腐敷膚賦舞幅払噴柄壁捕舗抱峰砲忙坊肪冒傍帽凡盆慢漫妙眠矛霧娘茂猛網黙紋躍雄与誉溶腰踊謡翼雷頼絡欄離粒慮療隣涙隷齢麗暦劣烈恋露郎惑腕
----- 3 -----
哀慰詠悦閲炎宴欧殴乙卸穏佳架華嫁餓怪悔塊慨該概郭隔穫岳掛滑肝冠勘貫喚換敢緩企岐忌軌既棋棄騎欺犠菊吉喫虐虚峡脅凝斤緊愚偶遇刑契啓掲携憩鶏鯨倹賢幻孤弧雇顧娯悟孔巧甲坑拘郊控慌硬絞綱酵克獄恨紺魂墾債催削搾錯撮擦暫祉施諮侍慈軸疾湿赦邪殊寿潤遵如徐匠昇掌晶焦衝鐘冗嬢錠譲嘱辱伸辛審炊粋衰酔遂穂随髄瀬牲婿請斥隻惜籍摂潜繕阻措粗礎双桑掃葬遭憎促賊怠胎袋逮滞滝択卓託諾奪胆鍛壇稚畜窒抽鋳駐彫超聴陳鎮墜帝訂締哲斗塗凍陶痘匿篤豚尿粘婆排陪縛伐帆伴畔藩蛮卑碑泌姫漂苗赴符封伏覆紛墳癖募慕簿芳邦奉胞倣崩飽縫乏妨房某膨謀墨没翻魔埋膜又魅滅免幽誘憂揚揺擁抑裸濫吏隆了猟陵糧厘励零霊裂廉錬炉浪廊楼漏湾
-----J2 -----
亜尉逸姻韻畝浦疫謁猿凹翁虞渦禍靴寡稼蚊拐懐劾涯垣核殻嚇潟括喝渇褐轄且缶陥患堪棺款閑寛憾還艦頑飢宜偽擬糾窮拒享挟恭矯暁菌琴謹襟吟隅勲薫茎渓蛍慶傑嫌献謙繭顕懸弦呉碁江肯侯洪貢溝衡購拷剛酷昆懇佐唆詐砕宰栽斎崎索酢桟傘肢嗣賜滋璽漆遮蛇酌爵珠儒囚臭愁酬醜汁充渋銃叔淑粛塾俊准殉循庶緒叙升抄肖尚宵症祥渉訟硝粧詔奨彰償礁浄剰縄壌醸津唇娠紳診刃迅甚帥睡枢崇据杉斉逝誓析拙窃仙栓旋践遷薦繊禅漸租疎塑壮荘捜挿曹喪槽霜藻妥堕惰駄泰濯但棚痴逐秩嫡衷弔挑眺釣懲勅朕塚漬坪呈廷邸亭貞逓偵艇泥迭徹撤悼搭棟筒謄騰洞督凸屯軟尼妊忍寧把覇廃培媒賠伯舶漠肌鉢閥煩頒妃披扉罷猫賓頻瓶扶附譜侮沸雰憤丙併塀幣弊偏遍泡俸褒剖紡朴僕撲堀奔麻摩磨抹岬銘妄盲耗厄愉諭癒唯悠猶裕融庸窯羅酪痢履柳竜硫虜涼僚寮倫累塁戻鈴賄枠
----- 2 -----
挨曖宛嵐畏萎椅彙茨咽淫唄鬱怨媛艶旺岡臆俺苛牙瓦楷潰諧崖蓋骸柿顎葛釜鎌韓玩伎亀毀畿臼嗅巾僅錦惧串窟熊詣憬稽隙桁拳鍵舷股虎錮勾梗喉乞傲駒頃痕沙挫采塞埼柵刹拶斬恣摯餌鹿叱嫉腫呪袖羞蹴憧拭尻芯腎須裾凄醒脊戚煎羨腺詮箋膳狙遡曽爽痩踪捉遜汰唾堆戴誰旦綻緻酎貼嘲捗椎爪鶴諦溺填妬賭藤瞳栃頓貪丼那奈梨謎鍋匂虹捻罵剥箸氾汎阪斑眉膝肘阜訃蔽餅璧蔑哺蜂貌頬睦勃昧枕蜜冥麺冶弥闇喩湧妖瘍沃拉辣藍璃慄侶瞭瑠呂賂弄籠麓脇
*/