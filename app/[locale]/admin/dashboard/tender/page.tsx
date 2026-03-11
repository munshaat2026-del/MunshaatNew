
import { TenderColumns } from "@/components/columns/tender-columns";
import { DataTable } from "@/components/data-table";
import { deleteTenderAction } from "./(actions)/deleteTenderAction";
import NavigationButton from "@/components/NavigationButton";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";
import { getAllTenders } from "@/app/server/tenders/services";


export default async function TendersTable() {
  const allTenders = (await getAllTenders()).data || [];

  return (
    <main className="flex flex-col justify-center items-center w-[95%] mx-auto">
      {/* Header */}
      <div className="flex flex-col justify-start items-start mb-6 border-b border-gray-300 w-full">
        <h1 className="text-lg md:text-2xl font-bold text-gray-900">Tender</h1>
        <h2 className="text-sm md:text-lg text-gray-600">
          A list of Tender.
        </h2>
      </div>

      {/* Conditional rendering */}
      {allTenders.length === 0 ? (
        <Card className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50">
          <CardContent className="flex flex-col items-center text-center">
            <FolderOpen className="w-10 h-10 text-gray-400 mb-3" />
            <h3 className="text-gray-600 text-lg font-medium">
              No Tender Found
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              You Haven’t Added Any Tender Yet.
            </p>
            <NavigationButton
            routeName="newTender"
            value="Add New Tender"
          />
          </CardContent>
        </Card>
      ) : (
        <>
          <DataTable
            columns={TenderColumns}
            data={allTenders}
            routeName="tender"
            deleteAction={deleteTenderAction}
          />
          <NavigationButton
            routeName="newTender"
            value="Add New Tender"
          />
        </>
      )}
    </main>
  );
}


