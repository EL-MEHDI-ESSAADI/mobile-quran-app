import { View } from "react-native";
import { Skeleton } from "@/components/skeleton";

function VerseSkeleton() {
  return (
    <View>
      <View className="bg-secondary dark:bg-secondary_dark rounded-[10px] justify-between mb-6 flex-row px-[13px] py-[10px]">
        <Skeleton className="rounded-full bg-primary dark:bg-primary_dark w-7 h-7" />

        <View className="flex-row gap-4">
          <Skeleton className="rounded-md bg-primary dark:bg-primary_dark  w-7 h-7" />
          <Skeleton className="rounded-md bg-primary dark:bg-primary_dark w-7 h-7" />
          <Skeleton className="rounded-md bg-primary dark:bg-primary_dark w-7 h-7" />
        </View>
      </View>
      <View className="items-end">
        <Skeleton className="rounded-md bg-border dark:bg-border_dark w-1/2 h-7 mb-4" />
      </View>
      <Skeleton className="rounded-md bg-border dark:bg-border_dark w-1/2 h-7 mb-4" />
    </View>
  );
}

export { VerseSkeleton };
