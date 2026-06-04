class Kanji {
	static list = [];
	static kanjiList = [];
	static kanjiByStrokeList = [];
	static kanjiByBushuList = [];
	static kanjiByKankenList = [];
	static onYomiList = [];
	static kunYomiList = [];
	static imiList = [];
	static gakunenList = [];
	static kankenList = ["10", "9", "8", "7", "6", "5", "4", "3", "準2", "2", "準1", "1"];
	static bushuList = [
		{ id: 1, bushu: "一", yomi: "いち"},
		{ id: 2, bushu: "｜", yomi: "ぼう・たてぼう"},
		{ id: 3, bushu: "、", yomi: "てん"},
		{ id: 4, bushu: "ノ", yomi: "の・はらいぼう"},
		{ id: 5, bushu: "乙・乚", yomi: "おつ"},
		{ id: 6, bushu: "亅", yomi: "はねぼう"},
		{ id: 7, bushu: "二", yomi: "に"},
		{ id: 8, bushu: "亠", yomi: "なべぶた・けいさんかんむり"},
		{ id: 9, bushu: "人・亻", yomi: "ひと・にんべん・ひとやね"},
		{ id: 10, bushu: "儿", yomi: "ひとあし・にんにょう"},
		{ id: 11, bushu: "入", yomi: "いる"},
		{ id: 12, bushu: "八", yomi: "はち・は"},
		{ id: 13, bushu: "冂", yomi: "どうがまえ・けいがまえ・まきがまえ"},
		{ id: 14, bushu: "冖", yomi: "わかんむり・ひらかんむり"},
		{ id: 15, bushu: "冫", yomi: "にすい"},
		{ id: 16, bushu: "几", yomi: "つくえ"},
		{ id: 17, bushu: "凵", yomi: "うけばこ・かんがまえ"},
		{ id: 18, bushu: "刀・刂", yomi: "かたな・りっとう"},
		{ id: 19, bushu: "力", yomi: "ちから"},
		{ id: 20, bushu: "勹", yomi: "つつみがまえ"},
		{ id: 21, bushu: "匕", yomi: "ひ"},
		{ id: 22, bushu: "匚", yomi: "はこがまえ"},
		{ id: 23, bushu: "匸", yomi: "かくしがまえ"},
		{ id: 24, bushu: "十", yomi: "じゅう"},
		{ id: 25, bushu: "卜", yomi: "ぼく・と・うらない"},
		{ id: 26, bushu: "卩・㔾", yomi: "わりふ・ふしづくり"},
		{ id: 27, bushu: "厂", yomi: "がんだれ"},
		{ id: 28, bushu: "厶", yomi: "む"},
		{ id: 29, bushu: "又", yomi: "また"},
		{ id: 30, bushu: "口", yomi: "くち・くちへん"},
		{ id: 31, bushu: "囗", yomi: "くにがまえ"},
		{ id: 32, bushu: "土", yomi: "つち・つちへん・どへん"},
		{ id: 33, bushu: "士", yomi: "さむらい"},
		{ id: 34, bushu: "夂", yomi: "ふゆがしら・ち・すいにょう"},
		{ id: 35, bushu: "夕", yomi: "た・ゆうべ"},
		{ id: 36, bushu: "大", yomi: "だい"},
		{ id: 37, bushu: "女", yomi: "おんな"},
		{ id: 38, bushu: "子", yomi: "こ"},
		{ id: 39, bushu: "宀", yomi: "うかんむり"},
		{ id: 40, bushu: "寸", yomi: "すん"},
		{ id: 41, bushu: "小", yomi: "しょう"},
		{ id: 42, bushu: "尢", yomi: "だいのまげあし"},
		{ id: 43, bushu: "尸", yomi: "かばね・しかばね"},
		{ id: 44, bushu: "屮", yomi: "てつ"},
		{ id: 45, bushu: "山", yomi: "やま"},
		{ id: 46, bushu: "川・巛", yomi: "かわ・まげかわ"},
		{ id: 47, bushu: "工", yomi: "え・たくみ・たくみへん"},
		{ id: 48, bushu: "己", yomi: "おのれ"},
		{ id: 49, bushu: "巾", yomi: "はば・はばへん・きんべん"},
		{ id: 50, bushu: "干", yomi: "かん・いちじゅう"},
		{ id: 51, bushu: "幺", yomi: "よう・いとがしら"},
		{ id: 52, bushu: "广", yomi: "まだれ"},
		{ id: 53, bushu: "廴", yomi: "えんにょう・いんにょう"},
		{ id: 54, bushu: "廾", yomi: "こまぬき・にじゅうあし"},
		{ id: 55, bushu: "弋", yomi: "しきがまえ"},
		{ id: 56, bushu: "弓", yomi: "ゆみ"},
		{ id: 57, bushu: "彐・彑", yomi: "けいがしら"},
		{ id: 58, bushu: "彡", yomi: "さんづくり"},
		{ id: 59, bushu: "彳", yomi: "ぎょうにんべん"},
		{ id: 60, bushu: "⺍", yomi: "つかんむり"},
		{ id: 61, bushu: "心・忄・㣺", yomi: "こころ・りっしんべん・したごころ"},
		{ id: 62, bushu: "戈", yomi: "ほこ・ほこづくり・ほこがまえ"},
		{ id: 63, bushu: "戶・戸", yomi: "と・とだれ・とかんむり"},
		{ id: 64, bushu: "手・扌", yomi: "て・てへん"},
		{ id: 65, bushu: "支", yomi: "し・えだにょう"},
		{ id: 66, bushu: "攵・攴", yomi: "のぶん・ぼくづくり"},
		{ id: 67, bushu: "文", yomi: "ぶん"},
		{ id: 68, bushu: "斗", yomi: "とます"},
		{ id: 69, bushu: "斤", yomi: "きん・おのづくり"},
		{ id: 70, bushu: "方", yomi: "ほう・ほうへん・かたへん"},
		{ id: 71, bushu: "旡", yomi: "なし・ぶ・すでのつくり"},
		{ id: 72, bushu: "日", yomi: "ひ・ひへん・にちへん"},
		{ id: 73, bushu: "曰", yomi: "ひらび・いわく"},
		{ id: 74, bushu: "月", yomi: "つき"},
		{ id: 75, bushu: "木", yomi: "き"},
		{ id: 76, bushu: "欠", yomi: "あくび・かける"},
		{ id: 77, bushu: "止", yomi: "とめる"},
		{ id: 78, bushu: "歹", yomi: "かばねへん・いちたへん・がつへん"},
		{ id: 79, bushu: "殳", yomi: "るまた・ほこづくり"},
		{ id: 80, bushu: "毌", yomi: "なかれ・ははのかん"},
		{ id: 81, bushu: "比", yomi: "ならびひ・くらべる"},
		{ id: 82, bushu: "毛", yomi: "け"},
		{ id: 83, bushu: "氏", yomi: "うじ"},
		{ id: 84, bushu: "气", yomi: "きがまえ"},
		{ id: 85, bushu: "水・氵・氺", yomi: "みず・さんずい・したみず"},
		{ id: 86, bushu: "火・灬", yomi: "ひ・ひへん・れんが・れっか"},
		{ id: 87, bushu: "爪", yomi: "つめ・つめかんむり・つめがしら・そうにょう"},
		{ id: 88, bushu: "父", yomi: "ちち"},
		{ id: 89, bushu: "爻", yomi: "まじわる"},
		{ id: 90, bushu: "爿", yomi: "しょうへん"},
		{ id: 91, bushu: "片", yomi: "かた"},
		{ id: 92, bushu: "牙", yomi: "きば"},
		{ id: 93, bushu: "牛", yomi: "うし"},
		{ id: 94, bushu: "犬・犭", yomi: "いぬ・けものへん"},
		{ id: 95, bushu: "玄", yomi: "げん"},
		{ id: 96, bushu: "玉・王", yomi: "たま・おう・おうへん・たまへん"},
		{ id: 97, bushu: "瓜", yomi: "うり"},
		{ id: 98, bushu: "瓦", yomi: "かわら"},
		{ id: 99, bushu: "甘", yomi: "かん・あまい"},
		{ id: 100, bushu: "生", yomi: "うまれる"},
		{ id: 101, bushu: "用", yomi: "もちいる"},
		{ id: 102, bushu: "田", yomi: "た"},
		{ id: 103, bushu: "疋", yomi: "ひき"},
		{ id: 104, bushu: "疒", yomi: "やまいだれ"},
		{ id: 105, bushu: "癶", yomi: "はつがしら"},
		{ id: 106, bushu: "白", yomi: "しろ"},
		{ id: 107, bushu: "皮", yomi: "けがわ・ひのかわ"},
		{ id: 108, bushu: "皿", yomi: "さら"},
		{ id: 109, bushu: "目", yomi: "め"},
		{ id: 110, bushu: "矛", yomi: "ほこ"},
		{ id: 111, bushu: "矢", yomi: "や"},
		{ id: 112, bushu: "石", yomi: "いし"},
		{ id: 113, bushu: "示・礻", yomi: "しめす・しめすへん"},
		{ id: 114, bushu: "禸", yomi: "じゅう"},
		{ id: 115, bushu: "禾", yomi: "のぎ"},
		{ id: 116, bushu: "穴", yomi: "あな"},
		{ id: 117, bushu: "立", yomi: "たつ"},
		{ id: 118, bushu: "竹・⺮", yomi: "たけ・たけかんむり"},
		{ id: 119, bushu: "米", yomi: "こめ"},
		{ id: 120, bushu: "糸", yomi: "いと"},
		{ id: 121, bushu: "缶", yomi: "ほとぎ"},
		{ id: 122, bushu: "网・罒", yomi: "あみがしら・あみめ・よこめ"},
		{ id: 123, bushu: "羊", yomi: "ひつじ"},
		{ id: 124, bushu: "羽", yomi: "はね"},
		{ id: 125, bushu: "老・耂", yomi: "おいかんむり・おいがしら"},
		{ id: 126, bushu: "而", yomi: "しかして・しこうして"},
		{ id: 127, bushu: "耒", yomi: "すきへん・らいすき"},
		{ id: 128, bushu: "耳", yomi: "みみ"},
		{ id: 129, bushu: "聿", yomi: "ふでづくり"},
		{ id: 130, bushu: "肉・月", yomi: "にく・にくづき"},
		{ id: 131, bushu: "臣", yomi: "しん"},
		{ id: 132, bushu: "自", yomi: "みずから"},
		{ id: 133, bushu: "至", yomi: "いたる"},
		{ id: 134, bushu: "臼", yomi: "うす"},
		{ id: 135, bushu: "舌", yomi: "した"},
		{ id: 136, bushu: "舛", yomi: "まいあし"},
		{ id: 137, bushu: "舟", yomi: "ふね"},
		{ id: 138, bushu: "艮", yomi: "ねづくり・こんづくり"},
		{ id: 139, bushu: "色", yomi: "いろ"},
		{ id: 140, bushu: "艸・艹", yomi: "くさ・くさかんむり・そうこう"},
		{ id: 141, bushu: "虍", yomi: "とらがしら・とらかんむり"},
		{ id: 142, bushu: "虫", yomi: "むし"},
		{ id: 143, bushu: "血", yomi: "ち"},
		{ id: 144, bushu: "行", yomi: "ぎょう・ぎょうがまえ・ゆきがまえ"},
		{ id: 145, bushu: "衣・衤", yomi: "ころも・ころもへん"},
		{ id: 146, bushu: "襾・西・覀", yomi: "おおいかんむり・にし"},
		{ id: 147, bushu: "見", yomi: "みる"},
		{ id: 148, bushu: "角", yomi: "かく・つの・つのへん"},
		{ id: 149, bushu: "言", yomi: "げん・ごんべん"},
		{ id: 150, bushu: "谷", yomi: "たに"},
		{ id: 151, bushu: "豆", yomi: "まめ"},
		{ id: 152, bushu: "豕", yomi: "ぶた・いのこ"},
		{ id: 153, bushu: "豸", yomi: "むじなへん"},
		{ id: 154, bushu: "貝", yomi: "かい・こがい"},
		{ id: 155, bushu: "赤", yomi: "あか"},
		{ id: 156, bushu: "走", yomi: "はしる"},
		{ id: 157, bushu: "足・𧾷", yomi: "あし"},
		{ id: 158, bushu: "身", yomi: "み"},
		{ id: 159, bushu: "車", yomi: "くるま"},
		{ id: 160, bushu: "辛", yomi: "からい"},
		{ id: 161, bushu: "辰", yomi: "しんのたつ"},
		{ id: 162, bushu: "辵・⻌・辶", yomi: "しんにょう・しんにゅう"},
		{ id: 163, bushu: "邑・⻏", yomi: "おおざと"},
		{ id: 164, bushu: "酉", yomi: "ひよみのとり・こよみのとり"},
		{ id: 165, bushu: "釆", yomi: "のごめ"},
		{ id: 166, bushu: "里", yomi: "さと"},
		{ id: 167, bushu: "金", yomi: "かね"},
		{ id: 168, bushu: "長", yomi: "ながい"},
		{ id: 169, bushu: "門", yomi: "もん・もんがまえ"},
		{ id: 170, bushu: "阜・阝", yomi: "おか・こざとへん"},
		{ id: 171, bushu: "隶", yomi: "れいづくり"},
		{ id: 172, bushu: "隹", yomi: "ふるとり"},
		{ id: 173, bushu: "雨", yomi: "あめ・あめかんむり・あまかんむり"},
		{ id: 174, bushu: "靑・青", yomi: "あお"},
		{ id: 175, bushu: "非", yomi: "あらず・ひ"},
		{ id: 176, bushu: "面", yomi: "めん"},
		{ id: 177, bushu: "革", yomi: "かくのかわ・つくりがわ"},
		{ id: 178, bushu: "韋", yomi: "なめしがわ"},
		{ id: 179, bushu: "韭", yomi: "にら"},
		{ id: 180, bushu: "音", yomi: "おと"},
		{ id: 181, bushu: "頁", yomi: "おおがい"},
		{ id: 182, bushu: "風", yomi: "かぜ"},
		{ id: 183, bushu: "飛", yomi: "とぶ"},
		{ id: 184, bushu: "食・飠", yomi: "しょく"},
		{ id: 185, bushu: "首", yomi: "くび"},
		{ id: 186, bushu: "香", yomi: "か・かおり"},
		{ id: 187, bushu: "馬", yomi: "うま"},
		{ id: 188, bushu: "骨", yomi: "ほね"},
		{ id: 189, bushu: "高", yomi: "たかい"},
		{ id: 190, bushu: "髟", yomi: "かみがしら・かみかんむり"},
		{ id: 191, bushu: "鬥", yomi: "とうがまえ・たたかいがまえ"},
		{ id: 192, bushu: "鬯", yomi: "ちょう"},
		{ id: 193, bushu: "鬲", yomi: "かなえ"},
		{ id: 194, bushu: "鬼", yomi: "おに・きにょう"},
		{ id: 195, bushu: "魚", yomi: "うお・うおへん・さかなへん"},
		{ id: 196, bushu: "鳥", yomi: "とり"},
		{ id: 197, bushu: "鹵", yomi: "しお"},
		{ id: 198, bushu: "鹿", yomi: "しか"},
		{ id: 199, bushu: "麥・麦", yomi: "むぎ・ばくにょう"},
		{ id: 200, bushu: "麻", yomi: "あさ"},
		{ id: 201, bushu: "黃・黄", yomi: "き"},
		{ id: 202, bushu: "黍", yomi: "きび"},
		{ id: 203, bushu: "黑・黒", yomi: "くろ"},
		{ id: 204, bushu: "黹", yomi: "ち・ふつへん"},
		{ id: 205, bushu: "黽", yomi: "べんあし"},
		{ id: 206, bushu: "鼎", yomi: "かなえ"},
		{ id: 207, bushu: "鼓", yomi: "つづみ"},
		{ id: 208, bushu: "鼠", yomi: "ねずみ"},
		{ id: 209, bushu: "鼻", yomi: "はな"},
		{ id: 210, bushu: "齊・斉", yomi: "せい"},
		{ id: 211, bushu: "齒・歯", yomi: "は"},
		{ id: 212, bushu: "龍・竜", yomi: "りゅう"},
		{ id: 213, bushu: "龜・亀", yomi: "かめ"},
		{ id: 214, bushu: "龠", yomi: "やく"}
	];
	static minnaList = [];
	//?              A 0     B 1      C 2      D 3       E 4      F 5    G 6     J 9       K 10     L 11       M 12                                    
	//?              漢字	 異体字    音読み	 訓読み	   画数	     意味   部首    学年       漢検　   辞典ページ  アニメーション
	//?         pId, pKanji, pItaiji, pOnYomi, pKunYomi, pKakusuu, pImi, pBushu, pGakunen, pKanken, pJitenRef, pPath
	constructor(pId, pKanji, pItaiji, pOnYomi, pKunYomi, pKakusuu, pImi, pBushu, pGakunen, pKanken, pJitenRef, pPath) {
		this.id = pId;
        this.kanji = pKanji;
		Kanji.kanjiList.push(this.kanji);
        this.onYomiList = pOnYomi.split("、");
        this.kunYomiList = pKunYomi.split("、");
		Kanji.kunYomiList.push(pKunYomi);
        this.onYomi = pOnYomi;
        this.kunYomi = pKunYomi;
		this.kunYomiRaw = this.kunYomi.replaceAll("(", "");
		this.kunYomiRaw = this.kunYomiRaw.replaceAll(")", "");
		this.kunYomiRaw = this.kunYomiRaw.replaceAll("～", "");

        this.kakusuu = pKakusuu;
        this.itaiji = pItaiji;
		this.imi = pImi;
		Kanji.imiList.push(this.imi.toLowerCase());
		this.bushu = pBushu;
		this.gakunen = pGakunen;
		this.kanken = pKanken;
		this.jitenRef = pJitenRef;
		this.pathList = pPath.split(";");
		this.pathList.pop();
		this.wordList = [];
		this.minnaWordList = [];

		if (this.gakunen !== "") {
			Kanji.gakunenList[this.gakunen].push(this);
		}

		Kanji.list.push(this);
	}

	setWord(pWord) {
		this.wordList.push(pWord);
	}
	setMinnaWord(pWord) {
		this.minnaWordList.push(pWord);
	}

	static setKanjibyList() {
		let tmpArr = [];
		let stroke = 1;
		const strokeMax = 33;
		for (let i = 1; i <= strokeMax; i++) {
			tmpArr = [];
			tmpArr = Kanji.list.filter(k => k.kakusuu == stroke);
			if (tmpArr.length > 0) Kanji.kanjiByStrokeList.push({by: stroke + "画", kanjiList: tmpArr});
			stroke++;
		}

		for (let i = 0; i < Kanji.bushuList.length; i++) {
			tmpArr = [];
			tmpArr = Kanji.list.filter(k => k.bushu == (i+1));
			Kanji.kanjiByBushuList.push({by: i+1, kanjiList: tmpArr});
		}

		for (let i = 0; i < Kanji.kankenList.length; i++) {
			tmpArr = [];
			tmpArr = Kanji.list.filter(k => k.kanken == Kanji.kankenList[i]);
			Kanji.kanjiByKankenList.push({by: Kanji.kankenList[i]+"級", kanjiList: tmpArr});
		}
	}
}

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