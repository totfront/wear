export type Locale = "en" | "ru" | "de" | "uk";

export interface Translations {
  settings: string;
  language: string;
  detailedMode: string;
  detailedModeDesc: string;
  tagline: string;
  useMyLocation: string;
  searchPlaceholder: string;
  searchAriaLabel: string;
  searching: string;
  idleMessage: string;
  locating: string;
  loadingWeather: string;
  connectionError: string;
  locationError: string;
  feels: string;
  rain: string;
  humidity: string;
  iFeelLabel: string;
  sensitivityAriaLabel: string;
  cold: string;
  average: string;
  warm: string;
  teaser: string;
  teaserActual: string;
  umbrellaMust: string;
  umbrellaShould: string;
  umbrellaNo: string;
  or: string;
  head: string;
  upperBody: string;
  lowerBody: string;
  feet: string;
  bandHot: string;
  bandWarm: string;
  bandMild: string;
  bandCool: string;
  bandChilly: string;
  bandCold: string;
  bandFreezing: string;
  blurbHot: string;
  blurbWarm: string;
  blurbMild: string;
  blurbCool: string;
  blurbChilly: string;
  blurbCold: string;
  blurbFreezing: string;
  grabUmbrella: string;
  cap: string;
  noCap: string;
  noHat: string;
  tshirt: string;
  tankTop: string;
  shortSleeveShirt: string;
  longSleeveTop: string;
  lightJacket: string;
  sweater: string;
  jacket: string;
  warmCoat: string;
  sweaterCoat: string;
  heavyWinterCoat: string;
  thermalLayersCoat: string;
  shorts: string;
  lightPants: string;
  jeans: string;
  trousers: string;
  warmTrousers: string;
  jeansAndThermals: string;
  thermalTrousers: string;
  lightSneakers: string;
  sandals: string;
  sneakers: string;
  boots: string;
  insulatedBoots: string;
  lightBeanie: string;
  beanie: string;
}

const en: Translations = {
  settings: "Settings",
  language: "Language",
  detailedMode: "Detailed recommendations",
  detailedModeDesc: "Show fabrics, layers, and styling tips",
  tagline: "what to actually put on",
  useMyLocation: "Use my location",
  searchPlaceholder: "or search a city…",
  searchAriaLabel: "Search for a city",
  searching: "Searching…",
  idleMessage: "Tell me where you are and I'll tell you what to wear.",
  locating: "Finding you…",
  loadingWeather: "Reading the sky…",
  connectionError: "Could not load the weather. Check your connection and try again.",
  locationError: "Location is off. Search for a city instead.",
  feels: "feels",
  rain: "rain",
  humidity: "humidity",
  iFeelLabel: "I tend to feel",
  sensitivityAriaLabel: "Temperature sensitivity",
  cold: "cold",
  average: "average",
  warm: "warm",
  teaser: "Soon: upload your wardrobe and get your",
  teaserActual: "actual",
  umbrellaMust: "You must have an umbrella",
  umbrellaShould: "You should take an umbrella",
  umbrellaNo: "You do not need an umbrella",
  or: "or",
  head: "Head",
  upperBody: "Upper body",
  lowerBody: "Lower body",
  feet: "Feet",
  bandHot: "Hot",
  bandWarm: "Warm",
  bandMild: "Mild",
  bandCool: "Cool",
  bandChilly: "Chilly",
  bandCold: "Cold",
  bandFreezing: "Freezing",
  blurbHot: "Stay cool, cover up from the sun",
  blurbWarm: "Light and breezy",
  blurbMild: "Comfortable, maybe a light layer",
  blurbCool: "A light jacket weather",
  blurbChilly: "Layer up, bring a jacket",
  blurbCold: "Warm coat and a hat",
  blurbFreezing: "Full winter gear, cover everything",
  grabUmbrella: ", and grab an umbrella",
  cap: "Cap",
  noCap: "No cap",
  noHat: "No hat",
  tshirt: "T-shirt",
  tankTop: "Tank top",
  shortSleeveShirt: "Short-sleeve shirt",
  longSleeveTop: "Long-sleeve top",
  lightJacket: "Light jacket",
  sweater: "Sweater",
  jacket: "Jacket",
  warmCoat: "Warm coat",
  sweaterCoat: "Sweater + coat",
  heavyWinterCoat: "Heavy winter coat",
  thermalLayersCoat: "Thermal layers + coat",
  shorts: "Shorts",
  lightPants: "Light pants",
  jeans: "Jeans",
  trousers: "Trousers",
  warmTrousers: "Warm trousers",
  jeansAndThermals: "Jeans + thermals",
  thermalTrousers: "Thermal trousers",
  lightSneakers: "Light sneakers",
  sandals: "Sandals",
  sneakers: "Sneakers",
  boots: "Boots",
  insulatedBoots: "Insulated boots",
  lightBeanie: "Light beanie",
  beanie: "Beanie",
};

