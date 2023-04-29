const tr = {
  translation: {
    home: 'Anasayfa',
    champions: 'Şampiyonlar',
    regions: 'Bölgeler',
    agents: 'Ajanlar',
    maps: 'Haritalar',
    arsenal: 'Cephanelik',
    gameList: 'Oyun Listesi',
    downloadClient: 'OYUNU İNDİR',
    downloadMobile: 'RIOT MOBILE UYGULAMASINI İNDİR',
    copyrightRiot:
      "™ & © 2022 Riot Games Inc. Her hakkı saklıdır. Riot Games, League of Legends ve Valorant; Riot Games, Inc.'nin tescilli markaları, ticari markaları ya da hizmet markalarıdır.",
    socialMedia: 'Sosyal Medya',
    developedByWho: '© 2022 | Bu web sitesi <a><span>{{word}}</span></a> tarafından geliştirilmiştir.',
    featuredChamps: 'ÖNE ÇIKAN ŞAMPİYONLAR',
    featuredRegions: 'ÖNE ÇIKAN BÖLGELER',
    viewChamps: 'TÜM ŞAMPİYONLARI GÖRÜNTÜLE',
    viewRegions: 'TÜM BÖLGELERİ GÖRÜNTÜLE',
    viewItems: 'TÜM EŞYALARI GÖRÜNTÜLE',
    viewRanks: 'TÜM RÜTBELERİ GÖRÜNTÜLE',
    searchChampion: 'ŞAMPİYON BUL',
    searchAgent: 'AJAN BUL',
    notFoundChampions: 'ŞAMPİYON BULUNAMADI',
    notFoundAgents: 'AJAN BULUNAMADI',
    notFoundRegions: 'BÖLGE BULUNAMADI',
    all: 'Tümü',
    sorting: 'SIRALAMA',
    'a-z': 'A-Z',
    'z-a': 'Z-A',
    newest: 'EN YENİ',
    valoTextOne: 'BİZİM ADIMIZ',
    valoTextTwo: 'LİMİT TANIMA',
    valoTextThree:
      "Küresel, rekabetçi bir sahnede tarzını ve deneyimini birleştir. Silahlarla ve taktiksel yeteneklerle saldırıp savunma yapacağın 13 tur var. Her turda tek bir cana sahip olduğun için hayatta kalmak istiyorsan rakiplerinden daha hızlı düşünmen gerekir. Hem dereceli ve derecesiz modlarda hem de Ölüm Kalım Savaşı ve Spike'a Hücum gibi modlarda mücadele et.",
    filterAgent: 'Ajan Filtrele',
    agentsRole: "Ajan'ın Rolü",
    initiator: 'Öncü',
    duelist: 'Düellocu',
    sentinel: 'Gözcü',
    controller: 'Kontrol Uzmanı',
    seeMore: 'DAHA FAZLASI',
    viewGallery: 'GALERİYE BAK',
    chooseYourWeapon: 'SİLAHINI SEÇ',
    valoProtocol: 'VLRT PR0T0K0LÜ',
    allWeapons: 'Tüm Silahlar',
    melee: 'Yakın Dövüş',
    tacticalKnife: 'TAKTİK BIÇAK',
    standardKnife: 'Standart Bıçak',
    free: 'Bedava',
    credit: 'Kredi',
    downloadGameText: 'OYUNU İNDİR',
    downloadAppText: 'RIOT MOBILE UYGULAMASINI İNDİR',
    lolGameDownload: 'https://signup.leagueoflegends.com/tr-tr/signup/index',
    valoGameDownload: 'https://playvalorant.com/tr-tr/download/',
    riotAppDownload: 'https://apps.apple.com/tr/app/league-of-legends-friends/id1077150310?ls=1',
    pageRiotHome: 'Anasayfa - Riot Games',
    pageLolHome: 'Anasayfa - League of Legends',
    pageLolChampions: 'Şampiyonlar - League of Legends',
    pageLolChampion: '{{word}} - Şampiyon - League of Legends',
    pageLolRegions: 'Bölgeler - League of Legends',
    pageLolItems: 'Eşyalar - League of Legends',
    pageLolRanks: 'Rütbeler - League of Legends',
    pageValoHome: 'Anasayfa - Valorant',
    pageValoAgents: 'Ajanlar - Valorant',
    pageValoMaps: 'Haritalar - Valorant',
    pageValoArsenal: 'Cephanelik - Valorant',
    pageValoRanks: 'Rütbeler - Valorant',
    valoPearlDescription:
      "Gözalıcı sualtı şehrinde yer alan iki bölgeli haritada saldıranlar savunanları püskürtmeye çalışıyor. Pearl, herhangi ilave bir mekaniğe sahip değil fakat doğal güzelliğiyle ön planda. Omega Dünya'da yer alan ilk haritada, küçük orta bölge veya iki yandaki uzun menzilli koridorlar aksiyon dolu çatışmalara sahne oluyor.",
    valoFractionDescription:
      'Çok gizli bir araştırma tesisi, başarısızlıkla sonuçlanan bir radyanit deneyinden sonra ikiye ayrıldı. Haritadaki farklı habitatlar sayesinde iki farklı seçime sahip olan savunanlar, saldıranları kendi bölgelerinde karşılayabilir ya da saldırıyla başa çıkabilmek için hazırlık yapabilir.',
    valoBreezeDescription:
      "Bu tropik cennetteki tarihi yıkıntıları ve deniz kenarındaki mağaraları keşfe çıkın. Ama arkanızı kollayacak ajanlara ihtiyacınız var. Açık alanlarda ve uzun menzilli çatışmalarda buna ihtiyacınız olacak. Dikkati elden bırakmadığınız sürece Breeze'de su akar, yolunu bulur.",
    valoIceboxDescription:
      'Sıradaki savaş meydanı kutup soğuğunun hüküm sürdüğü gizli bir Kingdom kazı alanı. İki Spike yerleştirme bölgesi de kar yığınları ve metal parçalarıyla korunduğu için keskin nişancılık hünerlerinin önemini vurguluyor. Çelik halatları kendi lehinize kullanarak bir anda düşmanların üstüne çökebilirsiniz.',
    valoBindDescription:
      'İki bölge var. Ortası yok. Ya sağı seçeceksin ya da solu. Eee, hepsi bu kadar mı? Tabii ki değil! İki tarafta da saldıranların kullanabileceği yollar ve rakipleri arkadan vurmaya yardımcı olacak tek yönlü ışınlayıcılar bulunuyor.',
    valoHavenDescription:
      'Terk edilmiş bir manastırın avlusunda kapışan ajanlar üç bölgeyi de kontrol altına alabilmek için birbirini yiyor. Kontrol altına alınacak çok bölge var, fakat savunucuların ele geçireceği fazladan bina daha saldırgan şekilde püskürtme yapabilmeleri için faydalı olabilir.',
    valoSplitDescription:
      'Uzağa kaçmak istiyorsan yukarı gitmen lazım. Birkaç farklı bölgenin tam ortasında yükselen merkez noktası, iki tane yükseltici halat yardımıyla hızlı bir şekilde hareket etme imkânı tanıyor. Her bir bölgede kontrolü sağlayabilmek için hayati öneme sahip iki dev kule bulunuyor. Gözün göklerden gelebilecek tehlikelerde olsun.',
    valoAscentDescription:
      'Ascent, sahip olduğu iki bölge nedeniyle küçük çatışmalara ve sürtüşmelere sahne olan açık bir oyun alanı gibi. İki bölgede de güçlendirilmiş, tekrar açılamayan bomba kapıları bulunuyor. Bu kapılar bir kere kapandı mı geçmek için ya kapıları yok etmeli ya da başka bir yol bulmalısın. Mümkün olduğunca az alan kaybetmeye çalış.',
    role: 'Rol',
    skins: 'Kostümler',
    abilities: 'Yetenekler',
    detail: 'Detay',
    passive: 'Pasif',
    volarantProtocol: 'VLRT PR0T0K0LÜ',
    head: 'Kafa',
    body: 'Gövde',
    leg: 'Bacak',
    range: 'Menzil',
    magazineSize: 'Şarjör Boyutu',
    notFound: 'YOLUNU MU KAYBETTİN? GERİ DÖN VE EVRENİ KEŞFETTİĞİN SİHİRLİ BİR YOLCULUĞA ÇIK!',
    returnToUniverse: 'EVRENE DÖN',
    legalJibberJabberLink: 'https://www.riotgames.com/tr/yasal',
    legalJibberJabberText: `<link1><span>riotgamesallinone.com</span></link1>, Riot Games'in sahibi olduğu içeriklerle şirketin <link2><span>"Yasal Bıdı Bıdı"</span></link2> politikasına uyacak şekilde yapıldı. Riot Games bu projeyi desteklememekte veya ona sponsor olmamaktadır.`,
  },
};

export default tr;
