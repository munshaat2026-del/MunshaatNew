export const parkingdata = {
  en: {
    parkingHero: {
      statusLabel: "Facility Status",
      statusValue: "Live // 98% Occupied",
      assetRef: "Asset Ref",
      assetCode: "KSA_RIY_PRK_092",
      badge: "Smart Access Protocol Active",
      titleLine1: "SEAMLESS",
      titleLine2: "MOBILITY.",
      desc: "High-security parking solutions for individuals and corporate fleets. Optimizing the urban flow of Riyadh's prime districts.",
      ctaPrimary: "Reserve Space",
      ctaSecondary: "Corporate Contracts"
    },
    ///////////////////////////////////
    parkingFeatures: {
      meta: "Infrastructure Specs // Area P-01",
      sysPrefix: "SYS_0",
      footnote: "All systems integrated via REEAC Central Hub",
      coordinates: ["LAT: 24.7136", "LON: 46.6753"],
      items: [
        {
          title: "ANPR Access",
          desc: "License plate recognition for hands-free entry.",
        },
        {
          title: "24/7 Security",
          desc: "Thermal imaging and round-the-clock patrol.",
        },
        {
          title: "EV Stations",
          desc: "High-speed charging bays for electric vehicles.",
        },
        {
          title: "Easy Billing",
          desc: "Automated monthly invoicing and digital payments.",
        },
      ]
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
      titleLine2: "RIYADH HUBS.",
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
      statusLabel: "حالة المرفق",
      statusValue: "مباشر // إشغال 98%",
      assetRef: "مرجع الأصل",
      assetCode: "KSA_RIY_PRK_092",
      badge: "بروتوكول الوصول الذكي نشط",
      titleLine1: "حركة",
      titleLine2: "انسيابية.",
      desc: "حلول مواقف سيارات عالية الأمان للأفراد وأساطيل الشركات. تحسين التدفق الحضري في المناطق الحيوية بالرياض.",
      ctaPrimary: "احجز مساحتك",
      ctaSecondary: "عقود الشركات"
    },
    ////////////////////////////////////////
    parkingFeatures: {
      meta: "مواصفات البنية التحتية // منطقة P-01",
      sysPrefix: "نظام_٠",
      footnote: "جميع الأنظمة مرتبطة عبر مركز REEAC الموحد",
      coordinates: ["خط عرض: ٢٤.٧١٣٦", "خط طول: ٤٦.٦٧٥٣"],
      items: [
        {
          title: "دخول ذكي (ANPR)",
          desc: "التعرف التلقائي على لوحات المركبات لدخول سلس.",
        },
        {
          title: "أمن على مدار الساعة",
          desc: "تصوير حراري ودوريات أمنية متواصلة.",
        },
        {
          title: "محطات شحن (EV)",
          desc: "نقاط شحن فائقة السرعة للسيارات الكهربائية.",
        },
        {
          title: "فوترة ميسرة",
          desc: "فواتير شهرية مؤتمتة ومدفوعات رقمية.",
        },
      ]
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
      titleLine2: "الرياض الاستراتيجية.",
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