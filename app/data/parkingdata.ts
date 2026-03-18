export const parkingdata = {
  en: {
   parkingHero: {
  statusLabel: "Parking Status",
  statusValue: "Available for Subscription",
  assetRef: "Location Code",
  assetCode: "PRK_001",
  badge: "Secure Access System",
  titleLine1: "SMART",
  titleLine2: "PARKING.",
  desc: "Secure and convenient parking spaces with flexible monthly and yearly subscription plans.",
  ctaPrimary: "Request Parking",
  ctaSecondary: "View Plans"
},
    ///////////////////////////////////
   parkingFeatures: {
  meta: "Parking Features",
  footnote: "Secure and convenient parking for monthly and yearly subscribers.",
  coordinates: [],
  items: [
    {
      title: "Secure Access",
      desc: "Controlled entry and exit to ensure only authorized vehicles can access the parking.",
    },
    {
      title: "24/7 Monitoring",
      desc: "Parking areas are monitored around the clock for safety and security.",
    },
    {
      title: "Reserved Parking",
      desc: "Guaranteed parking spaces for subscribers with flexible monthly or yearly plans.",
    },
    {
      title: "Easy Subscription",
      desc: "Simple application process with convenient monthly and yearly payment options.",
    },
  ],
},
    /////////////////////////////////////////////
    parkingPricing: {
      tag: "Rate Card 2026",
      titleLine1: "SUBSCRIPTION",
      titleLine2: "PROTOCOLS.",
      desc: "Select an operational tier optimized for individual mobility or corporate fleet management.",
      currency: "SAR",
      rateText: "Fixed Rate",
      perText: "per",
      cta: "Initialize Plan",
      popularTag: "Priority Tier",
      contractType: "Contract Type",
      footer: "* Terms of service and spatial regulations apply to all subscription tiers.",
      plans: [
        {
          name: "Standard Access",
          price: "450",
          period: "Monthly",
          features: ["Standard Bay Area", "24/7 CCTV Monitoring", "Mobile App Access", "General Maintenance"],
          isPopular: false,
        },
        {
          name: "Business Executive",
          price: "1,200",
          period: "Monthly",
          features: ["Dedicated Reserved Slot", "Underground Shaded Area", "EV Charging Access", "Priority Entry/Exit"],
          isPopular: true,
        },
        {
          name: "VIP Corporate",
          price: "10,000",
          period: "Yearly",
          features: ["Premium Basement Level", "Valet Service Included", "Multiple Vehicle Access", "Concierge Support"],
          isPopular: false,
        },
      ]
    },
    ////////////////////////////////////
    parkingLocations: {
      tag: "Regional Deployment",
      titleLine1: "STRATEGIC",
      titleLine2: "Amman HUBS.",
      loadFactor: "Load Factor",
      telemetryTag: "Live Telemetry",
      occupancyLabel: "Network Occupancy",
      planRef: "Master Plan Ref",
      planCode: "REEAC_INFRA_KSA_26",
      locations: [
        { name: "Olaya Financial District", code: "Z-01", status: "High" },
        { name: "King Fahd Road Central", code: "Z-02", status: "Medium" },
        { name: "Diplomatic Quarter Hub", code: "Z-03", status: "Low" },
        { name: "East Business Park", code: "Z-04", status: "High" },
      ]
    }
  },
  ar: {
    parkingHero: {
  statusLabel: "حالة المواقف",
  statusValue: "متاح للاشتراك",
  assetRef: "رمز الموقع",
  assetCode: "PRK_001",
  badge: "نظام دخول آمن",
  titleLine1: "مواقف",
  titleLine2: "ذكية.",
  desc: "مواقف سيارات آمنة ومريحة مع خطط اشتراك شهرية وسنوية مرنة.",
  ctaPrimary: "طلب موقف",
  ctaSecondary: "عرض الخطط"
},
    ////////////////////////////////////////
   parkingFeatures: {
  meta: "مميزات المواقف",
  footnote: "مواقف آمنة ومريحة للمشتركين بخطط شهرية وسنوية.",
  coordinates: [],
  items: [
    {
      title: "دخول آمن",
      desc: "تحكم كامل في الدخول والخروج لضمان وصول المركبات المصرح لها فقط.",
    },
    {
      title: "مراقبة 24/7",
      desc: "يتم مراقبة مواقف السيارات على مدار الساعة لضمان السلامة والأمان.",
    },
    {
      title: "موقف محجوز",
      desc: "مساحات مواقف مضمونة للمشتركين مع خطط شهرية وسنوية مرنة.",
    },
    {
      title: "اشتراك سهل",
      desc: "عملية تقديم بسيطة مع خيارات دفع شهرية وسنوية مريحة.",
    },
  ],
},
    ////////////////////////////////////////////
    parkingPricing: {
      tag: "بطاقة الأسعار ٢٠٢٦",
      titleLine1: "بروتوكولات",
      titleLine2: "الاشتراك.",
      desc: "اختر المستوى التشغيلي الأمثل للتنقل الفردي أو لإدارة أساطيل الشركات.",
      currency: "ر.س",
      rateText: "سعر ثابت",
      perText: "لكل",
      cta: "تفعيل الباقة",
      popularTag: "الفئة ذات الأولوية",
      contractType: "نوع العقد",
      footer: "* تطبق شروط الخدمة واللوائح المكانية على جميع فئات الاشتراك.",
      plans: [
        {
          name: "الدخول القياسي",
          price: "٤٥٠",
          period: "شهر",
          features: ["مساحة وقوف قياسية", "مراقبة CCTV على مدار الساعة", "وصول عبر تطبيق الهاتف", "صيانة عامة"],
          isPopular: false,
        },
        {
          name: "التنفيذي للأعمال",
          price: "١,٢٠٠",
          period: "شهر",
          features: ["موقف مخصص ومحجوز", "مساحة سفلية مظللة", "وصول لشحن السيارات الكهربائية", "أولوية الدخول والخروج"],
          isPopular: true,
        },
        {
          name: "الشركات (VIP)",
          price: "١٠,٠٠٠",
          period: "سنة",
          features: ["مستوى القبو الممتاز", "خدمة ركن السيارات (Valet)", "دخول مركبات متعددة", "دعم الكونسيرج الخاص"],
          isPopular: false,
        },
      ]
    },
    ///////////////////////////////////////////
    parkingLocations: {
      tag: "الانتشار الإقليمي",
      titleLine1: "مراكز",
      titleLine2: "عمان الاستراتيجية.",
      loadFactor: "معامل الإشغال",
      telemetryTag: "بث حي للمؤشرات",
      occupancyLabel: "إشغال الشبكة الكلي",
      planRef: "مرجع المخطط الرئيسي",
      planCode: "REEAC_INFRA_KSA_26",
      locations: [
        { name: "حي العليا المالي", code: "Z-01", status: "مرتفع" },
        { name: "وسط طريق الملك فهد", code: "Z-02", status: "متوسط" },
        { name: "مركز الحي الدبلوماسي", code: "Z-03", status: "منخفض" },
        { name: "مجمع الأعمال الشرقي", code: "Z-04", status: "مرتفع" },
      ]
    }
  }
};