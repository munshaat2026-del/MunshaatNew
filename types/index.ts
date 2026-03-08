import { Prisma, requests } from "@/app/generated/prisma/client";

export type NewUser = {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type LoginDetails = {
  email: string;
  password: string;
};

export type UserDetails = {
  id?: string;
  email: string;
  role: string;
  first_name: string;
};



export type MemberOrder = {
  id: string;
  display_order: number;
};

export type Locale = "en" | "ar";

// Real Estates Types
export type RealEstateCreateInput = Prisma.real_estatesCreateInput;
export type RealEstateUpdateInput = Prisma.real_estatesUpdateInput;
export type RealEstateGetPayloadPartially = Prisma.real_estatesGetPayload<{
  select: {
            name_ar: true,
            name_en: true,
            description_ar: true,
            description_en: true,
            address_ar: true,
            address_en: true,
            cover_image:true,
            floor_number:true,
            size_sqm:true

          },
}>;
export type RealEstateWithImages = Prisma.real_estatesGetPayload<{
  include: {
    real_estates_images: true;
  };
}>;
export type TranslatedRaelEstate={id: string;
        name: string;
        address: string;
        price: number | null;
        price_period:"monthly"| "yearly" |null
        floor_number: number | null;
        size_sqm: number;
        slug:string;
        cover_image: string;}

export type RealEstateGetPayloadPageTSX = Prisma.real_estatesGetPayload<{
  select: {
             id: true,
            name_en: true,
            name_ar: true,
            address_en: true,
            address_ar: true,
            size_sqm: true,
            price_period:true,
            floor_number: true,
            price:true,
            cover_image:true

          },
}>;


export type TranlatedRealEstateById= {
    id: string;
    name: string;
    description: string;
    address: string;
    features: string[];
    price: number | null;
    price_period: "monthly"| "yearly" | null;
    location_link: string | null;
    floor_number: number | null;
    slug: string;
    size_sqm: number;
    cover_image: string;
    real_estate_images: {
        id: string;
        created_at: Date | null;
        image_url: string | null;
        real_estates_id: string;
    }[];
}

// Parkings Types
export type ParkingsCreateInput = Prisma.parkingsCreateInput;
export type parkingsUpdateInput = Prisma.parkingsUpdateInput;
export type ParkingsGetPayload = Prisma.parkingsGetPayload<{}>;
export type ParkingsGetPayloadPartially = Prisma.parkingsGetPayload<{
  select: {
            name_ar: true,
            name_en: true,
            description_ar: true,
            description_en: true,
            address_ar: true,
            address_en: true,
            image: true,
            
          },
}>;

// Our Team Types
export type OurTeamCreateInput = Prisma.our_teamCreateInput;
export type OurTeamUpdateInput = Prisma.our_teamUpdateInput;
export type OurTeamGetPayload = Prisma.our_teamGetPayload<{}>;

// Clients Types
export type ClientsCreateInput = Prisma.clientsCreateInput;
export type ClientsUpdateInput = Prisma.clientsUpdateInput;
export type ClientsGetPayload = Prisma.clientsGetPayload<{}>;

// Requests Types
export type RequestsCreateInput = Prisma.requestsCreateInput;
export type RequestsUpdateInput = Prisma.requestsUpdateInput;
export type RequestsGetPayload = Prisma.requestsGetPayload<{
  include: {
    real_estates: {
      select: {
        name_en: true;
      };
    };
    parkings: {
      select: {
        name_en: true;
      };
    };
  };
}>;

export type RequestsGetPayloadOnly = Prisma.requestsGetPayload<{
  include: {};
}>;

export type RequestsGetPayloadRealEstate = Prisma.requestsGetPayload<{
  include: {
    real_estates: true;
  };
}>;

export type RequestsGetPayloadParking = Prisma.requestsGetPayload<{
  include: {
    parkings: true;
  };
}>;






