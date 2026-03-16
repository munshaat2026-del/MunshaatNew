
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

export const jordanCities = (isArabic: boolean) => [
  { label: isArabic ? "عمان" : "Amman", value: "Amman" },
  { label: isArabic ? "إربد" : "Irbid", value: "Irbid" },
  { label: isArabic ? "الزرقاء" : "Zarqa", value: "Zarqa" },
  { label: isArabic ? "العقبة" : "Aqaba", value: "Aqaba" },
  { label: isArabic ? "المفرق" : "Mafraq", value: "Mafraq" },
  { label: isArabic ? "مادبا" : "Madaba", value: "Madaba" },
  { label: isArabic ? "جرش" : "Jerash", value: "Jerash" },
  { label: isArabic ? "عجلون" : "Ajloun", value: "Ajloun" },
  { label: isArabic ? "الكرك" : "Karak", value: "Karak" },
  { label: isArabic ? "الطفيلة" : "Tafilah", value: "Tafilah" },
  { label: isArabic ? "معان" : "Ma'an", value: "Ma'an" },
  { label: isArabic ? "البلقاء" : "Balqa", value: "Balqa" },
];
export const maritalStatusOptions = (isArabic: boolean) => [
  { label: isArabic ? "أعزب" : "Single", value: "single" },
  { label: isArabic ? "متزوج" : "Married", value: "married" },
  { label: isArabic ? "مطلق" : "Divorced", value: "divorced" },
  { label: isArabic ? "أرمل" : "Widowed", value: "widowed" },
];


