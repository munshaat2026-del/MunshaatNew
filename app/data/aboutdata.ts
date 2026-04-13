

  const address= process.env.NEXT_PUBLIC_ADDRESS_LINE_EN
const phoneNumber= process.env.NEXT_PUBLIC_PHONE
const emailAddress= process.env.NEXT_PUBLIC_EMAIL
const arabicAddress= process.env.NEXT_PUBLIC_ADDRESS_LINE_AR
export const aboutdata = {
  en: {
    aboutHero: {
      tag: "Our Identity",
      titleLine1: "About",
      titleLine2: "Us",
      description:
        "Al Munsha’at and Commercial Complexes Company is the real estate arm of the Jordanian Government, specializing in the management and investment of commercial and administrative assets in line with professional standards and national policies to maximize asset value and ensure long-term financial sustainability.",
      est: "HQ Amman",
      overlayTag: "Institutional \n Standards",
      precisionLabel: "Operational Precision",
    },
    coreValues: {
      tag: "Strategic DNA",
      titleLine1: "FOUNDATIONS OF",
      titleLine2: "EXCELLENCE",
      desc: "Architecting the future of asset management in Jordan.",
      protocol: "PROTOCOL_0",
      items: [
        {
          t: "The Mission",
          d: "To provide real estate investment solutions to the Jordanian market through highly experienced teams, relying on the best sound administrative standards.",
        },
        {
          t: "The Vision",
          d: "To be the first choice for clients in the real estate sector by delivering distinguished and innovative services.",
        },
        {
          t: "Our Value",
          d: "Professionalism, transparency, innovation, and commitment.",
        },
      ],
    },
    /////////////////////////////////////
    portfolio: {
      tag: "Portfolio Protocol",
      titleLine1: "FEATURED",
      titleLine2: "STRUCTURES",
      analyze: "Analyze Asset",
      tier: "Institutional Class-A",
      indicator: "Structural.Analysis.2026",
      assets: [
        {
          id: "01",
          title: "SHABSOGH",
          subtitle: "OFFICE COMPLEX",
          image:
            "https://images.squarespace-cdn.com/content/v1/5671433fc647ad9f55531f40/1531828884031-IKM5XB9CY03X6Z8TQH38/IMG_0405.JPG?format=2500w",
          offset: "md:-translate-y-16",
        },
        {
          id: "02",
          title: "ALBURG",
          subtitle: "RETAIL BUILDING",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Tower_in_Amman%2C_Jordan.jpg/500px-Tower_in_Amman%2C_Jordan.jpg",
          offset: "md:translate-y-16",
        },
      ],
    },
    impact: {
      tag: "Performance Metrics",
      titleLine1: "OUR",
      titleLine2: "IMPACT",
      heritageTag: "Institutional Heritage",
      heritageDesc:
        "Established as a strategic response to the growing need for institutional-grade asset management in the Kingdom, we have evolved into a full-scale operational partner for Vision 2030 initiatives.",
      cta: "Download Company Profile",
      fileInfo: "* PDF Format // 12.4 MB Revision 2026",
      stats: [
        ["12+", "Years of Service"],
        ["200+", "Expert Staff"],
        ["500k", "Square Meters"],
        ["15+", "Prime Assets"],
      ],
    },
    //////////////////////////////////////
    quoteSection: {
      tag: "Board Statement",
      textPart1: "At ",
      brand: "Reeac",
      textPart2: ", we engineer the environments where Jordan’s ",
      highlight: "future",
      textPart3: " grows.",
      signature: "The Board of Directors",
      subSignature: "Reeac Operations Group // Amman HQ",
      stamp: "Operational \n Excellence \n Verified 2026",
      bgText: "Reeac",
    },
    ////////////////////////////////
    teamSection: {
      titlePart1: "Senior Management",
      titlePart2: "Excellence",
      tag: "[ The Core Management Team ]",
      members: [
        { name: "Ahmed Al-Saud", role: "Executive Director" },
        { name: "Sarah Johnson", role: "Operations Head" },
        { name: "Khalid Mansour", role: "Technical Lead" },
        { name: "Omar Bakri", role: "Strategy Director" },
      ],
    },
    /////////////////////////////////////////////////////////
    contact: {
      header: {
        tag: "Direct Communication",
        title1: "LET'S",
        title2: "CONNECT",
      },

      headquarters: {
        title1: "Operational",
        title2: "Headquarters",
      },

      info: [
        {
          key: "address",
          label: "Address",
          value: address,
        },
        {
          key: "phone",
          label: "Phone Number",
          value: phoneNumber,
        },
        {
          key: "email",
          label: "Email",
          value: emailAddress,
        },
      ],

      hours: {
        title: "Operating Hours",
        rows: [
          { day: "Sun - Thu", time: "08:00 - 18:00" },
          { day: "Friday", time: "Closed", alert: true },
          { day: "Saturday", time: "Support Only" },
        ],
      },

      form: {
        fullName: "Full Name",
        company: "Company",
        email: "Business Email",
        subject: "Subject",
        message: "Message Protocol",
        submit: "Send Email",

        placeholders: {
          name: "IDENTITY",
          company: "ORGANIZATION",
          email: "OFFICIAL EMAIL",
        },

        departments: [
          "ASSET MANAGEMENT",
          "LEASING INQUIRIES",
          "PARKING SERVICES",
        ],
      },

      globalPresence: "Global Presence",
    },
  },
  ar: {
    aboutHero: {
      tag: "هويتنا",
      titleLine1: "من",
      titleLine2: "نحن",
      description:
        "تُعد شركة المنشآت والمجمعات العقارية الذراع العقاري للحكومة الأردنية، حيث تختص بإدارة واستثمار الأصول العقارية ذات الطابع التجاري والإداري وفق أسس مهنية ومؤسسية، وبما ينسجم مع السياسات الوطنية لتعظيم قيمة الأصول وتحقيق الاستدامة المالية.",
      est: " المقر الرئيسي عمان",
      overlayTag: "معايير \n مؤسسية",
      precisionLabel: "الدقة التشغيلية",
    },
    coreValues: {
      tag: "الحمض النووي الاستراتيجي",
      titleLine1: "أسس",
      titleLine2: "التميز",
      desc: "بناء مستقبل إدارة الأصول في المملكة الأردنية الهاشمية.",
      protocol: "بروتوكول_0",
      items: [
        {
          t: "الرسالة",
          d: `تقديم حلول استثمارية عقارية للسوق العقاري الاردني من خلال طواقم ذات خبرة عاليه وبالإعتماد على افضل المعايير الإدارية السليمة `,
        },
        {
          t: "الرؤية",
          d: `الخيار الاول للعملاء في مجال العقارات من خلال تقديم خدمات متميزة ومبتكرة .`,
        },
        {
          t: "القيم",
          d: "تتمثل بالاحترافيه والشفافيه والابتكار والالتزام .",
        },
      ],
    },
    ///////////////////////////////////////////
    portfolio: {
      tag: "بروتوكول المشاريع",
      titleLine1: "أبرز",
      titleLine2: "المنشآت",
      analyze: "تحليل الأصل",
      tier: "فئة مؤسسية (Class-A)",
      indicator: "تحليل.إنشائي.2026",
      assets: [
        {
          id: "01",
          title: "شابسوغ",
          subtitle: "مجمع مكاتب",
          image:
            "https://images.squarespace-cdn.com/content/v1/5671433fc647ad9f55531f40/1531828884031-IKM5XB9CY03X6Z8TQH38/IMG_0405.JPG?format=2500w",
          offset: "md:-translate-y-16",
        },
        {
          id: "02",
          title: "البرج",
          subtitle: "مبنى تجاري",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Tower_in_Amman%2C_Jordan.jpg/500px-Tower_in_Amman%2C_Jordan.jpg",
          offset: "md:translate-y-16",
        },
      ],
    },
    impact: {
      tag: "مقاييس الأداء",
      titleLine1: "أثرنا",
      titleLine2: "الملموس",
      heritageTag: "الإرث المؤسسي",
      heritageDesc:
        "تأسست Reeac كاستجابة استراتيجية للحاجة المتزايدة لإدارة الأصول على مستوى مؤسسي في المملكة، وتطورنا لنصبح شريكاً تشغيلياً كاملاً لمبادرات رؤية 2030.",
      cta: "تحميل ملف الشركة",
      fileInfo: "* صيغة PDF // ١٢.٤ ميجابايت تحديث ٢٠٢٦",
      stats: [
        ["+١٢", "سنة من الخدمة"],
        ["+٢٠٠", "خبير مختص"],
        ["٥٠٠ ألف", "متر مربع"],
        ["+١٥", "أصل عقاري"],
      ],
    },
    ////////////////////////////////////////////////
    quoteSection: {
      tag: "بيان مجلس الإدارة",
      textPart1: "في ",
      brand: "Reeac",
      textPart2: "، نحن نهندس البيئات التي ينمو فيها ",
      highlight: "مستقبل",
      textPart3: "المملكة الأردنية الهاشمية. ",
      signature: "مجلس الإدارة",
      subSignature: "مجموعة Reeac التشغيلية // المقر الرئيسي عمان",
      stamp: "التميز \n التشغيلي \n معتمد 2026",
      bgText: "رياك",
    },
    /////////////////////////////////////////
    teamSection: {
      titlePart1: "الإدارة العليا",
      titlePart2: "والتميز",
      tag: "[ فريق الإدارة العليا ]",
      members: [
        { name: "أحمد آل سعود", role: "المدير التنفيذي" },
        { name: "سارة جونسون", role: "رئيسة العمليات" },
        { name: "خالد منصور", role: "القائد التقني" },
        { name: "عمر بكري", role: "مدير الاستراتيجية" },
      ],
    },
    ///////////////////////////////////////////////////////
    contact: {
      header: {
        tag: "اتصال مباشر",
        title1: "دعنا",
        title2: "نتواصل",
      },

      headquarters: {
        title1: "المقر",
        title2: "العملياتي",
      },

      info: [
        {
          key: "address",
          label: "العنوان",
          value: arabicAddress,
        },
        {
          key: "phone",
          label:"رقم الهاتف",
          value: phoneNumber,
        },
        {
          key: "email",
          label: "البريد الإلكتروني",
          value: emailAddress,
        },
      ],

      hours: {
        title: "ساعات العمل",
        rows: [
          { day: "الأحد - الخميس", time: "08:00 - 18:00" },
          { day: "الجمعة", time: "مغلق", alert: true },
          { day: "السبت", time: "دعم فقط" },
        ],
      },

      form: {
        fullName: "الاسم الكامل",
        company: "الشركة",
        email: "البريد الإلكتروني",
        subject: "الموضوع",
        message: "نص الرسالة",
        submit: "إرسال البريد",

        placeholders: {
          name: "الاسم",
          company: "المنشأة",
          email: "البريد الرسمي",
        },

        departments: ["إدارة الأصول", "استفسارات التأجير", "خدمات المواقف"],
      },

      globalPresence: "التواجد العالمي",
    },
  },
};


