import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetDivisionQuery } from "@/redux/features/division/division.api";
import { useGetTourTypesQuery } from "@/redux/features/tour/tour.api";
import { useSearchParams } from "react-router";

export default function TourFilters() {
  // make division and tour type options for select
  const { data: divisionData, isLoading: divisionLoading } =
    useGetDivisionQuery(undefined);

  const { data: tourTypeData, isLoading: tourTypeLoading } =
    useGetTourTypesQuery({ limit: 1000, fields: "_id, name" });

  const divisionOption = divisionData?.data?.map(
    (item: { _id: string; name: string }) => ({
      label: item.name,
      value: item._id,
    })
  );

  const tourTypeOption = tourTypeData?.data?.map(
    (item: { _id: string; name: string }) => ({
      label: item.name,
      value: item._id,
    })
  );

  // set selected division and tourType _id to url
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedDivision = searchParams.get("division") || undefined;
  const selectedTourType = searchParams.get("tourType") || undefined;

  const handleDivisionChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("division", value);
    setSearchParams(params);
  };

  const handleTourTypeChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tourType", value);
    setSearchParams(params);
  };

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("division");
    params.delete("tourType");
    setSearchParams(params);
  };

  return (
    <div className="col-span-3 w-full h-[500px] border border-muted rounded-md p-5 space-y-3">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-orange-500">Filters</h1>
        <Button size="sm" variant="outline" onClick={handleClearFilter}>
          Clear Filter
        </Button>
      </div>
      <div>
        <Label className="mb-2">Division to visit</Label>
        <Select
          onValueChange={handleDivisionChange}
          value={selectedDivision ? selectedDivision : ""}
          disabled={divisionLoading}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a division" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Division </SelectLabel>
              {divisionOption?.map(
                (division: { value: string; label: string }) => (
                  <SelectItem value={division.value}>
                    {division.label}
                  </SelectItem>
                )
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="mb-2">Tour type</Label>
        <Select
          onValueChange={handleTourTypeChange}
          value={selectedTourType ? selectedTourType : ""}
          disabled={tourTypeLoading}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a tour type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Select Tour type </SelectLabel>
              {tourTypeOption?.map(
                (division: { value: string; label: string }) => (
                  <SelectItem value={division.value}>
                    {division.label}
                  </SelectItem>
                )
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div></div>
    </div>
  );
}
