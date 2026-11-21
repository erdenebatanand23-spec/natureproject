import { ProductCategory, ProductItem } from '../types/botany';

export const PRODUCTS_DATA: ProductItem[] = [
  {
    id: 'soil-sense-pro',
    nameMn: 'EcoSense Pro — Ухаалаг хөрсний мэдрэгч',
    subtitleMn: 'Чийгшил, EC, pH болон температур хэмжигч',
    category: ProductCategory.Sensors,
    priceMnt: 148000,
    inStock: true,
    stockLabelMn: 'Бэлэн байгаа',
    imageUrl: '/src/assets/images/product_smart_sensor_1795239290303.jpg',
    shortDescriptionMn:
      'Хөрсний гүний чийгшил, эрдэсжилт, pH орчныг бодит цагаар хэмжиж усалгааны оновчтой цагийг мэдээлдэг аноджуулсан хөнгөн цагаан мэдрэгч.',
    specs: [
      { label: 'Холболт', value: 'Bluetooth 5.3 / Zigbee' },
      { label: 'Батерей', value: '18 сар (CR2032)' },
      { label: 'Хамгаалалт', value: 'IP67 усны хамгаалалт' },
      { label: 'Нарийвчлал', value: '±1.5% чийгшил' },
    ],
    benefitsMn: [
      'Хэт услалт болон үндэс ялзралаас 100% сэргийлнэ',
      'Ургамал бүрийн зүйлд тохирсон босго утга тохируулах боломжтой',
      'Дотоод болон хүлэмжийн аль ч саванд тохиромжтой',
    ],
    featured: true,
  },
  {
    id: 'hydro-arch-station',
    nameMn: 'Lumina HydroArch — Ухаалаг ургамлын тавиур',
    subtitleMn: 'Бүрэн спектрийн LED + Автомат эргэлттэй гидропоник',
    category: ProductCategory.Hydroponics,
    priceMnt: 385000,
    inStock: true,
    stockLabelMn: 'Бэлэн байгаа',
    imageUrl: '/src/assets/images/product_hydro_station_1795239289206.jpg',
    shortDescriptionMn:
      'Жилийн дөрвөн улиралд гал тогоо болон оффист шинэхэн амтлагч ногоо, эмийн ургамал ургуулах дуу чимээгүй гидропоник систем.',
    specs: [
      { label: 'Багтаамж', value: '6 ургамлын үүр' },
      { label: 'Гэрлийн спектр', value: '4000K Full Spectrum 24W' },
      { label: 'Усны сав', value: '3.5 литр (14 хоногийн нөөц)' },
      { label: 'Таймер', value: '16 цаг / 8 цаг автомат' },
    ],
    benefitsMn: [
      'Хөрсгүй цэвэр орчинд ургалтын хурдыг 2.2 дахин нэмэгдүүлнэ',
      'Усны түвшин буурах үед гэрлэн анхааруулга өгнө',
      'Энерги хэмнэлттэй нарны гэрэл орлуулагч LED нумтай',
    ],
    featured: true,
  },
  {
    id: 'drip-flow-controller',
    nameMn: 'AquaNode — Нарны эрчим хүчтэй дуслын усалгаа',
    subtitleMn: 'Хүлэмж ба цэцэрлэгийн автомат усалгааны зангилаа',
    category: ProductCategory.Irrigation,
    priceMnt: 265000,
    inStock: true,
    stockLabelMn: 'Бэлэн байгаа',
    imageUrl: '/src/assets/images/hero_eco_botanical_1795239287965.jpg',
    shortDescriptionMn:
      'Өглөөний 06:00 болон үдшийн 19:30 цагийн оновчтой цонхонд автоматаар услалт хийж ууршилтыг 60% бууруулдаг дуслын систем.',
    specs: [
      { label: 'Тэжээл', value: 'Нарны хавтан + LiFePO4' },
      { label: 'Цорго', value: '16 хүртэл цэгийн дусалжуулагч' },
      { label: 'Хуваарь', value: '06:00 / 19:30 ухаалаг таймер' },
      { label: 'Ус хэмнэлт', value: '58–64%' },
    ],
    benefitsMn: [
      'Өдрийн халуун цагт усалгааг автоматаар түр зогсооно',
      'Мод, сөөг болон хүлэмжийн нарийн ногоонд жигд чийг өгнө',
      'Тог тасарсан үед ч нарны цэнэгээр тасралтгүй ажиллана',
    ],
    featured: true,
  },
  {
    id: 'full-spectrum-halo',
    nameMn: 'ChloroBeam — Ургамлын спектрийн LED гэрэл',
    subtitleMn: 'Өдрийн гэрэл дутагдалтай дотоод орчинд зориулсан',
    category: ProductCategory.Lighting,
    priceMnt: 192000,
    inStock: true,
    stockLabelMn: 'Бэлэн байгаа',
    imageUrl: '/src/assets/images/botanical_indoor_specimens_1795239289845.jpg',
    shortDescriptionMn:
      'Хлорофилл А ба В шингээлтийн муруйд тохируулсан байгалийн дулаан цагаан туяатай, нүдэнд ээлтэй ургамлын гэрэлтүүлэг.',
    specs: [
      { label: 'PPFD', value: '420 µmol/m²/s @ 30см' },
      { label: 'CRI', value: '95+ байгалийн өнгө' },
      { label: 'Чадал', value: '18W (өндөр үр ашигтай)' },
      { label: 'Өндөр', value: '25 – 75 см сунадаг иш' },
    ],
    benefitsMn: [
      'Өвлийн богино өдрүүдэд Монстера болон тасалгааны модыг эрүүл ургуулна',
      'Ягаан өнгө биш, гэрийн интерьерт зохицох цэвэр 3800K дулаан туяа',
    ],
  },
  {
    id: 'myco-bio-substrate',
    nameMn: 'TerraMyco — Био-микориз ба перлитийн хольц',
    subtitleMn: 'Амьд ашигтай мөөгөнцөр ба эрдэс хөрс (10л)',
    category: ProductCategory.Substrates,
    priceMnt: 42000,
    inStock: true,
    stockLabelMn: 'Бэлэн байгаа',
    imageUrl: '/src/assets/images/botanical_forest_canopy_1795239289777.jpg',
    shortDescriptionMn:
      'Нарсны холтос, галт уулын перлит, био-нүүрс болон үндэсний микориз мөөгөнцрөөр баяжуулсан амьсгалдаг органик хөрс.',
    specs: [
      { label: 'Хэмжээ', value: '10 литр (5.2 кг)' },
      { label: 'pH түвшин', value: '6.2 – 6.6 тэнцвэртэй' },
      { label: 'Бүрэлдэхүүн', value: 'Био-нүүрс, Перлит, Коко-хөвд' },
      { label: 'Нэмэлт', value: 'Glomus intraradices микориз' },
    ],
    benefitsMn: [
      'Үндэсний ус болон фосфор шингээх гадаргууг 4 дахин өсгөнө',
      'Хөрс нягтарч хатуурахаас хамгаална',
    ],
  },
  {
    id: 'microclimate-air-node',
    nameMn: 'FloraAir — Бичил уур амьсгалын хяналт',
    subtitleMn: 'VPD, чийгшил ба CO₂ түвшний шинжилгээний дэлгэц',
    category: ProductCategory.Sensors,
    priceMnt: 224000,
    inStock: false,
    stockLabelMn: 'Захиалгаар (7 хоног)',
    imageUrl: '/src/assets/images/product_smart_sensor_1795239290303.jpg',
    shortDescriptionMn:
      'Навчны ууршилтын даралт (VPD), орчны температур, чийгшил болон гэрлийн эрчмийг нэг дор хянадаг цахим цаас дэлгэцтэй станц.',
    specs: [
      { label: 'Дэлгэц', value: '2.9" E-Ink эрчим хэмнэгч' },
      { label: 'Мэдрэгч', value: 'Sensirion SCD41 CO₂ + Lux' },
      { label: 'Синхрон', value: 'EcoSense Pro-той холбогдоно' },
      { label: 'Бичлэг', value: '90 хоногийн түүх' },
    ],
    benefitsMn: [
      'Ойм, хөвд зэрэг өндөр чийгшил шаарддаг ургамлын бичил орчныг оновчилно',
      'Бага эрчим хүчээр 12 сар тасралтгүй ажиллана',
    ],
  },
];
