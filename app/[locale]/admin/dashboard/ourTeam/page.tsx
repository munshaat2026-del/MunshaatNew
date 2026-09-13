import { MemberColumns } from "@/components/columns/members-columns";
import { DataTable } from "@/components/data-table";
import { deleteMemberAction } from "./(actions)/deleteMember";
import NavigationButton from "@/components/NavigationButton";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen, Info } from "lucide-react";
import { getAllMembers } from "@/app/server/ourTeam/services";
import SortMemberButton from "@/components/SortMemberButton";

export default async function MemberTable() {
  const allMembers = (await getAllMembers()).data || [];

  return (
    <main className="flex flex-col justify-center items-center ml-7 w-[95%] mx-auto">
      <div className="flex flex-col justify-start items-start mb-6 border-b border-gray-300 w-full">
        <h1 className="text-lg md:text-2xl font-bold text-gray-900">Members</h1>

        <h2 className="text-sm md:text-lg text-gray-600">A list of Members.</h2>
      </div>

      {/* Important Note */}
      <div className="w-full mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-4">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">Important Note</p>

            <p className="leading-6">
              There can only be one member assigned to Executive Management. For
              the Board of Directors, the display order is fixed: the first
              member appears in the center, the second member appears on the
              right, and the third member appears on the left.
            </p>
          </div>
        </div>
      </div>
      {allMembers.length === 0 ? (
        <Card className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50">
          <CardContent className="flex flex-col items-center text-center">
            <FolderOpen className="w-10 h-10 text-gray-400 mb-3" />

            <h3 className="text-gray-600 text-lg font-medium">
              No Members Found
            </h3>

            <p className="text-gray-500 text-sm mb-4">
              You Haven’t Added Any Member Yet.
            </p>

            <NavigationButton
              routeName="newMember"
              value="Add New Member"
              className="mb-10"
            />
          </CardContent>
        </Card>
      ) : (
        <>
          <DataTable
            columns={MemberColumns}
            data={allMembers}
            routeName="ourTeam"
            deleteAction={deleteMemberAction}
          />

          <div className="flex flex-col md:flex-row w-full justify-center gap-4 mb-10 mt-12 md:mt-7">
            <NavigationButton routeName="newMember" value="Add New Member" />

            <SortMemberButton routeName="sortMember" value="Sort Member" />
          </div>
        </>
      )}
    </main>
  );
}
