import ParkingHero from "@/app/components/pagescomponents/parkings/ParkingHero";
import ParkingFeatures from "@/app/components/pagescomponents/parkings/ParkingFeatures";
import ParkingPricing from "@/app/components/pagescomponents/parkings/ParkingPricing";
import ParkingLocations from "@/app/components/pagescomponents/parkings/ParkingLocations";



export default function ParkingLeasing() {
  const primaryColor = "#0c479a";

 

  return (
    <div className="min-h-screen mt-20 bg-white text-slate-900 font-sans">
      <ParkingHero primaryColor={primaryColor} />
      <ParkingFeatures primaryColor={primaryColor} />
      <ParkingPricing primaryColor={primaryColor} />
      <ParkingLocations primaryColor={primaryColor} />
    </div>
  );
}