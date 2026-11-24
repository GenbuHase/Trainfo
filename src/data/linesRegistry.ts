import type { LineDefinition, LineId, RegionArea, Station, TrackSegment, TrainTypeConfig, TimetableTrip, StationTimetableStore, CustomTrainTypeConfig } from '../types';
import { tojoLine } from './lines/tobu_tojo';
import { ogoseLine } from './lines/tobu_ogose';
import { saikyoLine } from './lines/jr_saikyo';
import { kawagoeLine } from './lines/jr_kawagoe';
import { musashinoLine } from './lines/jr_musashino';
import { tsukubaExpressLine } from './lines/tsukuba_express';
import { chuoLine } from './lines/jr_chuo';
import { chuoMainLine } from './lines/jr_chuo_main';
import { shinonoiLine } from './lines/jr_shinonoi';
import { oitoEastLine } from './lines/jr_oito_east';
import { oitoWestLine } from './lines/jr_oito_west';
import { rinkaiLine } from './lines/rinkai';
import { yurakuchoLine } from './lines/tokyo_metro_yurakucho';
import { fukutoshinLine } from './lines/tokyo_metro_fukutoshin';
import { seibuIkebukuroLine } from './lines/seibu_ikebukuro';
import { seibuYurakuchoLine } from './lines/seibu_yurakucho';
import { hachikoLine } from './lines/jr_hachiko';
import { itsukaichiLine } from './lines/jr_itsukaichi';
import { omeLine } from './lines/jr_ome';
import { chichibuLine } from './lines/chichibu';
import { odakyuOdawaraLine } from './lines/odakyu_odawara';
import { odakyuEnoshimaLine } from './lines/odakyu_enoshima';
import { odakyuTamaLine } from './lines/odakyu_tama';
import { tokyuToyokoLine } from './lines/tokyu_toyoko';
import { minatomiraiLine } from './lines/minatomirai';
import { tokyuShinYokohamaLine } from './lines/tokyu_shin_yokohama';
import { sotetsuShinYokohamaLine } from './lines/sotetsu_shin_yokohama';
import { sotetsuMainLine } from './lines/sotetsu_main';
import { sotetsuIzuminoLine } from './lines/sotetsu_izumino';
import { sotetsuJrDirectLine } from './lines/jr_sotetsu_jr_direct';
import { chiyodaLine } from './lines/tokyo_metro_chiyoda';
import { jobanLocalLine } from './lines/jr_joban_local';
import { jobanRapidLine } from './lines/jr_joban_rapid';
import { jobanTorideIwakiLine } from './lines/jr_joban_toride_iwaki';
import { jobanIwakiSendaiLine } from './lines/jr_joban_iwaki_sendai';
import { tohokuShinkansenLine } from './lines/jr_tohoku_shinkansen';
import { joetsuShinkansenLine } from './lines/jr_joetsu_shinkansen';
import { tokaidoLine } from './lines/jr_tokaido';
import { itoLine } from './lines/jr_ito';
import { yokosukaLine } from './lines/jr_yokosuka';
import { sobuRapidLine } from './lines/jr_sobu_rapid';
import { utsunomiyaLine } from './lines/jr_utsunomiya';
import { takasakiLine } from './lines/jr_takasaki';
import { shonanShinjukuLine } from './lines/jr_shonan_shinjuku';
import { uenoTokyoLine } from './lines/jr_ueno_tokyo';
import { ryomoLine } from './lines/jr_ryomo';
import { joetsuLine } from './lines/jr_joetsu';
import { shinetsuNaoetsuNiigataLine } from './lines/jr_shinetsu_naoetsu_niigata';
import { shinetsuTakasakiYokokawaLine } from './lines/jr_shinetsu_takasaki_yokokawa';
import { hakushinLine } from './lines/jr_hakushin';
import { uetsuMainLine } from './lines/jr_uetsu_main';
import { tadamiLine } from './lines/jr_tadami';
import { banetsuWestLine } from './lines/jr_banetsu_west';
import { banetsuEastLine } from './lines/jr_banetsu_east';
import { myokoHaneumaLine } from './lines/echigo_tokimeki_myoko_haneuma';
import { kitaShinanoLine } from './lines/shinano_kita_shinano';
import { nihonkaiHisuiLine } from './lines/echigo_tokimeki_nihonkai_hisui';
import { hokuhokuLine } from './lines/hokuhoku';
import { hokurikuShinkansenLine } from './lines/jr_hokuriku_shinkansen';
import { tobuSkytreeLine } from './lines/tobu_skytree';
import { tobuIsesakiLine } from './lines/tobu_isesaki';
import { tobuKameidoLine } from './lines/tobu_kameido';
import { tobuDaishiLine } from './lines/tobu_daishi';
import { tobuSanoLine } from './lines/tobu_sano';
import { tobuKoizumiLine } from './lines/tobu_koizumi';
import { tobuKiryuLine } from './lines/tobu_kiryu';
import { tobuNikkoLine } from './lines/tobu_nikko';
import { tobuUtsunomiyaLine } from './lines/tobu_utsunomiya';
import { tobuKinugawaLine } from './lines/tobu_kinugawa';
import { tobuUrbanParkLine } from './lines/tobu_urban_park';
import { yaganLine } from './lines/yagan';
import { aizuLine } from './lines/aizu';
import { yamagataShinkansenLine } from './lines/jr_yamagata_shinkansen';
import { akitaShinkansenLine } from './lines/jr_akita_shinkansen';
import { ouFukushimaShinjoLine } from './lines/jr_ou_fukushima_shinjo';
import { ouShinjoOmagariLine } from './lines/jr_ou_shinjo_omagari';
import { ouOmagariAkitaLine } from './lines/jr_ou_omagari_akita';
import { ouAkitaAomoriLine } from './lines/jr_ou_akita_aomori';
import { fujikyuLine } from './lines/fujikyu';
import { gotembaLine } from './lines/jr_gotemba';
import { izukyuLine } from './lines/izukyu';
import { izuhakoneSunzuLine } from './lines/izuhakone_sunzu';
import { hibiyaLine } from './lines/tokyo_metro_hibiya';
import { marunouchiLine } from './lines/tokyo_metro_marunouchi';
import { hanzomonLine } from './lines/tokyo_metro_hanzomon';
import { ginzaLine } from './lines/tokyo_metro_ginza';
import { nambokuLine } from './lines/tokyo_metro_namboku';
import { tozaiLine } from './lines/tokyo_metro_tozai';
import { yamanoteLine } from './lines/jr_yamanote';
import { keiyoLine } from './lines/jr_keiyo';
import { sotoboLine } from './lines/jr_sotobo';
import { sobuMainLine } from './lines/jr_sobu_main';
import { naritaLine } from './lines/jr_narita';
import { toganeLine } from './lines/jr_togane';
import { kururiLine } from './lines/jr_kururi';
import { chuoSobuLocalLine } from './lines/jr_chuo_sobu_local';
import { keihinTohokuNegishiLine } from './lines/jr_keihin_tohoku_negishi';
import { yokohamaLine } from './lines/jr_yokohama';
import { nambuLine } from './lines/jr_nambu';
import { tsurumiLine } from './lines/jr_tsurumi';
import { uchiboLine } from './lines/jr_uchibo';
import { tokaidoShinkansenLine } from './lines/jr_tokaido_shinkansen';
import { sanyoShinkansenLine } from './lines/jr_sanyo_shinkansen';
import { tokaidoAtamiToyohashiLine } from './lines/jr_tokaido_atami_toyohashi';
import { tokaidoToyohashiMaibaraLine } from './lines/jr_tokaido_toyohashi_maibara';
import { tokaidoMinoakasakaLine } from './lines/jr_tokaido_minoakasaka';
import { jrBiwakoLine } from './lines/jr_biwako';
import { jrKyotoLine } from './lines/jr_kyoto';
import { jrKobeLine } from './lines/jr_kobe';
import { tohokuKuroisoFukushimaLine } from './lines/jr_tohoku_kuroiso_fukushima';
import { tohokuFukushimaSendaiLine } from './lines/jr_tohoku_fukushima_sendai';
import { tohokuSendaiIchinosekiLine } from './lines/jr_tohoku_sendai_ichinoseki';
import { tohokuRifuLine } from './lines/jr_tohoku_rifu';
import { tohokuIchinosekiMoriokaLine } from './lines/jr_tohoku_ichinoseki_morioka';
import { igrIwateGingaLine } from './lines/igr_iwate_ginga';
import { aoimoriLine } from './lines/aoimori';
import { sensekiLine } from './lines/jr_senseki';
import { sensekiTohokuLine } from './lines/jr_senseki_tohoku';
import { ishinomakiLine } from './lines/jr_ishinomaki';
import { rikuuEastLine } from './lines/jr_rikuu_east';
import { rikuuWestLine } from './lines/jr_rikuu_west';
import { senzanLine } from './lines/jr_senzan';
import { sendaiAirportLine } from './lines/sendai_airport';
import { kitakamiLine } from './lines/jr_kitakami';
import { ofunatoLine } from './lines/jr_ofunato';
import { ofunatoBrtLine } from './lines/jr_ofunato_brt';
import { kesennumaLine } from './lines/jr_kesennuma';
import { kesennumaBrtLine } from './lines/jr_kesennuma_brt';
import { kamaishiLine } from './lines/jr_kamaishi';
import { tazawakoLine } from './lines/jr_tazawako';
import { yamadaLine } from './lines/jr_yamada';
import { hachinoheLine } from './lines/jr_hachinohe';
import { ominatoLine } from './lines/jr_ominato';
import { tsugaruLine } from './lines/jr_tsugaru';
import { gonoLine } from './lines/jr_gono';
import { ogaLine } from './lines/jr_oga';
import { jrChuoWestLine } from './lines/jr_chuo_west';
import { jrTakayamaLine } from './lines/jr_takayama';
import { jrKansaiNagoyaKameyamaLine } from './lines/jr_kansai_nagoya_kameyama';
import { jrKiseiKameyamaShinguLine } from './lines/jr_kisei_kameyama_shingu';
import { jrIidaLine } from './lines/jr_iida';
import { jrMinobuLine } from './lines/jr_minobu';
import { jrTaketoyoLine } from './lines/jr_taketoyo';
import { jrTaitaLine } from './lines/jr_taita';
import { jrMeishoLine } from './lines/jr_meisho';
import { jrSanguLine } from './lines/jr_sangu';
import { jrOsakaLoopLine } from './lines/jr_osaka_loop';
import { jrYumesakiLine } from './lines/jr_yumesaki';
import { jrTozaiLine } from './lines/jr_tozai';
import { jrGakkenToshiLine } from './lines/jr_gakken_toshi';
import { jrTakarazukaLine } from './lines/jr_takarazuka';
import { jrFukuchiyamaNorthLine } from './lines/jr_fukuchiyama_north';
import { jrYamatojiLine } from './lines/jr_yamatoji';
import { jrOsakaHigashiLine } from './lines/jr_osaka_higashi';
import { jrHanwaLine } from './lines/jr_hanwa';
import { jrKansaiAirportLine } from './lines/jr_kansai_airport';
import { jrHokurikuMaibaraTsurugaLine } from './lines/jr_hokuriku_maibara_tsuruga';
import { jrSaganoLine } from './lines/jr_sagano';
import { jrSaninSonobeKinosakiLine } from './lines/jr_sanin_sonobe_kinosaki';
import { jrKoseiLine } from './lines/jr_kosei';
import { jrKusatsuLine } from './lines/jr_kusatsu';
import { jrNaraLine } from './lines/jr_nara';
import { jrSakuraiLine } from './lines/jr_sakurai';
import { jrWakayamaLine } from './lines/jr_wakayama';
import { jrKinokuniLine } from './lines/jr_kinokuni';
import { jrKansaiKameyamaKamoLine } from './lines/jr_kansai_kameyama_kamo';
import { jrSanyoHimejiKamigoriLine } from './lines/jr_sanyo_himeji_kamigori';
import { jrAkoLine } from './lines/jr_ako';
import { jrKakogawaLine } from './lines/jr_kakogawa';
import { jrKishinLine } from './lines/jr_kishin';
import { jrBantanLine } from './lines/jr_bantan';
import { jrMaizuruLine } from './lines/jr_maizuru';
import { jrObamaLine } from './lines/jr_obama';
import { jrWadamisakiLine } from './lines/jr_wadamisaki';
// 甲信越追加9路線
import { jrKoumiLine } from './lines/jr_koumi';
import { jrIiyamaLine } from './lines/jr_iiyama';
import { jrEchigoLine } from './lines/jr_echigo';
import { jrYahikoLine } from './lines/jr_yahiko';
import { jrChuoTatsunoLine } from './lines/jr_chuo_tatsuno';
import { shinanoLine } from './lines/shinano_shinano';
import { naganoDentetsuLine } from './lines/nagano_dentetsu';
import { alpicoKamikochiLine } from './lines/alpico_kamikochi';
import { uedaBesshoLine } from './lines/ueda_bessho';
// 関東追加79路線
import { jrAgatsumaLine } from './lines/jr_agatsuma';
import { jrKarasuyamaLine } from './lines/jr_karasuyama';
import { jrNikkoLine } from './lines/jr_nikko';
import { jrMitoLine } from './lines/jr_mito';
import { jrSuigunLine } from './lines/jr_suigun';
import { jrKashimaLine } from './lines/jr_kashima';
import { toeiAsakusaLine } from './lines/toei_asakusa';
import { toeiMitaLine } from './lines/toei_mita';
import { toeiShinjukuLine } from './lines/toei_shinjuku';
import { toeiOedoLine } from './lines/toei_oedo';
import { toeiArakawaLine } from './lines/toei_arakawa';
import { toeiNipporiToneriLine } from './lines/toei_nippori_toneri';
import { keioLineLine } from './lines/keio_line';
import { keioNewLine } from './lines/keio_new';
import { keioSagamiharaLine } from './lines/keio_sagamihara';
import { keioKeibajoLine } from './lines/keio_keibajo';
import { keioDobutsuenLine } from './lines/keio_dobutsuen';
import { keioTakaoLine } from './lines/keio_takao';
import { keioInokashiraLine } from './lines/keio_inokashira';
import { keiseiMainLine } from './lines/keisei_main';
import { keiseiOshiageLine } from './lines/keisei_oshiage';
import { keiseiKanamachiLine } from './lines/keisei_kanamachi';
import { keiseiChibaLine } from './lines/keisei_chiba';
import { keiseiChiharaLine } from './lines/keisei_chihara';
import { keiseiHigashiNaritaLine } from './lines/keisei_higashi_narita';
import { keiseiNaritaSkyAccessLine } from './lines/keisei_narita_sky_access';
import { keiseiMatsudoLine } from './lines/keisei_matsudo';
import { keikyuMainLine } from './lines/keikyu_main';
import { keikyuAirportLine } from './lines/keikyu_airport';
import { keikyuDaishiLine } from './lines/keikyu_daishi';
import { keikyuZushiLine } from './lines/keikyu_zushi';
import { keikyuKurihamaLine } from './lines/keikyu_kurihama';
import { seibuShinjukuLine } from './lines/seibu_shinjuku';
import { seibuHaijimaLine } from './lines/seibu_haijima';
import { seibuTamakoLine } from './lines/seibu_tamako';
import { seibuKokubunjiLine } from './lines/seibu_kokubunji';
import { seibuSeibuenLine } from './lines/seibu_seibuen';
import { seibuTamagawaLine } from './lines/seibu_tamagawa';
import { seibuToshimaLine } from './lines/seibu_toshima';
import { seibuSayamaLine } from './lines/seibu_sayama';
import { seibuYamaguchiLine } from './lines/seibu_yamaguchi';
import { tokyuMeguroLine } from './lines/tokyu_meguro';
import { tokyuDenentoshiLine } from './lines/tokyu_denentoshi';
import { tokyuOimachiLine } from './lines/tokyu_oimachi';
import { tokyuIkegamiLine } from './lines/tokyu_ikegami';
import { tokyuTamagawaLine } from './lines/tokyu_tamagawa';
import { tokyuSetagayaLine } from './lines/tokyu_setagaya';
import { tokyuKodomonokuniLine } from './lines/tokyu_kodomonokuni';
import { saitamaRapidLine } from './lines/saitama_rapid';
import { toyoRapidLine } from './lines/toyo_rapid';
import { yokohamaBlueLine } from './lines/yokohama_blue';
import { yokohamaGreenLine } from './lines/yokohama_green';
import { yurikamomeLine } from './lines/yurikamome';
import { tokyoMonorailLine } from './lines/tokyo_monorail';
import { tamaMonorailLine } from './lines/tama_monorail';
import { chibaMonorail1Line } from './lines/chiba_monorail_1';
import { chibaMonorail2Line } from './lines/chiba_monorail_2';
import { shonanMonorailLine } from './lines/shonan_monorail';
import { newShuttleLine } from './lines/new_shuttle';
import { seasideLineLine } from './lines/seaside_line';
import { utsunomiyaLightRailLine } from './lines/utsunomiya_light_rail';
import { hokusoLine } from './lines/hokuso';
import { shibayamaLine } from './lines/shibayama';
import { kantoJosoLine } from './lines/kanto_joso';
import { kantoRyugasakiLine } from './lines/kanto_ryugasaki';
import { ryutetsuLine } from './lines/ryutetsu';
import { choshiLine } from './lines/choshi';
import { kominatoLine } from './lines/kominato';
import { isumiLine } from './lines/isumi';
import { yamamanYukarigaokaLine } from './lines/yamaman_yukarigaoka';
import { enodenLine } from './lines/enoden';
import { hakoneTozanLine } from './lines/hakone_tozan';
import { hakoneCableLine } from './lines/hakone_cable';
import { izuhakoneDaiyuzanLine } from './lines/izuhakone_daiyuzan';
import { joshinLine } from './lines/joshin';
import { jomoLine } from './lines/jomo';
import { mokaLine } from './lines/moka';
import { kashimaRinkaiLine } from './lines/kashima_rinkai';
import { hitachinakaLine } from './lines/hitachinaka';
import { yonesakaLine } from './lines/jr_yonesaka';
import { aterazawaLine } from './lines/jr_aterazawa';
import { hanawaLine } from './lines/jr_hanawa';
import { sendaiSubwayNambokuLine } from './lines/sendai_subway_namboku';
import { sendaiSubwayTozaiLine } from './lines/sendai_subway_tozai';
import { sanrikuRiasLine } from './lines/sanriku_rias';
import { konanKonanLine } from './lines/konan_konan';
import { konanOwaniLine } from './lines/konan_owani';
import { tsugaruRailwayLine } from './lines/tsugaru_railway';
import { akitaNairikuLine } from './lines/akita_nairiku';
import { yuriKogenLine } from './lines/yuri_kogen';
import { yamagataFlowerNagaiLine } from './lines/yamagata_flower_nagai';
import { abukumaExpressLine } from './lines/abukuma_express';
import { fukushimaIizakaLine } from './lines/fukushima_iizaka';