const ru: Translations = {
  settings: "Настройки",
  language: "Язык",
  detailedMode: "Детальные рекомендации",
  detailedModeDesc: "Ткани, слои и советы по стилю",
  tagline: "что на самом деле надеть",
  useMyLocation: "Моя геолокация",
  searchPlaceholder: "или найди город…",
  searchAriaLabel: "Поиск города",
  searching: "Ищу…",
  idleMessage: "Скажи, где ты, и я скажу, что надеть.",
  locating: "Ищу тебя…",
  loadingWeather: "Читаю небо…",
  connectionError: "Не удалось загрузить погоду. Проверь соединение и попробуй снова.",
  locationError: "Геолокация отключена. Найди город через поиск.",
  feels: "ощущается",
  rain: "дождь",
  humidity: "влажность",
  iFeelLabel: "Мне обычно",
  sensitivityAriaLabel: "Чувствительность к температуре",
  cold: "холодно",
  average: "нормально",
  warm: "жарко",
  teaser: "Скоро: загрузи свой гардероб и получи",
  teaserActual: "конкретный",
  umbrellaMust: "Обязательно возьми зонт",
  umbrellaShould: "Лучше взять зонт",
  umbrellaNo: "Зонт не нужен",
  or: "или",
  head: "Голова",
  upperBody: "Верх",
  lowerBody: "Низ",
  feet: "Обувь",
  bandHot: "Жарко",
  bandWarm: "Тепло",
  bandMild: "Умеренно",
  bandCool: "Прохладно",
  bandChilly: "Зябко",
  bandCold: "Холодно",
  bandFreezing: "Мороз",
  blurbHot: "Одевайся легко, прячься от солнца",
  blurbWarm: "Лёгкая одежда, наслаждайся",
  blurbMild: "Комфортно, может лёгкий слой",
  blurbCool: "Погода для лёгкой куртки",
  blurbChilly: "Одевайся слоями, бери куртку",
  blurbCold: "Тёплое пальто и шапка",
  blurbFreezing: "Полная зимняя экипировка",
  grabUmbrella: ", и захвати зонт",
  cap: "Кепка",
  noCap: "Без кепки",
  noHat: "Без шапки",
  tshirt: "Футболка",
  tankTop: "Майка",
  shortSleeveShirt: "Рубашка с коротким рукавом",
  longSleeveTop: "Лонгслив",
  lightJacket: "Лёгкая куртка",
  sweater: "Свитер",
  jacket: "Куртка",
  warmCoat: "Тёплое пальто",
  sweaterCoat: "Свитер + пальто",
  heavyWinterCoat: "Зимний пуховик",
  thermalLayersCoat: "Термобельё + пальто",
  shorts: "Шорты",
  lightPants: "Лёгкие брюки",
  jeans: "Джинсы",
  trousers: "Брюки",
  warmTrousers: "Тёплые брюки",
  jeansAndThermals: "Джинсы + термобельё",
  thermalTrousers: "Утеплённые брюки",
  lightSneakers: "Лёгкие кроссовки",
  sandals: "Сандалии",
  sneakers: "Кроссовки",
  boots: "Ботинки",
  insulatedBoots: "Утеплённые ботинки",
  lightBeanie: "Лёгкая шапка",
  beanie: "Шапка",
};

