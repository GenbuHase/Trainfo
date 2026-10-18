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

  '浅草': {
    "nameKana": "あさくさ",
    "nameEn": "Asakusa",
    "address": "東京都台東区花川戸一丁目4-1",
    "transfers": [
      "東武スカイツリーライン",
      "東京メトロ銀座線",
      "都営浅草線"
    ]
  },
  'とうきょうスカイツリー': {
    "nameKana": "とうきょうすかいつりー",
    "nameEn": "TOKYO SKYTREE",
    "address": "東京都墨田区押上一丁目1-2",
    "transfers": [
      "東武スカイツリーライン"
    ]
  },
  '押上': {
    "nameKana": "おしあげ",
    "nameEn": "Oshiage",
    "address": "東京都墨田区押上一丁目10-2",
    "transfers": [
      "東武スカイツリーライン",
      "東京メトロ半蔵門線",
      "都営浅草線",
      "京成押上線"
    ]
  },
  '曳舟': {
    "nameKana": "ひきふね",
    "nameEn": "Hikifune",
    "address": "東京都墨田区東向島二丁目26-1",
    "transfers": [
      "東武スカイツリーライン",
      "東武亀戸線"
    ]
  },
  '東向島': {
    "nameKana": "ひがしむこうじま",
    "nameEn": "Higashi-Mukojima",
    "address": "東京都墨田区東向島四丁目29-17",
    "transfers": [
      "東武スカイツリーライン"
    ]
  },
  '鐘ヶ淵': {
    "nameKana": "かねがふち",
    "nameEn": "Kanegafuchi",
    "address": "東京都墨田区墨田五丁目50-2",
    "transfers": [
      "東武スカイツリーライン"
    ]
  },
  '堀切': {
    "nameKana": "ほりきり",
    "nameEn": "Horikiri",
    "address": "東京都足立区千住曙町34-1",
    "transfers": [
      "東武スカイツリーライン"
    ]
  },
  '牛田': {
    "nameKana": "うしだ",
    "nameEn": "Ushida",
    "address": "東京都足立区千住曙町1-2",
    "transfers": [
      "東武スカイツリーライン",
      "京成本線（京成関屋）"
    ]
  },
  '北千住': {
    "nameKana": "きたせんじゅ",
    "nameEn": "Kita-Senju",
    "address": "東京都足立区千住旭町42-1",
    "transfers": [
      "東武スカイツリーライン",
      "東京メトロ日比谷線",
      "東京メトロ千代田線",
      "JR常磐線快速",
      "つくばエクスプレス"
    ]
  },
  '小菅': {
    "nameKana": "こすげ",
    "nameEn": "Kosuge",
    "address": "東京都足立区足立二丁目47-14",
    "transfers": [
      "東武スカイツリーライン"
    ]
  },
  '五反野': {
    "nameKana": "ごたんの",
    "nameEn": "Gotanno",
    "address": "東京都足立区足立四丁目38-11",
    "transfers": [
      "東武スカイツリーライン"
    ]
  },
  '梅島': {
    "nameKana": "うめじま",
    "nameEn": "Umejima",
    "address": "東京都足立区梅島三丁目32-15",
    "transfers": [
      "東武スカイツリーライン"
    ]
  },
  '西新井': {
    "nameKana": "にしあらい",
    "nameEn": "Nishi-Arai",
    "address": "東京都足立区西新井栄町二丁目1-1",
    "transfers": [
      "東武スカイツリーライン",
      "東武大師線"
    ]
  },
  '竹ノ塚': {
    "nameKana": "たけのつか",
    "nameEn": "Takenotsuka",
    "address": "東京都足立区竹の塚六丁目6-1",
    "transfers": [
      "東武スカイツリーライン"
    ]
  },
  '谷塚': {
    "nameKana": "やつか",
    "nameEn": "Yatsuka",
    "address": "埼玉県草加市谷塚一丁目1-21",
    "transfers": [
      "東武スカイツリーライン"
    ]
  },
  '草加': {
    "nameKana": "そうか",
    "nameEn": "Soka",
    "address": "埼玉県草加市高砂二丁目5-25",
    "transfers": [
      "東武スカイツリーライン"
    ]
  },
  '獨協大学前': {
    "nameKana": "どっきょうだいがくまえ",
    "nameEn": "Dokkyodaigakumae",
    "address": "埼玉県草加市松原一丁目1-1",
    "transfers": [
      "東武スカイツリーライン"
    ]
  },
  '新田': {
    "nameKana": "しんでん",
    "nameEn": "Shinden",
    "address": "埼玉県草加市金明町273-2",
    "transfers": [
      "東武スカイツリーライン"
    ]
  },
  '蒲生': {
    "nameKana": "がもう",
    "nameEn": "Gamo",
    "address": "埼玉県越谷市蒲生寿町17-1",
    "transfers": [
      "東武スカイツリーライン"
    ]
  },
  '新越谷': {
    "nameKana": "しんこしがや",
    "nameEn": "Shin-Koshigaya",
    "address": "埼玉県越谷市南越谷一丁目11-4",
    "transfers": [
      "東武スカイツリーライン",
      "JR武蔵野線（南越谷）"
    ]
  },
  '越谷': {
    "nameKana": "こしがや",
    "nameEn": "Koshigaya",
    "address": "埼玉県越谷市弥生町4-11",
    "transfers": [
      "東武スカイツリーライン"
    ]
  },
  '北越谷': {
    "nameKana": "きたこしがや",
    "nameEn": "Kita-Koshigaya",
    "address": "埼玉県越谷市大沢三丁目4-1",
    "transfers": [
      "東武スカイツリーライン"
    ]
  },
  '大袋': {
    "nameKana": "おおぶくろ",
    "nameEn": "Obukuro",
    "address": "埼玉県越谷市大字袋山1389",
    "transfers": [
      "東武スカイツリーライン"
    ]
  },
  'せんげん台': {
    "nameKana": "せんげんだい",
    "nameEn": "Sengendai",
    "address": "埼玉県越谷市千間台東一丁目61",
    "transfers": [
      "東武スカイツリーライン"
    ]
  },
  '武里': {
    "nameKana": "たけさと",
    "nameEn": "Takesato",
    "address": "埼玉県春日部市大場450",
    "transfers": [
      "東武スカイツリーライン"
    ]
  },
  '一ノ割': {
    "nameKana": "いちのわり",
    "nameEn": "Ichinowari",
    "address": "埼玉県春日部市一ノ割一丁目1-1",
    "transfers": [
      "東武スカイツリーライン"
    ]
  },
  '春日部': {
    "nameKana": "かすかべ",
    "nameEn": "Kasukabe",
    "address": "埼玉県春日部市粕壁一丁目10-1",
    "transfers": [
      "東武スカイツリーライン",
      "東武アーバンパークライン"
    ]
  },
  '北春日部': {
    "nameKana": "きたかすかべ",
    "nameEn": "Kita-Kasukabe",
    "address": "埼玉県春日部市梅田本町一丁目22-7",
    "transfers": [
      "東武スカイツリーライン"
    ]
  },
  '姫宮': {
    "nameKana": "ひめみや",
    "nameEn": "Himemiya",
    "address": "埼玉県南埼玉郡宮代町字川端379",
    "transfers": [
      "東武スカイツリーライン"
    ]
  },
  '東武動物公園': {
    "nameKana": "とうぶどうぶつこうえん",
    "nameEn": "Tobu-dobutsu-koen",
    "address": "埼玉県南埼玉郡宮代町百間二丁目3-45",
    "transfers": [
      "東武スカイツリーライン",
      "東武伊勢崎線",
      "東武日光線"
    ]
  },
  '和戸': {
    "nameKana": "わど",
    "nameEn": "Wado",
    "address": "埼玉県南埼玉郡宮代町大字和戸410",
    "transfers": [
      "東武伊勢崎線"
    ]
  },
  '鷲宮': {
    "nameKana": "わしのみや",
    "nameEn": "Washinomiya",
    "address": "埼玉県久喜市鷲宮中央一丁目1-1",
    "transfers": [
      "東武伊勢崎線"
    ]
  },
  '花崎': {
    "nameKana": "はなさき",
    "nameEn": "Hanasaki",
    "address": "埼玉県加須市花崎一丁目26-1",
    "transfers": [
      "東武伊勢崎線"
    ]
  },
  '加須': {
    "nameKana": "かぞ",
    "nameEn": "Kazo",
    "address": "埼玉県加須市大門町20-58",
    "transfers": [
      "東武伊勢崎線"
    ]
  },
  '南羽生': {
    "nameKana": "みなみはにゅう",
    "nameEn": "Minami-Hanyu",
    "address": "埼玉県羽生市大字南羽生一丁目19-1",
    "transfers": [
      "東武伊勢崎線"
    ]
  },
  '羽生': {
    "nameKana": "はにゅう",
    "nameEn": "Hanyu",
    "address": "埼玉県羽生市南一丁目1-55",
    "transfers": [
      "東武伊勢崎線",
      "秩父鉄道秩父本線"
    ]
  },
  '川俣': {
    "nameKana": "かわまた",
    "nameEn": "Kawamata",
    "address": "群馬県邑楽郡明和町中谷398-1",
    "transfers": [
      "東武伊勢崎線"
    ]
  },
  '茂林寺前': {
    "nameKana": "もりんじまえ",
    "nameEn": "Morinjimae",
    "address": "群馬県館林市堀工町1570",
    "transfers": [
      "東武伊勢崎線"
    ]
  },
  '館林': {
    "nameKana": "たてばやし",
    "nameEn": "Tatebayashi",
    "address": "群馬県館林市本町二丁目1-1",
    "transfers": [
      "東武伊勢崎線",
      "東武佐野線",
      "東武小泉線"
    ]
  },
  '多々良': {
    "nameKana": "たたら",
    "nameEn": "Tatara",
    "address": "群馬県館林市日向町1060",
    "transfers": [
      "東武伊勢崎線"
    ]
  },
  '県': {
    "nameKana": "あがた",
    "nameEn": "Agata",
    "address": "栃木県足利市県町1380",
    "transfers": [
      "東武伊勢崎線"
    ]
  },
  '福居': {
    "nameKana": "ふくい",
    "nameEn": "Fukui",
    "address": "栃木県足利市福居町1275",
    "transfers": [
      "東武伊勢崎線"
    ]
  },
  '東武和泉': {
    "nameKana": "とうぶいずみ",
    "nameEn": "Tobu-Izumi",
    "address": "栃木県足利市福居町2174",
    "transfers": [
      "東武伊勢崎線"
    ]
  },
  '足利市': {
    "nameKana": "あしかがし",
    "nameEn": "Ashikagashi",
    "address": "栃木県足利市南町4216",
    "transfers": [
      "東武伊勢崎線"
    ]
  },
  '野州山辺': {
    "nameKana": "やしゅうやまべ",
    "nameEn": "Yashu-Yamabe",
    "address": "栃木県足利市八幡町一丁目19-2",
    "transfers": [
      "東武伊勢崎線"
    ]
  },
  '韮川': {
    "nameKana": "にらがわ",
    "nameEn": "Niragawa",
    "address": "群馬県太田市台之郷町1104",
    "transfers": [
      "東武伊勢崎線"
    ]
  },
  '太田': {
    "nameKana": "おおた",
    "nameEn": "Ota",
    "address": "群馬県太田市東本町16-1",
    "transfers": [
      "東武伊勢崎線",
      "東武桐生線",
      "東武小泉線"
    ]
  },
  '細谷': {
    "nameKana": "ほそや",
    "nameEn": "Hosoya",
    "address": "群馬県太田市細谷町1298",
    "transfers": [
      "東武伊勢崎線"
    ]
  },
  '木崎': {
    "nameKana": "きざき",
    "nameEn": "Kizaki",
    "address": "群馬県太田市新田木崎町1250",
    "transfers": [
      "東武伊勢崎線"
    ]
  },
  '世良田': {
    "nameKana": "せらだ",
    "nameEn": "Serada",
    "address": "群馬県太田市世良田町1553-2",
    "transfers": [
      "東武伊勢崎線"
    ]
  },
  '境町': {
    "nameKana": "さかいまち",
    "nameEn": "Sakaimachi",
    "address": "群馬県伊勢崎市境百々414",
    "transfers": [
      "東武伊勢崎線"
    ]
  },
  '剛志': {
    "nameKana": "ごうし",
    "nameEn": "Goshi",
    "address": "群馬県伊勢崎市境寸木419",
    "transfers": [
      "東武伊勢崎線"
    ]
  },
  '新伊勢崎': {
    "nameKana": "しんいせさき",
    "nameEn": "Shin-Isesaki",
    "address": "群馬県伊勢崎市中央町24-11",
    "transfers": [
      "東武伊勢崎線"
    ]
  },
  '伊勢崎': {
    "nameKana": "いせさき",
    "nameEn": "Isesaki",
    "address": "群馬県伊勢崎市曲輪町2-1",
    "transfers": [
      "東武伊勢崎線",
      "JR両毛線"
    ]
  },
  '小村井': {
    "nameKana": "おむらい",
    "nameEn": "Omurai",
    "address": "東京都墨田区文花二丁目11-13",
    "transfers": [
      "東武亀戸線"
    ]
  },
  '東あずま': {
    "nameKana": "ひがしあずま",
    "nameEn": "Higashi-Azuma",
    "address": "東京都墨田区立花二丁目24-7",
    "transfers": [
      "東武亀戸線"
    ]
  },
  '亀戸水神': {
    "nameKana": "かめいどすいじん",
    "nameEn": "Kameidosuijin",
    "address": "東京都江東区亀戸八丁目5-1",
    "transfers": [
      "東武亀戸線"
    ]
  },
  '亀戸': {
    "nameKana": "かめいど",
    "nameEn": "Kameido",
    "address": "東京都江東区亀戸五丁目1-1",
    "transfers": [
      "東武亀戸線",
      "JR中央・総武線各駅停車"
    ]
  },
  '大師前': {
    "nameKana": "だいしまえ",
    "nameEn": "Daishimae",
    "address": "東京都足立区西新井一丁目3-1",
    "transfers": [
      "東武大師線"
    ]
  },
  '渡瀬': {
    "nameKana": "わたらせ",
    "nameEn": "Watarase",
    "address": "群馬県館林市足次町972",
    "transfers": [
      "東武佐野線"
    ]
  },
  '田島': {
    "nameKana": "たじま",
    "nameEn": "Tajima",
    "address": "栃木県佐野市田島町171",
    "transfers": [
      "東武佐野線"
    ]
  },
  '佐野市': {
    "nameKana": "さのし",
    "nameEn": "Sanoshi",
    "address": "栃木県佐野市植上町1553",
    "transfers": [
      "東武佐野線"
    ]
  },
  '佐野': {
    "nameKana": "さの",
    "nameEn": "Sano",
    "address": "栃木県佐野市若松町488",
    "transfers": [
      "東武佐野線",
      "JR両毛線"
    ]
  },
  '堀米': {
    "nameKana": "ほりごめ",
    "nameEn": "Horigome",
    "address": "栃木県佐野市堀米町610",
    "transfers": [
      "東武佐野線"
    ]
  },
  '吉水': {
    "nameKana": "よしみず",
    "nameEn": "Yoshimizu",
    "address": "栃木県佐野市新吉水町345",
    "transfers": [
      "東武佐野線"
    ]
  },
  '田沼': {
    "nameKana": "たぬま",
    "nameEn": "Tanuma",
    "address": "栃木県佐野市田沼町642",
    "transfers": [
      "東武佐野線"
    ]
  },
  '多田': {
    "nameKana": "ただ",
    "nameEn": "Tada",
    "address": "栃木県佐野市多田町945",
    "transfers": [
      "東武佐野線"
    ]
  },
  '葛生': {
    "nameKana": "くずう",
    "nameEn": "Kuzu",
    "address": "栃木県佐野市葛生東一丁目1-19",
    "transfers": [
      "東武佐野線"
    ]
  },
  '成島': {
    "nameKana": "なるしま",
    "nameEn": "Narushima",
    "address": "群馬県館林市成島町451",
    "transfers": [
      "東武小泉線"
    ]
  },
  '本中野': {
    "nameKana": "ほんなかの",
    "nameEn": "Hon-Nakano",
    "address": "群馬県邑楽郡邑楽町大字中野2528",
    "transfers": [
      "東武小泉線"
    ]
  },
  '篠塚': {
    "nameKana": "しのづか",
    "nameEn": "Shinozuka",
    "address": "群馬県邑楽郡邑楽町大字篠塚1529",
    "transfers": [
      "東武小泉線"
    ]
  },
  '東小泉': {
    "nameKana": "ひがしこいずみ",
    "nameEn": "Higashi-Koizumi",
    "address": "群馬県邑楽郡大泉町東小泉一丁目1-1",
    "transfers": [
      "東武小泉線"
    ]
  },
  '小泉町': {
    "nameKana": "こいずみまち",
    "nameEn": "Koizumimachi",
    "address": "群馬県邑楽郡大泉町城之内二丁目11-1",
    "transfers": [
      "東武小泉線"
    ]
  },
  '西小泉': {
    "nameKana": "にしこいずみ",
    "nameEn": "Nishi-Koizumi",
    "address": "群馬県邑楽郡大泉町西小泉四丁目11-1",
    "transfers": [
      "東武小泉線"
    ]
  },
  '竜舞': {
    "nameKana": "りゅうまい",
    "nameEn": "Ryumai",
    "address": "群馬県太田市龍舞町2103",
    "transfers": [
      "東武小泉線"
    ]
  },
  '三枚橋': {
    "nameKana": "さんまいばし",
    "nameEn": "Sammaibashi",
    "address": "群馬県太田市鳥山町709",
    "transfers": [
      "東武桐生線"
    ]
  },
  '治良門橋': {
    "nameKana": "じろえんばし",
    "nameEn": "Jiroembashi",
    "address": "群馬県太田市成塚町168-1",
    "transfers": [
      "東武桐生線"
    ]
  },
  '藪塚': {
    "nameKana": "やぶづか",
    "nameEn": "Yabuzuka",
    "address": "群馬県太田市藪塚町2388",
    "transfers": [
      "東武桐生線"
    ]
  },
  '阿左美': {
    "nameKana": "あざみ",
    "nameEn": "Azami",
    "address": "群馬県みどり市笠懸町阿左美1032-1",
    "transfers": [
      "東武桐生線"
    ]
  },
  '新桐生': {
    "nameKana": "しんきりゅう",
    "nameEn": "Shin-Kiryū",
    "address": "群馬県桐生市広沢町二丁目2985-2",
    "transfers": [
      "東武桐生線"
    ]
  },
  '相老': {
    "nameKana": "あいおい",
    "nameEn": "Aioi",
    "address": "群馬県桐生市相生町二丁目274-1",
    "transfers": [
      "東武桐生線",
      "わたらせ渓谷鐵道わたらせ渓谷線"
    ]
  },
  '赤城': {
    "nameKana": "あかぎ",
    "nameEn": "Akagi",
    "address": "群馬県みどり市大間々町大間々1445-1",
    "transfers": [
      "東武桐生線",
      "上毛電気鉄道上毛線"
    ]
  },
  '杉戸高野台': {
    "nameKana": "すぎとたかのだい",
    "nameEn": "Sugito-Takanodai",
    "address": "埼玉県北葛飾郡杉戸町高野台東一丁目1-1",
    "transfers": [
      "東武日光線"
    ]
  },
  '幸手': {
    "nameKana": "さって",
    "nameEn": "Satte",
    "address": "埼玉県幸手市中一丁目1-1",
    "transfers": [
      "東武日光線"
    ]
  },
  '南栗橋': {
    "nameKana": "みなみくりはし",
    "nameEn": "Minami-Kurihashi",
    "address": "埼玉県久喜市南栗橋一丁目20-1",
    "transfers": [
      "東武日光線"
    ]
  },
  '新古河': {
    "nameKana": "しんこが",
    "nameEn": "Shin-Koga",
    "address": "埼玉県加須市向古河769",
    "transfers": [
      "東武日光線"
    ]
  },
  '柳生': {
    "nameKana": "やぎゅう",
    "nameEn": "Yagyu",
    "address": "埼玉県加須市柳生2111",
    "transfers": [
      "東武日光線"
    ]
  },
  '板倉東洋大前': {
    "nameKana": "いたくらとうようだいまえ",
    "nameEn": "Itakura-toyodaimae",
    "address": "群馬県邑楽郡板倉町朝日野一丁目1-1",
    "transfers": [
      "東武日光線"
    ]
  },
  '藤岡': {
    "nameKana": "ふじおか",
    "nameEn": "Fujioka",
    "address": "栃木県栃木市藤岡町藤岡186",
    "transfers": [
      "東武日光線"
    ]
  },
  '静和': {
    "nameKana": "しずわ",
    "nameEn": "Shizuwa",
    "address": "栃木県栃木市岩舟町静和2072",
    "transfers": [
      "東武日光線"
    ]
  },
  '新大平下': {
    "nameKana": "しんおおひらした",
    "nameEn": "Shin-Ohirashita",
    "address": "栃木県栃木市大平町富田530",
    "transfers": [
      "東武日光線"
    ]
  },
  '栃木': {
    "nameKana": "とちぎ",
    "nameEn": "Tochigi",
    "address": "栃木県栃木市沼和田町1-1",
    "transfers": [
      "東武日光線",
      "JR両毛線"
    ]
  },
  '新栃木': {
    "nameKana": "しんとちぎ",
    "nameEn": "Shin-Tochigi",
    "address": "栃木県栃木市平柳町一丁目1-18",
    "transfers": [
      "東武日光線",
      "東武宇都宮線"
    ]
  },
  '合戦場': {
    "nameKana": "かっせんば",
    "nameEn": "Kassemba",
    "address": "栃木県栃木市都賀町合戦場616",
    "transfers": [
      "東武日光線"
    ]
  },
  '家中': {
    "nameKana": "いえなか",
    "nameEn": "Ienaka",
    "address": "栃木県栃木市都賀町家中5932",
    "transfers": [
      "東武日光線"
    ]
  },
  '東武金崎': {
    "nameKana": "とうぶかなさき",
    "nameEn": "Tobu-Kanasaki",
    "address": "栃木県栃木市西方町金崎341",
    "transfers": [
      "東武日光線"
    ]
  },
  '楡木': {
    "nameKana": "にれぎ",
    "nameEn": "Niregi",
    "address": "栃木県鹿沼市楡木町336",
    "transfers": [
      "東武日光線"
    ]
  },
  '樅山': {
    "nameKana": "もみやま",
    "nameEn": "Momiyama",
    "address": "栃木県鹿沼市樅山町344",
    "transfers": [
      "東武日光線"
    ]
  },
  '新鹿沼': {
    "nameKana": "しんかぬま",
    "nameEn": "Shin-Kanuma",
    "address": "栃木県鹿沼市鳥居跡町1003-3",
    "transfers": [
      "東武日光線"
    ]
  },
  '北鹿沼': {
    "nameKana": "きたかぬま",
    "nameEn": "Kita-Kanuma",
    "address": "栃木県鹿沼市玉田町604",
    "transfers": [
      "東武日光線"
    ]
  },
  '板荷': {
    "nameKana": "いたが",
    "nameEn": "Itaga",
    "address": "栃木県鹿沼市板荷211",
    "transfers": [
      "東武日光線"
    ]
  },
  '下小代': {
    "nameKana": "しもごしろ",
    "nameEn": "Shimo-Goshiro",
    "address": "栃木県日光市小代285-3",
    "transfers": [
      "東武日光線"
    ]
  },
  '明神': {
    "nameKana": "みょうじん",
    "nameEn": "Myojin",
    "address": "栃木県日光市明神114",
    "transfers": [
      "東武日光線"
    ]
  },
  '下今市': {
    "nameKana": "しもいまいち",
    "nameEn": "Shimo-Imaichi",
    "address": "栃木県日光市今市1110",
    "transfers": [
      "東武日光線",
      "東武鬼怒川線"
    ]
  },
  '上今市': {
    "nameKana": "かみいまいち",
    "nameEn": "Kami-Imaichi",
    "address": "栃木県日光市今市392",
    "transfers": [
      "東武日光線"
    ]
  },
  '東武日光': {
    "nameKana": "とうぶにっこう",
    "nameEn": "Tobu-Nikko",
    "address": "栃木県日光市松原町4-3",
    "transfers": [
      "東武日光線",
      "JR日光線（日光）"
    ]
  },
  '野州平川': {
    "nameKana": "やしゅうひらかわ",
    "nameEn": "Yashu-Hirakawa",
    "address": "栃木県栃木市大平町川連653",
    "transfers": [
      "東武宇都宮線"
    ]
  },
  '野州大塚': {
    "nameKana": "やしゅうおおつか",
    "nameEn": "Yashu-Otsuka",
    "address": "栃木県栃木市大塚町1430",
    "transfers": [
      "東武宇都宮線"
    ]
  },
  '壬生': {
    "nameKana": "みぶ",
    "nameEn": "Mibu",
    "address": "栃木県下都賀郡壬生町駅東町1-1",
    "transfers": [
      "東武宇都宮線"
    ]
  },
  '国谷': {
    "nameKana": "くにや",
    "nameEn": "Kuniya",
    "address": "栃木県下都賀郡壬生町大字壬生甲3773",
    "transfers": [
      "東武宇都宮線"
    ]
  },
  'おもちゃのまち': {
    "nameKana": "おもちゃのまち",
    "nameEn": "Omochanomachi",
    "address": "栃木県下都賀郡壬生町幸町一丁目19-1",
    "transfers": [
      "東武宇都宮線"
    ]
  },
  '安塚': {
    "nameKana": "やすづか",
    "nameEn": "Yasuzuka",
    "address": "栃木県下都賀郡壬生町大字安塚854",
    "transfers": [
      "東武宇都宮線"
    ]
  },
  '西川田': {
    "nameKana": "にしかわだ",
    "nameEn": "Nishi-Kawada",
    "address": "栃木県宇都宮市西川田五丁目1-1",
    "transfers": [
      "東武宇都宮線"
    ]
  },
  '江曽島': {
    "nameKana": "えそじま",
    "nameEn": "Esojima",
    "address": "栃木県宇都宮市大和二丁目11-1",
    "transfers": [
      "東武宇都宮線"
    ]
  },
  '南宇都宮': {
    "nameKana": "みなみうつのみや",
    "nameEn": "Minami-Utsunomiya",
    "address": "栃木県宇都宮市吉野二丁目8-23",
    "transfers": [
      "東武宇都宮線"
    ]
  },
  '東武宇都宮': {
    "nameKana": "とうぶうつのみや",
    "nameEn": "Tobu-Utsunomiya",
    "address": "栃木県宇都宮市宮園町4-1",
    "transfers": [
      "東武宇都宮線"
    ]
  },
  '大谷向': {
    "nameKana": "だいやむこう",
    "nameEn": "Daiyamuko",
    "address": "栃木県日光市今市1291",
    "transfers": [
      "東武鬼怒川線"
    ]
  },
  '大桑': {
    "nameKana": "おおくわ",
    "nameEn": "Okuwa",
    "address": "栃木県日光市大桑町468",
    "transfers": [
      "東武鬼怒川線"
    ]
  },
  '新高徳': {
    "nameKana": "しんたかとく",
    "nameEn": "Shin-Takatoku",
    "address": "栃木県日光市高徳384",
    "transfers": [
      "東武鬼怒川線"
    ]
  },
  '小佐越': {
    "nameKana": "こさごえ",
    "nameEn": "Kosagoe",
    "address": "栃木県日光市鬼怒川温泉大原450",
    "transfers": [
      "東武鬼怒川線"
    ]
  },
  '東武ワールドスクウェア': {
    "nameKana": "とうぶわーるどすくうぇあ",
    "nameEn": "Tobu World Square",
    "address": "栃木県日光市鬼怒川温泉大原209-1",
    "transfers": [
      "東武鬼怒川線"
    ]
  },
  '鬼怒川温泉': {
    "nameKana": "きぬがわおんせん",
    "nameEn": "Kinugawa-Onsen",
    "address": "栃木県日光市鬼怒川温泉大原1390",
    "transfers": [
      "東武鬼怒川線"
    ]
  },
  '鬼怒川公園': {
    "nameKana": "きぬがわこうえん",
    "nameEn": "Kinugawa-Koen",
    "address": "栃木県日光市藤原19",
    "transfers": [
      "東武鬼怒川線"
    ]
  },
  '新藤原': {
    "nameKana": "しんふじはら",
    "nameEn": "Shin-Fujihara",
    "address": "栃木県日光市藤原497",
    "transfers": [
      "東武鬼怒川線",
      "野岩鉄道会津鬼怒川線"
    ]
  },
  '北大宮': {
    "nameKana": "きたおおみや",
    "nameEn": "Kita-Omiya",
    "address": "埼玉県さいたま市大宮区土手町三丁目285",
    "transfers": [
      "東武アーバンパークライン"
    ]
  },
  '大宮公園': {
    "nameKana": "おおみやこうえん",
    "nameEn": "Omiya-koen",
    "address": "埼玉県さいたま市大宮区寿能町一丁目41",
    "transfers": [
      "東武アーバンパークライン"
    ]
  },
  '大和田': {
    "nameKana": "おおわだ",
    "nameEn": "Owada",
    "address": "埼玉県さいたま市見沼区大和田町二丁目1774",
    "transfers": [
      "東武アーバンパークライン"
    ]
  },
  '七里': {
    "nameKana": "ななさと",
    "nameEn": "Nanasato",
    "address": "埼玉県さいたま市見沼区大字風渡野601-3",
    "transfers": [
      "東武アーバンパークライン"
    ]
  },
  '岩槻': {
    "nameKana": "いわつき",
    "nameEn": "Iwatsuki",
    "address": "埼玉県さいたま市岩槻区本町一丁目1-1",
    "transfers": [
      "東武アーバンパークライン"
    ]
  },
  '東岩槻': {
    "nameKana": "ひがしいわつき",
    "nameEn": "Higashi-Iwatsuki",
    "address": "埼玉県さいたま市岩槻区東岩槻一丁目1-1",
    "transfers": [
      "東武アーバンパークライン"
    ]
  },
  '豊春': {
    "nameKana": "とよはる",
    "nameEn": "Toyoharu",
    "address": "埼玉県春日部市上蛭田261",
    "transfers": [
      "東武アーバンパークライン"
    ]
  },
  '八木崎': {
    "nameKana": "やぎさき",
    "nameEn": "Yagisaki",
    "address": "埼玉県春日部市粕壁6943",
    "transfers": [
      "東武アーバンパークライン"
    ]
  },
  '藤の牛島': {
    "nameKana": "ふじのうしじま",
    "nameEn": "Fujino-Ushijima",
    "address": "埼玉県春日部市牛島1585",
    "transfers": [
      "東武アーバンパークライン"
    ]
  },
  '南桜井': {
    "nameKana": "みなみさくらい",
    "nameEn": "Minami-Sakurai",
    "address": "埼玉県春日部市米島1185",
    "transfers": [
      "東武アーバンパークライン"
    ]
  },
  '川間': {
    "nameKana": "かわま",
    "nameEn": "Kawama",
    "address": "千葉県野田市尾崎847",
    "transfers": [
      "東武アーバンパークライン"
    ]
  },
  '七光台': {
    "nameKana": "ななこうだい",
    "nameEn": "Nanakodai",
    "address": "千葉県野田市七光台402",
    "transfers": [
      "東武アーバンパークライン"
    ]
  },
  '清水公園': {
    "nameKana": "しみずこうえん",
    "nameEn": "Shimizu-koen",
    "address": "千葉県野田市清水402",
    "transfers": [
      "東武アーバンパークライン"
    ]
  },
  '愛宕': {
    "nameKana": "あたご",
    "nameEn": "Atago",
    "address": "千葉県野田市中野台246",
    "transfers": [
      "東武アーバンパークライン"
    ]
  },
  '野田市': {
    "nameKana": "のだし",
    "nameEn": "Nodashi",
    "address": "千葉県野田市野田128",
    "transfers": [
      "東武アーバンパークライン"
    ]
  },
  '梅郷': {
    "nameKana": "うめさと",
    "nameEn": "Umesato",
    "address": "千葉県野田市山崎1890",
    "transfers": [
      "東武アーバンパークライン"
    ]
  },
  '運河': {
    "nameKana": "うんが",
    "nameEn": "Unga",
    "address": "千葉県流山市東深井字運河404",
    "transfers": [
      "東武アーバンパークライン"
    ]
  },
  '江戸川台': {
    "nameKana": "えどがわだい",
    "nameEn": "Edogawadai",
    "address": "千葉県流山市江戸川台東一丁目1",
    "transfers": [
      "東武アーバンパークライン"
    ]
  },
  '初石': {
    "nameKana": "はついし",
    "nameEn": "Hatsuishi",
    "address": "千葉県流山市西初石三丁目100",
    "transfers": [
      "東武アーバンパークライン"
    ]
  },
  '流山おおたかの森': {
    "nameKana": "ながれやまおおたかのもり",
    "nameEn": "Nagareyama-otakanomori",
    "address": "千葉県流山市おおたかの森西一丁目1-1",
    "transfers": [
      "東武アーバンパークライン",
      "つくばエクスプレス"
    ]
  },
  '豊四季': {
    "nameKana": "とよしき",
    "nameEn": "Toyoshiki",
    "address": "千葉県柏市豊四季159",
    "transfers": [
      "東武アーバンパークライン"
    ]
  },
  '柏': {
    "nameKana": "かしわ",
    "nameEn": "Kashiwa",
    "address": "千葉県柏市柏一丁目1-1",
    "transfers": [
      "東武アーバンパークライン",
      "JR常磐線快速",
      "JR常磐線各駅停車"
    ]
  },
  '新柏': {
    "nameKana": "しんかしわ",
    "nameEn": "Shin-Kashiwa",
    "address": "千葉県柏市新柏一丁目1507",
    "transfers": [
      "東武アーバンパークライン"
    ]
  },
  '増尾': {
    "nameKana": "ますお",
    "nameEn": "Masuo",
    "address": "千葉県柏市増尾一丁目1-1",
    "transfers": [
      "東武アーバンパークライン"
    ]
  },
  '逆井': {
    "nameKana": "さかさい",
    "nameEn": "Sakasai",
    "address": "千葉県柏市逆井字原分172",
    "transfers": [
      "東武アーバンパークライン"
    ]
  },
  '高柳': {
    "nameKana": "たかやなぎ",
    "nameEn": "Takayanagi",
    "address": "千葉県柏市高柳1492",
    "transfers": [
      "東武アーバンパークライン"
    ]
  },
  '六実': {
    "nameKana": "むつみ",
    "nameEn": "Mutsumi",
    "address": "千葉県松戸市六実四丁目4-1",
    "transfers": [
      "東武アーバンパークライン"
    ]
  },
  '新鎌ヶ谷': {
    "nameKana": "しんかまがや",
    "nameEn": "Shin-Kamagaya",
    "address": "千葉県鎌ケ谷市新鎌ケ谷一丁目13-1",
    "transfers": [
      "東武アーバンパークライン",
      "北総鉄道北総線",
      "京成成田空港線",
      "新京成線"
    ]
  },
  '鎌ヶ谷': {
    "nameKana": "かまがや",
    "nameEn": "Kamagaya",
    "address": "千葉県鎌ケ谷市道野辺中央二丁目1-1",
    "transfers": [
      "東武アーバンパークライン"
    ]
  },
  '馬込沢': {
    "nameKana": "まごめざわ",
    "nameEn": "Magomezawa",
    "address": "千葉県船橋市藤原七丁目2-1",
    "transfers": [
      "東武アーバンパークライン"
    ]
  },
  '塚田': {
    "nameKana": "つかだ",
    "nameEn": "Tsukada",
    "address": "千葉県船橋市前貝塚町565-11",
    "transfers": [
      "東武アーバンパークライン"
    ]
  },
  '新船橋': {
    "nameKana": "しんふなばし",
    "nameEn": "Shin-Funabashi",
    "address": "千葉県船橋市山手一丁目1-1",
    "transfers": [
      "東武アーバンパークライン"
    ]
  },
  '龍王峡': {
    "nameKana": "りゅうおうきょう",
    "nameEn": "Ryuokyo",
    "address": "栃木県日光市藤原1357",
    "transfers": [
      "野岩鉄道会津鬼怒川線"
    ]
  },
  '川治温泉': {
    "nameKana": "かわじおんせん",
    "nameEn": "Kawaji-Onsen",
    "address": "栃木県日光市川治温泉川治",
    "transfers": [
      "野岩鉄道会津鬼怒川線"
    ]
  },
  '川治湯元': {
    "nameKana": "かわじゆもと",
    "nameEn": "Kawaji-Yumoto",
    "address": "栃木県日光市川治温泉川治22",
    "transfers": [
      "野岩鉄道会津鬼怒川線"
    ]
  },
  '湯西川温泉': {
    "nameKana": "ゆにしがわおんせん",
    "nameEn": "Yunishigawa-Onsen",
    "address": "栃木県日光市西川",
    "transfers": [
      "野岩鉄道会津鬼怒川線"
    ]
  },
  '中三依温泉': {
    "nameKana": "なかみよりおんせん",
    "nameEn": "Nakamiyori-Onsen",
    "address": "栃木県日光市中三依",
    "transfers": [
      "野岩鉄道会津鬼怒川線"
    ]
  },
  '上三依塩原温泉口': {
    "nameKana": "かみみよりしおばらおんせんぐち",
    "nameEn": "Kamimiyori-Shiobaraonsen-guchi",
    "address": "栃木県日光市上三依",
    "transfers": [
      "野岩鉄道会津鬼怒川線"
    ]
  },
  '男鹿高原': {
    "nameKana": "おじかこうげん",
    "nameEn": "Ojika-Kogen",
    "address": "栃木県日光市横川",
    "transfers": [
      "野岩鉄道会津鬼怒川線"
    ]
  },
  '会津高原尾瀬口': {
    "nameKana": "あいづこうげんおぜぐち",
    "nameEn": "Aizu-Kogen-Ozeguchi",
    "address": "福島県南会津郡南会津町滝原字羽根原",
    "transfers": [
      "野岩鉄道会津鬼怒川線",
      "会津鉄道会津線"
    ]
  },
  '七ヶ岳登山口': {
    "nameKana": "ななつがたけとざんぐち",
    "nameEn": "Nanatsugatake-Tozanguchi",
    "address": "福島県南会津郡南会津町糸沢字下平",
    "transfers": [
      "会津鉄道会津線"
    ]
  },
  '会津山村道場': {
    "nameKana": "あいづさんそんどうじょう",
    "nameEn": "Aizu-Sanson-Dojo",
    "address": "福島県南会津郡南会津町糸沢字今泉",
    "transfers": [
      "会津鉄道会津線"
    ]
  },
  '会津荒海': {
    "nameKana": "あいづあらかい",
    "nameEn": "Aizu-Arakai",
    "address": "福島県南会津郡南会津町関本字百刈",
    "transfers": [
      "会津鉄道会津線"
    ]
  },
  '中荒井': {
    "nameKana": "なかあらい",
    "nameEn": "Naka-Arai",
    "address": "福島県南会津郡南会津町中荒井字長宿",
    "transfers": [
      "会津鉄道会津線"
    ]
  },
  '会津田島': {
    "nameKana": "あいづたじま",
    "nameEn": "Aizu-Tajima",
    "address": "福島県南会津郡南会津町田島字西町甲",
    "transfers": [
      "会津鉄道会津線"
    ]
  },
  '田島高校前': {
    "nameKana": "たじまこうこうまえ",
    "nameEn": "Tajima-Kokomae",
    "address": "福島県南会津郡南会津町田島字田島裏",
    "transfers": [
      "会津鉄道会津線"
    ]
  },
  '会津長野': {
    "nameKana": "あいづながの",
    "nameEn": "Aizu-Nagano",
    "address": "福島県南会津郡南会津町長野字下川原",
    "transfers": [
      "会津鉄道会津線"
    ]
  },
  '養鱒公園': {
    "nameKana": "ようそんこうえん",
    "nameEn": "Yoson-Koen",
    "address": "福島県南会津郡下郷町大字落合字下ノ原",
    "transfers": [
      "会津鉄道会津線"
    ]
  },
  'ふるさと公園': {
    "nameKana": "ふるさとうこうえん",
    "nameEn": "Furusato-Koen",
    "address": "福島県南会津郡下郷町大字沢田字下林",
    "transfers": [
      "会津鉄道会津線"
    ]
  },
  '会津下郷': {
    "nameKana": "あいづしもごう",
    "nameEn": "Aizu-Shimogo",
    "address": "福島県南会津郡下郷町大字豊成字下モ",
    "transfers": [
      "会津鉄道会津線"
    ]
  },
  '弥五島': {
    "nameKana": "やごしま",
    "nameEn": "Yagoshima",
    "address": "福島県南会津郡下郷町大字弥五島字寺下",
    "transfers": [
      "会津鉄道会津線"
    ]
  },
  '塔のへつり': {
    "nameKana": "とうのへつり",
    "nameEn": "Tonohetsuri",
    "address": "福島県南会津郡下郷町大字弥五島字下林",
    "transfers": [
      "会津鉄道会津線"
    ]
  },
  '湯野上温泉': {
    "nameKana": "ゆのかみおんせん",
    "nameEn": "Yunokami-Onsen",
    "address": "福島県南会津郡下郷町大字湯野上字大島",
    "transfers": [
      "会津鉄道会津線"
    ]
  },
  '芦ノ牧温泉南': {
    "nameKana": "あしのまきおんせんみなみ",
    "nameEn": "Ashinomaki-Onsen-Minami",
    "address": "福島県会津若松市大戸町大字大川乙",
    "transfers": [
      "会津鉄道会津線"
    ]
  },
  '大川ダム公園': {
    "nameKana": "おおかわだむこうえん",
    "nameEn": "Okawa-Dam-Koen",
    "address": "福島県会津若松市大戸町大字大川甲",
    "transfers": [
      "会津鉄道会津線"
    ]
  },
  '芦ノ牧温泉': {
    "nameKana": "あしのまきおんせん",
    "nameEn": "Ashinomaki-Onsen",
    "address": "福島県会津若松市大戸町大字上三寄乙",
    "transfers": [
      "会津鉄道会津線"
    ]
  },
  'あまや': {
    "nameKana": "あまや",
    "nameEn": "Amaya",
    "address": "福島県会津若松市大戸町大字雨屋",
    "transfers": [
      "会津鉄道会津線"
    ]
  },
  '門田': {
    "nameKana": "もんでん",
    "nameEn": "Monden",
    "address": "福島県会津若松市門田町大字面川",
    "transfers": [
      "会津鉄道会津線"
    ]
  },
  '南若松': {
    "nameKana": "みなみわかまつ",
    "nameEn": "Minami-Wakamatsu",
    "address": "福島県会津若松市門田町大字一ノ後",
    "transfers": [
      "会津鉄道会津線"
    ]
  },
  '西若松': {
    "nameKana": "にしわかまつ",
    "nameEn": "Nishi-Wakamatsu",
    "address": "福島県会津若松市材木町一丁目9-1",
    "transfers": [
      "会津鉄道会津線",
      "JR只見線"
    ]
  },
  '会津若松': {
    "nameKana": "あいづわかまつ",
    "nameEn": "Aizu-Wakamatsu",
    "address": "福島県会津若松市駅前町1-1",
    "transfers": [
      "JR磐越西線",
      "JR只見線",
      "会津鉄道会津線"
    ]
  },
};

module.exports = { STATION_META };
