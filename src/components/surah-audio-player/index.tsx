import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Slider } from "@rneui/themed";
import { colors } from "@/styles/index.cjs";
import { Wrapper } from "@/components/wrapper";
import FeatherIcons from "@expo/vector-icons/Feather";
import { useColorScheme } from "@/hooks/useColorScheme";
import { QURAN_PLAYER_HEIGHT } from "@/constants";
import { formatTime, getAudioApiApiUrl } from "@/lib/utils";
import { useStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AudioRes, AudioState } from "@/types";
import { Audio, InterruptionModeAndroid, InterruptionModeIOS } from "expo-av";
import Toast from "react-native-root-toast";
import { Spinner } from "@/components/spinner";

const DEFAULT_AUDIO_STATE: AudioState = {
  position: 0,
  status: "loading",
  prevVerseKey: "",
  nextVerseKey: "",
} as const;

const useSurahAudio = ({ surahNumber, reciterId }: { surahNumber: number; reciterId: number }) => {
  const [audio, setAudio] = useState<Audio.SoundObject>();
  const [audioState, setAudioState] = useState<AudioState>(DEFAULT_AUDIO_STATE);
  const setAudioVerseState = useStore((state) => state.setAudioVerseState);

  const {
    data: audioFile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["surah-audio", reciterId, surahNumber],
    queryFn: async () => {
      try {
        const { data } = await axios.get<AudioRes>(getAudioApiApiUrl(reciterId, surahNumber));
        const audioFile = data?.audio_files?.[0];

        if (!audioFile) throw new Error("No audio file found");

        const audio = await Audio.Sound.createAsync({
          uri: audioFile.audio_url,
        });
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          interruptionModeIOS: InterruptionModeIOS.DuckOthers,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
          playThroughEarpieceAndroid: false,
        });
        setAudio(audio);
        return audioFile;
      } catch (error) {
        console.error(error);
        Toast.show("Fail to load surah audio");
        throw error;
      }
    },
  });

  function playAudio() {
    audio?.sound?.playAsync();
  }

  function pauseAudio() {
    audio?.sound?.pauseAsync();
  }
  function setPosition(position: number) {
    audio?.sound?.setPositionAsync(position);
  }

  function playVerse(verseKey: string) {
    const verse = audioFile?.verse_timings.find((verse) => verse.verse_key === verseKey);
    if (!verse) return;
    audio?.sound.playFromPositionAsync(verse.timestamp_from);
  }

  function playNextVerse() {
    playVerse(audioState.nextVerseKey);
  }

  function playPrevVerse() {
    playVerse(audioState.prevVerseKey);
  }

  useEffect(() => {
    if (!audio || !audioFile) return;

    // listen to audio
    audio.sound.setOnPlaybackStatusUpdate((status) => {
      if (!status.isLoaded) {
        // if the audio is not loaded, reset the audio state
        setAudioState(DEFAULT_AUDIO_STATE);
        setAudioVerseState();
        return;
      }

      // if the audio is loaded, update the audio state
      const activeVerseKeyIndex = audioFile?.verse_timings.findIndex((verse) => {
        return (
          status.positionMillis >= verse.timestamp_from &&
          status.positionMillis < verse.timestamp_to
        );
      });
      const activeVerseKey = audioFile?.verse_timings[activeVerseKeyIndex]?.verse_key;
      const nextVerseKey = audioFile?.verse_timings[activeVerseKeyIndex + 1]?.verse_key ?? "";
      const prevVerseKey = audioFile?.verse_timings[activeVerseKeyIndex - 1]?.verse_key ?? "";
      const updatedAudioState: AudioState = {
        position: status.positionMillis,
        status: status.isPlaying ? "playing" : status.isBuffering ? "buffering" : "paused",
        prevVerseKey,
        nextVerseKey,
      };

      setAudioState(updatedAudioState);
      setAudioVerseState(
        activeVerseKey
          ? {
              key: activeVerseKey,
              status: updatedAudioState.status,
              pauseAudio: pauseAudio,
              playVerse: playVerse,
              playAudio: playAudio,
            }
          : undefined
      );
    });
  }, [audio, audioFile]);

  useEffect(() => {
    return () => {
      audio?.sound?.unloadAsync();
    };
  }, [audio]);

  return {
    isLoading,
    isError,
    audioFile,
    playAudio,
    pauseAudio,
    setPosition,
    playPrevVerse,
    playNextVerse,
    audioState,
  };
};

