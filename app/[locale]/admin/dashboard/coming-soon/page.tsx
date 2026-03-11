
import { ComingSoonColumns } from "@/components/columns/coming-soon-columns";
import { DataTable } from "@/components/data-table";
import { deleteComingSoonAction } from "./(actions)/deleteComingSoon";
import NavigationButton from "@/components/NavigationButton";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";
import { getAllComingSoon } from "@/app/server/coming_soon/services";


export default async function ComingSoonTable() {
  const allComingSoon = (await getAllComingSoon()).data || [];

  return (
    <main className="flex flex-col justify-center items-center w-[95%] mx-auto">
      {/* Header */}
      <div className="flex flex-col justify-start items-start mb-6 border-b border-gray-300 w-full">
        <h1 className="text-lg md:text-2xl font-bold text-gray-900">Coming Soon Events</h1>
        <h2 className="text-sm md:text-lg text-gray-600">
          A list of Coming Soon Events.
        </h2>
      </div>

      {/* Conditional rendering */}
      {allComingSoon.length === 0 ? (
        <Card className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50">
          <CardContent className="flex flex-col items-center text-center">
            <FolderOpen className="w-10 h-10 text-gray-400 mb-3" />
            <h3 className="text-gray-600 text-lg font-medium">
              No Coming Soon Found
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              You Haven’t Added Any Coming Soon Yet.
            </p>
            <NavigationButton
            routeName="newComingSoon"
            value="Add New Coming Soon"
          />
          </CardContent>
        </Card>
      ) : (
        <>
          <DataTable
            columns={ComingSoonColumns}
            data={allComingSoon}
            routeName="coming-soon"
            deleteAction={deleteComingSoonAction}
          />
          <NavigationButton
            routeName="newComingSoon"
            value="Add New Coming Soon"
          />
        </>
      )}
    </main>
  );
}