// 登録路線マップ（新幹線・主要幹線・都市圏路線・ローカル線の自然な順序）
export const LINES_REGISTRY: Record<string, LineDefinition> = {
  // === 新幹線 ===
  jr_tokaido_shinkansen: tokaidoShinkansenLine,
  jr_sanyo_shinkansen: sanyoShinkansenLine,
  jr_tohoku_shinkansen: tohokuShinkansenLine,
  jr_joetsu_shinkansen: joetsuShinkansenLine,
  jr_hokuriku_shinkansen: hokurikuShinkansenLine,
  jr_yamagata_shinkansen: yamagataShinkansenLine,
  jr_akita_shinkansen: akitaShinkansenLine,

  // === JR東日本（首都圏主要幹線・電車特定区間） ===
  jr_yamanote: yamanoteLine,
  jr_keihin_tohoku_negishi: keihinTohokuNegishiLine,
  jr_ueno_tokyo: uenoTokyoLine,
  jr_shonan_shinjuku: shonanShinjukuLine,
  jr_tokaido: tokaidoLine,
  jr_yokosuka: yokosukaLine,
  jr_chuo: chuoLine,
  jr_chuo_sobu_local: chuoSobuLocalLine,
  jr_sobu_rapid: sobuRapidLine,
  jr_utsunomiya: utsunomiyaLine,
  jr_takasaki: takasakiLine,
  jr_joban_rapid: jobanRapidLine,
  jr_joban_local: jobanLocalLine,
  jr_saikyo: saikyoLine,
  jr_musashino: musashinoLine,
  jr_keiyo: keiyoLine,

  // === JR東日本（首都圏近郊・周辺線区・直通線） ===
  jr_yokohama: yokohamaLine,
  jr_nambu: nambuLine,
  jr_tsurumi: tsurumiLine,
  jr_sotetsu_jr_direct: sotetsuJrDirectLine,
  jr_kawagoe: kawagoeLine,
  jr_hachiko: hachikoLine,
  jr_ome: omeLine,
  jr_itsukaichi: itsukaichiLine,

  // === JR東日本（房総・北関東線区） ===
  jr_sobu_main: sobuMainLine,
  jr_narita: naritaLine,
  jr_sotobo: sotoboLine,
  jr_uchibo: uchiboLine,
  jr_togane: toganeLine,
  jr_kururi: kururiLine,
  jr_ryomo: ryomoLine,
  jr_agatsuma: jrAgatsumaLine,
  jr_karasuyama: jrKarasuyamaLine,
  jr_nikko: jrNikkoLine,
  jr_mito: jrMitoLine,
  jr_suigun: jrSuigunLine,
  jr_kashima: jrKashimaLine,
  jr_ito: itoLine,

  // === JR東日本（甲信越・信越・新潟線区） ===
  jr_chuo_main: chuoMainLine,
  jr_chuo_tatsuno: jrChuoTatsunoLine,
  jr_shinonoi: shinonoiLine,
  jr_oito_east: oitoEastLine,
  jr_koumi: jrKoumiLine,
  jr_iiyama: jrIiyamaLine,
  jr_joetsu: joetsuLine,
  jr_shinetsu_takasaki_yokokawa: shinetsuTakasakiYokokawaLine,
  jr_shinetsu_naoetsu_niigata: shinetsuNaoetsuNiigataLine,
  jr_echigo: jrEchigoLine,
  jr_yahiko: jrYahikoLine,
  jr_hakushin: hakushinLine,
  jr_uetsu_main: uetsuMainLine,

  // === JR東日本（常磐北部・東北幹線・仙台近郊） ===
  jr_joban_toride_iwaki: jobanTorideIwakiLine,
  jr_joban_iwaki_sendai: jobanIwakiSendaiLine,
  jr_tohoku_kuroiso_fukushima: tohokuKuroisoFukushimaLine,
  jr_tohoku_fukushima_sendai: tohokuFukushimaSendaiLine,
  jr_tohoku_sendai_ichinoseki: tohokuSendaiIchinosekiLine,
  jr_tohoku_rifu: tohokuRifuLine,
  jr_tohoku_ichinoseki_morioka: tohokuIchinosekiMoriokaLine,
  jr_senzan: senzanLine,
  jr_senseki: sensekiLine,
  jr_senseki_tohoku: sensekiTohokuLine,
  jr_ishinomaki: ishinomakiLine,

  // === JR東日本（山形・秋田・青森・北東北線区） ===
  jr_ou_fukushima_shinjo: ouFukushimaShinjoLine,
  jr_ou_shinjo_omagari: ouShinjoOmagariLine,
  jr_ou_omagari_akita: ouOmagariAkitaLine,
  jr_ou_akita_aomori: ouAkitaAomoriLine,
  jr_tazawako: tazawakoLine,
  jr_kitakami: kitakamiLine,
  jr_kamaishi: kamaishiLine,
  jr_yamada: yamadaLine,
  jr_hachinohe: hachinoheLine,
  jr_hanawa: hanawaLine,
  jr_ominato: ominatoLine,
  jr_tsugaru: tsugaruLine,
  jr_gono: gonoLine,
  jr_oga: ogaLine,

  // === JR東日本（南東北ローカル・BRT線区） ===
  jr_banetsu_east: banetsuEastLine,
  jr_banetsu_west: banetsuWestLine,
  jr_tadami: tadamiLine,
  jr_yonesaka: yonesakaLine,
  jr_aterazawa: aterazawaLine,
  jr_rikuu_east: rikuuEastLine,
  jr_rikuu_west: rikuuWestLine,
  jr_kesennuma: kesennumaLine,
  jr_kesennuma_brt: kesennumaBrtLine,
  jr_ofunato: ofunatoLine,
  jr_ofunato_brt: ofunatoBrtLine,

  // === JR東海 ===
  jr_tokaido_atami_toyohashi: tokaidoAtamiToyohashiLine,
  jr_tokaido_toyohashi_maibara: tokaidoToyohashiMaibaraLine,
  jr_tokaido_minoakasaka: tokaidoMinoakasakaLine,
  jr_gotemba: gotembaLine,
  jr_minobu: jrMinobuLine,
  jr_iida: jrIidaLine,
  jr_chuo_west: jrChuoWestLine,
  jr_taita: jrTaitaLine,
  jr_takayama: jrTakayamaLine,
  jr_kansai_nagoya_kameyama: jrKansaiNagoyaKameyamaLine,
  jr_taketoyo: jrTaketoyoLine,
  jr_kisei_kameyama_shingu: jrKiseiKameyamaShinguLine,
  jr_meisho: jrMeishoLine,
  jr_sangu: jrSanguLine,

  // === JR西日本（近畿アーバンネットワーク・主要幹線） ===
  jr_biwako: jrBiwakoLine,
  jr_kyoto: jrKyotoLine,
  jr_kobe: jrKobeLine,
  jr_sanyo_himeji_kamigori: jrSanyoHimejiKamigoriLine,
  jr_ako: jrAkoLine,
  jr_osaka_loop: jrOsakaLoopLine,
  jr_yumesaki: jrYumesakiLine,
  jr_tozai: jrTozaiLine,
  jr_gakken_toshi: jrGakkenToshiLine,
  jr_takarazuka: jrTakarazukaLine,
  jr_fukuchiyama_north: jrFukuchiyamaNorthLine,
  jr_osaka_higashi: jrOsakaHigashiLine,
  jr_yamatoji: jrYamatojiLine,
  jr_nara: jrNaraLine,
  jr_sakurai: jrSakuraiLine,
  jr_wakayama: jrWakayamaLine,
  jr_hanwa: jrHanwaLine,
  jr_kansai_airport: jrKansaiAirportLine,
  jr_kinokuni: jrKinokuniLine,
  jr_kosei: jrKoseiLine,
  jr_kusatsu: jrKusatsuLine,
  jr_hokuriku_maibara_tsuruga: jrHokurikuMaibaraTsurugaLine,
  jr_sagano: jrSaganoLine,
  jr_sanin_sonobe_kinosaki: jrSaninSonobeKinosakiLine,

  // === JR西日本（北近畿・兵庫・山陽ローカル・支線・甲信越） ===
  jr_maizuru: jrMaizuruLine,
  jr_obama: jrObamaLine,
  jr_kakogawa: jrKakogawaLine,
  jr_bantan: jrBantanLine,
  jr_kishin: jrKishinLine,
  jr_wadamisaki: jrWadamisakiLine,
  jr_kansai_kameyama_kamo: jrKansaiKameyamaKamoLine,
  jr_oito_west: oitoWestLine,

  // === 東京メトロ ===
  tokyo_metro_ginza: ginzaLine,
  tokyo_metro_marunouchi: marunouchiLine,
  tokyo_metro_hibiya: hibiyaLine,
  tokyo_metro_tozai: tozaiLine,
  tokyo_metro_chiyoda: chiyodaLine,
  tokyo_metro_yurakucho: yurakuchoLine,
  tokyo_metro_hanzomon: hanzomonLine,
  tokyo_metro_namboku: nambokuLine,
  tokyo_metro_fukutoshin: fukutoshinLine,

  // === 東武鉄道 ===
  tobu_skytree: tobuSkytreeLine,
  tobu_isesaki: tobuIsesakiLine,
  tobu_kameido: tobuKameidoLine,
  tobu_daishi: tobuDaishiLine,
  tobu_sano: tobuSanoLine,
  tobu_koizumi: tobuKoizumiLine,
  tobu_kiryu: tobuKiryuLine,
  tobu_nikko: tobuNikkoLine,
  tobu_utsunomiya: tobuUtsunomiyaLine,
  tobu_kinugawa: tobuKinugawaLine,
  tobu_urban_park: tobuUrbanParkLine,
  tobu_tojo: tojoLine,
  tobu_ogose: ogoseLine,

  // === 西武鉄道 ===
  seibu_ikebukuro: seibuIkebukuroLine,
  seibu_yurakucho: seibuYurakuchoLine,
  seibu_toshima: seibuToshimaLine,
  seibu_sayama: seibuSayamaLine,
  seibu_shinjuku: seibuShinjukuLine,
  seibu_haijima: seibuHaijimaLine,
  seibu_tamako: seibuTamakoLine,
  seibu_kokubunji: seibuKokubunjiLine,
  seibu_seibuen: seibuSeibuenLine,
  seibu_tamagawa: seibuTamagawaLine,
  seibu_yamaguchi: seibuYamaguchiLine,

  // === 東京都交通局 ===
  toei_asakusa: toeiAsakusaLine,
  toei_mita: toeiMitaLine,
  toei_shinjuku: toeiShinjukuLine,
  toei_oedo: toeiOedoLine,
  toei_arakawa: toeiArakawaLine,
  toei_nippori_toneri: toeiNipporiToneriLine,

  // === 京王電鉄 ===
  keio_line: keioLineLine,
  keio_new: keioNewLine,
  keio_sagamihara: keioSagamiharaLine,
  keio_keibajo: keioKeibajoLine,
  keio_dobutsuen: keioDobutsuenLine,
  keio_takao: keioTakaoLine,
  keio_inokashira: keioInokashiraLine,

  // === 京成電鉄 ===
  keisei_main: keiseiMainLine,
  keisei_oshiage: keiseiOshiageLine,
  keisei_kanamachi: keiseiKanamachiLine,
  keisei_chiba: keiseiChibaLine,
  keisei_chihara: keiseiChiharaLine,
  keisei_higashi_narita: keiseiHigashiNaritaLine,
  keisei_narita_sky_access: keiseiNaritaSkyAccessLine,
  keisei_matsudo: keiseiMatsudoLine,

  // === 京浜急行電鉄 ===
  keikyu_main: keikyuMainLine,
  keikyu_airport: keikyuAirportLine,
  keikyu_daishi: keikyuDaishiLine,
  keikyu_zushi: keikyuZushiLine,
  keikyu_kurihama: keikyuKurihamaLine,

  // === 小田急電鉄 ===
  odakyu_odawara: odakyuOdawaraLine,
  odakyu_enoshima: odakyuEnoshimaLine,
  odakyu_tama: odakyuTamaLine,

  // === 東急電鉄 ===
  tokyu_toyoko: tokyuToyokoLine,
  tokyu_shin_yokohama: tokyuShinYokohamaLine,
  tokyu_meguro: tokyuMeguroLine,
  tokyu_denentoshi: tokyuDenentoshiLine,
  tokyu_oimachi: tokyuOimachiLine,
  tokyu_ikegami: tokyuIkegamiLine,
  tokyu_tamagawa: tokyuTamagawaLine,
  tokyu_setagaya: tokyuSetagayaLine,
  tokyu_kodomonokuni: tokyuKodomonokuniLine,

  // === 横浜高速鉄道 ===
  minatomirai: minatomiraiLine,

  // === 相模鉄道 ===
  sotetsu_shin_yokohama: sotetsuShinYokohamaLine,
  sotetsu_main: sotetsuMainLine,
  sotetsu_izumino: sotetsuIzuminoLine,

  // === 埼玉高速鉄道・東葉高速鉄道 ===
  saitama_rapid: saitamaRapidLine,
  toyo_rapid: toyoRapidLine,

  // === 横浜市交通局 ===
  yokohama_blue: yokohamaBlueLine,
  yokohama_green: yokohamaGreenLine,

  // === モノレール・新交通・LRT ===
  tokyo_monorail: tokyoMonorailLine,
  yurikamome: yurikamomeLine,
  tama_monorail: tamaMonorailLine,
  chiba_monorail_1: chibaMonorail1Line,
  chiba_monorail_2: chibaMonorail2Line,
  shonan_monorail: shonanMonorailLine,
  new_shuttle: newShuttleLine,
  seaside_line: seasideLineLine,
  utsunomiya_light_rail: utsunomiyaLightRailLine,

  // === 北総鉄道・芝山鉄道 ===
  hokuso: hokusoLine,
  shibayama: shibayamaLine,

  // === 関東鉄道・流鉄・銚子電鉄・小湊・いすみ・山万 ===
  kanto_joso: kantoJosoLine,
  kanto_ryugasaki: kantoRyugasakiLine,
  ryutetsu: ryutetsuLine,
  choshi: choshiLine,
  kominato: kominatoLine,
  isumi: isumiLine,
  yamaman_yukarigaoka: yamamanYukarigaokaLine,

  // === 江ノ島電鉄・小田急箱根 ===
  enoden: enodenLine,
  hakone_tozan: hakoneTozanLine,
  hakone_cable: hakoneCableLine,

  // === 上信電鉄・上毛電鉄・真岡・鹿島臨海・ひたちなか ===
  joshin: joshinLine,
  jomo: jomoLine,
  moka: mokaLine,
  kashima_rinkai: kashimaRinkaiLine,
  hitachinaka: hitachinakaLine,

  // === 首都圏新都市鉄道 ===
  tsukuba_express: tsukubaExpressLine,

  // === 東京臨海高速鉄道 ===
  rinkai: rinkaiLine,

  // === 秩父鉄道 ===
  chichibu: chichibuLine,

  // === 富士山麓電気鉄道 ===
  fujikyu: fujikyuLine,

  // === 伊豆急行 ===
  izukyu: izukyuLine,

  // === 伊豆箱根鉄道 ===
  izuhakone_sunzu: izuhakoneSunzuLine,
  izuhakone_daiyuzan: izuhakoneDaiyuzanLine,

  // === 野岩鉄道 ===
  yagan: yaganLine,

  // === 会津鉄道 ===
  aizu: aizuLine,

  // === 北越急行 ===
  hokuhoku: hokuhokuLine,

  // === えちごトキめき鉄道 ===
  echigo_tokimeki_myoko_haneuma: myokoHaneumaLine,
  echigo_tokimeki_nihonkai_hisui: nihonkaiHisuiLine,

  // === しなの鉄道 ===
  shinano_shinano: shinanoLine,
  shinano_kita_shinano: kitaShinanoLine,

  // === 長野電鉄・アルピコ交通・上田電鉄 ===
  nagano_dentetsu: naganoDentetsuLine,
  alpico_kamikochi: alpicoKamikochiLine,
  ueda_bessho: uedaBesshoLine,

  // === IGRいわて銀河鉄道 ===
  igr_iwate_ginga: igrIwateGingaLine,

  // === 青い森鉄道 ===
  aoimori: aoimoriLine,

  // === 仙台空港鉄道 ===
  sendai_airport: sendaiAirportLine,

  // === 仙台市交通局（仙台市地下鉄） ===
  sendai_subway_namboku: sendaiSubwayNambokuLine,
  sendai_subway_tozai: sendaiSubwayTozaiLine,

  // === 三陸鉄道 ===
  sanriku_rias: sanrikuRiasLine,

  // === 弘南鉄道 ===
  konan_konan: konanKonanLine,
  konan_owani: konanOwaniLine,

  // === 津軽鉄道 ===
  tsugaru_railway: tsugaruRailwayLine,

  // === 秋田内陸縦貫鉄道 ===
  akita_nairiku: akitaNairikuLine,

  // === 由利高原鉄道 ===
  yuri_kogen: yuriKogenLine,

  // === 山形鉄道 ===
  yamagata_flower_nagai: yamagataFlowerNagaiLine,

  // === 阿武隈急行 ===
  abukuma_express: abukumaExpressLine,

  // === 福島交通 ===
  fukushima_iizaka: fukushimaIizakaLine,
};

