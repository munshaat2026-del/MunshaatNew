
import { RealEstatesColumns } from "@/components/columns/real-estates-columns";
import { DataTable } from "@/components/data-table";
import { deleteRealEstateAction } from "./(actions)/deleteRealEstates";
import NavigationButton from "@/components/NavigationButton";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";
import { getAllRealEstates } from "@/app/server/real_estates/services";

export default async function RealEstatesTable() {
  const allRealEstates = (await getAllRealEstates()).data || [];

  return (
    <main className="flex flex-col justify-center items-center ml-7 w-[95%] mx-auto">
      {/* Header */}
      <div className="flex flex-col justify-start items-start mb-6 border-b border-gray-300 w-full">
        <h1 className="text-lg md:text-2xl font-bold text-gray-900">Real Estates</h1>
        <h2 className="text-sm md:text-lg text-gray-600">
          A list of Real Estates.
        </h2>
      </div>

      {/* Conditional rendering */}
      {allRealEstates.length === 0 ? (
        <Card className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50">
          <CardContent className="flex flex-col items-center text-center">
            <FolderOpen className="w-10 h-10 text-gray-400 mb-3" />
            <h3 className="text-gray-600 text-lg font-medium">
              No Real Estates Found
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              You Haven’t Added Any Real Estates Yet.
            </p>
            <NavigationButton
              routeName="newRealEstates"
              value="Add New Real Estates"
            />
          </CardContent>
        </Card>
      ) : (
        <>
          <DataTable
            columns={RealEstatesColumns}
            data={allRealEstates}
            routeName="real-estates"
            deleteAction={deleteRealEstateAction}
          />
          <NavigationButton
            routeName="newRealEstates"
            value="Add New Real Estates"
          />
        </>
      )}
    </main>
  );
}


