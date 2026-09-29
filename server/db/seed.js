import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const URL = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/kerisdb";

const scholarsData = [
  {
    name: "Nur Aisyah binti Razak",
    email: "aisyah.razak@example.com",
    ig_acc: "@aisyah.tech",
    about: "Final-year Computer Science scholar at Imperial College London specializing in Artificial Intelligence. Passionate about mentoring SPM and A-Level graduates through scholarship applications and technical interviews.",
    sponsor: "Yayasan Khazanah",
    major: ["Computer Science", "Artificial Intelligence"],
    institution: ["Imperial College London"],
    availability: true,
    image: null,
  },
  {
    name: "Muhammad Daniel bin Rosli",
    email: "daniel.rosli@example.com",
    ig_acc: "@daniel_eng",
    about: "Third-year Mechanical Engineering student at UTP with research experience in renewable energy and robotics. Available for guidance on STEM portfolio building and PESP assessment days.",
    sponsor: "PETRONAS",
    major: ["Mechanical Engineering", "Renewable Energy"],
    institution: ["Universiti Teknologi PETRONAS"],
    availability: true,
    image: null,
  },
  {
    name: "Sarah Tan Mei Ling",
    email: "sarah.tan@example.com",
    ig_acc: "@sarah_lse",
    about: "Economics and Data Science undergraduate at the London School of Economics (LSE). Interned in central banking macroeconomic research. Happy to review personal statements and essays.",
    sponsor: "Bank Negara Malaysia",
    major: ["Economics", "Data Science"],
    institution: ["London School of Economics"],
    availability: false,
    image: null,
  },
  {
    name: "Ahmad Farhan bin Zulkifli",
    email: "farhan.zul@example.com",
    ig_acc: "@farhandoc",
    about: "Fourth-year medical student at Universiti Malaya. Passionate about healthcare equity and eager to help aspiring doctors navigate the JPA scholarship process and MMI interviews.",
    sponsor: "JPA",
    major: ["Medicine", "Surgery"],
    institution: ["Universiti Malaya"],
    availability: true,
    image: null,
  },
  {
    name: "Kavitha a/p Subramaniam",
    email: "kavitha.s@example.com",
    ig_acc: "@kavitha_green",
    about: "Scholar researching Environmental Science and Sustainable Agriculture at UPM. Focuses on ESG sustainability frameworks, public speaking, and community outreach.",
    sponsor: "Yayasan Sime Darby",
    major: ["Environmental Science", "Agriculture"],
    institution: ["Universiti Putra Malaysia"],
    availability: true,
    image: null,
  },
  {
    name: "Jason Wong Jin Wei",
    email: "jason.wong@example.com",
    ig_acc: "@jasonwong_cam",
    about: "Electrical and Electronic Engineering scholar at the University of Cambridge. Deeply interested in semiconductor microarchitecture and quantum computing.",
    sponsor: "Shell Malaysia",
    major: ["Electrical Engineering", "Electronics"],
    institution: ["University of Cambridge"],
    availability: true,
    image: null,
  },
];