// 登録されている全路線の配列を取得
export function getAllLines(): LineDefinition[] {
  const lines = Object.values(LINES_REGISTRY);
  for (const line of lines) {
    if (!line.area && LINE_AREA_MAP[line.id]) {
      line.area = LINE_AREA_MAP[line.id];
    }
  }
  return lines;
}

export interface OperatorLinesGroup {
  operator: string;
  lines: LineDefinition[];
}

// 運行会社ごとの標準表示順序
export const OPERATOR_DISPLAY_ORDER = [
  'JR東日本',
  'JR東海',
  'JR西日本',
  '東京メトロ',
  '東京都交通局',
  '東武鉄道',
  '西武鉄道',
  '京王電鉄',
  '京成電鉄',
  '京浜急行電鉄',
  '小田急電鉄',
  '東急電鉄',
  '横浜高速鉄道',
  '相模鉄道',
  '埼玉高速鉄道',
  '東葉高速鉄道',
  '横浜市交通局',
  '首都圏新都市鉄道',
  '東京臨海高速鉄道',
  '東京モノレール',
  'ゆりかもめ',
  '多摩都市モノレール',
  '千葉都市モノレール',
  '湘南モノレール',
  '埼玉新都市交通',
  '横浜シーサイドライン',
  '宇都宮ライトレール',
  '北総鉄道',
  '芝山鉄道',
  '秩父鉄道',
  '関東鉄道',
  '流鉄',
  '銚子電気鉄道',
  '小湊鉄道',
  'いすみ鉄道',
  '山万',
  '江ノ島電鉄',
  '小田急箱根',
  '伊豆箱根鉄道',
  '上信電鉄',
  '上毛電気鉄道',
  '真岡鐵道',
  '鹿島臨海鉄道',
  'ひたちなか海浜鉄道',
  '富士山麓電気鉄道',
  '伊豆急行',
  '野岩鉄道',
  '会津鉄道',
  '北越急行',
  'えちごトキめき鉄道',
  'しなの鉄道',
  '長野電鉄',
  'アルピコ交通',
  '上田電鉄',
  '仙台空港鉄道',
  '仙台市交通局',
  '阿武隈急行',
  '福島交通',
  '山形鉄道',
  '三陸鉄道',
  'IGRいわて銀河鉄道',
  '青い森鉄道',
  '由利高原鉄道',
  '秋田内陸縦貫鉄道',
  '弘南鉄道',
  '津軽鉄道',
];