function PlayerView({
  duration,
  value,
  currentDuration,
  maximumValue,
  state,
  prevVerseKey,
  nextVerseKey,
  playAudio,
  pauseAudio,
  playNextVerse,
  playPrevVerse,
  onValueChange,
}: {
  duration: string;
  value: number;
  maximumValue: number;
  currentDuration: string;
  state: AudioState["status"];
  prevVerseKey?: string;
  nextVerseKey?: string;
  playAudio?: () => void;
  pauseAudio?: () => void;
  onValueChange?: (value: number) => void;
  playNextVerse?: () => void;
  playPrevVerse?: () => void;
}) {
  const { isLight } = useColorScheme();

  return (
    <>
      <View className="flex-row space-x-9 justify-center mb-3">
        <FeatherIcons
          name="fast-forward"
          size={25}
          color={isLight ? colors.primary : colors.primary_dark}
          style={{ transform: [{ rotate: "180deg" }] }}
          onPress={playPrevVerse}
          disabled={!prevVerseKey || state === "loading" || state === "buffering"}
        />
        {(state === "loading" || state === "buffering") && (
          <View>
            <Spinner
              color={isLight ? colors.primary : colors.primary_dark}
              loader="font-awesome5"
            />
          </View>
        )}
        {state === "paused" && (
          <FeatherIcons
            name="play"
            size={25}
            color={isLight ? colors.primary : colors.primary_dark}
            onPress={playAudio}
          />
        )}
        {state === "playing" && (
          <FeatherIcons
            name="pause"
            size={25}
            color={isLight ? colors.primary : colors.primary_dark}
            onPress={pauseAudio}
          />
        )}
        <FeatherIcons
          name="fast-forward"
          size={25}
          color={isLight ? colors.primary : colors.primary_dark}
          onPress={playNextVerse}
          disabled={!nextVerseKey || state === "loading" || state === "buffering"}
        />
      </View>
      <View className="flex-row space-x-2 items-center">
        <Text className="font-poppins text-sm text-foreground dark:text-foreground_dark w-[55px]">
          {currentDuration}
        </Text>
        <Slider
          value={value}
          maximumValue={maximumValue}
          allowTouchTrack
          style={{
            flex: 1,
            height: 30,
          }}
          trackStyle={{ height: 5 }}
          thumbStyle={{
            height: 12,
            width: 12,
            backgroundColor: isLight ? colors.primary : colors.primary_dark,
            borderRadius: 200,
          }}
          minimumTrackTintColor={isLight ? colors.primary : colors.primary_dark}
          maximumTrackTintColor={isLight ? colors.secondary : colors.border_dark}
          onValueChange={onValueChange}
          step={1}
        />
        <Text className="font-poppins text-sm text-foreground  dark:text-foreground_dark">
          {duration}
        </Text>
      </View>
    </>
  );
}

function SurahAudioPlayer({ surahNumber }: { surahNumber: number }) {
  const selectedReciter = useStore((state) => state.selectedReciter);

  const {
    audioFile,
    isLoading,
    isError,
    playAudio,
    pauseAudio,
    setPosition,
    playNextVerse,
    playPrevVerse,
    audioState,
  } = useSurahAudio({
    surahNumber,
    reciterId: selectedReciter.id,
  });

  function renderContent() {
    if (isLoading || audioState.status === "loading")
      return (
        <PlayerView
          state="loading"
          currentDuration="0:00"
          duration="0:00"
          value={0}
          maximumValue={0}
        />
      );

    if (!audioFile) return null;

    return (
      <PlayerView
        state={audioState.status}
        value={audioState.position}
        currentDuration={formatTime(audioState.position)}
        duration={formatTime(audioFile.duration)}
        maximumValue={audioFile.duration}
        playAudio={playAudio}
        pauseAudio={pauseAudio}
        onValueChange={setPosition}
        nextVerseKey={audioState.nextVerseKey}
        prevVerseKey={audioState.prevVerseKey}
        playNextVerse={playNextVerse}
        playPrevVerse={playPrevVerse}
      />
    );
  }

  if (isError) return null;

  return (
    <Wrapper
      className="px-2 absolute w-full rounded-t-xl flex-initial bottom-0 pb-2 pt-2 elevation-[30] dark:bg-secondary_dark"
      style={{ height: QURAN_PLAYER_HEIGHT }}
    >
      {renderContent()}
    </Wrapper>
  );
}

export { SurahAudioPlayer };
