import React from "react";

export default function SignIn() {
  return (
    <body class="flex justify-center items-center min-h-screen bg-gray-50">
    <div class="w-full max-w-md shadow-md border rounded-2xl bg-white">
      <div class="p-6">
        <h1 class="text-2xl font-bold text-center mb-4">Sign In</h1>
        <form class="space-y-4">
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

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                class="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label for="rememberMe" class="ml-2 text-sm">
                Remember Me
              </label>
            </div>

            <a href="#" class="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            class="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md"
          >
            Sign In
          </button>
        </form>

        <p class="text-center text-sm text-gray-600 mt-4">
          Don’t have an account?
          <a href="/sign-up" class="text-blue-500 hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
    </body>
  );
}