// 運行会社ごとにグループ化した路線リストを取得
export function getLinesGroupedByOperator(): OperatorLinesGroup[] {
  const allLines = getAllLines();
  const map = new Map<string, LineDefinition[]>();

  for (const line of allLines) {
    const op = line.operator || 'その他';
    const list = map.get(op);
    if (list) {
      list.push(line);
    } else {
      map.set(op, [line]);
    }
  }

  const sortedOperators = Array.from(map.keys()).sort((a, b) => {
    const idxA = OPERATOR_DISPLAY_ORDER.indexOf(a);
    const idxB = OPERATOR_DISPLAY_ORDER.indexOf(b);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return a.localeCompare(b, 'ja');
  });

  return sortedOperators.map((operator) => ({
    operator,
    lines: map.get(operator)!,
  }));
}

// エリアマッピング
export const LINE_AREA_MAP: Record<string, RegionArea> = {
  jr_tohoku_shinkansen: 'tohoku',
  jr_joetsu_shinkansen: 'koshinetsu',
  jr_yamagata_shinkansen: 'tohoku',
  jr_akita_shinkansen: 'tohoku',
  jr_hokuriku_shinkansen: 'koshinetsu',
  jr_yamanote: 'kanto',
  jr_keihin_tohoku_negishi: 'kanto',
  jr_chuo: 'kanto',
  jr_chuo_sobu_local: 'kanto',
  jr_saikyo: 'kanto',
  jr_musashino: 'kanto',
  jr_keiyo: 'kanto',
  jr_ueno_tokyo: 'kanto',
  jr_shonan_shinjuku: 'kanto',
  jr_tokaido: 'kanto',
  jr_yokosuka: 'kanto',
  jr_sobu_rapid: 'kanto',
  jr_utsunomiya: 'kanto',
  jr_tohoku_kuroiso_fukushima: 'tohoku',
  jr_tohoku_fukushima_sendai: 'tohoku',
  jr_tohoku_sendai_ichinoseki: 'tohoku',
  jr_tohoku_rifu: 'tohoku',
  jr_tohoku_ichinoseki_morioka: 'tohoku',
  jr_senseki: 'tohoku',
  jr_senseki_tohoku: 'tohoku',
  jr_ishinomaki: 'tohoku',
  jr_rikuu_east: 'tohoku',
  jr_rikuu_west: 'tohoku',
  jr_senzan: 'tohoku',
  sendai_airport: 'tohoku',
  jr_kitakami: 'tohoku',
  jr_ofunato: 'tohoku',
  jr_ofunato_brt: 'tohoku',
  jr_kesennuma: 'tohoku',
  jr_kesennuma_brt: 'tohoku',
  jr_kamaishi: 'tohoku',
  jr_tazawako: 'tohoku',
  jr_yamada: 'tohoku',
  jr_hachinohe: 'tohoku',
  jr_ominato: 'tohoku',
  jr_tsugaru: 'tohoku',
  jr_gono: 'tohoku',
  jr_oga: 'tohoku',
  jr_takasaki: 'kanto',
  jr_ito: 'tokai',
  jr_joban_rapid: 'kanto',
  jr_joban_local: 'kanto',
  jr_joban_toride_iwaki: 'tohoku',
  jr_joban_iwaki_sendai: 'tohoku',
  jr_yokohama: 'kanto',
  jr_nambu: 'kanto',
  jr_tsurumi: 'kanto',
  jr_sotetsu_jr_direct: 'kanto',
  jr_kawagoe: 'kanto',
  jr_hachiko: 'kanto',
  jr_ome: 'kanto',
  jr_itsukaichi: 'kanto',
  jr_sobu_main: 'kanto',
  jr_narita: 'kanto',
  jr_sotobo: 'kanto',
  jr_uchibo: 'kanto',
  jr_togane: 'kanto',
  jr_kururi: 'kanto',
  jr_ryomo: 'kanto',
  jr_joetsu: 'koshinetsu',
  jr_chuo_main: 'koshinetsu',
  jr_shinonoi: 'koshinetsu',
  jr_oito_east: 'koshinetsu',
  jr_shinetsu_takasaki_yokokawa: 'koshinetsu',
  jr_shinetsu_naoetsu_niigata: 'koshinetsu',
  jr_hakushin: 'koshinetsu',
  jr_uetsu_main: 'koshinetsu',
  jr_ou_fukushima_shinjo: 'tohoku',
  jr_ou_shinjo_omagari: 'tohoku',
  jr_ou_omagari_akita: 'tohoku',
  jr_ou_akita_aomori: 'tohoku',
  jr_tadami: 'tohoku',
  jr_banetsu_west: 'tohoku',
  jr_banetsu_east: 'tohoku',
  jr_tokaido_atami_toyohashi: 'tokai',
  jr_tokaido_toyohashi_maibara: 'tokai',
  jr_tokaido_minoakasaka: 'tokai',
  jr_chuo_west: 'tokai',
  jr_takayama: 'tokai',
  jr_kansai_nagoya_kameyama: 'tokai',
  jr_kisei_kameyama_shingu: 'tokai',
  jr_iida: 'tokai',
  jr_minobu: 'tokai',
  jr_taketoyo: 'tokai',
  jr_taita: 'tokai',
  jr_meisho: 'tokai',
  jr_sangu: 'tokai',
  jr_osaka_loop: 'kansai',
  jr_yumesaki: 'kansai',
  jr_tozai: 'kansai',
  jr_gakken_toshi: 'kansai',
  jr_takarazuka: 'kansai',
  jr_fukuchiyama_north: 'kansai',
  jr_yamatoji: 'kansai',
  jr_osaka_higashi: 'kansai',
  jr_hanwa: 'kansai',
  jr_kansai_airport: 'kansai',
  jr_hokuriku_maibara_tsuruga: 'kansai',
  jr_sagano: 'kansai',
  jr_sanin_sonobe_kinosaki: 'kansai',
  jr_kosei: 'kansai',
  jr_kusatsu: 'kansai',
  jr_nara: 'kansai',
  jr_sakurai: 'kansai',
  jr_wakayama: 'kansai',
  jr_kinokuni: 'kansai',
  jr_kansai_kameyama_kamo: 'kansai',
  jr_sanyo_himeji_kamigori: 'kansai',
  jr_ako: 'kansai',
  jr_kakogawa: 'kansai',
  jr_kishin: 'kansai',
  jr_bantan: 'kansai',
  jr_maizuru: 'kansai',
  jr_obama: 'kansai',
  jr_wadamisaki: 'kansai',
  jr_tokaido_shinkansen: 'tokai',
  jr_sanyo_shinkansen: 'kansai',
  jr_biwako: 'kansai',
  jr_kyoto: 'kansai',
  jr_kobe: 'kansai',
  jr_gotemba: 'tokai',
  jr_oito_west: 'koshinetsu',
  tokyo_metro_ginza: 'kanto',
  tokyo_metro_marunouchi: 'kanto',
  tokyo_metro_hibiya: 'kanto',
  tokyo_metro_tozai: 'kanto',
  tokyo_metro_chiyoda: 'kanto',
  tokyo_metro_yurakucho: 'kanto',
  tokyo_metro_hanzomon: 'kanto',
  tokyo_metro_namboku: 'kanto',
  tokyo_metro_fukutoshin: 'kanto',
  tobu_skytree: 'kanto',
  tobu_isesaki: 'kanto',
  tobu_kameido: 'kanto',
  tobu_daishi: 'kanto',
  tobu_sano: 'kanto',
  tobu_koizumi: 'kanto',
  tobu_kiryu: 'kanto',
  tobu_nikko: 'kanto',
  tobu_utsunomiya: 'kanto',
  tobu_kinugawa: 'kanto',
  tobu_urban_park: 'kanto',
  tobu_tojo: 'kanto',
  tobu_ogose: 'kanto',
  seibu_ikebukuro: 'kanto',
  seibu_yurakucho: 'kanto',
  odakyu_odawara: 'kanto',
  odakyu_enoshima: 'kanto',
  odakyu_tama: 'kanto',
  tokyu_toyoko: 'kanto',
  tokyu_shin_yokohama: 'kanto',
  minatomirai: 'kanto',
  sotetsu_shin_yokohama: 'kanto',
  sotetsu_main: 'kanto',
  sotetsu_izumino: 'kanto',
  tsukuba_express: 'kanto',
  rinkai: 'kanto',
  chichibu: 'kanto',
  fujikyu: 'koshinetsu',
  izukyu: 'tokai',
  izuhakone_sunzu: 'tokai',
  yagan: 'tohoku',
  aizu: 'tohoku',
  hokuhoku: 'koshinetsu',
  echigo_tokimeki_myoko_haneuma: 'koshinetsu',
  echigo_tokimeki_nihonkai_hisui: 'koshinetsu',
  shinano_kita_shinano: 'koshinetsu',
  igr_iwate_ginga: 'tohoku',
  aoimori: 'tohoku',
  // 甲信越追加9路線
  jr_koumi: 'koshinetsu',
  jr_iiyama: 'koshinetsu',
  jr_echigo: 'koshinetsu',
  jr_yahiko: 'koshinetsu',
  jr_chuo_tatsuno: 'koshinetsu',
  shinano_shinano: 'koshinetsu',
  nagano_dentetsu: 'koshinetsu',
  alpico_kamikochi: 'koshinetsu',
  ueda_bessho: 'koshinetsu',
  // 関東追加79路線
  jr_agatsuma: 'kanto',
  jr_karasuyama: 'kanto',
  jr_nikko: 'kanto',
  jr_mito: 'kanto',
  jr_suigun: 'kanto',
  jr_kashima: 'kanto',
  toei_asakusa: 'kanto',
  toei_mita: 'kanto',
  toei_shinjuku: 'kanto',
  toei_oedo: 'kanto',
  toei_arakawa: 'kanto',
  toei_nippori_toneri: 'kanto',
  keio_line: 'kanto',
  keio_new: 'kanto',
  keio_sagamihara: 'kanto',
  keio_keibajo: 'kanto',
  keio_dobutsuen: 'kanto',
  keio_takao: 'kanto',
  keio_inokashira: 'kanto',
  keisei_main: 'kanto',
  keisei_oshiage: 'kanto',
  keisei_kanamachi: 'kanto',
  keisei_chiba: 'kanto',
  keisei_chihara: 'kanto',
  keisei_higashi_narita: 'kanto',
  keisei_narita_sky_access: 'kanto',
  keisei_matsudo: 'kanto',
  keikyu_main: 'kanto',
  keikyu_airport: 'kanto',
  keikyu_daishi: 'kanto',
  keikyu_zushi: 'kanto',
  keikyu_kurihama: 'kanto',
  seibu_shinjuku: 'kanto',
  seibu_haijima: 'kanto',
  seibu_tamako: 'kanto',
  seibu_kokubunji: 'kanto',
  seibu_seibuen: 'kanto',
  seibu_tamagawa: 'kanto',
  seibu_toshima: 'kanto',
  seibu_sayama: 'kanto',
  seibu_yamaguchi: 'kanto',
  tokyu_meguro: 'kanto',
  tokyu_denentoshi: 'kanto',
  tokyu_oimachi: 'kanto',
  tokyu_ikegami: 'kanto',
  tokyu_tamagawa: 'kanto',
  tokyu_setagaya: 'kanto',
  tokyu_kodomonokuni: 'kanto',
  saitama_rapid: 'kanto',
  toyo_rapid: 'kanto',
  yokohama_blue: 'kanto',
  yokohama_green: 'kanto',
  yurikamome: 'kanto',
  tokyo_monorail: 'kanto',
  tama_monorail: 'kanto',
  chiba_monorail_1: 'kanto',
  chiba_monorail_2: 'kanto',
  shonan_monorail: 'kanto',
  new_shuttle: 'kanto',
  seaside_line: 'kanto',
  utsunomiya_light_rail: 'kanto',
  hokuso: 'kanto',
  shibayama: 'kanto',
  kanto_joso: 'kanto',
  kanto_ryugasaki: 'kanto',
  ryutetsu: 'kanto',
  choshi: 'kanto',
  kominato: 'kanto',
  isumi: 'kanto',
  yamaman_yukarigaoka: 'kanto',
  enoden: 'kanto',
  hakone_tozan: 'kanto',
  hakone_cable: 'kanto',
  izuhakone_daiyuzan: 'kanto',
  joshin: 'kanto',
  jomo: 'kanto',
  moka: 'kanto',
  kashima_rinkai: 'kanto',
  hitachinaka: 'kanto',
  jr_yonesaka: 'tohoku',
  jr_aterazawa: 'tohoku',
  jr_hanawa: 'tohoku',
  sendai_subway_namboku: 'tohoku',
  sendai_subway_tozai: 'tohoku',
  sanriku_rias: 'tohoku',
  konan_konan: 'tohoku',
  konan_owani: 'tohoku',
  tsugaru_railway: 'tohoku',
  akita_nairiku: 'tohoku',
  yuri_kogen: 'tohoku',
  yamagata_flower_nagai: 'tohoku',
  abukuma_express: 'tohoku',
  fukushima_iizaka: 'tohoku',
};

