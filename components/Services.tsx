import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaSearch, FaCode, FaShareAlt, FaBullhorn, FaThumbsUp, FaPaintBrush } from 'react-icons/fa';

const Services = () => {
  const services = [
    { id: "01", title: "Search Engine Optimization", desc: "Our SEO Service will make your webpage rise up Google search results...", icon: FaSearch },
    { id: "02", title: "Website Development Service", desc: "We have tailor made Web Development Services that are functional and scalable...", icon: FaCode },
    { id: "03", title: "Social Media Marketing", desc: "With our SMM agency, we will assist you in creating your brand on platforms...", icon: FaShareAlt },
    { id: "04", title: "Pay Per Click Service", desc: "Our campaigns are designed to deliver instant traffic and quality leads through our pay per click service...", icon: FaBullhorn },
    { id: "05", title: "Social Media Optimization Service", desc: "We enhance your online presence with engaging content and strategies through our...", icon: FaThumbsUp },
    { id: "06", title: "Web Designing Service", desc: "We create modern, responsive websites focused on user experience through our Web Designing Service...", icon: FaPaintBrush },
  ];

  // Client images - add your PNG files to /public/clients/ folder
  const clientImages = [
    { src: '/clients/client1.png', alt: 'Client 1' },
    { src: '/clients/client2.png', alt: 'Client 2' },
    { src: '/clients/client3.png', alt: 'Client 3' },
    { src: '/clients/client4.png', alt: 'Client 4' },
    { src: '/clients/client5.png', alt: 'Client 5' },
  ];
  
  const duplicatedImages = [...clientImages, ...clientImages, ...clientImages];

  return (
    <section className="py-20 bg-[#0a2540] text-white px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-amber-400 font-semibold tracking-wider text-sm">Our Services</p>
          <h2 className="text-4xl font-extrabold mt-2">Services We Provide</h2>
          <p className="max-w-3xl mx-auto text-zinc-300 mt-4 leading-relaxed">
            As a digital marketing agency, we know that to perform exceedingly well in the field of marketing, It's Important to target the niche-based audience and connect with it at the right time. Therefore, JP Technologies never lags behind in terms of any online marketing area as it provides all the significant digital marketing services that any business may need at any particular time.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Left Column (01, 02, 03) */}
          <div className="space-y-6">
            {services.slice(0, 3).map((s) => (
              <div key={s.id} className="border border-blue-800 p-6 rounded-2xl bg-[#0f345c]">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center text-blue-300 text-xl"><s.icon /></div>
                  <span className="text-2xl font-bold text-blue-500">{s.id}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-zinc-300 text-sm">{s.desc}</p>
                <Link href="/services" className="text-amber-400 font-semibold text-sm mt-4 block">Read more</Link>
              </div>
            ))}
          </div>

          {/* Center Column - Infinite Auto Scroll */}
          <div className="hidden md:block relative h-[800px] overflow-hidden rounded-2xl">
            <div className="scroll-container">
              {duplicatedImages.map((img, idx) => (
                <div key={idx} className="relative w-full h-56 mb-6 shrink-0 rounded-2xl overflow-hidden bg-zinc-800">
                  <Image src={img.src} alt={img.alt} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (04, 05, 06) */}
          <div className="space-y-6">
            {services.slice(3, 6).map((s) => (
              <div key={s.id} className="border border-blue-800 p-6 rounded-2xl bg-[#0f345c]">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 bg-blue-900 rounded-lg flex items-center justify-center text-blue-300 text-xl"><s.icon /></div>
                  <span className="text-2xl font-bold text-blue-500">{s.id}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-zinc-300 text-sm">{s.desc}</p>
                <Link href="/services" className="text-amber-400 font-semibold text-sm mt-4 block">Read more</Link>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link href="/services" className="bg-amber-400 text-zinc-900 px-8 py-4 rounded-xl font-bold text-lg inline-block">Digital Marketing Services ↗</Link>
        </div>
      </div>
    </section>
  );
};

export default Services;

