import { Prisma } from "@/app/generated/prisma/client";

export type translatedParkingsGetPayload = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  address: string;
  location_link: string | null;
  image: string | null;
  total_spots: number | null;
  price_monthly: number | null;
  price_yearly: number | null;
};

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
    name_ar: true;
    name_en: true;
    description_ar: true;
    description_en: true;
    address_ar: true;
    address_en: true;
    cover_image: true;
    floor_number: true;
    size_sqm: true;
  };
}>;
export type RealEstateWithImages = Prisma.real_estatesGetPayload<{
  include: {
    real_estates_images: true;
  };
}>;
export type TranslatedRaelEstate = {
  id: string;
  name: string;
  address: string;
  price: number | null;
  price_period: "monthly" | "yearly" | null;
  floor_number: number | null;
  size_sqm: number;
  slug: string;
  cover_image: string;
};

export type RealEstateGetPayloadPageTSX = Prisma.real_estatesGetPayload<{
  select: {
    id: true;
    name_en: true;
    name_ar: true;
    address_en: true;
    address_ar: true;
    size_sqm: true;
    price_period: true;
    floor_number: true;
    price: true;
    cover_image: true;
  };
}>;

export type TranlatedRealEstateById = {
  id: string;
  name: string;
  description: string;
  address: string;
  features: string[];
  price: number | null;
  price_period: "monthly" | "yearly" | null;
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
};

// Parkings Types
export type ParkingsCreateInput = Prisma.parkingsCreateInput;
export type parkingsUpdateInput = Prisma.parkingsUpdateInput;
export type ParkingsGetPayload = Prisma.parkingsGetPayload<{}>;
export type ParkingsGetPayloadPartially = Prisma.parkingsGetPayload<{
  select: {
    name_ar: true;
    name_en: true;
    description_ar: true;
    description_en: true;
    address_ar: true;
    address_en: true;
    image: true;
  };
}>;
export type TranslatedParkings= {
   id: string;
    slug: string;
    name: string;
    description: string | null;
    address: string;
    location_link: string | null;
    image: string | null;
    total_spots: number | null;
    price_monthly: number | null;
    price_yearly: number | null;
}

// Our Team Types
export type OurTeamCreateInput = Prisma.our_teamCreateInput;
export type OurTeamUpdateInput = Prisma.our_teamUpdateInput;
export type OurTeamGetPayload = Prisma.our_teamGetPayload<{}>;
export type TranslatedMembers= { id: string;
        name: string | null;
        position: string | null;
        image: string | null;
       }

// Clients Types
export type ClientsCreateInput = Prisma.clientsCreateInput;
export type ClientsUpdateInput = Prisma.clientsUpdateInput;
export type ClientsGetPayload = Prisma.clientsGetPayload<{}>;

//Real Estate Requests Types
export type RequestsCreateInput = Prisma.requestsCreateInput;
export type RequestsUpdateInput = Prisma.requestsUpdateInput;
export type RequestsGetPayload = Prisma.requestsGetPayload<{
  include: {
    real_estates: {
      select: {
        name_en: true;
      };
    };
  };
}>;
export type RequestsGetPayloadRealEstate = Prisma.requestsGetPayload<{
  include: {
    real_estates: true;
  };
}>;
export type RequestsGetPayloadOnly = Prisma.requestsGetPayload<{
  include: {};
}>;



// PArking Requests
export type ParkingsRequestsGetPayloadOnly =
  Prisma.parkings_requestsGetPayload<{
    include: {};
  }>;
export type RequestsGetPayloadParking = Prisma.parkings_requestsGetPayload<{
  include: {
    parkings: true;
  };
}>;

export type RequestsGetPayloadParkingNameAndId =
  Prisma.parkings_requestsGetPayload<{
    include: {
      parkings: { select: { name_en: true; id: true } };
    };
  }>;
export type ParkingRequestsCreateInput = Prisma.parkings_requestsCreateInput;
export type ParkingRequestsUpdateInput = Prisma.parkings_requestsUpdateInput;
export type ParkingRequestsGetPayload = Prisma.parkings_requestsGetPayload<{
  include: {
    parkings: {
      select: {
        name_en: true;
      };
    };
  };
}>;

// Tender Types
export type TenderCreateInput = Prisma.tenderCreateInput;
export type TenderUpdateInput = Prisma.tenderUpdateInput;
export type TenderGetPayload = Prisma.tenderGetPayload<{}>;
export type TranslatedTender= { id: string;
        name: string;
        description: string;
        slug: string;
        pdf_file: string | null;
        created_at: Date | null;
        opening_date: Date | null;
        closing_date: Date;}

// Coming soon types
export type ComingSoonCreateInput = Prisma.coming_soonCreateInput;
export type ComingSoonUpdateInput = Prisma.coming_soonUpdateInput;
export type ComingSoonGetPayload = Prisma.coming_soonGetPayload<{}>;
export type TranslatedComingSoon= {id: string;
    title: string;
    description: string;

    image: string;
    estimated_date: Date | null;
    completion_rate: number | null;}

// Careers types
export type CareersCreateInput = Prisma.careersCreateInput;
export type CareersUpdateInput = Prisma.careersUpdateInput;
export type CareersGetPayload = Prisma.careersGetPayload<{}>;
export type TransalatedCareer={id: string;
        position: string;
        description: string;
        image: string;
        requirements: string[];
        role: string | null;
        experience: string | null;
        slug: string;}

// Applications Types
export type ApplicationCreateInput = Prisma.applicationsCreateInput;
export type ApplicationUpdateInput = Prisma.applicationsUpdateInput;
export type ApplicationGetPayload = Prisma.applicationsGetPayload<{}>;
export type ApplicationGetPayloadWithCareer = Prisma.applicationsGetPayload<{
  include:{careers:{select:{
    position_en:true,
    image:true
  }}}
}>;