export const AREA_INFO: Record<RegionArea, { name: string; icon: string }> = {
  kanto: { name: '関東', icon: '' },
  koshinetsu: { name: '甲信越', icon: '' },
  tohoku: { name: '東北', icon: '' },
  tokai: { name: '東海', icon: '' },
  kansai: { name: '近畿・関西', icon: '' },
};

export const AREA_DISPLAY_ORDER: RegionArea[] = ['kanto', 'koshinetsu', 'tohoku', 'tokai', 'kansai'];

export interface AreaLinesGroup {
  area: RegionArea;
  title: string;
  icon: string;
  lines: LineDefinition[];
}

// エリア内での運行会社の標準優先順序
export const AREA_OPERATOR_ORDER: Record<RegionArea, string[]> = {
  kanto: [
    'JR東日本',
    '東京メトロ',
    '東京都交通局',
    '東武鉄道',
    '西武鉄道',
    '京王電鉄',
    '京成電鉄',
    '京浜急行電鉄',
    '小田急電鉄',
    '東急電鉄',
    '横浜高速鉄道',
    '相模鉄道',
    '埼玉高速鉄道',
    '東葉高速鉄道',
    '横浜市交通局',
    '首都圏新都市鉄道',
    '東京臨海高速鉄道',
    '東京モノレール',
    'ゆりかもめ',
    '多摩都市モノレール',
    '千葉都市モノレール',
    '湘南モノレール',
    '埼玉新都市交通',
    '横浜シーサイドライン',
    '宇都宮ライトレール',
    '北総鉄道',
    '芝山鉄道',
    '秩父鉄道',
    '関東鉄道',
    '流鉄',
    '銚子電気鉄道',
    '小湊鉄道',
    'いすみ鉄道',
    '山万',
    '江ノ島電鉄',
    '小田急箱根',
    '伊豆箱根鉄道',
    '上信電鉄',
    '上毛電気鉄道',
    '真岡鐵道',
    '鹿島臨海鉄道',
    'ひたちなか海浜鉄道',
  ],
  koshinetsu: [
    'JR東日本',
    'JR西日本',
    '富士山麓電気鉄道',
    '北越急行',
    'えちごトキめき鉄道',
    'しなの鉄道',
    '長野電鉄',
    'アルピコ交通',
    '上田電鉄',
  ],
  tohoku: [
    'JR東日本',
    '仙台空港鉄道',
    '仙台市交通局',
    '阿武隈急行',
    '福島交通',
    '山形鉄道',
    '野岩鉄道',
    '会津鉄道',
    '三陸鉄道',
    'IGRいわて銀河鉄道',
    '青い森鉄道',
    '由利高原鉄道',
    '秋田内陸縦貫鉄道',
    '弘南鉄道',
    '津軽鉄道',
  ],
  tokai: [
    'JR東海',
    'JR東日本',
    '伊豆急行',
    '伊豆箱根鉄道',
  ],
  kansai: [
    'JR西日本',
  ],
};

