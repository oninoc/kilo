import { useZones } from "@/pages/zone/hooks/useZones";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

interface ZoneSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export function ZoneSelect({ value, onValueChange, placeholder = "Select a zone..." }: ZoneSelectProps) {
  const { data: zones, isLoading, isError } = useZones();

  if (isLoading) {
    return <Skeleton className="h-10 w-full" />;
  }

  if (isError || !zones) {
    return (
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Error loading zones" />
        </SelectTrigger>
      </Select>
    );
  }

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {zones.map((zone) => (
          <SelectItem key={zone.zone_id} value={zone.zone_id.toString()}>
            {zone.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
