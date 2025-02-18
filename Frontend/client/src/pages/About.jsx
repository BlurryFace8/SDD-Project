import React from "react";

export default function About() {
  return (
    <body class="bg-gray-50">
      <header class=" py-6 underline">
        <div class="container mx-auto px-6">
          <h1 class="text-4xl font-bold text-center">About Us</h1>
        </div>
      </header>

      <main class="container mx-auto px-6 py-12">
        <section class="mb-12 text-center">
        <span class="text-4xl font-bold">Sherpa</span>
        <span class="text-4xl font-bold text-red-600">Dai</span>
          <p class="text-gray-700 text-lg leading-relaxed max-w-3xl mx-auto">
            At Tourism Guide Finder, we are passionate about transforming the
            way people explore and connect with destinations. We bridge the gap
            between travelers and experienced local guides to create
            unforgettable, authentic experiences.
          </p>
        </section>

        <section class="mb-12">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 class="text-2xl font-semibold mb-4">Our Vision</h3>
              <p class="text-gray-700 leading-relaxed">
                We envision a world where every traveler has access to
                personalized, sustainable, and enriching experiences, powered by
                a network of trusted local guides.
              </p>
            </div>
            <img
              src="https://tse3.mm.bing.net/th?id=OIP._sgKD6_mJEN7xNrbyI8MAwHaFP&pid=Api&P=0&h=220"
              alt="Our Vision"
              class="rounded-lg shadow-md "
            />
          </div>
        </section>

        <section class="mb-12">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <img
              src="https://tse1.mm.bing.net/th?id=OIP.7HoKtF0AzQp-Y6dmO6Y6xAHaE7&pid=Api&P=0&h=220"
              alt="Our Mission"
              class="rounded-lg shadow-md"
            />
            <div>
              <h3 class="text-2xl font-semibold mb-4">Our Mission</h3>
              <p class="text-gray-700 leading-relaxed">
                To empower local guides while offering travelers curated
                experiences that showcase the true essence of their
                destinations. Our mission is to connect, inspire, and foster
                meaningful travel experiences.
              </p>
            </div>
          </div>
        </section>

        <section class="mb-12 text-center">
          <h3 class="text-2xl font-semibold mb-6">Why Choose Us?</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-white shadow-md rounded-lg p-6">
              <h4 class="text-xl font-semibold mb-2">Personalized Services</h4>
              <p class="text-gray-600 leading-relaxed">
                Get matched with guides who understand your interests and
                preferences.
              </p>
            </div>
            <div class="bg-white shadow-md rounded-lg p-6">
              <h4 class="text-xl font-semibold mb-2">Trusted Local Guides</h4>
              <p class="text-gray-600 leading-relaxed">
                All our guides are verified and bring a wealth of local
                knowledge.
              </p>
            </div>
            <div class="bg-white shadow-md rounded-lg p-6">
              <h4 class="text-xl font-semibold mb-2">Seamless Experience</h4>
              <p class="text-gray-600 leading-relaxed">
                Enjoy a user-friendly platform to find and book your perfect
                guide.
              </p>
            </div>
          </div>
        </section>

        <section class="text-center">
          <h3 class="text-2xl font-semibold mb-6">Contact Us</h3>
          <p class="text-gray-700 leading-relaxed max-w-2xl mx-auto">
            Have questions or need assistance? Reach out to us at
            <a
              href="mailto:contact@tourismguidefinder.com"
              class="text-blue-500 hover:underline"
            >
              contact@sherpadai.com
            </a>
            , or call us at <span class="font-semibold">+977-9841234567</span>.
            Follow us on our social media channels to stay updated.
          </p>
{/* 
          <div class="flex justify-center space-x-4 mt-6">
            <a href="#" class="text-blue-500 hover:text-blue-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .733.592 1.325 1.325 1.325h21.351c.733 0 1.325-.592 1.325-1.325v-21.351c0-.733-.592-1.325-1.325-1.325zm-14.301 20.618h-3.688v-9.748h3.688v9.748zm-1.844-11.138c-1.184 0-2.147-.963-2.147-2.147s.963-2.147 2.147-2.147c1.184 0 2.147.963 2.147 2.147s-.963 2.147-2.147 2.147zm13.344 11.138h-3.688v-5.305c0-1.261-.022-2.887-1.762-2.887-1.763 0-2.031 1.377-2.031 2.796v5.396h-3.688v-9.748h3.541v1.331h.05c.493-.936 1.7-1.921 3.499-1.921 3.74 0 4.428 2.46 4.428 5.658v5.68z" />
              </svg>
            </a>
            <a href="#" class="text-blue-500 hover:text-blue-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.04c-5.524 0-10 4.477-10 10 0 4.994 3.656 9.128 8.437 9.876v-6.987h-2.54v-2.89h2.54v-2.21c0-2.506 1.492-3.89 3.773-3.89 1.094 0 2.24.197 2.24.197v2.47h-1.262c-1.242 0-1.627.772-1.627 1.563v1.87h2.773l-.443 2.89h-2.33v6.987c4.781-.748 8.437-4.882 8.437-9.876 0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
          </div> */}
        </section>
      </main>

      <footer class="bg-gray-800 text-white py-6">
        <div class="container mx-auto px-6 text-center">
          <p>&copy; 2025 Tourism Guide Finder. All Rights Reserved.</p>
        </div>
      </footer>
    </body>
  );
}
