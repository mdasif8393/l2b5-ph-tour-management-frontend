/* eslint-disable @typescript-eslint/no-explicit-any */
import DeleteConfirmation from "@/components/DeleteConfirmation";
import AddTourModal from "@/components/modules/Admin/Tour/AddTourModal";
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
  useGetTourQuery,
  useRemoveTourMutation,
} from "@/redux/features/tour/tour.api";
import { Trash2 } from "lucide-react";

import { toast } from "sonner";

export default function AddTour() {
  const { data } = useGetTourQuery(undefined);

  const [deleteTour] = useRemoveTourMutation();

  const handleRemoveTour = async (tourId: string) => {
    const toastId = toast.loading("Removing...");
    try {
      const res = await deleteTour(tourId).unwrap();

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
        <h1 className="text-xl font-semibold">Tours</h1>
        <AddTourModal />
      </div>
      <div className="border border-muted rounded-md">
        <Table>
          <TableCaption>A list of Tours</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Title</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.data?.map((item: any) => (
              <TableRow key={item._id}>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell className="text-right">
                  <DeleteConfirmation
                    onConfirm={() => handleRemoveTour(item._id)}
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
