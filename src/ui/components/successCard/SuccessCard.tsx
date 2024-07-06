import { Card } from "@nextui-org/react";

export default function SuccessCard({ success }: { success: string }) {
  return (
    <Card
      fullWidth
      className="flex flex-row px-5 py-2 bg-default-200/50 border-1 border-green-500 gap-x-6"
    >
      <p className="font-medium text-green-600">{success}</p>
    </Card>
  );
}
