import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Button from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Badge from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { InfiniteScroll } from "@/shared/components/InfiniteScroll";
import { useInfiniteApplicationsFlat } from "../hooks/useInfiniteApplications.js";
import { useFilters } from "@/shared/contexts/FilterContext";
import type { Application } from "../types/applications.js";

export function ApplicationsModal() {
  const { filters } = useFilters();
  const zoneId = filters.zoneId ? parseInt(filters.zoneId) : undefined;
  const date = filters.date || undefined;
  const [open, setOpen] = useState(false);

  const {
    applications,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error
  } = useInfiniteApplicationsFlat({ zone: zoneId, date });

  const renderApplicationItem = (application: Application, index: number) => (
    <Card key={`${application.application_id}-${index}`} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-start justify-between">
          <span>Application ID: {application.application_id}</span>
          <div className="flex gap-2">
            <Badge variant={application.awarded ? "default" : "secondary"}>
              {application.awarded ? "Awarded" : "Not Awarded"}
            </Badge>
            {application.awarded && application.award_id > 0 && (
              <Badge variant="outline">Award #{application.award_id}</Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>
              <span className="font-medium text-gray-500">Date 1:</span>
              <div>{application.date1}</div>
            </div>
            <div>
              <span className="font-medium text-gray-500">Date 2:</span>
              <div>{application.date2}</div>
            </div>
            <div>
              <span className="font-medium text-gray-500">Date 3:</span>
              <div>{application.date3}</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>
              <span className="font-medium text-gray-500">Zone 1:</span>
              <div>{application.zone1}</div>
            </div>
            <div>
              <span className="font-medium text-gray-500">Zone 2:</span>
              <div>{application.zone2}</div>
            </div>
            <div>
              <span className="font-medium text-gray-500">Zone 3:</span>
              <div>{application.zone3}</div>
            </div>
          </div>
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

  const getFilterDescription = () => {
    if (zoneId && date) {
      return `zone ${zoneId} on ${date}`;
    } else if (zoneId) {
      return `zone ${zoneId}`;
    } else if (date) {
      return `date ${date}`;
    } else {
      return "all applications";
    }
  };

  const modalContent = () => {
    if (isLoading) {
      return loadingComponent;
    }

    if (isError) {
      return (
        <div className="text-center py-8">
          <div className="text-red-500 mb-2">Error loading applications</div>
          <div className="text-sm text-gray-600">
            {error instanceof Error ? error.message : "Something went wrong"}
          </div>
        </div>
      );
    }

    if (applications.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          No applications found for {getFilterDescription()}
        </div>
      );
    }

    return (
      <InfiniteScroll
        items={applications}
        hasNextPage={hasNextPage ?? false}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        renderItem={renderApplicationItem}
        loadingComponent={loadingComponent}
        className="max-h-96"
      />
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-white" variant="outline" size="sm">
          See Applications
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Applications</DialogTitle>
          <DialogDescription>
            Applications for {getFilterDescription()}
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-hidden">
          {modalContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
}
