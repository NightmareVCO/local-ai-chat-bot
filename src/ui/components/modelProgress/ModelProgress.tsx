import { Card } from "@nextui-org/react";

export default function ModelProgress({
  progress,
  timeElapsed,
}: {
  progress: number;
  timeElapsed: number;
}) {
  return (
    <Card
      fullWidth
      className="flex flex-row px-5 py-2 gap-x-6 bg-default-200/50 border-1 border-primary"
    >
      <p className="font-semibold text-primary">
        Progress: {(progress * 100).toFixed(2)}%
      </p>
      <p className="font-semibold text-primary">
        Time Elapsed: {timeElapsed} seconds
      </p>
    </Card>
  );
}
