import type { WeddingConfig } from "@/types/wedding";

export const weddingConfig: WeddingConfig = {
  groom: {
    nameAr: "مُهَاب",
    nameEn: "Mohab",
    initialAr: "م",
    initialEn: "M",
  },

  bride: {
    nameAr: "مَرْوَة",
    nameEn: "Marwa",
    initialAr: "م",
    initialEn: "M",
  },
  date: {
    // Egypt is UTC+2 in December. The time (19:00) is a placeholder:
    // replace it with the real start time of the wedding.
    dateTimeISO: "2026-12-10T19:00:00+02:00",
    weekdayAr: "الخميس",
    dayLabel: "١٠",
    monthAr: "ديسمبر",
    year: "٢٠٢٦",
    numeric: "10 / 12 / 2026",
  },

   venue: {
    nameAr: "قاعة رويال",
    mapsUrl: "https://maps.app.goo.gl/swTQL3MFxt6oMjbv6",
  },
  invitation: {
    heroPhrase: "حكايةٌ كتبها القدر بحبر المودة، وتكتمل بدعواتكم",

    invitationTitle: "بقلوبٍ يملؤها الفرح",

    paragraphs: [
      "في العمر لحظاتٌ لا تكتمل إلا بوجود من نحب، ويوم زفافنا واحدٌ من أجمل تلك اللحظات.",
      "بعد رحلةٍ من الود والتفاهم، قررنا أن نبدأ معاً فصلاً جديداً من الحكاية: بيتاً عمادُه المحبة، وسقفُه السكينة.",
      "ويسعدنا أن تكونوا شهوداً على فرحتنا، وأن تشاركونا ليلةً نحفظها في القلب عمراً، فحضوركم أجمل ما يزيّن هذا اليوم.",
    ],

    closingMessage:
      "شكراً لأنكم جزءٌ من حكايتنا. دعواتكم ومحبتكم أجمل هدية، ونتمنى أن نراكم بيننا في ليلة العمر.",
  },

  // All times below are placeholders. Replace them with the real schedule.
  timeline: [
    {
      id: "arrival",
      time: "٧:٠٠ م",
      title: "استقبال الضيوف",
      description: "نرحّب بكم ونبدأ الليلة بابتسامة وأجواء دافئة.",
      icon: "arrival",
    },
    {
      id: "ceremony",
      time: "٨:٠٠ م",
      title: "دخول العروسين",
      description: "لحظة الدخول التي ننتظرها بكل شغف.",
      icon: "ceremony",
    },
    {
      id: "photos",
      time: "٨:٣٠ م",
      title: "صور تذكارية",
      description: "نلتقط معكم صوراً تبقى ذكرى جميلة لسنين.",
      icon: "photos",
    },
    {
      id: "dance",
      time: "٩:٠٠ م",
      title: "الفرحة والرقص",
      description: "ونختم الليلة بالبهجة والموسيقى.",
      icon: "dance",
    },
  ],

  share: {
    message:
      "يسعدنا دعوتكم لحضور حفل زفاف مُهَاب ومَرْوَة 💍\nالخميس ١٠ ديسمبر ٢٠٢٦ - قاعة رويال",
  },

  music: {
    enabled: true,
    src: "/audio/wedding-music.mp3",
  },

  credit: {
    label: "صُمّمت هذه الدعوة بحبّ بواسطة",
    name: "م. أحمد عصام",
    relation: "مهندس برمجيات ومصمم واجهات المستخدم",
    links: [
      {
        id: "facebook",
        label: "فيسبوك",
        url: "https://www.facebook.com/share/1H49jNy5bS/",
      },
      {
        id: "whatsapp",
        label: "واتساب",
        url: "https://wa.me/201557209799",
      },
      {
        id: "github",
        label: "جيت هاب",
        url: "https://github.com/AhmedHabash",
      },
    ],
  },
};
