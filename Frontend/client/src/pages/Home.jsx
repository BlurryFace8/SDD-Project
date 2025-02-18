import React from "react";

export default function Home() {
  return (
    <body class="bg-gray-50">
      <header class=" py-6 ">
        <div class="container mx-auto px-6 text-center">
          <span class="text-4xl font-bold">Sherpa</span>
          <span class="text-4xl font-bold text-red-600">Dai</span>
          <p class="text-lg mt-2">
            Find the perfect guide for your next adventure
          </p>
        </div>
      </header>

      <main class="container mx-auto px-6 py-12">
        <h2 class="text-3xl font-semibold text-center mb-8">Meet Our Guides</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div class="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src="https://tse2.mm.bing.net/th?id=OIP.jtpOQIXcy4NihMKozxJwHQHaE8&pid=Api&P=0&h=220"
              alt="Guide Image"
              class="w-full h-48 object-cover"
            />
            <div class="p-4">
              <h3 class="text-xl font-semibold">John Doe</h3>
              <p class="text-gray-600">
                Experienced guide specializing in historical tours.
              </p>
              <button class="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
                View Profile
              </button>
            </div>
          </div>

          <div class="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.oGk_lg2TXQBM9P-Z6oC7ugHaHu&pid=Api&P=0&h=220"
              alt="Guide Image"
              class="w-full h-48 object-cover"
            />
            <div class="p-4">
              <h3 class="text-xl font-semibold">John Doe</h3>
              <p class="text-gray-600">
                Experienced guide specializing in historical tours.
              </p>
              <button class="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
                View Profile
              </button>
            </div>
          </div>

          <div class="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src="https://tse1.mm.bing.net/th?id=OIP.ocz1XoMjkefSheO_VJkjrQHaEK&pid=Api&P=0&h=220"
              alt="Guide Image"
              class="w-full h-48 object-cover"
            />
            <div class="p-4">
              <h3 class="text-xl font-semibold">John Doe</h3>
              <p class="text-gray-600">
                Experienced guide specializing in historical tours.
              </p>
              <button class="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
                View Profile
              </button>
            </div>
          </div>

          <div class="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.RGAYjBLq4VAs1UzrPNXCdwHaE8&pid=Api&P=0&h=220"
              alt="Guide Image"
              class="w-full h-48 object-cover"
            />
            <div class="p-4">
              <h3 class="text-xl font-semibold">John Doe</h3>
              <p class="text-gray-600">
                Experienced guide specializing in historical tours.
              </p>
              <button class="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
                View Profile
              </button>
            </div>
          </div>
        </div>
      </main>
    </body>
  );
}
