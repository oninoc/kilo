import { useZones } from "../hooks/useZones";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export function ZoneList() {
  const { data: zones, isLoading, isError, error } = useZones();
  const isMobile = useIsMobile();

  if (isLoading) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Zones</h2>
        <div className={`grid gap-4 ${
          isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
        }`}>
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    console.error("Error loading zones:", error);
    return (
      <div className="p-4">
        <div className="text-red-500 p-4 border border-red-200 rounded-lg bg-red-50">
          Error loading zones. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Zones</h2>
      <div className={`grid gap-4 ${
        isMobile ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
      }`}>
        {zones?.map((zone) => (
          <Card key={zone.zone_id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {zone.name}
                <Badge variant="secondary">ID: {zone.zone_id}</Badge>
              </CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}