// 運行エリアごとにグループ化した路線リストを取得
export function getLinesGroupedByArea(): AreaLinesGroup[] {
  const allLines = getAllLines();
  const map = new Map<RegionArea, LineDefinition[]>();
  for (const a of AREA_DISPLAY_ORDER) {
    map.set(a, []);
  }

  for (const line of allLines) {
    const area = line.area || LINE_AREA_MAP[line.id] || 'kanto';
    const list = map.get(area);
    if (list) {
      list.push(line);
    } else {
      map.set(area, [line]);
    }
  }

  return AREA_DISPLAY_ORDER.map((area) => {
    const rawLines = map.get(area) || [];
    const opOrder = AREA_OPERATOR_ORDER[area] || [];
    // 会社間の優先度でソート（同一会社内は LINES_REGISTRY の定義順序を維持）
    const sortedLines = [...rawLines].sort((a, b) => {
      const opA = a.operator || '';
      const opB = b.operator || '';
      if (opA === opB) return 0;
      const idxA = opOrder.indexOf(opA);
      const idxB = opOrder.indexOf(opB);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return 0;
    });

    return {
      area,
      title: AREA_INFO[area].name,
      icon: AREA_INFO[area].icon,
      lines: sortedLines,
    };
  });
}


// 路線IDによる路線定義の取得
export function getLine(lineId: LineId): LineDefinition | undefined {
  return LINES_REGISTRY[lineId];
}

