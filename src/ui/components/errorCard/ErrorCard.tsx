import { Card } from "@nextui-org/react";

export default function ErrorCard({ error }: { error: string }) {
  return (
    <Card
      fullWidth
      className="flex flex-row px-5 py-2 bg-default-200/50 border-1 border-red-400 gap-x-6"
    >
      <p className="font-medium text-red-500">{error}</p>
    </Card>
  );
}