const sponsorsData = [
  {
    sponsor: "Yayasan Khazanah Global Scholarship",
    status: true,
    time_start: new Date("2026-03-01T00:00:00.000Z"),
    time_end: new Date("2026-04-30T23:59:59.000Z"),
    image: null,
    programs: ["Undergraduate", "Postgraduate", "A-Levels"],
    majors_offered: ["Computer Science", "Economics", "Engineering", "Law"],
    link: "https://www.yayasankhazanah.com.my",
    about: "The Yayasan Khazanah Global Scholarship is a flagship sponsorship programme designed to develop high-performing future leaders by supporting studies at premier world-class universities.",
  },
  {
    sponsor: "PETRONAS Education Sponsorship Programme (PESP)",
    status: true,
    time_start: new Date("2026-03-15T00:00:00.000Z"),
    time_end: new Date("2026-05-15T23:59:59.000Z"),
    image: null,
    programs: ["Foundation", "Undergraduate"],
    majors_offered: ["Chemical Engineering", "Mechanical Engineering", "Geoscience", "Data Analytics"],
    link: "https://educationsponsorship.petronas.com.my",
    about: "PESP offers comprehensive financial and developmental support to outstanding Malaysian youths to pursue undergraduate studies in STEM and business fields locally and globally.",
  },
  {
    sponsor: "Bank Negara Malaysia (BNM) Kijang Scholarship",
    status: true,
    time_start: new Date("2026-03-01T00:00:00.000Z"),
    time_end: new Date("2026-04-15T23:59:59.000Z"),
    image: null,
    programs: ["Pre-University", "Undergraduate"],
    majors_offered: ["Economics", "Finance", "Actuarial Science", "Computer Science"],
    link: "https://www.bnm.gov.my/careers/scholarships",
    about: "The Kijang Scholarship is awarded to top-tier academic achievers who demonstrate leadership and ambition in shaping the nation's financial and economic future.",
  },
  {
    sponsor: "JPA Program Penajaan Nasional (PPN)",
    status: false,
    time_start: new Date("2025-05-01T00:00:00.000Z"),
    time_end: new Date("2025-06-30T23:59:59.000Z"),
    image: null,
    programs: ["Degree", "Overseas Studies"],
    majors_offered: ["Medicine", "Dentistry", "Pharmacy", "Aerospace Engineering"],
    link: "https://esilav2.jpa.gov.my",
    about: "Prestigious sponsorship administered by Jabatan Perkhidmatan Awam (JPA) for Malaysia's highest SPM scorers to study at leading QS Top 20 international institutions.",
  },
  {
    sponsor: "Yayasan Sime Darby Scholarship Programme",
    status: true,
    time_start: new Date("2026-02-01T00:00:00.000Z"),
    time_end: new Date("2026-04-30T23:59:59.000Z"),
    image: null,
    programs: ["Undergraduate", "Diploma"],
    majors_offered: ["Business Studies", "Agriculture", "Computer Science", "Mechanical Engineering"],
    link: "https://www.yayasansimedarby.com",
    about: "YSD scholarships fund deserving students across various academic backgrounds, fostering future leaders passionate about education, environment, and community development.",
  },
  {
    sponsor: "Shell Malaysia Overseas & Local Scholarship",
    status: true,
    time_start: new Date("2026-03-10T00:00:00.000Z"),
    time_end: new Date("2026-05-10T23:59:59.000Z"),
    image: null,
    programs: ["Undergraduate"],
    majors_offered: ["Electrical Engineering", "Mechanical Engineering", "Finance", "Information Technology"],
    link: "https://www.shell.com.my/careers/students-and-graduates/scholarships.html",
    about: "Shell scholarships empower passionate engineering and science students with comprehensive financial assistance, summer internships, and structured career mentorship.",
  },
];

async function seed() {
  const client = new MongoClient(URL, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    console.log("Connected to MongoDB at:", URL.replace(/\/\/[^:]+:[^@]+@/, "//***:***@"));

    const db = client.db("kerisdb");

    // Clear existing sample records
    const scholarCollection = db.collection("scholar_table");
    const sponsorCollection = db.collection("sponsor_table");

    const deletedScholars = await scholarCollection.deleteMany({});
    const deletedSponsors = await sponsorCollection.deleteMany({});
    console.log(`Cleared previous records: ${deletedScholars.deletedCount} scholars, ${deletedSponsors.deletedCount} sponsors.`);

    // Insert new seed records
    const scholarResult = await scholarCollection.insertMany(scholarsData);
    console.log(`Successfully seeded ${scholarResult.insertedCount} scholars into 'scholar_table'.`);

    const sponsorResult = await sponsorCollection.insertMany(sponsorsData);
    console.log(`Successfully seeded ${sponsorResult.insertedCount} scholarships into 'sponsor_table'.`);

    console.log("\nDatabase seeding completed successfully!");
  } catch (err) {
    console.error("Error during database seeding:", err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seed();
