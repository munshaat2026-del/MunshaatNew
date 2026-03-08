import ParkingHero from "@/app/components/pagescomponents/parkings/ParkingHero";
import ParkingFeatures from "@/app/components/pagescomponents/parkings/ParkingFeatures";
import ParkingPricing from "@/app/components/pagescomponents/parkings/ParkingPricing";
import ParkingLocations from "@/app/components/pagescomponents/parkings/ParkingLocations";

interface ParkingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  isPopular: boolean;
}

export default function ParkingLeasing() {
  const primaryColor = "#0c479a";

  const parkingPlans: ParkingPlan[] = [
    {
      name: "Standard Access",
      price: "450",
      period: "Monthly",
      features: [
        "Standard Bay Area",
        "24/7 CCTV Monitoring",
        "Mobile App Access",
        "General Maintenance",
      ],
      isPopular: false,
    },
    {
      name: "Business Executive",
      price: "1,200",
      period: "Monthly",
      features: [
        "Dedicated Reserved Slot",
        "Underground Shaded Area",
        "EV Charging Access",
        "Priority Entry/Exit",
      ],
      isPopular: true,
    },
    {
      name: "VIP Corporate",
      price: "10,000",
      period: "Yearly",
      features: [
        "Premium Basement Level",
        "Valet Service Included",
        "Multiple Vehicle Access",
        "Concierge Support",
      ],
      isPopular: false,
    },
  ];

  return (
    <div className="min-h-screen mt-20 bg-white text-slate-900 font-sans">
      <ParkingHero primaryColor={primaryColor} />
      <ParkingFeatures primaryColor={primaryColor} />
      <ParkingPricing primaryColor={primaryColor} plans={parkingPlans} />
      <ParkingLocations primaryColor={primaryColor} />
    </div>
  );
}