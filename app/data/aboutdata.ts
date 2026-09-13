const address = process.env.NEXT_PUBLIC_ADDRESS_LINE_EN;
const phoneNumber = process.env.NEXT_PUBLIC_PHONE;
const emailAddress = process.env.NEXT_PUBLIC_EMAIL;
const arabicAddress = process.env.NEXT_PUBLIC_ADDRESS_LINE_AR;
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
          d: `Providing comprehensive and reliable real estate solutions and services that meet clients’ needs and contribute to achieving their aspirations, by leveraging specialized expertise and competencies and applying the highest standards of quality and professionalism throughout all stages of our work.

We also strive to provide flexible and efficient spaces and services, with a strong focus on the customer experience and delivering a high level of service, while building sustainable relationships with clients and partners based on trust and mutual respect.`,
        },

        {
          t: "The Vision",
          d: `To be one of the leading and preferred real estate companies among clients in the Jordanian market, distinguished by providing innovative and flexible real estate solutions that align with market needs and clients’ aspirations.

We aspire to expand the scope of our business and continuously develop our projects and services, while maintaining high standards of quality and professionalism, thereby strengthening the company’s position and achieving sustainable long-term growth.`,
        },

        {
          t: "Our Values",
          d: `Our values form the foundation upon which we manage our business and build our relationships with clients and partners. We are committed to reflecting these values in all our interactions and decisions.`,

          points: [
            {
              label: "Professionalism",
              text: "We are committed to applying best professional practices and delivering services with a high level of efficiency and quality.",
            },
            {
              label: "Transparency",
              text: "We ensure clarity and credibility in our dealings and build our relationships on trust and mutual respect.",
            },
            {
              label: "Quality",
              text: "We continuously work to enhance the quality of our services and facilities to meet and exceed our clients’ expectations.",
            },
          ],
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
      titlePart1: "Executive ",
      titlePart2: "Team",
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
        title1: "Your",
        title2: "Feedback",
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
          { day: "Saturday – Thursday", time: "8:00 AM – 4:00 PM" },
          { day: "Friday", time: "Closed", alert: true },
        ],
      },

      form: {
        fullName: "Full Name",
        company: "Company",
        email: "Business Email",
        subject: "Subject",
        message: "Message",
        submit: "Send Email",
        phoneNumber: "Phone Number ",

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
          d: `تقديم حلول وخدمات عقارية متكاملة وموثوقة تلبي احتياجات العملاء وتساهم في تحقيق تطلعاتهم، من خلال الاستفادة من الخبرات والكفاءات المتخصصة، وتطبيق أعلى معايير الجودة والاحترافية في مختلف مراحل العمل.

كما نعمل على توفير مساحات وخدمات تتميز بالمرونة والكفاءة، مع الاهتمام بتجربة العميل وتقديم مستوى عالٍ من الخدمة، وبناء علاقات مستدامة مع العملاء والشركاء تقوم على الثقة والاحترام المتبادل.`,
        },

        {
          t: "الرؤية",
          d: `أن نكون من الشركات العقارية الرائدة والمفضلة لدى العملاء في السوق الأردني، وأن نتميز بتقديم حلول عقارية مبتكرة ومرنة تتوافق مع احتياجات السوق وتطلعات العملاء.

ونطمح إلى توسيع نطاق أعمالنا وتطوير مشاريعنا وخدماتنا بصورة مستمرة، مع المحافظة على مستوى عالٍ من الجودة والاحترافية، بما يعزز مكانة الشركة ويحقق نمواً مستداماً على المدى الطويل.`,
        },

        {
          t: "القيم",
          d: `تشكل قيمنا الأساس الذي نعتمد عليه في إدارة أعمالنا وعلاقاتنا مع العملاء والشركاء، ونحرص على أن تنعكس هذه القيم في جميع تعاملاتنا وقراراتنا.`,

          points: [
            {
              label: "الاحترافية",
              text: "نلتزم بتطبيق أفضل الممارسات المهنية وتقديم خدمات بمستوى عالٍ من الكفاءة والجودة.",
            },
            {
              label: "الشفافية",
              text: "نحرص على الوضوح والمصداقية في تعاملاتنا، ونبني علاقاتنا على الثقة والاحترام المتبادل.",
            },
            {
              label: "الجودة",
              text: "نعمل باستمرار على تحسين مستوى خدماتنا ومرافقنا بما يلبي توقعات العملاء ويتجاوزها.",
            },
          ],
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
      titlePart1: "الإدارة",
      titlePart2: "التنفيذية",
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
        title1: "اقتراحاتكم",
        title2: "",
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
          label: "رقم الهاتف",
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
          { day: "السبت – الخميس", time: "8 صباحاً – 4 مساءً" },
          { day: "الجمعة", time: "مغلق", alert: true },
        ],
      },

      form: {
        fullName: "الاسم الكامل",
        company: "الشركة",
        email: "البريد الإلكتروني",
        subject: "الموضوع",
        phoneNumber: "رقم الهاتف",
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

        "نرحب بكم، ونتطلع إلى خدمتكم وتلبية تطلعاتكم بكل اهتمام.",
      ],

      name: "د. مروان محمود المعايطة",

      role: "المدير العام",
    },
  },

  en: {
    quoteSection: {
      tag: "Executive Statement",

      headline: "Leadership Statement",

      paragraphs: [
        "I am pleased to welcome you to the official website of the Real Estate and Commercial Complexes Company, which reflects our commitment to enhancing communication with our partners and the public, and to delivering our services with transparency and efficiency.",

        "The company is committed to developing and managing real estate complexes based on modern professional standards, achieving the highest levels of performance quality while keeping pace with evolving work environments and services.",

        "We continuously strive to improve our procedures and simplify our services in order to enhance operational efficiency and increase customer satisfaction, as part of our responsibility to provide distinguished and sustainable services.",

        "We welcome you and look forward to serving you and meeting your expectations with the utmost care.",
      ],

      name: "Dr. Marwan Mahmoud Al-Ma'aytah",

      role: "General Manager",
    },
  },
};
