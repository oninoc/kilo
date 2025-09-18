import { useInfiniteAwardsFlat } from "../hooks/useInfiniteAwards.js";
import { InfiniteScroll } from "@/shared/components/InfiniteScroll";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ApplicationsModal } from "@/pages/application/components/ApplicationsModal.js";
import { useFilters } from "@/shared/contexts/FilterContext";
import type { Award } from "../types/awards.js";

interface AwardsListProps {
  className?: string;
}

export function AwardsList({ className }: AwardsListProps) {
  const { filters } = useFilters();
  const zoneId = filters.zoneId ? parseInt(filters.zoneId) : undefined;
  const date = filters.date || undefined;
  const {
    awards,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error
  } = useInfiniteAwardsFlat({ zone: zoneId, date });

  const renderAwardItem = (award: Award, index: number) => (
    <Card key={`${award.award_id}-${index}`} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-start justify-between">
          <span>Award ID: {award.award_id}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
          <span>Date entry: {award.entry}</span>
          <span>Size: {award.size}</span>
          <span>Pref: {award.pref}</span>
        </div>
        <div className="flex justify-end">
          <ApplicationsModal />
        </div>
      </CardContent>
    </Card>
  );

  const loadingComponent = (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );

  if (isLoading) {
    return loadingComponent;
  }

  if (isError) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-2">Error loading awards</div>
        <div className="text-sm text-gray-600">
          {error instanceof Error ? error.message : "Something went wrong"}
        </div>
      </div>
    );
  }

  if (!zoneId && !date) {
    return (
      <div className="text-center py-8 text-gray-500">
        Select a zone or date to view awards
      </div>
    );
  }

  if (awards.length === 0) {
    const filterText = zoneId && date 
      ? `zone ${zoneId} on ${date}`
      : zoneId 
        ? `zone ${zoneId}`
        : date
          ? `date ${date}`
          : 'the selected filters';
    
    return (
      <div className="text-center py-8 text-gray-500">
        No awards found for {filterText}
      </div>
    );
  }

  return (
    <InfiniteScroll
      items={awards}
      hasNextPage={hasNextPage ?? false}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      renderItem={renderAwardItem}
      loadingComponent={loadingComponent}
      className={`max-h-96 ${className}`}
    />
  );
}
