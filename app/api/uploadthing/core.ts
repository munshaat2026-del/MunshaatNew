import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  banners: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    console.log("Banner Upload Complete:", file.ufsUrl);
    return { uploadedUrl: file.ufsUrl };
  }),
  ourClients: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    console.log("Category Upload Complete:", file.ufsUrl);
    return { uploadedUrl: file.ufsUrl };
  }),
  ourTeam: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    console.log("Our Team Upload Complete:", file.ufsUrl);
    return { uploadedUrl: file.ufsUrl };
  }),

  realEstates: f({
    image: { maxFileSize: "16MB", maxFileCount: 8 },
  }).onUploadComplete(async ({ file }) => {
    console.log("Courses Upload Complete:", file.ufsUrl);
    return { uploadedUrl: file.ufsUrl };
  }),
  parkings: f({
    image: { maxFileSize: "2MB", maxFileCount: 2 },
  }).onUploadComplete(async ({ file }) => {
    console.log("Categories Upload Complete:", file.ufsUrl);
    return { uploadedUrl: file.ufsUrl };
  }),
  careers: f({
    image: { maxFileSize: "2MB", maxFileCount: 2 },
  }).onUploadComplete(async ({ file }) => {
    console.log("careers Upload Complete:", file.ufsUrl);
    return { uploadedUrl: file.ufsUrl };
  }),
  parkingRequest: f({
    image: { maxFileSize: "2MB", maxFileCount: 2 },
  }).onUploadComplete(async ({ file }) => {
    console.log("Projects Upload Complete:", file.ufsUrl);
    return { uploadedUrl: file.ufsUrl };
  }),
   tender: f({
    blob: { maxFileSize: "8MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    console.log("tender file Upload Complete:", file.ufsUrl);
    return { uploadedUrl: file.ufsUrl, fileName: file.name };
  }),
   cv: f({
    blob: { maxFileSize: "8MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    console.log("CV Upload Complete:", file.ufsUrl);
    return { uploadedUrl: file.ufsUrl, fileName: file.name };
  }),
 
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
