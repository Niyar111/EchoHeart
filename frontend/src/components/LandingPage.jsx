/*
Legacy Library - Landing Page (single-file React component)
Tech: React (Vite) + TailwindCSS + GSAP

Setup notes:
1. Create Vite React app: `npm create vite@latest my-app -- --template react`
2. Install deps: `npm install gsap` and setup Tailwind per docs.
3. Place this file in `src/components/LegacyLibraryLanding.jsx` and import into App.jsx

This component is self-contained for layout and animations.
*/

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LegacyLibraryLanding() {
  const heroRef = useRef(null);
  const featuresRef = useRef([]);
  const showcaseRef = useRef([]);
  const floatingRef = useRef([]);
  const [lang, setLang] = useState("en");

  useEffect(() => {
    // HERO ANIMATIONS
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", {
        duration: 0.9,
        y: 20,
        opacity: 0,
        ease: "power3.out",
      });

      gsap.from(".hero-sub", {
        duration: 1,
        y: 14,
        opacity: 0,
        delay: 0.12,
        ease: "power3.out",
      });

      gsap.from(".hero-cta", {
        duration: 0.6,
        scale: 0.95,
        opacity: 0,
        delay: 0.25,
        stagger: 0.08,
      });

      // floating icons subtle motion
      floatingRef.current.forEach((el, i) => {
        gsap.to(el, {
          y: (i % 2 === 0 ? -12 : 12),
          x: (i % 3 === 0 ? -8 : 8),
          repeat: -1,
          yoyo: true,
          duration: 4 + i * 0.6,
          ease: "sine.inOut",
        });
      });

      // Feature cards slide in with stagger
      gsap.from(featuresRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.18,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featuresRef.current[0],
          start: "top 80%",
        },
      });

      // Showcase grid images scale-in stagger
      gsap.from(showcaseRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: showcaseRef.current[0],
          start: "top 85%",
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      title: "Preserve Folklore & Crafts",
      desc: "Upload and explore cultural stories, art, and indigenous knowledge.",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="1.5" d="M12 2v20M2 12h20" />
        </svg>
      ),
    },
    {
      title: "Real-time Alerts",
      desc: "Stay safe with instant emergency updates from verified authorities.",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="1.5" d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "SOS Button",
      desc: "Send emergency requests in one click.",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="1.5" d="M12 2l3 7h7l-5.5 4 2 7L12 17l-6.5 3 2-7L2 9h7z" />
        </svg>
      ),
    },
    {
      title: "Business & Guides",
      desc: "Connect with artisans and tourist guides to empower local economy.",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      ),
    },
  ];

  const showcaseImgs = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    src: `https://picsum.photos/seed/legacy${i}/600/400`,
    title: `Folklore ${i + 1}`,
  }));

  const toggleLang = (l) => setLang(l);

  const t = (en, hi, as) => {
    switch (lang) {
      case "hi":
        return hi || en;
      case "as":
        return as || en;
      default:
        return en;
    }
  };

  return (
    <div className="min-h-screen text-slate-900 bg-gradient-to-b from-white via-slate-50 to-white">
      {/* NAV */}
      <header className="fixed w-full z-30 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-slate-800 text-white flex items-center justify-center font-semibold">LL</div>
            <div className="font-medium">Legacy Library</div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#home" className="hover:underline">{t("Home","होम","হোম")}</a>
            <a href="#library" className="hover:underline">{t("Legacy Library","लिगेसी लाइब्रेरी","লিগেসি লাইব্ৰেৰী")}</a>
            <a href="#alerts" className="hover:underline">{t("Alerts","अलर्ट","বাৰ্তা")}</a>
            <a href="#sos" className="hover:underline">{t("SOS","SOS","SOS")}</a>
            <a href="#contact" className="hover:underline">{t("Contact","संपर्क","যোগাযোগ")}</a>
            <div className="ml-4 flex items-center gap-2">
              <button onClick={() => toggleLang("en")} className={`px-2 py-1 rounded ${lang === "en" ? "bg-slate-800 text-white" : "bg-transparent"}`}>EN</button>
              <button onClick={() => toggleLang("hi")} className={`px-2 py-1 rounded ${lang === "hi" ? "bg-slate-800 text-white" : "bg-transparent"}`}>HI</button>
              <button onClick={() => toggleLang("as")} className={`px-2 py-1 rounded ${lang === "as" ? "bg-slate-800 text-white" : "bg-transparent"}`}>AS</button>
            </div>
          </nav>

          <div className="md:hidden">
            <button className="px-3 py-2 border rounded">Menu</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <main ref={heroRef} id="home" className="pt-24">
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10 py-20">
            <div className="w-full md:w-1/2">
              <h1 className="hero-title text-4xl md:text-6xl font-extrabold leading-tight">{t("Legacy Library","लिगेसी लाइब्रेरी","লিগেসি লাইব্ৰেৰী")}</h1>
              <p className="hero-sub mt-4 text-lg text-slate-600">{t("Preserving culture, connecting communities, and safeguarding traditions.","संस्कृति को संरक्षित करना, समुदायों को जोड़ना, और परंपराओं की सुरक्षा करना।","সংস্কৃতি সংরক্ষণ, সমাজ সংযোগ, আৰু পৰম্পৰা ৰক্ষা।")}</p>

              <div className="mt-8 flex gap-4">
                <a href="#library" className="hero-cta inline-block bg-slate-900 text-white px-5 py-3 rounded-md transform transition-transform hover:scale-105">{t("Explore Library","लाइब्रेरी देखें","লাইব্রেৰী অন্বেষণ")}</a>
                <a href="#get-started" className="hero-cta inline-block border border-slate-900 px-5 py-3 rounded-md transform transition-transform hover:scale-105">{t("Get Started","शुरू करें","শুরু কৰক")}</a>
              </div>

              <div className="mt-6 text-sm text-slate-500">{t("Trusted by communities, artisans, and safety agencies.","समुदायों, कारीगरों और सुरक्षा एजेंसियों द्वारा भरोसा किया गया।","সামাজিক, শিল্পী আৰু নিৰাপত্তা সংস্থাৰ দ্বাৰা বিশ্বাসযোগ্য।")}</div>
            </div>

            <div className="w-full md:w-1/2 relative">
              {/* Floating icons for background */}
              <div className="absolute inset-0 pointer-events-none">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    ref={(el) => (floatingRef.current[i] = el)}
                    className={`absolute ${i === 0 ? "top-6 left-10" : i === 1 ? "top-24 right-8" : i === 2 ? "bottom-10 left-20" : "bottom-6 right-16"}`}
                  >
                    <div className="w-14 h-14 bg-white/80 rounded-full shadow flex items-center justify-center">
                      <svg className="w-8 h-8 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeWidth="1.5" d="M12 2l3 7h7l-5.5 4 2 7L12 17l-6.5 3 2-7L2 9h7z" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mockup card */}
              <div className="relative rounded-xl overflow-hidden shadow-lg">
                <img src="https://picsum.photos/seed/hero/900/600" alt="hero" className="w-full h-72 object-cover md:h-96 rounded-xl" />
                <div className="absolute left-4 bottom-4 bg-white/80 px-3 py-2 rounded">{t("Featured folklore","फीचर्ड फोकलोर","ফিচাৰ্ড ফলক্লৰ")}</div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="library" className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-semibold mb-6">{t("Features","विशेषताएँ","বৈশিষ্ট্যসমূহ")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f, i) => (
                <article
                  key={f.title}
                  ref={(el) => (featuresRef.current[i] = el)}
                  className="bg-white rounded-lg p-5 shadow hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-slate-100 rounded">
                      {f.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{t(f.title, f.title, f.title)}</h3>
                      <p className="text-sm text-slate-600 mt-1">{t(f.desc, f.desc, f.desc)}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SHOWCASE */}
        <section id="showcase" className="py-12 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl font-semibold mb-6">{t("Showcase","शोकेस","প্ৰদৰ্শন")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {showcaseImgs.map((img, i) => (
                <figure
                  key={img.id}
                  ref={(el) => (showcaseRef.current[i] = el)}
                  className="overflow-hidden rounded-lg bg-white shadow group"
                >
                  <img src={img.src} alt={img.title} className="w-full h-48 object-cover transform transition-transform group-hover:scale-105" />
                  <figcaption className="p-3 text-sm text-slate-700">{img.title}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT / COMMUNITY */}
        <section id="about" className="py-12">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-semibold mb-4">{t("About the Community","समुदाय के बारे में","সমাজৰ বিষয়ে")}</h2>
            <p className="text-slate-600">{t(
              "Connecting military, civilians, and artisans to preserve culture and improve local resilience.",
              "सांस्कृतिक संरक्षण और स्थानीय लचीलापन को बढ़ाने के लिए सैनिकों, नागरिकों और कारीगरों को जोड़ना।",
              "সংস্কৃতি সংৰক্ষণ আৰু লোকেল ৰেসিলিয়েন্স বঢ়াবলৈ সৈনিক, নাগরিক, আৰু শিল্পীসকলক সংযোগ কৰোৱা।"
            )}</p>
          </div>
        </section>

        {/* CONTACT / SOS */}
        <section id="sos" className="py-12 bg-gradient-to-r from-rose-50 via-white to-amber-50">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold">{t("Need help?","मदद चाहिए?","সহায়ৰ প্ৰয়োজন?")}</h3>
              <p className="text-slate-600">{t("Use the SOS button for instant assistance or send an alert to authorities.","तुरंत सहायता के लिए SOS बटन का उपयोग करें या अधिकारियों को अलर्ट भेजें।","তৎক্ষণাৎ সহায়তাৰ বাবে SOS বুটাম ব্যৱহাৰ কৰক বা কৰ্তৃপক্ষলৈ বাৰ্তা প্ৰেৰণ কৰক।")}</p>
            </div>

            <div className="flex gap-4">
              <button className="px-5 py-3 rounded bg-red-600 text-white font-semibold transform transition-transform hover:scale-105">{t("SOS","SOS","SOS")}</button>
              <a href="#contact" className="px-5 py-3 rounded border">{t("Contact","संपर्क","যোগাযোগ")}</a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer id="contact" className="py-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-sm text-slate-600">© {new Date().getFullYear()} Legacy Library.</div>
            <div className="flex items-center gap-4 text-sm">
              <a href="#" className="hover:underline">{t("Privacy Policy","गोपनीयता नीति","গোপনীয়তা নীতি")}</a>
              <a href="#" className="hover:underline">{t("Terms","शर्तें","নীতিসমূহ")}</a>
              <a href="#" className="hover:underline">{t("Contact","संपर्क","যোগাযোগ")}</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
