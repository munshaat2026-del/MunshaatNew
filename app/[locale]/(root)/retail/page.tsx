import RetailHero from "@/app/components/pagescomponents/retail/RetailHero";
import RetailCategories from "@/app/components/pagescomponents/retail/RetailCategories";
import RetailGrid from "@/app/components/pagescomponents/retail/RetailGrid";
import RetailStatsCTA from "@/app/components/pagescomponents/retail/RetailStatsCTA";

export default function RetailListing() {
  const primaryColor = "#0c479a";

  const categories = ["All Units", "Fashion", "F&B", "Services", "Kiosks"];

  const retailUnits = [
    {
      id: 1,
      name: "Anchor Store - Level 1",
      mall: "Royal Plaza Mall",
      location: "Main Entrance South",
      size: "850 sqm",
      traffic: "High Footfall",
      category: "Fashion / Dept Store",
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2070"
    },
    {
      id: 2,
      name: "Corner Boutique",
      mall: "The Boulevard Walk",
      location: "East Wing, Ground Floor",
      size: "120 sqm",
      traffic: "Premium Traffic",
      category: "Luxury Goods",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070"
    },
    {
      id: 3,
      name: "F&B Terrace Space",
      mall: "North Gate Center",
      location: "Rooftop Terrace",
      size: "240 sqm",
      traffic: "Evening Peak",
      category: "Restaurant / Cafe",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <RetailHero primaryColor={primaryColor} />
      <RetailCategories primaryColor={primaryColor} categories={categories} />
      <RetailGrid primaryColor={primaryColor} units={retailUnits} />
      <RetailStatsCTA primaryColor={primaryColor} />
    </div>
  );
}