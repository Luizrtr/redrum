/* eslint-disable @next/next/no-img-element */
import Switch from "@/components/Switch";
import * as React from "react";

export default function Login() {
  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-primary-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img
          src="https://source.unsplash.com/random"
          alt="img "
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className="bg-primary-gray-300 dark:bg-dark w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12 text-primary-gray-900 dark:text-primary-gray-300">
            Login
          </h1>

          <form className="mt-6" action="#" method="POST">
            <div>
              <label className="block text-primary-gray-900 dark:text-primary-gray-300">
                User
              </label>
              <input
                type="user"
                name=""
                id=""
                placeholder="Enter User"
                className="w-full px-4 py-3 rounded-lg bg-primary-gray-200 dark:bg-primary-gray-900 mt-2 border focus:border-blue-500 focus:bg-primary-white focus:outline-none"
              />
            </div>

            <div className="mt-4">
              <label className="block text-primary-gray-900 dark:text-primary-gray-300">
                Password
              </label>
              <input
                type="password"
                name=""
                id=""
                placeholder="Enter Password"
                className="w-full px-4 py-3 rounded-lg bg-primary-gray-200 dark:bg-primary-gray-900  mt-2 border focus:border-blue-500
                focus:bg-primary-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full block bg-primary-indigo hover:bg-primary-indigo-40bg-primary-indigog-indigo-400 text-primary-white font-semibold rounded-lg
              px-4 py-3 mt-6"
            >
              Log In
            </button>
          </form>

          <hr className="my-6 border-gray-900 dark:border-gray-300 w-full text-primary-gray-900 dark:text-primary-gray-300" />
          <p className="mt-8 text-primary-gray-900 dark:text-primary-gray-300">
            Need an account?{" "}
            <a href="#" className="text-primary-blue font-semibold">
              Create an account
            </a>
          </p>

          <Switch label="Theme" />
        </div>
      </div>
    </section>
  );
}
