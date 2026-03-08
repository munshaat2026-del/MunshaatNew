import { Prisma } from "@/app/generated/prisma/client";
import { addNewRealEstates } from "@/app/server/real_estates/services";
import prisma from "@/lib/prisma";

export async function test() {
  try {
    const newEstate: Prisma.real_estatesCreateInput = {
  slug: "office-101",
  name_en: "Office 101",
  name_ar: "مكتب 101",
  description_en: "Test office",
  description_ar: "مكتب تجريبي",
  real_estates_type: "office",
  price: 1000,
  price_period: "monthly",
  address_en: "123 Main St",
  address_ar: "١٢٣ شارع الرئيسي",
  size_sqm: 50,
  features_en: ["parking", "maid_room"],
  features_ar:["parking", "maid_room"],
  cover_image: "https://img.freepik.com/free-photo/empty-room-with-chairs-desks_23-2149008873.jpg?semt=ais_rp_50_assets&w=740&q=80",
};

const images = [
  { image_url: "https://img.freepik.com/free-photo/empty-room-with-chairs-desks_23-2149008873.jpg?semt=ais_rp_50_assets&w=740&q=80" },
  { image_url: "https://img.freepik.com/free-photo/empty-room-with-chairs-desks_23-2149008873.jpg?semt=ais_rp_50_assets&w=740&q=80" },
  { image_url: "https://img.freepik.com/free-photo/empty-room-with-chairs-desks_23-2149008873.jpg?semt=ais_rp_50_assets&w=740&q=80" },
  { image_url: "https://img.freepik.com/free-photo/empty-room-with-chairs-desks_23-2149008873.jpg?semt=ais_rp_50_assets&w=740&q=80" },
  { image_url: "https://img.freepik.com/free-photo/empty-room-with-chairs-desks_23-2149008873.jpg?semt=ais_rp_50_assets&w=740&q=80" },
  { image_url: "https://img.freepik.com/free-photo/empty-room-with-chairs-desks_23-2149008873.jpg?semt=ais_rp_50_assets&w=740&q=80" }
];

const response = await addNewRealEstates(newEstate, images);
console.log(response);
  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    await prisma.$disconnect();
  }
}

;