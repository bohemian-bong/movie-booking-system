import React from "react";

export default function Login() {
  return (
    <form action="POST" method="./login">
      <section class="text-gray-600 body-font relative">
        <div class="absolute inset-0 bg-gray-300"></div>
        <div class="container px-5 py-24 mx-auto grid place-items-center">
          <div class="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">
              Login to your Account
            </h2>
            <div class="relative mb-4">
              <label for="email" class="leading-7 text-sm text-gray-600">
                Email
              </label>
              <input type="email" id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            </div>
            <div class="relative mb-4">
              <label for="password" class="leading-7 text-sm text-gray-600">
                Password
              </label>
              <input type="password" id="password" name="password" class="w-full bg-white rounded border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
            </div>
            <button class="text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg mt-5" type="submit">
              Submit
            </button>
            <p class="text-center mt-2">Don't have an account? <a href="./signup" class="text-cyan-600">Sign Up</a></p>
          </div>
        </div>
      </section>
    </form>
  );
}
