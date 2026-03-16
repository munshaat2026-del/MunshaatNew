import CreateForm from "@/components/comingSoon/createComponents/CreateForm";
import { addComingSoonAction } from "../(actions)/addNewComingSoon";
import { getAllComingSoon } from "@/app/server/coming_soon/services";
import { Card, CardContent } from "@/components/ui/card";
import { Lock } from "lucide-react";

export default async function Page() {
  const allComingSoon = (await getAllComingSoon()).data || [];
  const alreadyExists = allComingSoon.length > 0;

  if (alreadyExists) {
    return (
      <div className="w-full flex justify-center items-center mt-10">
        <Card className="max-w-lg w-full border shadow-md">
          <CardContent className="flex flex-col items-center text-center py-8">
            <Lock className="w-10 h-10 text-gray-500 mb-4" />
            <h2 className="text-xl font-semibold text-gray-800">
              Only One Coming Soon Event Allowed
            </h2>
            <p className="text-gray-600 mt-2 text-sm">
              A Coming Soon event already exists in the system.
            </p>
            <p className="text-gray-500 mt-1 text-sm">
              To add a new one, please delete the existing event first.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full">
      <CreateForm action={addComingSoonAction} />
    </div>
  );
}