// 選択された路線（または全路線）の駅リストを取得（駅ID重複を除外してユニーク化）
export function getCombinedStations(selectedLineIds?: LineId[]): Station[] {
  const lines = selectedLineIds !== undefined
    ? selectedLineIds.map((id) => LINES_REGISTRY[id]).filter(Boolean)
    : getAllLines();

  const seen = new Set<string>();
  const result: Station[] = [];
  for (const line of lines) {
    for (const st of line.stations) {
      if (!seen.has(st.id)) {
        seen.add(st.id);
        result.push(st);
      }
    }
  }
  return result;
}

// 選択された路線（または全路線）の線路セグメントを取得
export function getCombinedTrackSegments(selectedLineIds?: LineId[]): TrackSegment[] {
  const lines = selectedLineIds !== undefined
    ? selectedLineIds.map((id) => LINES_REGISTRY[id]).filter(Boolean)
    : getAllLines();

  return lines.flatMap((l) => l.trackSegments);
}

// 選択された路線（または全路線）の列車種別設定を取得
export function getCombinedTrainTypes(selectedLineIds?: LineId[]): Record<string, TrainTypeConfig> {
  const lines = selectedLineIds !== undefined
    ? selectedLineIds.map((id) => LINES_REGISTRY[id]).filter(Boolean)
    : getAllLines();

  const combined: Record<string, TrainTypeConfig> = {};
  for (const line of lines) {
    for (const [key, conf] of Object.entries(line.trainTypes)) {
      // 共通キー（local 等）は先行路線（東上線の #1e1c1c 普通）を維持
      if (!combined[key]) {
        combined[key] = conf;
      }
      combined[`${line.id}_${key}`] = conf;
    }
  }
  return combined;
}

