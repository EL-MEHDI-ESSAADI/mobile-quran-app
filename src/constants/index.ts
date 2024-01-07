export const DEFAULT_RECITER = {
  name: "Abu Bakr al-Shatri",
  id: 4,
};

export const DEFAULT_TRANSLATION = {
  id: 131,
  name: "Dr. Mustafa Khattab",
  lang: "english",
};

export const availableTranslationsApi = `https://api.quran.com/api/v4/resources/translations?language=eg`;
export const versesApi = `https://api.quran.com/api/v4/verses/by_chapter/$\{surah_id}?language=en&words=true&translations=$\{translationSrc_id}&fields=text_imlaei&word_fields=v1_page,code_v1&page=$\{page_number}&per_page=10`;
export const verseApi = `https://api.quran.com/api/v4/verses/by_key/$\{verseKey}?language=en&words=true&translations=$\{translationSrc_id}&word_fields=v1_page%2Ccode_v1&fields=text_imlaei`;
export const translationsApi = `https://api.quran.com/api/v4/quran/translations/$\{translationSrc_id}?fields=verse_key&chapter_number=$\{surah_id}`;
export const singleTranslationApi = `https://api.quran.com/api/v4/quran/translations/$\{translationSrc_id}?verse_key=$\{VerseKey}`;
export const audioApi = `https://api.qurancdn.com/api/qdc/audio/reciters/$\{reciter_id}/audio_files?chapter=$\{surah_id}&segments=true`;
