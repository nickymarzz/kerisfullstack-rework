import React from "react";
import { Link, NavLink } from "react-router-dom";
import bgImg from "../assets/img/hero-bg1.jpg";

const faqs = [
  {
    question: "What is KERIS?",
    answer:
      "Standing for 'Kelantan Resources Initiative for Students', KERIS is a student-led organization that aims to help Kelantan students in their academic journey post-SPM, providing assistance for them to get scholarships and help them have a clear pathway to pursue their studies.",
  },
  {
    question: "What is our aim?",
    answer:
      "KERIS is playing a vital role in empowering Kelantan students and contributing to their educational and professional development. We will put our efforts to support students in their academic journey.",
  },
  {
    question: "What can I expect?",
    answer:
      "Students engage with KERIS can expect a range of benefits and support to aid them in their academic journey. They can expect comprehensive support, guidance, and resources to help them succeed academically and prepare for their future endeavors.",
  },
];

const Home = () => {
  return (
    <div>
      {/* HERO Section with Parallax Background */}
      <section id="hero" className="w-full">
        <header
          className="relative min-h-[85vh] flex items-center justify-center text-center text-white py-20 px-4"
          style={{
            backgroundImage: `url(${bgImg})`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Background overlay - covers background image */}
          <div className="absolute inset-0 bg-white/80"></div>

          {/* Content container - relative positioning brings it above the overlay */}
          <div className="relative z-10 p-6 sm:p-10 rounded-2xl max-w-2xl mx-auto flex flex-col items-center">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[--color-primary] font-black tracking-tight">
              KERIS
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-[--color-dark] mt-4 font-bold">
              For <span className="text-[--color-primary]">scholars</span>, by{" "}
              <span className="text-[--color-primary]">scholars.</span>
            </p>

            {/* WELCOMING BUTTON */}
            <div className="mt-8">
              <a
                href="#resource"
                data-aos="fade-up"
                data-aos-delay="300"
                className="btn-get-started scrollto text-[--color-dark] inline-block shadow-md hover:shadow-lg"
              >
                View the new <b>Dashboard</b>!
              </a>
            </div>
          </div>
        </header>
      </section>

      {/* About Section */}
      <section id="about">
        <div className="min-h-screen px-10 sm:px-12 md:px-20 items-center justify-center text-center">
          <h1 className="py-16 text-[--color-light] font-bold text-4xl">
            <span className="pr-2 font-thin text-[--color-highlight]">— </span>
            ABOUT US
            <span className="pl-2 font-thin text-[--color-highlight]"> —</span>
          </h1>
          <div className="grid grid-cols-1 pb-16 md:pb-0 lg:grid-cols-2 gap-8 text-left">
            <div className="text-[--color-light]">
              <p className="text-xl">
                KERIS is an illustrious and visionary student-led organization
                that ardently endeavors to empower and uplift the aspiring
                scholars of Kelantan in their formidable academic odyssey
                post-SPM. With an unwavering commitment, we extend a benevolent
                hand to guide and nurture these bright minds, facilitating their
                quest for erudition and scholarly pursuits. Through our
                tenacious efforts, we proffer invaluable aid, orchestrating a
                myriad of opportunities, including the procurement of
                prestigious scholarships, as well as elucidating a lucid
                trajectory, enabling them to embark upon their educational
                endeavors with unwavering confidence and clarity.
              </p>
            </div>
            <div className="text-[--color-light]">
              <p className="text-3xl font-semibold">
              We firmly believe that everyone deserves equal opportunity 
              and support to pursue scholarship applications, 
              regardless of their upbringing.
              </p>
              <p className="text-xl my-4">We provide guidance on:</p>
              <ul>
                <li className="py-1">* CV Building</li>
                <li className="py-1">* Essay Writing</li>
                <li className="py-1">* Acing Interviews</li>
                <li className="py-1">* and more!</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Section */}
      <section id="resource">
        <div className="px-10 pt-16 sm:px-12 md:px-16 pb-16 bg-white items-center justify-center text-center">
          <h1 className="text-[--color-dark] font-bold text-4xl">
            <span className="pr-2 font-thin text-[--color-highlight]">— </span>
            RESOURCES
            <span className="pl-2 font-thin text-[--color-highlight]"> —</span>
          </h1>
          <p className="text-xl mt-4">
            Specially curated by the 2025 Team, here are resources to equip you
            with all you need to secure a post-secondary scholarship!
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <NavLink to="/scholarship">
              <a className="flex items-center p-4 bg-gray-100 hover:bg-gray-50 rounded-lg shadow">
                <div className="p-3 bg-gray-200 rounded-md">
                  <span className="text-red-500 text-2xl cursor-pointer">
                    📖
                  </span>
                </div>
                <div className="ml-4 text-left">
                  <h3 className="text-lg text-[--color-dark] font-semibold">
                    Scholarship Dashboard
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Intro to navigating the scholarship available.
                  </p>
                </div>
              </a>
            </NavLink>

            <NavLink to="/scholar">
              <a className="flex items-center p-4 bg-gray-100 hover:bg-gray-50 rounded-lg shadow">
                <div className="p-3 bg-gray-200 rounded-md">
                  <span className="text-red-500 text-2xl cursor-pointer">
                    👥
                  </span>
                </div>
                <div className="ml-4 text-left">
                  <h3 className="text-lg text-[--color-dark] font-semibold">
                    Scholars Dashboard
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Meet some of our prestigious scholars from Kelantan!
                  </p>
                </div>
              </a>
            </NavLink>

            <a className="flex items-center p-4 bg-gray-100 hover:bg-gray-50 rounded-lg shadow" 
            href="https://drive.google.com/drive/folders/1nEYxi9TDSJqKcg304CggB9o2FfurIg_l?usp=sharing" 
            target="_blank" rel="noopener noreferrer">
                <div className="p-3 bg-gray-200 rounded-md">
                  <span className="text-red-500 text-2xl cursor-pointer">
                    ☁️
                  </span>
                </div>
                <div className="ml-4 text-left">
                  <h3 className="text-lg text-[--color-dark] font-semibold">
                    Essay Repository
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Your ultimate archive of successful scholarship essays.
                  </p>
                </div>
            </a>
            
            <a className="flex items-center p-4 bg-gray-100 hover:bg-gray-50 rounded-lg shadow" 
            href="https://drive.google.com/drive/folders/1qlGAclESRxLpnt5gZbZzXYVkyayEuLfb?usp=sharing" 
            target="_blank" rel="noopener noreferrer">
                <div className="p-3 bg-gray-200 rounded-md">
                  <span className="text-red-500 text-2xl cursor-pointer">
                    📄
                  </span>
                </div>
                <div className="ml-4 text-left">
                  <h3 className="text-lg text-[--color-dark] font-semibold">
                    Resume Template
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Your go-to hub for standout resume templates that get noticed.
                  </p>
                </div>
            </a>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq">
        <div className="px-10 pt-16 sm:px-12 md:px-16 bg-white items-center justify-center">
          <h1 className="text-[--color-dark] font-bold text-4xl text-center">
            <span className="pr-2 font-thin text-[--color-highlight]">— </span>
            FAQ
            <span className="pl-2 font-thin text-[--color-highlight]"> —</span>
          </h1>
          <div className="mt-4">
            {faqs.map((faq, index) => (
              <div key={index} className="py-10 border-b border-gray-200 flex">
                <span className="text-yellow-500 text-2xl">🚀</span>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <h3 className="text-2xl text-gray-700 font-semibold ml-4">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 text-md mt-1">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact">
        <div className="px-10 pt-16 sm:px-12 md:px-16 py-16 bg-white items-center justify-center">
          <h1 className="text-[--color-dark] font-bold text-4xl text-center">
            <span className="pr-2 font-thin text-[--color-highlight]">— </span>
            CONTACT US
            <span className="pl-2 font-thin text-[--color-highlight]"> —</span>
          </h1>

        <div className="grid mt-12 gap-6 md:grid-cols-3 text-center">
        <div>
          <h3 className="text-3xl font-semibold">Instagram</h3>
          <p className="text-gray-600 text-lg">The latest updates, pictures and stories are all shot here!</p>
          <a href="https://www.instagram.com/kerismy/" target="_blank" className="flex hover:underline items-center justify-center mt-2 text-gray-700">
            <span className="ml-2 text-lg">@kerismy</span>
          </a>
        </div>
        <div>
          <h3 className="text-3xl font-semibold">Tiktok</h3>
          <p className="text-gray-600 text-lg">Funny videos and information about scholarships are all posted here!</p>
          <a href="https://www.tiktok.com/@keris.my" target="_blank" className="flex hover:underline items-center justify-center mt-2 text-gray-700">
            <span className="ml-2">@keris.my</span>
          </a>
        </div>
        <div>
          <h3 className="text-3xl font-semibold">Email</h3>
          <p className="text-gray-600 text-lg">For more information or any concerns, don't hesitate to contact us!</p>
          <a href="mailto:kerisinitiative@gmail.com" className="flex hover:underline items-center justify-center mt-2 text-gray-700">
            <span className="ml-2">kerisinitiative@gmail.com</span>
          </a>
        </div>
        <div>
          <h3 className="text-3xl font-semibold">YouTube</h3>
          <p className="text-gray-600 text-lg">Watch our inspiring scholarship stories, interviews, and educational content!</p>
          <a href="https://youtube.com/@keris-my?si=TxFBbSaTybgzhWql" target="_blank" className="flex hover:underline items-center justify-center mt-2 text-gray-700">
            <span className="ml-2">@kerismy</span>
          </a>
        </div>
        <div>
          <h3 className="text-3xl font-semibold">LinkedIn</h3>
          <p className="text-gray-600 text-lg">Connect with us professionally and explore our impact in the education community!</p>
          <a href="https://www.linkedin.com/company/keris-my/" target="_blank" className="flex hover:underline items-center justify-center mt-2 text-gray-700">
            <span className="ml-2">Keris Initiative</span>
          </a>
        </div>
        <div>
          <h3 className="text-3xl font-semibold">Telegram</h3>
          <p className="text-gray-600 text-lg">Join our channel for instant scholarship updates and exclusive opportunities!</p>
          <a href="https://t.me/keris2023" target="_blank" className="flex hover:underline items-center justify-center mt-2 text-gray-700">
            <span className="ml-2">keris2023</span>
          </a>
        </div>

        </div>          
        </div>
      </section>
    </div>
  );
};

export default Home;