const de: Translations = {
  settings: "Einstellungen",
  language: "Sprache",
  detailedMode: "Detaillierte Empfehlungen",
  detailedModeDesc: "Stoffe, Schichten und Styling-Tipps",
  tagline: "was du wirklich anziehen solltest",
  useMyLocation: "Mein Standort",
  searchPlaceholder: "oder Stadt suchen…",
  searchAriaLabel: "Stadt suchen",
  searching: "Suche…",
  idleMessage: "Sag mir, wo du bist, und ich sag dir, was du anziehen sollst.",
  locating: "Suche dich…",
  loadingWeather: "Lese den Himmel…",
  connectionError: "Wetter konnte nicht geladen werden. Prüfe deine Verbindung.",
  locationError: "Standort ist deaktiviert. Suche stattdessen eine Stadt.",
  feels: "gefühlt",
  rain: "Regen",
  humidity: "Luftfeuchtigkeit",
  iFeelLabel: "Mir ist meistens",
  sensitivityAriaLabel: "Temperaturempfindlichkeit",
  cold: "kalt",
  average: "normal",
  warm: "warm",
  teaser: "Bald: lade deine Garderobe hoch und bekomme dein",
  teaserActual: "echtes",
  umbrellaMust: "Du brauchst unbedingt einen Regenschirm",
  umbrellaShould: "Nimm besser einen Regenschirm mit",
  umbrellaNo: "Du brauchst keinen Regenschirm",
  or: "oder",
  head: "Kopf",
  upperBody: "Oberkörper",
  lowerBody: "Unterkörper",
  feet: "Schuhe",
  bandHot: "Heiß",
  bandWarm: "Warm",
  bandMild: "Mild",
  bandCool: "Kühl",
  bandChilly: "Frisch",
  bandCold: "Kalt",
  bandFreezing: "Eisig",
  blurbHot: "Bleib kühl, schütz dich vor der Sonne",
  blurbWarm: "Leicht und luftig",
  blurbMild: "Angenehm, vielleicht eine leichte Schicht",
  blurbCool: "Wetter für eine leichte Jacke",
  blurbChilly: "Schichten anziehen, Jacke mitnehmen",
  blurbCold: "Warmer Mantel und Mütze",
  blurbFreezing: "Volle Winterausrüstung",
  grabUmbrella: ", und nimm einen Regenschirm mit",
  cap: "Kappe",
  noCap: "Keine Kappe",
  noHat: "Keine Mütze",
  tshirt: "T-Shirt",
  tankTop: "Tanktop",
  shortSleeveShirt: "Kurzarmhemd",
  longSleeveTop: "Langarmshirt",
  lightJacket: "Leichte Jacke",
  sweater: "Pullover",
  jacket: "Jacke",
  warmCoat: "Warmer Mantel",
  sweaterCoat: "Pullover + Mantel",
  heavyWinterCoat: "Winterjacke",
  thermalLayersCoat: "Thermounterwäsche + Mantel",
  shorts: "Shorts",
  lightPants: "Leichte Hose",
  jeans: "Jeans",
  trousers: "Hose",
  warmTrousers: "Warme Hose",
  jeansAndThermals: "Jeans + Thermounterwäsche",
  thermalTrousers: "Thermohose",
  lightSneakers: "Leichte Sneaker",
  sandals: "Sandalen",
  sneakers: "Sneaker",
  boots: "Stiefel",
  insulatedBoots: "Gefütterte Stiefel",
  lightBeanie: "Leichte Mütze",
  beanie: "Mütze",
};