// 路線と種別キーから種別設定を取得（路線固有の設定を優先、未指定時は全登録路線から検索、カスタム種別の上書きに対応）
export function getTrainTypeConfig(
  type: string,
  lineId?: LineId,
  customTrainType?: CustomTrainTypeConfig
): TrainTypeConfig {
  let baseConfig: TrainTypeConfig | undefined;

  if (lineId && LINES_REGISTRY[lineId]) {
    baseConfig = LINES_REGISTRY[lineId].trainTypes[type];
  }

  if (!baseConfig && type === 'test_run') {
    baseConfig = {
      key: 'test_run',
      name: '試運転',
      nameEn: 'Test Run',
      shortName: '試',
      color: '#0284c7',
      textColor: '#ffffff',
      bgColor: '#0284c7',
      borderColor: '#0369a1',
    };
  }

  if (!baseConfig) {
    for (const line of getAllLines()) {
      if (line.trainTypes[type]) {
        baseConfig = line.trainTypes[type];
        break;
      }
    }
  }

  if (!baseConfig) {
    const safeType = typeof type === 'string' && type.length > 0 ? type : 'local';
    const isMissingType = typeof type !== 'string' || type.length === 0;
    baseConfig = {
      key: safeType,
      name: isMissingType ? '普通' : safeType,
      nameEn: isMissingType ? 'Local' : safeType,
      shortName: isMissingType ? '普通' : safeType.slice(0, 2),
      color: '#1e1c1c',
      textColor: '#ffffff',
      bgColor: '#1e1c1c',
      borderColor: '#4a4646',
    };
  }

  if (customTrainType && (customTrainType.name || customTrainType.color || customTrainType.shortName)) {
    const resolvedName = customTrainType.name?.trim() || baseConfig.name;
    const resolvedShort =
      customTrainType.shortName?.trim() ||
      (customTrainType.name?.trim() ? customTrainType.name.trim().slice(0, 2) : baseConfig.shortName);
    const resolvedColor = customTrainType.color || baseConfig.bgColor;
    return {
      ...baseConfig,
      name: resolvedName,
      shortName: resolvedShort,
      color: resolvedColor,
      bgColor: resolvedColor,
      borderColor: resolvedColor,
    };
  }

  return baseConfig;
}

// 選択された路線（または全路線）のダイヤ（全列車）を取得
export function getCombinedGlobalTimetable(selectedLineIds?: LineId[]): TimetableTrip[] {
  const lines = selectedLineIds !== undefined
    ? selectedLineIds.map((id) => LINES_REGISTRY[id]).filter(Boolean)
    : getAllLines();

  return lines.flatMap((l) => l.globalTimetable);
}

// 選択された路線（または全路線）の各駅時刻表ストアを取得
export function getCombinedStationTimetables(selectedLineIds?: LineId[]): StationTimetableStore {
  const lines = selectedLineIds !== undefined
    ? selectedLineIds.map((id) => LINES_REGISTRY[id]).filter(Boolean)
    : getAllLines();

  const combined: StationTimetableStore = {
    weekday: {},
    holiday: {},
  };

  for (const line of lines) {
    for (const day of ['weekday', 'holiday'] as const) {
      if (!line.stationTimetables[day]) continue;
      for (const [stId, tt] of Object.entries(line.stationTimetables[day])) {
        if (!combined[day][stId]) {
          combined[day][stId] = {
            inbound: [...(tt.inbound || [])],
            outbound: [...(tt.outbound || [])],
          };
        } else {
          // 境界駅（高尾等）で同一駅が存在する場合、重複なくマージして時刻順ソート
          const existing = combined[day][stId];
          const mergeDepartures = (curr: typeof existing.inbound, incoming: typeof existing.inbound) => {
            const seen = new Set(curr.map((d) => `${d.sec}_${d.d}_${d.no}`));
            for (const inc of incoming) {
              const key = `${inc.sec}_${inc.d}_${inc.no}`;
              if (!seen.has(key)) {
                curr.push(inc);
                seen.add(key);
              }
            }
            curr.sort((a, b) => a.sec - b.sec);
          };
          mergeDepartures(existing.inbound, tt.inbound || []);
          mergeDepartures(existing.outbound, tt.outbound || []);
        }
      }
    }
  }

  return combined;
}

// 選択された路線群のすべての駅をピッタリ包含するバウンディングボックスを計算
export function calculateBoundsForLines(selectedLineIds: LineId[]): [[number, number], [number, number]] {
  const stations = getCombinedStations(selectedLineIds);
  if (stations.length === 0) {
    // デフォルト（東京・埼玉広域）
    return [
      [35.60, 139.15],
      [36.15, 139.75],
    ];
  }

  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLng = Infinity;
  let maxLng = -Infinity;

  for (const st of stations) {
    if (st.lat < minLat) minLat = st.lat;
    if (st.lat > maxLat) maxLat = st.lat;
    if (st.lng < minLng) minLng = st.lng;
    if (st.lng > maxLng) maxLng = st.lng;
  }

  // 余白パディング（約0.015度 = 約1.5km）
  const latPadding = 0.015;
  const lngPadding = 0.015;

  return [
    [minLat - latPadding, minLng - lngPadding],
    [maxLat + latPadding, maxLng + lngPadding],
  ];
}

// 同一駅名または隣接接続異名駅ペア（例: 大鰐↔大鰐温泉, 津軽五所川原↔五所川原, 鷹巣↔鷹ノ巣）
const ADJACENT_STATION_ALIASES: Record<string, string[]> = {
  '大鰐': ['大鰐温泉'],
  '大鰐温泉': ['大鰐'],
  '津軽五所川原': ['五所川原'],
  '五所川原': ['津軽五所川原'],
  '鷹巣': ['鷹ノ巣'],
  '鷹ノ巣': ['鷹巣'],
};

// 同一駅名（および隣接接続異名駅）を持つ他路線の乗換駅候補リストを取得
export function getAlternateStations(
  station: Station | null | undefined
): { station: Station; lineName: string }[] {
  if (!station) return [];
  const aliasSet = new Set(ADJACENT_STATION_ALIASES[station.name] || []);
  const results: { station: Station; lineName: string }[] = [];
  for (const line of getAllLines()) {
    if (line.id !== station.lineId) {
      const found = line.stations.find((s) => s.name === station.name || aliasSet.has(s.name));
      if (found) {
        results.push({ station: found, lineName: line.name });
      }
    }
  }
  return results;
}
