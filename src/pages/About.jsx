import React from "react";

const About = () => {
  return (
    <div className=" min-h-screen">
      <div
        className="relative "
        style={{ backgroundImage: "url('/chair.jpg')" }}
      >
        <div className="absolute inset-0 bg-white opacity-80 z-0" />
        <div className="relative z-10 flex flex-col items-center justify-center py-24 px-4">
          <p className="text-lg text-purple-700 mb-2">
            Eng yaxshi ta'lim markazlarini topishda yordam beramiz!
          </p>
          <h1 className="text-5xl font-bold text-purple-900 mb-4">
            Biz haqimizda
          </h1>
          <div className="absolute right-10 top-10 text-lg text-gray-700">
            <span className="mr-2">Bosh sahifa</span> |
            <span className="ml-2 text-purple-800 font-medium">
              Biz haqimizda
            </span>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto py-20 px-4">
        <h2 className="text-4xl font-bold text-center text-purple-900 mb-12 relative">
          Talabalarni muvaffaqiyatga tayyorlash
          <span className="block w-24 h-1 bg-yellow-400 mx-auto mt-2 rounded"></span>
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-4">
              Ishonchli va muvaffaqiyatli o'quvchilarni shakllantirish
            </h3>
            <p className="text-gray-700 mb-6">
              Bizning platformamiz talabalarga qiziqishlari, byudjeti va
              hududiga mos keladigan ta'lim markazlarini topishda yordam beradi,
              eng yaxshi ta'lim tajribasini ta'minlaydi.
            </p>
            <button className="bg-purple-700 text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-purple-800 transition">
              Ko'proq ko'rish
            </button>
            <div className="mt-8 bg-white p-4 rounded shadow text-gray-700 italic">
              <span className="text-2xl text-purple-600 mr-2">"</span>
              Ushbu platforma mening uchun mukammal o'quv markazini topishni
              osonlashtirdi. Juda tavsiya etaman!
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=600&q=80"
              alt="Classroom"
              className="rounded-xl shadow-lg w-full max-w-md"
            />
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="bg-white py-16">
        <h2 className="text-4xl font-bold text-center text-purple-900 mb-12">
          Bizning ta'sirimiz
        </h2>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 justify-center">
          <div className="flex-1 bg-gray-100 rounded-lg shadow p-8 flex flex-col items-center">
            <span className="text-5xl text-purple-700 mb-2">250+</span>
            <span className="text-lg font-medium text-gray-700">
              Ro'yxatdan o'tgan foydalanuvchilar
            </span>
          </div>
          <div className="flex-1 bg-gray-100 rounded-lg shadow p-8 flex flex-col items-center">
            <span className="text-5xl text-purple-700 mb-2">120+</span>
            <span className="text-lg font-medium text-gray-700">
              Ta'lim markazlari
            </span>
          </div>
          <div className="flex-1 bg-gray-100 rounded-lg shadow p-8 flex flex-col items-center">
            <span className="text-5xl text-purple-700 mb-2">80+</span>
            <span className="text-lg font-medium text-gray-700">
              Muvaffaqiyat hikoyalari
            </span>
          </div>
        </div>
      </div>

      {/* Mission Section 2 */}
      <div className="max-w-6xl mx-auto py-20 px-4">
        <h2 className="text-4xl font-bold text-center text-purple-900 mb-12 relative">
          Bizning missiyamiz
          <span className="block w-24 h-1 bg-yellow-400 mx-auto mt-2 rounded"></span>
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 flex justify-center order-2 md:order-1">
            <img
              src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80"
              alt="Teamwork"
              className="rounded-xl shadow-lg w-full max-w-md"
            />
          </div>
          <div className="flex-1 order-1 md:order-2">
            <h3 className="text-2xl font-semibold mb-4">
              Yorqin kelajak uchun o'quvchilarni kuchaytirish
            </h3>
            <p className="text-gray-700 mb-6">
              Biz talabalar va sifatli ta'lim o'rtasidagi tafovutni bartaraf
              etishni maqsad qilganmiz, o'quvchilarni eng yaxshi ta'lim
              muassasalari bilan bog'laydigan qulay platformani taqdim etish
              orqali. Har bir talaba muvaffaqiyatga olib boradigan
              shaxsiylashtirilgan ta'lim tajribasiga ega bo'lishini ta'minlash
              bizning maqsadimizdir.
            </p>
            <button className="bg-purple-700 text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-purple-800 transition">
              Ko'proq ko'rish
            </button>
          </div>
        </div>
      </div>

      {/* Indicator Section */}
      <div className="bg-white py-16">
        <h2 className="text-4xl font-bold text-center text-purple-900 mb-12">
          Bizning ko'rsatkichimiz
        </h2>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 justify-center items-center">
          <div className="flex-1 flex justify-center order-2 md:order-1">
            <img
              src="https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80"
              alt="Teacher"
              className="rounded-xl shadow-lg w-full max-w-md"
            />
          </div>
          <div className="flex-1 order-1 md:order-2">
            <h3 className="text-2xl font-semibold mb-4">
              Ta'lim kelajagini shakllantirish
            </h3>
            <p className="text-gray-700 mb-6">
              Bizning ko'rsatkichimiz dunyoning yetakchi ta'lim platformasiga
              aylanish bo'lib, har bir talaba o'zining akademik faoliyatida
              yaxshi natijalarga erishish uchun kerakli o'quv resurslari,
              muassasalar va yo'riqnomalarni topishini ta'minlashdir.
            </p>
            <button className="bg-purple-700 text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-purple-800 transition">
              Ko'proq ko'rish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