export const directorStatement = {

  ar: {

    quoteSection: {

      tag: "كلمة الإدارة",

      headline: "كلمة المدير العام",

      paragraphs: [

        "يسعدني أن أرحب بكم في الموقع الإلكتروني لشركة المنشآت والمجمعات العقارية، والذي يأتي في إطار حرصنا على تعزيز التواصل مع شركائنا وجمهورنا، وتقديم خدماتنا بكل شفافية وكفاءة.",

        "تلتزم الشركة بتطوير وإدارة المجمعات العقارية وفق أسس مهنية حديثة، وبما يحقق أعلى مستويات الجودة في الأداء، ويواكب متطلبات التطور في بيئة العمل والخدمات.",

        "ونعمل باستمرار على تحسين إجراءاتنا وخدماتنا، بما يسهم في رفع كفاءة العمل وتعزيز رضا المتعاملين، انطلاقاً من مسؤوليتنا في تقديم خدمات متميزة ومستدامة.",

        "نرحب بكم، ونتطلع إلى خدمتكم وتلبية تطلعاتكم بكل اهتمام."

      ],

      name: "د. مروان محمود المعايطة",

      role: "المدير العام"

    }

  },

  en: {

    quoteSection: {

      tag: "Executive Statement",

      headline: "Leadership Statement",

      paragraphs: [

        "I am pleased to welcome you to the official website of the Real Estate and Commercial Complexes Company, which reflects our commitment to enhancing communication with our partners and the public, and to delivering our services with transparency and efficiency.",

        "The company is committed to developing and managing real estate complexes based on modern professional standards, achieving the highest levels of performance quality while keeping pace with evolving work environments and services.",

        "We continuously strive to improve our procedures and simplify our services in order to enhance operational efficiency and increase customer satisfaction, as part of our responsibility to provide distinguished and sustainable services.",

        "We welcome you and look forward to serving you and meeting your expectations with the utmost care."

      ],

      name: "Dr. Marwan Mahmoud Al-Ma'aytah",

      role: "General Manager"

    }

  }

};
