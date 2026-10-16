// 各駅のメタデータ辞書
const STATION_META = {
  '東京': { nameKana: 'とうきょう', nameEn: 'Tokyo', address: '東京都千代田区丸の内一丁目', transfers: ['JR山手線', 'JR京浜東北線', 'JR中央線', 'JR東海道線', 'JR横須賀線', 'JR総武快速線', 'JR京葉線', '東北新幹線', '上越新幹線', '北陸新幹線', '東海道新幹線', '東京メトロ丸ノ内線'] },
  '新橋': { nameKana: 'しんばし', nameEn: 'Shimbashi', address: '東京都港区新橋二丁目', transfers: ['JR山手線', 'JR京浜東北線', 'JR東海道線', 'JR横須賀線', '東京メトロ銀座線', '都営浅草線', 'ゆりかもめ'] },
  '品川': { nameKana: 'しながわ', nameEn: 'Shinagawa', address: '東京都港区高輪三丁目', transfers: ['JR山手線', 'JR京浜東北線', 'JR東海道線', 'JR横須賀線', '東海道新幹線', '京急本線'] },
  '川崎': { nameKana: 'かわさき', nameEn: 'Kawasaki', address: '神奈川県川崎市川崎区駅前本町', transfers: ['JR東海道線', 'JR京浜東北線', 'JR南武線', '京急本線', '京急大師線'] },
  '横浜': { nameKana: 'よこはま', nameEn: 'Yokohama', address: '神奈川県横浜市西区高島二丁目', transfers: ['JR東海道線', 'JR横須賀線', 'JR湘南新宿ライン', 'JR京浜東北線', 'JR根岸線', 'JR横浜線', '東急東横線', '横浜高速鉄道みなとみらい線', '京急本線', '相鉄本線', '横浜市営地下鉄ブルーライン'] },
  '戸塚': { nameKana: 'とつか', nameEn: 'Totsuka', address: '神奈川県横浜市戸塚区戸塚町', transfers: ['JR東海道線', 'JR横須賀線', 'JR湘南新宿ライン', '横浜市営地下鉄ブルーライン'] },
  '大船': { nameKana: 'おおふな', nameEn: 'Ofuna', address: '神奈川県鎌倉市大船一丁目', transfers: ['JR東海道線', 'JR横須賀線', 'JR湘南新宿ライン', 'JR根岸線', '湘南モノレール'] },
  '藤沢': { nameKana: 'ふじさわ', nameEn: 'Fujisawa', address: '神奈川県藤沢市藤沢', transfers: ['JR東海道線', 'JR湘南新宿ライン', '小田急江ノ島線', '江ノ島電鉄線'] },
  '辻堂': { nameKana: 'つじどう', nameEn: 'Tsujido', address: '神奈川県藤沢市辻堂一丁目', transfers: ['JR東海道線', 'JR湘南新宿ライン'] },
  '茅ケ崎': { nameKana: 'ちがさき', nameEn: 'Chigasaki', address: '神奈川県茅ヶ崎市元町', transfers: ['JR東海道線', 'JR湘南新宿ライン', 'JR相模線'] },
  '平塚': { nameKana: 'ひらつか', nameEn: 'Hiratsuka', address: '神奈川県平塚市宝町', transfers: ['JR東海道線', 'JR湘南新宿ライン'] },
  '大磯': { nameKana: 'おおいそ', nameEn: 'Oiso', address: '神奈川県中郡大磯町大磯', transfers: ['JR東海道線', 'JR湘南新宿ライン'] },
  '二宮': { nameKana: 'にのみや', nameEn: 'Ninomiya', address: '神奈川県中郡二宮町二宮', transfers: ['JR東海道線', 'JR湘南新宿ライン'] },
  '国府津': { nameKana: 'こうづ', nameEn: 'Kozu', address: '神奈川県小田原市国府津四丁目', transfers: ['JR東海道線', 'JR湘南新宿ライン', 'JR御殿場線'] },
  '鴨宮': { nameKana: 'かものみや', nameEn: 'Kamonomiya', address: '神奈川県小田原市鴨宮', transfers: ['JR東海道線', 'JR湘南新宿ライン'] },
  '小田原': { nameKana: 'おだわら', nameEn: 'Odawara', address: '神奈川県小田原市栄町一丁目', transfers: ['JR東海道線', 'JR湘南新宿ライン', '東海道新幹線', '小田急小田原線', '箱根登山鉄道線', '伊豆箱根鉄道大雄山線'] },
  '早川': { nameKana: 'はやかわ', nameEn: 'Hayakawa', address: '神奈川県小田原市早川一丁目', transfers: ['JR東海道線'] },
  '根府川': { nameKana: 'ねぶかわ', nameEn: 'Nebukawa', address: '神奈川県小田原市根府川', transfers: ['JR東海道線'] },
  '真鶴': { nameKana: 'まなづる', nameEn: 'Manazuru', address: '神奈川県足柄下郡真鶴町真鶴', transfers: ['JR東海道線'] },
  '湯河原': { nameKana: 'ゆがわら', nameEn: 'Yugawara', address: '神奈川県足柄下郡湯河原町宮下', transfers: ['JR東海道線'] },
  '熱海': { nameKana: 'あたみ', nameEn: 'Atami', address: '静岡県熱海市田原本町', transfers: ['JR東海道線', 'JR伊東線', '東海道新幹線'] },
  '来宮': { nameKana: 'きのみや', nameEn: 'Kinomiya', address: '静岡県熱海市福道町', transfers: ['JR伊東線'] },
  '伊豆多賀': { nameKana: 'いずたが', nameEn: 'Izu-Taga', address: '静岡県熱海市上多賀', transfers: ['JR伊東線'] },
  '網代': { nameKana: 'あじろ', nameEn: 'Ajiro', address: '静岡県熱海市網代', transfers: ['JR伊東線'] },
  '宇佐美': { nameKana: 'うさみ', nameEn: 'Usami', address: '静岡県伊東市宇佐美', transfers: ['JR伊東線'] },
  '伊東': { nameKana: 'いとう', nameEn: 'Ito', address: '静岡県伊東市湯川三丁目', transfers: ['JR伊東線', '伊豆急行線'] },
  '西大井': { nameKana: 'にしおおい', nameEn: 'Nishi-Oi', address: '東京都品川区西大井一丁目', transfers: ['JR横須賀線', 'JR湘南新宿ライン', '相鉄・JR直通線'] },
  '武蔵小杉': { nameKana: 'むさしこすぎ', nameEn: 'Musashi-Kosugi', address: '神奈川県川崎市中原区小杉町三丁目', transfers: ['JR横須賀線', 'JR湘南新宿ライン', 'JR南武線', '相鉄・JR直通線', '東急東横線', '東急目黒線'] },
  '新川崎': { nameKana: 'しんかわさき', nameEn: 'Shin-Kawasaki', address: '神奈川県川崎市幸区鹿島田一丁目', transfers: ['JR横須賀線', 'JR湘南新宿ライン'] },
  '保土ケ谷': { nameKana: 'ほどがや', nameEn: 'Hodogaya', address: '神奈川県横浜市保土ケ谷区岩井町', transfers: ['JR横須賀線', 'JR湘南新宿ライン'] },
  '東戸塚': { nameKana: 'ひがしとつか', nameEn: 'Higashi-Totsuka', address: '神奈川県横浜市戸塚区品濃町', transfers: ['JR横須賀線', 'JR湘南新宿ライン'] },
  '北鎌倉': { nameKana: 'きたかまくら', nameEn: 'Kita-Kamakura', address: '神奈川県鎌倉市山ノ内', transfers: ['JR横須賀線', 'JR湘南新宿ライン'] },
  '鎌倉': { nameKana: 'かまくら', nameEn: 'Kamakura', address: '神奈川県鎌倉市小町一丁目', transfers: ['JR横須賀線', 'JR湘南新宿ライン', '江ノ島電鉄線'] },
  '逗子': { nameKana: 'ずし', nameEn: 'Zushi', address: '神奈川県逗子市逗子一丁目', transfers: ['JR横須賀線', 'JR湘南新宿ライン', '京急逗子線'] },
  '東逗子': { nameKana: 'ひがしずし', nameEn: 'Higashi-Zushi', address: '神奈川県逗子市沼間一丁目', transfers: ['JR横須賀線'] },
  '田浦': { nameKana: 'たうら', nameEn: 'Taura', address: '神奈川県横須賀市田浦町一丁目', transfers: ['JR横須賀線'] },
  '横須賀': { nameKana: 'よこすか', nameEn: 'Yokosuka', address: '神奈川県横須賀市東逸見町一丁目', transfers: ['JR横須賀線', '京急本線'] },
  '衣笠': { nameKana: 'きぬがさ', nameEn: 'Kinugasa', address: '神奈川県横須賀市衣笠栄町二丁目', transfers: ['JR横須賀線'] },
  '久里浜': { nameKana: 'くりはま', nameEn: 'Kurihama', address: '神奈川県横須賀市久里浜一丁目', transfers: ['JR横須賀線', '京急久里浜線'] },
  '新日本橋': { nameKana: 'しんにほんばし', nameEn: 'Shin-Nihombashi', address: '東京都中央区日本橋室町四丁目', transfers: ['JR総武快速線', '東京メトロ銀座線', '東京メトロ半蔵門線'] },
  '馬喰町': { nameKana: 'ばくろちょう', nameEn: 'Bakurocho', address: '東京都中央区日本橋馬喰町一丁目', transfers: ['JR総武快速線', '都営浅草線', '都営新宿線'] },
  '錦糸町': { nameKana: 'きんしちょう', nameEn: 'Kinshicho', address: '東京都墨田区江東橋三丁目', transfers: ['JR総武快速線', 'JR中央・総武線各駅停車', '東京メトロ半蔵門線'] },
  '新小岩': { nameKana: 'しんこいわ', nameEn: 'Shin-Koiwa', address: '東京都葛飾区新小岩一丁目', transfers: ['JR総武快速線', 'JR中央・総武線各駅停車'] },
  '市川': { nameKana: 'いちかわ', nameEn: 'Ichikawa', address: '千葉県市川市市川一丁目', transfers: ['JR総武快速線', 'JR中央・総武線各駅停車'] },
  '船橋': { nameKana: 'ふなばし', nameEn: 'Funabashi', address: '千葉県船橋市本町七丁目', transfers: ['JR総武快速線', 'JR中央・総武線各駅停車', '東武アーバンパークライン', '京成本線'] },
  '津田沼': { nameKana: 'つだぬま', nameEn: 'Tsudanuma', address: '千葉県習志野市津田沼一丁目', transfers: ['JR総武快速線', 'JR中央・総武線各駅停車', '新京成線'] },
  '稲毛': { nameKana: 'いなげ', nameEn: 'Inage', address: '千葉県千葉市稲毛区稲毛東三丁目', transfers: ['JR総武快速線', 'JR中央・総武線各駅停車', '京成千葉線'] },
  '千葉': { nameKana: 'ちば', nameEn: 'Chiba', address: '千葉県千葉市中央区新千葉一丁目', transfers: ['JR総武快速線', 'JR中央・総武線各駅停車', 'JR総武本線', 'JR成田線', 'JR内房線', 'JR外房線', '千葉都市モノレール'] },
  '上野': { nameKana: 'うえの', nameEn: 'Ueno', address: '東京都台東区上野七丁目', transfers: ['JR山手線', 'JR京浜東北線', 'JR宇都宮線', 'JR高崎線', 'JR常磐線快速', '東北新幹線', '上越新幹線', '北陸新幹線', '東京メトロ銀座線', '東京メトロ日比谷線', '京成本線'] },
  '尾久': { nameKana: 'おく', nameEn: 'Oku', address: '東京都北区昭和町一丁目', transfers: ['JR宇都宮線', 'JR高崎線'] },
  '赤羽': { nameKana: 'あかばね', nameEn: 'Akabane', address: '東京都北区赤羽一丁目', transfers: ['JR宇都宮線', 'JR高崎線', 'JR埼京線', 'JR湘南新宿ライン', 'JR京浜東北線'] },
  '浦和': { nameKana: 'うらわ', nameEn: 'Urawa', address: '埼玉県さいたま市浦和区高砂一丁目', transfers: ['JR宇都宮線', 'JR高崎線', 'JR湘南新宿ライン', 'JR京浜東北線'] },
  'さいたま新都心': { nameKana: 'さいたましんとしん', nameEn: 'Saitama-Shintoshin', address: '埼玉県さいたま市大宮区吉敷町四丁目', transfers: ['JR宇都宮線', 'JR高崎線', 'JR京浜東北線'] },
  '大宮': { nameKana: 'おおみや', nameEn: 'Omiya', address: '埼玉県さいたま市大宮区錦町', transfers: ['JR宇都宮線', 'JR高崎線', 'JR埼京線', 'JR川越線', 'JR湘南新宿ライン', 'JR京浜東北線', 'JR武蔵野線', '東北新幹線', '上越新幹線', '北陸新幹線', '東武アーバンパークライン', '埼玉新都市交通ニューシャトル'] },
  '土呂': { nameKana: 'とろ', nameEn: 'Toro', address: '埼玉県さいたま市北区土呂町一丁目', transfers: ['JR宇都宮線'] },
  '東大宮': { nameKana: 'ひがしおおみや', nameEn: 'Higashi-Omiya', address: '埼玉県さいたま市見沼区東大宮五丁目', transfers: ['JR宇都宮線'] },
  '蓮田': { nameKana: 'はすだ', nameEn: 'Hasuda', address: '埼玉県蓮田市本町', transfers: ['JR宇都宮線'] },
  '白岡': { nameKana: 'しらおか', nameEn: 'Shiraoka', address: '埼玉県白岡市小久喜', transfers: ['JR宇都宮線'] },
  '新白岡': { nameKana: 'しんしらおか', nameEn: 'Shin-Shiraoka', address: '埼玉県白岡市新白岡七丁目', transfers: ['JR宇都宮線'] },
  '久喜': { nameKana: 'くき', nameEn: 'Kuki', address: '埼玉県久喜市久喜中央二丁目', transfers: ['JR宇都宮線', '東武伊勢崎線'] },
  '東鷲宮': { nameKana: 'ひがしわしのみや', nameEn: 'Higashi-Washinomiya', address: '埼玉県久喜市桜田三丁目', transfers: ['JR宇都宮線'] },
  '栗橋': { nameKana: 'くりはし', nameEn: 'Kurihashi', address: '埼玉県久喜市栗橋北一丁目', transfers: ['JR宇都宮線', '東武日光線'] },
  '古河': { nameKana: 'こが', nameEn: 'Koga', address: '茨城県古河市本町一丁目', transfers: ['JR宇都宮線'] },
  '野木': { nameKana: 'のぎ', nameEn: 'Nogi', address: '栃木県下都賀郡野木町大字丸林', transfers: ['JR宇都宮線'] },
  '間々田': { nameKana: 'ままだ', nameEn: 'Mamada', address: '栃木県小山市乙女三丁目', transfers: ['JR宇都宮線'] },
  '小山': { nameKana: 'おやま', nameEn: 'Oyama', address: '栃木県小山市城山町三丁目', transfers: ['JR宇都宮線', 'JR両毛線', 'JR水戸線', '東北新幹線'] },
  '小金井': { nameKana: 'こがねい', nameEn: 'Koganei', address: '栃木県下野市駅東一丁目', transfers: ['JR宇都宮線'] },
  '自治医大': { nameKana: 'じちいだい', nameEn: 'Jichiidai', address: '栃木県下野市医大前三丁目', transfers: ['JR宇都宮線'] },
  '石橋': { nameKana: 'いしばし', nameEn: 'Ishibashi', address: '栃木県下野市石橋', transfers: ['JR宇都宮線'] },
  '雀宮': { nameKana: 'すずめのみや', nameEn: 'Suzumenomiya', address: '栃木県宇都宮市雀の宮一丁目', transfers: ['JR宇都宮線'] },
  '宇都宮': { nameKana: 'うつのみや', nameEn: 'Utsunomiya', address: '栃木県宇都宮市川向町', transfers: ['JR宇都宮線', 'JR日光線', 'JR烏山線', '東北新幹線', '宇都宮ライトレール'] },
  '岡本': { nameKana: 'おかもと', nameEn: 'Okamoto', address: '栃木県宇都宮市下岡本町', transfers: ['JR宇都宮線', 'JR烏山線'] },
  '宝積寺': { nameKana: 'ほうしゃくじ', nameEn: 'Hoshakuji', address: '栃木県塩谷郡高根沢町大字宝積寺', transfers: ['JR宇都宮線', 'JR烏山線'] },
  '氏家': { nameKana: 'うじいえ', nameEn: 'Ujiie', address: '栃木県さくら市氏家', transfers: ['JR宇都宮線'] },
  '蒲須坂': { nameKana: 'かますさか', nameEn: 'Kamasusaka', address: '栃木県さくら市蒲須坂', transfers: ['JR宇都宮線'] },
  '片岡': { nameKana: 'かたおか', nameEn: 'Kataoka', address: '栃木県矢板市片岡', transfers: ['JR宇都宮線'] },
  '矢板': { nameKana: 'やいた', nameEn: 'Yaita', address: '栃木県矢板市扇町一丁目', transfers: ['JR宇都宮線'] },
  '野崎': { nameKana: 'のざき', nameEn: 'Nozaki', address: '栃木県大田原市野崎一丁目', transfers: ['JR宇都宮線'] },
  '西那須野': { nameKana: 'にしなすの', nameEn: 'Nishi-Nasuno', address: '栃木県那須塩原市永森', transfers: ['JR宇都宮線'] },
  '那須塩原': { nameKana: 'なすしおばら', nameEn: 'Nasu-Shiobara', address: '栃木県那須塩原市大原間', transfers: ['JR宇都宮線', '東北新幹線'] },
  '黒磯': { nameKana: 'くろいそ', nameEn: 'Kuroiso', address: '栃木県那須塩原市本町', transfers: ['JR宇都宮線', 'JR東北本線(郡山方面)'] },
  '宮原': { nameKana: 'みやはら', nameEn: 'Miyahara', address: '埼玉県さいたま市北区宮原町三丁目', transfers: ['JR高崎線'] },
  '上尾': { nameKana: 'あげお', nameEn: 'Ageo', address: '埼玉県上尾市柏座一丁目', transfers: ['JR高崎線'] },
  '北上尾': { nameKana: 'きたあげお', nameEn: 'Kita-Ageo', address: '埼玉県上尾市原新町', transfers: ['JR高崎線'] },
  '桶川': { nameKana: 'おけがわ', nameEn: 'Okegawa', address: '埼玉県桶川市南一丁目', transfers: ['JR高崎線'] },
  '北本': { nameKana: 'きたもと', nameEn: 'Kitamoto', address: '埼玉県北本市北本一丁目', transfers: ['JR高崎線'] },
  '鴻巣': { nameKana: 'こうのす', nameEn: 'Konosu', address: '埼玉県鴻巣市本町一丁目', transfers: ['JR高崎線'] },
  '北鴻巣': { nameKana: 'きたこうのす', nameEn: 'Kita-Konosu', address: '埼玉県鴻巣市赤見台一丁目', transfers: ['JR高崎線'] },
  '吹上': { nameKana: 'ふきあげ', nameEn: 'Fukiage', address: '埼玉県鴻巣市吹上本町一丁目', transfers: ['JR高崎線'] },
  '行田': { nameKana: 'ぎょうだ', nameEn: 'Gyoda', address: '埼玉県行田市壱里山町', transfers: ['JR高崎線'] },
  '熊谷': { nameKana: 'くまがや', nameEn: 'Kumagaya', address: '埼玉県熊谷市筑波二丁目', transfers: ['JR高崎線', '上越新幹線', '北陸新幹線', '秩父鉄道秩父本線'] },
  '籠原': { nameKana: 'かごはら', nameEn: 'Kagohara', address: '埼玉県熊谷市新堀', transfers: ['JR高崎線'] },
  '深谷': { nameKana: 'ふかや', nameEn: 'Fukaya', address: '埼玉県深谷市西島町三丁目', transfers: ['JR高崎線'] },
  '岡部': { nameKana: 'おかべ', nameEn: 'Okabe', address: '埼玉県深谷市岡', transfers: ['JR高崎線'] },
  '本庄': { nameKana: 'ほんじょう', nameEn: 'Honjo', address: '埼玉県本庄市銀座三丁目', transfers: ['JR高崎線'] },
  '神保原': { nameKana: 'じんぼはら', nameEn: 'Jimbohara', address: '埼玉県児玉郡上里町大字神保原町', transfers: ['JR高崎線'] },
  '新町': { nameKana: 'しんまち', nameEn: 'Shim-Machi', address: '群馬県高崎市新町', transfers: ['JR高崎線'] },
  '倉賀野': { nameKana: 'くらがの', nameEn: 'Kuragano', address: '群馬県高崎市倉賀野町', transfers: ['JR高崎線', 'JR八高線'] },
  '高崎': { nameKana: 'たかさき', nameEn: 'Takasaki', address: '群馬県高崎市八島町', transfers: ['JR高崎線', 'JR上越線', 'JR信越本線', 'JR吾妻線', 'JR両毛線', 'JR八高線', '上越新幹線', '北陸新幹線', '上信電鉄線'] },
  '池袋': { nameKana: 'いけぶくろ', nameEn: 'Ikebukuro', address: '東京都豊島区南池袋一丁目', transfers: ['JR山手線', 'JR埼京線', 'JR湘南新宿ライン', '東武東上線', '西武池袋線', '東京メトロ丸ノ内線', '東京メトロ有楽町線', '東京メトロ副都心線'] },
  '新宿': { nameKana: 'しんじゅく', nameEn: 'Shinjuku', address: '東京都新宿区新宿三丁目', transfers: ['JR山手線', 'JR中央線', 'JR埼京線', 'JR湘南新宿ライン', '相鉄・JR直通線', '小田急小田原線', '京王線', '東京メトロ丸ノ内線', '都営新宿線', '都営大江戸線'] },
  '渋谷': { nameKana: 'しぶや', nameEn: 'Shibuya', address: '東京都渋谷区道玄坂一丁目', transfers: ['JR山手線', 'JR埼京線', 'JR湘南新宿ライン', '相鉄・JR直通線', '東急東横線', '東急田園都市線', '京王井の頭線', '東京メトロ銀座線', '東京メトロ半蔵門線', '東京メトロ副都心線'] },
  '恵比寿': { nameKana: 'えびす', nameEn: 'Ebisu', address: '東京都渋谷区恵比寿南一丁目', transfers: ['JR山手線', 'JR埼京線', 'JR湘南新宿ライン', '相鉄・JR直通線', '東京メトロ日比谷線'] },
  '大崎': { nameKana: 'おおさき', nameEn: 'Osaki', address: '東京都品川区大崎一丁目', transfers: ['JR山手線', 'JR埼京線', 'JR湘南新宿ライン', '相鉄・JR直通線', '東京臨海高速鉄道りんかい線'] },
  '高崎問屋町': { nameKana: 'たかさきとんやまち', nameEn: 'Takasaki-Tonyamachi', address: '群馬県高崎市貝沢町', transfers: ['JR上越線', 'JR両毛線', 'JR吾妻線'] },
  '井野': { nameKana: 'いの', nameEn: 'Ino', address: '群馬県高崎市井野町', transfers: ['JR上越線', 'JR両毛線', 'JR吾妻線'] },
  '新前橋': { nameKana: 'しんまえばし', nameEn: 'Shin-Maebashi', address: '群馬県前橋市古市町', transfers: ['JR上越線', 'JR両毛線', 'JR吾妻線'] },
  '群馬総社': { nameKana: 'ぐんまそうじゃ', nameEn: 'Gumma-Soja', address: '群馬県前橋市総社町植野', transfers: ['JR上越線', 'JR吾妻線'] },
  '八木原': { nameKana: 'やぎはら', nameEn: 'Yagihara', address: '群馬県渋川市八木原', transfers: ['JR上越線', 'JR吾妻線'] },
  '渋川': { nameKana: 'しぶかわ', nameEn: 'Shibukawa', address: '群馬県渋川市渋川', transfers: ['JR上越線', 'JR吾妻線'] },
  '敷島': { nameKana: 'しきしま', nameEn: 'Shikishima', address: '群馬県渋川市赤城町敷島', transfers: ['JR上越線'] },
  '津久田': { nameKana: 'つくだ', nameEn: 'Tsukuda', address: '群馬県渋川市赤城町津久田', transfers: ['JR上越線'] },
  '岩本': { nameKana: 'いわもと', nameEn: 'Iwamoto', address: '群馬県沼田市岩本町', transfers: ['JR上越線'] },
  '沼田': { nameKana: 'ぬまた', nameEn: 'Numata', address: '群馬県沼田市清水町', transfers: ['JR上越線'] },
  '後閑': { nameKana: 'ごかん', nameEn: 'Gokan', address: '群馬県利根郡みなかみ町後閑', transfers: ['JR上越線'] },
  '上牧': { nameKana: 'かみもく', nameEn: 'Kamimoku', address: '群馬県利根郡みなかみ町上牧', transfers: ['JR上越線'] },
  '水上': { nameKana: 'みなかみ', nameEn: 'Minakami', address: '群馬県利根郡みなかみ町鹿野沢', transfers: ['JR上越線'] },
  '湯檜曽': { nameKana: 'ゆびそ', nameEn: 'Yubiso', address: '群馬県利根郡みなかみ町湯檜曽', transfers: ['JR上越線'] },
  '土合': { nameKana: 'どあい', nameEn: 'Doai', address: '群馬県利根郡みなかみ町湯檜曽', transfers: ['JR上越線'] },
  '土樽': { nameKana: 'つちたる', nameEn: 'Tsuchitaru', address: '新潟県南魚沼郡湯沢町大字土樽', transfers: ['JR上越線'] },
  '越後中里': { nameKana: 'えちごなかざと', nameEn: 'Echigo-Nakazato', address: '新潟県南魚沼郡湯沢町大字土樽', transfers: ['JR上越線'] },
  '岩原スキー場前': { nameKana: 'いわっぱらすきーじょうまえ', nameEn: 'Iwappara-Skiing-Ground', address: '新潟県南魚沼郡湯沢町大字土樽', transfers: ['JR上越線'] },
  '越後湯沢': { nameKana: 'えちごゆざわ', nameEn: 'Echigo-Yuzawa', address: '新潟県南魚沼郡湯沢町大字湯沢', transfers: ['JR上越線', '上越新幹線', '北越急行ほくほく線'] },
  '石打': { nameKana: 'いしうち', nameEn: 'Ishiuchi', address: '新潟県南魚沼市上薬師堂', transfers: ['JR上越線'] },
  '大沢': { nameKana: 'おおさわ', nameEn: 'Osawa', address: '新潟県南魚沼市大沢', transfers: ['JR上越線'] },
  '上越国際スキー場前': { nameKana: 'じょうえつこくさいすきーじょうまえ', nameEn: 'Joetsu-Kokusai-Skijo-mae', address: '新潟県南魚沼市樺野沢', transfers: ['JR上越線'] },
  '塩沢': { nameKana: 'しおざわ', nameEn: 'Shiozawa', address: '新潟県南魚沼市塩沢', transfers: ['JR上越線'] },
  '六日町': { nameKana: 'むいかまち', nameEn: 'Muikamachi', address: '新潟県南魚沼市六日町', transfers: ['JR上越線', '北越急行ほくほく線'] },
  '五日町': { nameKana: 'いつかまち', nameEn: 'Itsukamachi', address: '新潟県南魚沼市五日町', transfers: ['JR上越線'] },
  '浦佐': { nameKana: 'うらさ', nameEn: 'Urasa', address: '新潟県南魚沼市浦佐', transfers: ['JR上越線', '上越新幹線'] },
  '八色': { nameKana: 'やいろ', nameEn: 'Yairo', address: '新潟県南魚沼市浦佐', transfers: ['JR上越線'] },
  '小出': { nameKana: 'こいで', nameEn: 'Koide', address: '新潟県魚沼市四日町', transfers: ['JR上越線', 'JR只見線'] },
  '越後堀之内': { nameKana: 'えちごほりのうち', nameEn: 'Echigo-Horinouchi', address: '新潟県魚沼市堀之内', transfers: ['JR上越線'] },
  '北堀之内': { nameKana: 'きたほりのうち', nameEn: 'Kita-Horinouchi', address: '新潟県魚沼市下島', transfers: ['JR上越線'] },
  '越後川口': { nameKana: 'えちごかわぐち', nameEn: 'Echigo-Kawaguchi', address: '新潟県長岡市川口牛ケ島', transfers: ['JR上越線', 'JR飯山線'] },
  '小千谷': { nameKana: 'おぢや', nameEn: 'Ojiya', address: '新潟県小千谷市東栄一丁目', transfers: ['JR上越線'] },
  '越後滝谷': { nameKana: 'えちごたきや', nameEn: 'Echigo-Takiya', address: '新潟県長岡市滝谷町', transfers: ['JR上越線'] },
  '宮内': { nameKana: 'みやうち', nameEn: 'Miyauchi', address: '新潟県長岡市宮内三丁目', transfers: ['JR上越線', 'JR信越本線'] },
  '妙高高原': {
    "nameKana": "みょうこうこうげん",
    "nameEn": "Myoko-Kogen",
    "address": "新潟県妙高市大字田口312",
    "transfers": [
      "妙高はねうまライン",
      "しなの鉄道北しなの線"
    ]
  },
  '関山': {
    "nameKana": "せきやま",
    "nameEn": "Sekiyama",
    "address": "新潟県妙高市大字関山1213-15",
    "transfers": []
  },
  '二本木': {
    "nameKana": "にほんぎ",
    "nameEn": "Nihongi",
    "address": "新潟県上越市中郷区板橋552",
    "transfers": []
  },
  '新井': {
    "nameKana": "あらい",
    "nameEn": "Arai",
    "address": "東京都中野区上高田5丁目43-20",
    "transfers": [
      "妙高はねうまライン",
      "北越急行ほくほく線直通"
    ]
  },
  '北新井': {
    "nameKana": "きたあらい",
    "nameEn": "Kita-Arai",
    "address": "新潟県妙高市柳井田町1丁目10-20",
    "transfers": []
  },
  '上越妙高': {
    "nameKana": "じょうえつみょうこう",
    "nameEn": "Joetsu-Myoko",
    "address": "新潟県上越市大和",
    "transfers": [
      "北陸新幹線",
      "妙高はねうまライン"
    ]
  },
  '南高田': {
    "nameKana": "みなみたかだ",
    "nameEn": "Minami-Takada",
    "address": "新潟県上越市南高田町1-1",
    "transfers": []
  },
  '高田': {
    "nameKana": "たかだ",
    "nameEn": "Takada",
    "address": "東京都新宿区高田馬場1丁目35-2",
    "transfers": []
  },
  '春日山': {
    "nameKana": "かすがやま",
    "nameEn": "Kasugayama",
    "address": "新潟県上越市春日山町3丁目1-1",
    "transfers": []
  },
  '直江津': {
    "nameKana": "なおえつ",
    "nameEn": "Naoetsu",
    "address": "新潟県上越市東町1-1",
    "transfers": [
      "JR信越本線",
      "妙高はねうまライン",
      "日本海ひすいライン",
      "北越急行ほくほく線"
    ]
  },
  '長野': {
    "nameKana": "ながの",
    "nameEn": "Nagano",
    "address": "長野県長野市南千歳1-25",
    "transfers": [
      "JR北陸新幹線",
      "JR篠ノ井線",
      "JR信越本線",
      "しなの鉄道北しなの線",
      "長野電鉄長野線"
    ]
  },
  '北長野': {
    "nameKana": "きたながの",
    "nameEn": "Kita-Nagano",
    "address": "長野県長野市中越2丁目34-34",
    "transfers": []
  },
  '三才': {
    "nameKana": "さんさい",
    "nameEn": "Sansai",
    "address": "長野県長野市大字三才2207",
    "transfers": []
  },
  '豊野': {
    "nameKana": "とよの",
    "nameEn": "Toyono",
    "address": "長野県長野市豊野町豊野1002",
    "transfers": []
  },
  '牟礼': {
    "nameKana": "むれ",
    "nameEn": "Mure",
    "address": "長野県上水内郡飯綱町大字豊野4921-1",
    "transfers": []
  },
  '古間': {
    "nameKana": "ふるま",
    "nameEn": "Furuma",
    "address": "長野県上水内郡信濃町大字富濃409",
    "transfers": []
  },
  '黒姫': {
    "nameKana": "くろひめ",
    "nameEn": "Kurohime",
    "address": "長野県上水内郡信濃町大字柏原2711",
    "transfers": []
  },
  '谷浜': {
    "nameKana": "たにはま",
    "nameEn": "Tanihama",
    "address": "新潟県上越市大字長浜122",
    "transfers": []
  },
  '有間川': {
    "nameKana": "ありまがわ",
    "nameEn": "Arimagawa",
    "address": "新潟県上越市大字有間川1075",
    "transfers": []
  },
  '名立': {
    "nameKana": "なだち",
    "nameEn": "Nadachi",
    "address": "新潟県上越市名立区名立大町1009",
    "transfers": []
  },
  '筒石': {
    "nameKana": "つついし",
    "nameEn": "Tsutsuishi",
    "address": "新潟県糸魚川市大字仙納927-2",
    "transfers": []
  },
  '能生': {
    "nameKana": "のう",
    "nameEn": "No",
    "address": "新潟県糸魚川市大字能生2583",
    "transfers": []
  },
  '浦本': {
    "nameKana": "うらもと",
    "nameEn": "Uramoto",
    "address": "新潟県糸魚川市大字間脇813",
    "transfers": []
  },
  '梶屋敷': {
    "nameKana": "かじやしき",
    "nameEn": "Kajiyashiki",
    "address": "新潟県糸魚川市大字田伏368",
    "transfers": []
  },
  'えちご押上ひすい海岸': {
    "nameKana": "えちごおしあげひすいかいがん",
    "nameEn": "Echigo-Oshiage-Hisuikaigan",
    "address": "新潟県糸魚川市押上2丁目107",
    "transfers": []
  },
  '糸魚川': {
    "nameKana": "いといがわ",
    "nameEn": "Itoigawa",
    "address": "新潟県糸魚川市大町1丁目7-47",
    "transfers": [
      "JR北陸新幹線",
      "JR大糸線",
      "日本海ひすいライン"
    ]
  },
  '青海': {
    "nameKana": "おうみ",
    "nameEn": "Omi",
    "address": "新潟県糸魚川市大字青海",
    "transfers": []
  },
  '親不知': {
    "nameKana": "おやしらず",
    "nameEn": "Oyashirazu",
    "address": "新潟県糸魚川市大字歌18",
    "transfers": []
  },
  '市振': {
    "nameKana": "いちぶり",
    "nameEn": "Ichiburi",
    "address": "新潟県糸魚川市大字市振910-3",
    "transfers": [
      "日本海ひすいライン",
      "あいの風とやま鉄道"
    ]
  },
  '魚沼丘陵': {
    "nameKana": "うおぬまきゅうりょう",
    "nameEn": "Uonuma-Kyuryo",
    "address": "新潟県南魚沼市野田228-5",
    "transfers": []
  },
  '美佐島': {
    "nameKana": "みさじま",
    "nameEn": "Misajima",
    "address": "新潟県十日町市午",
    "transfers": []
  },
  'しんざ': {
    "nameKana": "しんざ",
    "nameEn": "Shinza",
    "address": "新潟県十日町市新座甲",
    "transfers": []
  },
  '十日町': {
    "nameKana": "とおかまち",
    "nameEn": "Tokamachi",
    "address": "新潟県十日町市旭町261-22",
    "transfers": [
      "JR飯山線",
      "北越急行ほくほく線"
    ]
  },
  'まつだい': {
    "nameKana": "まつだい",
    "nameEn": "Matsudai",
    "address": "新潟県十日町市松代3701-2",
    "transfers": []
  },
  'ほくほく大島': {
    "nameKana": "ほくほくおおしま",
    "nameEn": "Hokuhoku-Oshima",
    "address": "新潟県上越市大島区下達269-7",
    "transfers": []
  },
  '虫川大杉': {
    "nameKana": "むしがわおおすぎ",
    "nameEn": "Mushigawa-Osugi",
    "address": "新潟県上越市浦川原区虫川",
    "transfers": []
  },
  'うらがわら': {
    "nameKana": "うらがわら",
    "nameEn": "Uragawara",
    "address": "新潟県上越市浦川原区顕聖寺",
    "transfers": []
  },
  '大池いこいの森': {
    "nameKana": "おおいけいこいのもり",
    "nameEn": "Oike-Ikoinomori",
    "address": "新潟県上越市頸城区大蒲生田",
    "transfers": []
  },
  'くびき': {
    "nameKana": "くびき",
    "nameEn": "Kubiki",
    "address": "新潟県上越市頸城区手島",
    "transfers": []
  },
  '犀潟': {
    "nameKana": "さいがた",
    "nameEn": "Saigata",
    "address": "新潟県上越市大潟区犀潟600-1",
    "transfers": [
      "JR信越本線",
      "北越急行ほくほく線"
    ]
  },
  '本庄早稲田': {
    "nameKana": "ほんじょうわせだ",
    "nameEn": "Honjo-Waseda",
    "address": "埼玉県本庄市早稲田の杜1丁目1-1",
    "transfers": []
  },
  '安中榛名': {
    "nameKana": "あんなかはるな",
    "nameEn": "Annaka-Haruna",
    "address": "群馬県安中市東上秋間2552-5",
    "transfers": []
  },
  '軽井沢': {
    "nameKana": "かるいざわ",
    "nameEn": "Karuizawa",
    "address": "長野県北佐久郡軽井沢町大字軽井沢1178-1246",
    "transfers": [
      "JR北陸新幹線",
      "しなの鉄道線"
    ]
  },
  '佐久平': {
    "nameKana": "さくだいら",
    "nameEn": "Sakudaira",
    "address": "長野県佐久市佐久平駅東52",
    "transfers": [
      "JR北陸新幹線",
      "JR小海線"
    ]
  },
  '上田': {
    "nameKana": "うえだ",
    "nameEn": "Ueda",
    "address": "長野県上田市天神1丁目1-1",
    "transfers": [
      "JR北陸新幹線",
      "しなの鉄道線",
      "上田電鉄別所線"
    ]
  },
  '飯山': {
    "nameKana": "いいやま",
    "nameEn": "Iiyama",
    "address": "長野県飯山市大字飯山770-3",
    "transfers": [
      "JR北陸新幹線",
      "JR飯山線"
    ]
  },
  '黒部宇奈月温泉': {
    "nameKana": "くろべうなづきおんせん",
    "nameEn": "Kurobe-Unazukionsen",
    "address": "富山県黒部市若栗3210-3",
    "transfers": [
      "JR北陸新幹線",
      "富山地方鉄道本線（新黒部）"
    ]
  },
  '富山': {
    "nameKana": "とやま",
    "nameEn": "Toyama",
    "address": "富山県富山市明輪町1-225",
    "transfers": [
      "JR北陸新幹線",
      "JR高山本線",
      "あいの風とやま鉄道",
      "富山地方鉄道本線",
      "富山地方鉄道富山軌道線"
    ]
  },
  '新高岡': {
    "nameKana": "しんたかおか",
    "nameEn": "Shin-Takaoka",
    "address": "富山県高岡市下黒田3011",
    "transfers": [
      "JR北陸新幹線",
      "JR城端線"
    ]
  },
  '金沢': {
    "nameKana": "かなざわ",
    "nameEn": "Kanazawa",
    "address": "石川県金沢市木ノ新保町1-1",
    "transfers": [
      "JR北陸新幹線",
      "IRいしかわ鉄道",
      "北陸鉄道浅野川線"
    ]
  },
  '小松': {
    "nameKana": "こまつ",
    "nameEn": "Komatsu",
    "address": "石川県小松市土居原町466番",
    "transfers": [
      "JR北陸新幹線",
      "IRいしかわ鉄道"
    ]
  },
  '加賀温泉': {
    "nameKana": "かがおんせん",
    "nameEn": "Kagaonsen",
    "address": "石川県加賀市作見町ヲ58",
    "transfers": [
      "JR北陸新幹線",
      "IRいしかわ鉄道"
    ]
  },
  '芦原温泉': {
    "nameKana": "あわらおんせん",
    "nameEn": "Awaraonsen",
    "address": "福井県あわら市春宮1丁目12-15",
    "transfers": [
      "JR北陸新幹線",
      "ハピラインふくい"
    ]
  },
  '福井': {
    "nameKana": "ふくい",
    "nameEn": "Fukui",
    "address": "福井県福井市中央1丁目1番1号",
    "transfers": [
      "JR北陸新幹線",
      "ハピラインふくい",
      "JR越美北線",
      "えちぜん鉄道勝山永平寺線",
      "福井鉄道福武線"
    ]
  },
  '越前たけふ': {
    "nameKana": "えちぜんたけふ",
    "nameEn": "Echizen-Takefu",
    "address": "福井県越前市大屋町39-10-5",
    "transfers": [
      "JR北陸新幹線"
    ]
  },
  '敦賀': {
    "nameKana": "つるが",
    "nameEn": "Tsuruga",
    "address": "福井県敦賀市鉄輪町一丁目1-24",
    "transfers": [
      "JR北陸新幹線",
      "JR北陸本線",
      "JR小浜線",
      "ハピラインふくい"
    ]
  },

};

module.exports = { STATION_META };
