import {
  Select,
  Selection,
  SelectItem,
  SelectSection,
} from "@nextui-org/react";

export default function ModelSelect({
  selectedModel,
  onModelChange,
  DEFAULT_MODELS,
}: {
  selectedModel: React.Key | null;
  onModelChange: (keys: Selection) => void;
  DEFAULT_MODELS: string[];
}) {
  return (
    <Select
      label="Model"
      selectedKeys={
        selectedModel ? ([selectedModel] as unknown as Selection) : []
      }
      onSelectionChange={onModelChange}
    >
      <SelectSection showDivider title="AI Model">
        {DEFAULT_MODELS.map((model) => (
          <SelectItem key={model}>{model}</SelectItem>
        ))}
      </SelectSection>
    </Select>
  );
}
