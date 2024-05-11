import { surahsOverview } from "@/data";

export type Verse = {
  id: number;
  verse_number: number;
  verse_key: string;
  hizb_number: number;
  rub_el_hizb_number: number;
  ruku_number: number;
  manzil_number: number;
  sajdah_number: number | null;
  text_imlaei: string;
  page_number: number;
  juz_number: number;
  translations: {
    id: number;
    resource_id: number;
    text: string;
  }[];
};

export type VersesResponse = {
  verses: Verse[];
  pagination: {
    per_page: number;
    current_page: number;
    next_page: number | null;
    total_pages: number;
    total_records: number;
  };
};

export type VerseResponse = {
  verse: Verse;
};

export type TranslationInfo = {
  id: number;
  name: string;
  author_name: string;
  slug: string;
  language_name: string;
  translated_name: {
    name: string;
    language_name: string;
  };
};

export type Surah = (typeof surahsOverview)[number];

interface VerseTimingSegment {
  start: number;
  end: number;
  duration: number;
  segments: number[][];
}

interface VerseTiming {
  verse_key: string;
  timestamp_from: number;
  timestamp_to: number;
  duration: number;
  segments: VerseTimingSegment[];
}

interface AudioFile {
  id: number;
  chapter_id: number;
  file_size: number;
  format: string;
  audio_url: string;
  duration: number;
  verse_timings: VerseTiming[];
}

export type AudioRes = { audio_files: AudioFile[] };

export type AudioState = {
  position: number;
  status: "playing" | "paused" | "loading" | "buffering";
  prevVerseKey: string;
  nextVerseKey: string;
};