const uk: Translations = {
  settings: "Налаштування",
  language: "Мова",
  detailedMode: "Детальні рекомендації",
  detailedModeDesc: "Тканини, шари та поради зі стилю",
  tagline: "що насправді вдягнути",
  useMyLocation: "Моя геолокація",
  searchPlaceholder: "або знайди місто…",
  searchAriaLabel: "Пошук міста",
  searching: "Шукаю…",
  idleMessage: "Скажи, де ти, і я скажу, що вдягнути.",
  locating: "Шукаю тебе…",
  loadingWeather: "Читаю небо…",
  connectionError: "Не вдалося завантажити погоду. Перевір з'єднання та спробуй знову.",
  locationError: "Геолокацію вимкнено. Знайди місто через пошук.",
  feels: "відчувається",
  rain: "дощ",
  humidity: "вологість",
  iFeelLabel: "Мені зазвичай",
  sensitivityAriaLabel: "Чутливість до температури",
  cold: "холодно",
  average: "нормально",
  warm: "спекотно",
  teaser: "Скоро: завантаж свій гардероб і отримай",
  teaserActual: "конкретний",
  umbrellaMust: "Обов'язково візьми парасольку",
  umbrellaShould: "Краще взяти парасольку",
  umbrellaNo: "Парасолька не потрібна",
  or: "або",
  head: "Голова",
  upperBody: "Верх",
  lowerBody: "Низ",
  feet: "Взуття",
  bandHot: "Спека",
  bandWarm: "Тепло",
  bandMild: "Помірно",
  bandCool: "Прохолодно",
  bandChilly: "Зябко",
  bandCold: "Холодно",
  bandFreezing: "Мороз",
  blurbHot: "Вдягайся легко, ховайся від сонця",
  blurbWarm: "Легкий одяг, насолоджуйся",
  blurbMild: "Комфортно, може легкий шар",
  blurbCool: "Погода для легкої куртки",
  blurbChilly: "Вдягайся шарами, бери куртку",
  blurbCold: "Тепле пальто і шапка",
  blurbFreezing: "Повна зимова екіпіровка",
  grabUmbrella: ", і візьми парасольку",
  cap: "Кепка",
  noCap: "Без кепки",
  noHat: "Без шапки",
  tshirt: "Футболка",
  tankTop: "Майка",
  shortSleeveShirt: "Сорочка з коротким рукавом",
  longSleeveTop: "Лонгслів",
  lightJacket: "Легка куртка",
  sweater: "Светр",
  jacket: "Куртка",
  warmCoat: "Тепле пальто",
  sweaterCoat: "Светр + пальто",
  heavyWinterCoat: "Зимовий пуховик",
  thermalLayersCoat: "Термобілизна + пальто",
  shorts: "Шорти",
  lightPants: "Легкі штани",
  jeans: "Джинси",
  trousers: "Штани",
  warmTrousers: "Теплі штани",
  jeansAndThermals: "Джинси + термобілизна",
  thermalTrousers: "Утеплені штани",
  lightSneakers: "Легкі кросівки",
  sandals: "Сандалі",
  sneakers: "Кросівки",
  boots: "Черевики",
  insulatedBoots: "Утеплені черевики",
  lightBeanie: "Легка шапка",
  beanie: "Шапка",
};

const locales: Record<Locale, Translations> = { en, ru, de, uk };

function detectLocale(): Locale {
  const saved = localStorage.getItem("wear:locale");
  if (saved && saved in locales) return saved as Locale;
  const lang = navigator.language.split("-")[0];
  if (lang in locales) return lang as Locale;
  return "en";
}

let currentLocale: Locale = detectLocale();
let currentTranslations: Translations = locales[currentLocale];

export function getLocale(): Locale {
  return currentLocale;
}

export function setLocale(locale: Locale) {
  currentLocale = locale;
  currentTranslations = locales[locale];
}

export function t(): Translations {
  return currentTranslations;
}

export function getItemLabel(category: string): string {
  const map: Record<string, keyof Translations> = {
    cap: "cap",
    no_cap: "noCap",
    no_hat: "noHat",
    tshirt: "tshirt",
    tank: "tankTop",
    shirt_short: "shortSleeveShirt",
    long_sleeve: "longSleeveTop",
    light_jacket: "lightJacket",
    sweater: "sweater",
    jacket: "jacket",
    coat: "warmCoat",
    sweater_coat: "sweaterCoat",
    heavy_coat: "heavyWinterCoat",
    layers: "thermalLayersCoat",
    shorts: "shorts",
    light_pants: "lightPants",
    jeans: "jeans",
    trousers: "trousers",
    warm_trousers: "warmTrousers",
    thermal_jeans: "jeansAndThermals",
    thermal_trousers: "thermalTrousers",
    sneakers_light: "lightSneakers",
    sandals: "sandals",
    sneakers: "sneakers",
    boots: "boots",
    winter_boots: "insulatedBoots",
    beanie: "beanie",
    light_beanie: "lightBeanie",
  };
  const key = map[category];
  return key ? currentTranslations[key] as string : category;
}

export function getBandName(englishName: string): string {
  const map: Record<string, keyof Translations> = {
    Hot: "bandHot",
    Warm: "bandWarm",
    Mild: "bandMild",
    Cool: "bandCool",
    Chilly: "bandChilly",
    Cold: "bandCold",
    Freezing: "bandFreezing",
  };
  const key = map[englishName];
  return key ? currentTranslations[key] as string : englishName;
}

export function getBandBlurb(englishName: string): string {
  const map: Record<string, keyof Translations> = {
    Hot: "blurbHot",
    Warm: "blurbWarm",
    Mild: "blurbMild",
    Cool: "blurbCool",
    Chilly: "blurbChilly",
    Cold: "blurbCold",
    Freezing: "blurbFreezing",
  };
  const key = map[englishName];
  return key ? currentTranslations[key] as string : englishName;
}
