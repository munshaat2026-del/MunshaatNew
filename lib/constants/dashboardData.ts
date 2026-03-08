
export const realEstateOptions = [
  { label: "Office", value: "office" },
  { label: "Depot", value: "depot" },
  { label: "Store", value: "store" },
];

export const pricePeriodOptions= [
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
 ]

 export const planOptions = (isArabic: boolean) => [
  { label: isArabic ? "شهري" : "Monthly", value: "monthly" },
  { label: isArabic ? "سنوي" : "Yearly", value: "yearly" },
];


