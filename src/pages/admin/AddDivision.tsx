import DeleteConfirmation from "@/components/DeleteConfirmation";
import { AddDivisionModal } from "@/components/modules/Admin/Division/AddDivisionModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useDeleteDivisionMutation,
  useGetDivisionQuery,
} from "@/redux/features/division/division.api";
import { IDivision } from "@/types";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AddDivision() {
  const { data } = useGetDivisionQuery(undefined);

  const [deleteDivision] = useDeleteDivisionMutation();

  const handleRemoveDivision = async (divisionId: string) => {
    const toastId = toast.loading("Removing...");
    try {
      const res = await deleteDivision(divisionId).unwrap();

      if (res.success) {
        toast.success("Division deleted successfully", { id: toastId });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-5">
      <div className="flex justify-between my-8">
        <h1 className="text-xl font-semibold">Tour Types</h1>
        <AddDivisionModal />
      </div>
      <div className="border border-muted rounded-md">
        <Table>
          <TableCaption>A list of Divisions</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((item: IDivision) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-right">
                  <DeleteConfirmation
                    onConfirm={() => handleRemoveDivision(item._id)}
                  >
                    <Button size="sm">
                      <Trash2 />
                    </Button>
                  </DeleteConfirmation>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
