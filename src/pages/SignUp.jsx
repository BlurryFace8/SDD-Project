import React from "react";

export default function SignUp() {
  return (
    <body class="flex justify-center items-center min-h-screen bg-gray-50">
      <div class="w-full max-w-md shadow-md border rounded-2xl bg-white">
        <div class="p-6">
          <h1 class="text-2xl font-bold text-center mb-4">Sign Up</h1>
          <form class="space-y-4">
            <div>
              <label for="fullName" class="text-sm font-medium block">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter your full name"
                required
                class="mt-1 block w-full border rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label for="email" class="text-sm font-medium block">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
                class="mt-1 block w-full border rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label for="password" class="text-sm font-medium block">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                required
                class="mt-1 block w-full border rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label for="confirmPassword" class="text-sm font-medium block">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Re-enter your password"
                required
                class="mt-1 block w-full border rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              class="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md"
            >
              Sign Up
            </button>
          </form>

          <p class="text-center text-sm text-gray-600 mt-4">
            Already have an account?
            <a href="/sign-in" class="text-blue-500 hover:underline">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </body>
  );
}
