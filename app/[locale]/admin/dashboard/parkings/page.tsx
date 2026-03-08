
import { ParkingColumns } from "@/components/columns/parkings-columns";
import { DataTable } from "@/components/data-table";
import { deleteParkingAction } from "./(actions)/deleteParking";
import NavigationButton from "@/components/NavigationButton";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";
import { getAllParkings } from "@/app/server/parkings/services";


export default async function ParkingsTable() {
  const allParkings = (await getAllParkings()).data || [];

  return (
    <main className="flex flex-col justify-center items-center w-[95%] mx-auto">
      {/* Header */}
      <div className="flex flex-col justify-start items-start mb-6 border-b border-gray-300 w-full">
        <h1 className="text-lg md:text-2xl font-bold text-gray-900">Parking</h1>
        <h2 className="text-sm md:text-lg text-gray-600">
          A list of Parking.
        </h2>
      </div>

      {/* Conditional rendering */}
      {allParkings.length === 0 ? (
        <Card className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50">
          <CardContent className="flex flex-col items-center text-center">
            <FolderOpen className="w-10 h-10 text-gray-400 mb-3" />
            <h3 className="text-gray-600 text-lg font-medium">
              No Parking Found
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              You Haven’t Added Any Parking Yet.
            </p>
            <NavigationButton
             routeName="newParking"
            value="Add New Parking"
            />
          </CardContent>
        </Card>
      ) : (
        <>
          <DataTable
            columns={ParkingColumns}
            data={allParkings}
            routeName="parkings"
            deleteAction={deleteParkingAction}
          />
          <NavigationButton
            routeName="newParking"
            value="Add New Parking"
          />
        </>
      )}
    </main>
  );
}


