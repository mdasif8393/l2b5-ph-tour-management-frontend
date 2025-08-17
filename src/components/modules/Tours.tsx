import { Button } from "@/components/ui/button";
import { useGetTourQuery } from "@/redux/features/tour/tour.api";

import { Link } from "react-router";

const tourData = [
  {
    _id: "1",
    title: "Magical Santorini Island Adventure",
    description:
      "Experience the breathtaking beauty of Santorini with its iconic white-washed buildings, stunning sunsets, and crystal-clear waters. This 5-day adventure includes visits to traditional villages, wine tasting, and relaxation on unique volcanic beaches.",
    location: "Santorini, Greece",
    images: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
    ],
    costFrom: 1299,
    maxGuest: 12,
    startDate: "2024-06-15",
    endDate: "2024-06-20",
    departureLocation: "Athens International Airport",
    arrivalLocation: "Santorini Airport",
    division: "Cyclades",
    tourType: "Cultural & Leisure",
    minAge: 18,
    amenities: [
      "Free WiFi",
      "Air Conditioning",
      "Swimming Pool Access",
      "24/7 Concierge",
      "Spa Services",
    ],
    included: [
      "Round-trip flights",
      "4-star hotel accommodation",
      "Daily breakfast",
      "Guided tours",
      "Wine tasting experience",
      "Sunset cruise",
    ],
    excluded: [
      "Travel insurance",
      "Lunch and dinner",
      "Personal expenses",
      "Optional activities",
      "Tips and gratuities",
    ],
    tourPlan: [
      "Arrival in Santorini and check-in to hotel",
      "Explore Fira town and enjoy welcome dinner",
      "Visit Oia village and watch famous sunset",
      "Wine tasting tour in traditional vineyards",
      "Relax at Red Beach and visit Akrotiri ruins",
      "Sunset sailing cruise and departure",
    ],
    slug: "magical-santorini-island-adventure",
    createdAt: "2024-01-15T10:30:00.000Z",
    updatedAt: "2024-02-10T14:45:00.000Z",
  },
];

export default function Tours() {
  const { data } = useGetTourQuery(undefined);
  console.log(data);

  return (
    <div className="container mx-auto px-5 py-8 grid grid-cols-12 gap-5">
      <div className="col-span-9 w-full">
        {tourData?.map((item) => (
          <div
            key={item.slug}
            className="border border-muted rounded-lg shadow-md overflow-hidden mb-6 flex"
          >
            <div className="w-2/5 bg-red-500 flex-shrink-0">
              <img
                src={item.images[0]}
                alt={item.title}
                className="object-cover w-full h-full "
              />
            </div>
            <div className="p-6 flex-1">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground mb-3">{item.description}</p>

              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold text-primary">
                  From ৳{item?.costFrom?.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">
                  Max {item?.maxGuest} guests
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <span className="font-medium">From:</span>{" "}
                  {item.departureLocation}
                </div>
                <div>
                  <span className="font-medium">To:</span>{" "}
                  {item.arrivalLocation}
                </div>
                <div>
                  <span className="font-medium">Duration:</span>{" "}
                  {item.tourPlan.length} days
                </div>
                <div>
                  <span className="font-medium">Min Age:</span> {item.minAge}+
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {item?.amenities?.slice(0, 3)?.map((amenity, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted/50 text-primary text-xs rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
                {item?.amenities?.length > 3 && (
                  <span className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full">
                    +{item.amenities.length - 3} more
                  </span>
                )}
              </div>

              <Button asChild className="w-full">
                <Link to={`/tours/${item._id}`}>View Details</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
