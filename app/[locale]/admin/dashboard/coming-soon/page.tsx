import { ComingSoonColumns } from "@/components/columns/coming-soon-columns";
import { DataTable } from "@/components/data-table";
import { deleteComingSoonAction } from "./(actions)/deleteComingSoon";
import NavigationButton from "@/components/NavigationButton";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen, Lock } from "lucide-react";
import { getAllComingSoon } from "@/app/server/coming_soon/services";

export default async function ComingSoonTable() {
  const allComingSoon = (await getAllComingSoon()).data || [];
  const count = allComingSoon.length;
  const canAdd = count === 0;

  return (
    <main className="flex flex-col justify-center items-center w-[95%] mx-auto">
      {/* Header */}
      <div className="flex flex-col justify-start items-start mb-6 border-b border-gray-300 w-full">
        <h1 className="text-lg md:text-2xl font-bold text-gray-900">
          Coming Soon Events
        </h1>
        <h2 className="text-sm md:text-lg text-gray-600">
          A list of Coming Soon Events.
        </h2>
      </div>

      {/* No items - show empty state with add button */}
      {canAdd ? (
        <Card className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50">
          <CardContent className="flex flex-col items-center text-center">
            <FolderOpen className="w-10 h-10 text-gray-400 mb-3" />
            <h3 className="text-gray-600 text-lg font-medium">
              No Coming Soon Found
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              You haven’t added any Coming Soon event yet. You can add one event
              only.
            </p>

            <NavigationButton
              routeName="newComingSoon"
              value="Add New Coming Soon"
            />
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Table */}
          <DataTable
            columns={ComingSoonColumns}
            data={allComingSoon}
            routeName="coming-soon"
            deleteAction={deleteComingSoonAction}
          />

          {/* Info card explaining the single-row rule */}
          <div className="w-full max-w-4xl mt-6">
            <Card className="p-4 bg-white shadow-md border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <Lock className="w-8 h-8 text-gray-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">
                    Only one Coming Soon event is allowed
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    There{" "}
                    {count === 1
                      ? "is 1 Coming Soon event"
                      : `are ${count} Coming Soon events`}{" "}
                    in the system. To add a new Coming Soon event you must first
                    delete the existing one.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Tip: Use the <span className="font-medium">Delete</span>{" "}
                    action in the table to remove the current event.
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Tip: You can update the existing event anytime using the{" "}
                    <span className="font-medium">Edit</span> action in the
                    table.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}
    </main>
  );
}
