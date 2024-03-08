export default async function HomePage() {
  return (
    <>
      {/* <main className="relative h-screen overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
        <div className="flex items-start justify-between">
          <div className="relative my-4 ml-4 hidden h-screen w-80 shadow-lg lg:block">
            <div className="h-full rounded-2xl bg-white dark:bg-gray-700">
              <div className="flex items-center justify-center pt-6">
                <svg
                  width="35"
                  height="30"
                  viewBox="0 0 256 366"
                  version="1.1"
                  preserveAspectRatio="xMidYMid"
                >
                  <defs>
                    <linearGradient
                      x1="12.5189534%"
                      y1="85.2128611%"
                      x2="88.2282959%"
                      y2="10.0225497%"
                      id="linearGradient-1"
                    >
                      <stop
                        stop-color="#FF0057"
                        stop-opacity="0.16"
                        offset="0%"
                      ></stop>
                      <stop stop-color="#FF0057" offset="86.1354%"></stop>
                    </linearGradient>
                  </defs>
                  <g>
                    <path
                      d="M0,60.8538006 C0,27.245261 27.245304,0 60.8542121,0 L117.027019,0 L255.996549,0 L255.996549,86.5999776 C255.996549,103.404155 242.374096,117.027222 225.569919,117.027222 L145.80812,117.027222 C130.003299,117.277829 117.242615,130.060011 117.027019,145.872817 L117.027019,335.28252 C117.027019,352.087312 103.404567,365.709764 86.5997749,365.709764 L0,365.709764 L0,117.027222 L0,60.8538006 Z"
                      fill="#001B38"
                    ></path>
                    <circle
                      fill="url(#linearGradient-1)"
                      transform="translate(147.013244, 147.014675) rotate(90.000000) translate(-147.013244, -147.014675) "
                      cx="147.013244"
                      cy="147.014675"
                      r="78.9933938"
                    ></circle>
                    <circle
                      fill="url(#linearGradient-1)"
                      opacity="0.5"
                      transform="translate(147.013244, 147.014675) rotate(90.000000) translate(-147.013244, -147.014675) "
                      cx="147.013244"
                      cy="147.014675"
                      r="78.9933938"
                    ></circle>
                  </g>
                </svg>
              </div>
              <nav className="mt-6">
                <div>
                  <a
                    className="my-2 flex w-full items-center justify-start border-r-4 border-blue-500 bg-gradient-to-r from-white to-blue-100 p-4 font-thin uppercase text-blue-500 transition-colors duration-200 dark:from-gray-700 dark:to-gray-800"
                    href="#"
                  >
                    <span className="text-left">
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        viewBox="0 0 2048 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                      </svg>
                    </span>
                    <span className="mx-4 text-sm font-normal">Dashboard</span>
                  </a>
                  <a
                    className="my-2 flex w-full items-center justify-start p-4 font-thin uppercase text-gray-500 transition-colors duration-200 hover:text-blue-500 dark:text-gray-200"
                    href="#"
                  >
                    <span className="text-left">
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="m-auto"
                        viewBox="0 0 2048 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1024 1131q0-64-9-117.5t-29.5-103-60.5-78-97-28.5q-6 4-30 18t-37.5 21.5-35.5 17.5-43 14.5-42 4.5-42-4.5-43-14.5-35.5-17.5-37.5-21.5-30-18q-57 0-97 28.5t-60.5 78-29.5 103-9 117.5 37 106.5 91 42.5h512q54 0 91-42.5t37-106.5zm-157-520q0-94-66.5-160.5t-160.5-66.5-160.5 66.5-66.5 160.5 66.5 160.5 160.5 66.5 160.5-66.5 66.5-160.5zm925 509v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm0-260v-56q0-15-10.5-25.5t-25.5-10.5h-568q-15 0-25.5 10.5t-10.5 25.5v56q0 15 10.5 25.5t25.5 10.5h568q15 0 25.5-10.5t10.5-25.5zm0-252v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm256-320v1216q0 66-47 113t-113 47h-352v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-768v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-352q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1728q66 0 113 47t47 113z"></path>
                      </svg>
                    </span>
                    <span className="mx-4 text-sm font-normal">Projects</span>
                  </a>
                  <a
                    className="my-2 flex w-full items-center justify-start p-4 font-thin uppercase text-gray-500 transition-colors duration-200 hover:text-blue-500 dark:text-gray-200"
                    href="#"
                  >
                    <span className="text-left">
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="m-auto"
                        viewBox="0 0 2048 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M685 483q16 0 27.5-11.5t11.5-27.5-11.5-27.5-27.5-11.5-27 11.5-11 27.5 11 27.5 27 11.5zm422 0q16 0 27-11.5t11-27.5-11-27.5-27-11.5-27.5 11.5-11.5 27.5 11.5 27.5 27.5 11.5zm-812 184q42 0 72 30t30 72v430q0 43-29.5 73t-72.5 30-73-30-30-73v-430q0-42 30-72t73-30zm1060 19v666q0 46-32 78t-77 32h-75v227q0 43-30 73t-73 30-73-30-30-73v-227h-138v227q0 43-30 73t-73 30q-42 0-72-30t-30-73l-1-227h-74q-46 0-78-32t-32-78v-666h918zm-232-405q107 55 171 153.5t64 215.5h-925q0-117 64-215.5t172-153.5l-71-131q-7-13 5-20 13-6 20 6l72 132q95-42 201-42t201 42l72-132q7-12 20-6 12 7 5 20zm477 488v430q0 43-30 73t-73 30q-42 0-72-30t-30-73v-430q0-43 30-72.5t72-29.5q43 0 73 29.5t30 72.5z"></path>
                      </svg>
                    </span>
                    <span className="mx-4 text-sm font-normal">My tasks</span>
                  </a>
                  <a
                    className="my-2 flex w-full items-center justify-start p-4 font-thin uppercase text-gray-500 transition-colors duration-200 hover:text-blue-500 dark:text-gray-200"
                    href="#"
                  >
                    <span className="text-left">
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="m-auto"
                        viewBox="0 0 2048 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M960 0l960 384v128h-128q0 26-20.5 45t-48.5 19h-1526q-28 0-48.5-19t-20.5-45h-128v-128zm-704 640h256v768h128v-768h256v768h128v-768h256v768h128v-768h256v768h59q28 0 48.5 19t20.5 45v64h-1664v-64q0-26 20.5-45t48.5-19h59v-768zm1595 960q28 0 48.5 19t20.5 45v128h-1920v-128q0-26 20.5-45t48.5-19h1782z"></path>
                      </svg>
                    </span>
                    <span className="mx-4 text-sm font-normal">Calendar</span>
                  </a>
                  <a
                    className="my-2 flex w-full items-center justify-start p-4 font-thin uppercase text-gray-500 transition-colors duration-200 hover:text-blue-500 dark:text-gray-200"
                    href="#"
                  >
                    <span className="text-left">
                      <svg
                        width="20"
                        height="20"
                        className="m-auto"
                        fill="currentColor"
                        viewBox="0 0 2048 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                      </svg>
                    </span>
                    <span className="mx-4 text-sm font-normal">
                      Time manage
                    </span>
                  </a>
                  <a
                    className="my-2 flex w-full items-center justify-start p-4 font-thin uppercase text-gray-500 transition-colors duration-200 hover:text-blue-500 dark:text-gray-200"
                    href="#"
                  >
                    <span className="text-left">
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="m-auto"
                        viewBox="0 0 2048 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1024 1131q0-64-9-117.5t-29.5-103-60.5-78-97-28.5q-6 4-30 18t-37.5 21.5-35.5 17.5-43 14.5-42 4.5-42-4.5-43-14.5-35.5-17.5-37.5-21.5-30-18q-57 0-97 28.5t-60.5 78-29.5 103-9 117.5 37 106.5 91 42.5h512q54 0 91-42.5t37-106.5zm-157-520q0-94-66.5-160.5t-160.5-66.5-160.5 66.5-66.5 160.5 66.5 160.5 160.5 66.5 160.5-66.5 66.5-160.5zm925 509v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm0-260v-56q0-15-10.5-25.5t-25.5-10.5h-568q-15 0-25.5 10.5t-10.5 25.5v56q0 15 10.5 25.5t25.5 10.5h568q15 0 25.5-10.5t10.5-25.5zm0-252v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm256-320v1216q0 66-47 113t-113 47h-352v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-768v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-352q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1728q66 0 113 47t47 113z"></path>
                      </svg>
                    </span>
                    <span className="mx-4 text-sm font-normal">Reports</span>
                  </a>
                  <a
                    className="my-2 flex w-full items-center justify-start p-4 font-thin uppercase text-gray-500 transition-colors duration-200 hover:text-blue-500 dark:text-gray-200"
                    href="#"
                  >
                    <span className="text-left">
                      <svg
                        width="20"
                        fill="currentColor"
                        height="20"
                        className="h-5 w-5"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1088 1256v240q0 16-12 28t-28 12h-240q-16 0-28-12t-12-28v-240q0-16 12-28t28-12h240q16 0 28 12t12 28zm316-600q0 54-15.5 101t-35 76.5-55 59.5-57.5 43.5-61 35.5q-41 23-68.5 65t-27.5 67q0 17-12 32.5t-28 15.5h-240q-15 0-25.5-18.5t-10.5-37.5v-45q0-83 65-156.5t143-108.5q59-27 84-56t25-76q0-42-46.5-74t-107.5-32q-65 0-108 29-35 25-107 115-13 16-31 16-12 0-25-8l-164-125q-13-10-15.5-25t5.5-28q160-266 464-266 80 0 161 31t146 83 106 127.5 41 158.5z"></path>
                      </svg>
                    </span>
                    <span className="mx-4 text-sm font-normal">Settings</span>
                  </a>
                </div>
              </nav>
            </div>
          </div>
          <div className="flex w-full flex-col pl-0 md:space-y-4 md:p-4">
            <header className="z-40 h-16 w-full items-center rounded-2xl bg-white shadow-lg dark:bg-gray-700">
              <div className="flex-center relative z-20 mx-auto flex h-full flex-col justify-center px-3">
                <div className="lg:max-w-68 relative flex w-full items-center pl-1 sm:ml-0 sm:pr-2">
                  <div className="container relative left-0 z-50 flex h-full w-3/4">
                    <div className="group relative flex h-full w-full items-center lg:w-64">
                      <div className="absolute z-50 flex h-10 w-auto cursor-pointer items-center justify-center p-3 pr-2 text-sm uppercase text-gray-500 sm:hidden">
                        <svg
                          fill="none"
                          className="relative h-5 w-5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <svg
                        className="pointer-events-none absolute left-0 z-20 ml-4 hidden h-4 w-4 fill-current text-gray-500 group-hover:text-gray-400 sm:block"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
                      </svg>
                      <input
                        type="text"
                        className="aa-input block w-full rounded-2xl bg-gray-100 py-1.5 pl-10 pr-4 leading-normal text-gray-400 ring-opacity-90 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800"
                        placeholder="Search"
                      />
                      <div className="absolute right-0 mr-2 hidden h-auto rounded-2xl border border-gray-300 px-2 py-1 text-xs text-gray-400 md:block">
                        +
                      </div>
                    </div>
                  </div>
                  <div className="relative ml-5 mr-4 flex w-1/4 items-center justify-end p-1 sm:right-auto sm:mr-0">
                    <a href="#" className="relative block">
                      <img
                        alt="profil"
                        src="/images/person/1.jpg"
                        className="mx-auto h-10 w-10 rounded-full object-cover "
                      />
                    </a>
                  </div>
                </div>
              </div>
            </header>
            <div className="h-screen overflow-auto pb-24 pl-2 pr-2 pt-2 md:pl-0 md:pr-0 md:pt-0">
              <div className="flex flex-col flex-wrap sm:flex-row ">
                <div className="w-full sm:w-1/2 xl:w-1/3">
                  <div className="mb-4">
                    <div className="w-full rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-700">
                      <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="relative rounded-xl bg-blue-100 p-2">
                            <svg
                              width="25"
                              height="25"
                              viewBox="0 0 256 262"
                              xmlns="http://www.w3.org/2000/svg"
                              preserveAspectRatio="xMidYMid"
                            >
                              <path
                                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                                fill="#4285F4"
                              ></path>
                              <path
                                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                                fill="#34A853"
                              ></path>
                              <path
                                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                                fill="#FBBC05"
                              ></path>
                              <path
                                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                                fill="#EB4335"
                              ></path>
                            </svg>
                          </span>
                          <div className="flex flex-col">
                            <span className="text-md ml-2 font-bold text-black dark:text-white">
                              Google
                            </span>
                            <span className="ml-2 text-sm text-gray-500 dark:text-white">
                              Google Inc.
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <button className="rounded-full border border-gray-200 p-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              className="h-4 w-4 text-yellow-500"
                              fill="currentColor"
                              viewBox="0 0 1792 1792"
                            >
                              <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path>
                            </svg>
                          </button>
                          <button className="text-gray-200">
                            <svg
                              width="25"
                              height="25"
                              fill="currentColor"
                              viewBox="0 0 1792 1792"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M1088 1248v192q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h192q40 0 68 28t28 68zm0-512v192q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h192q40 0 68 28t28 68zm0-512v192q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h192q40 0 68 28t28 68z"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="mb-4 flex items-center justify-between space-x-12">
                        <span className="flex items-center rounded-md bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-500">
                          PROGRESS
                        </span>
                        <span className="flex items-center rounded-md border border-red-400 bg-white px-2 py-1 text-xs font-semibold text-red-400">
                          HIGH PRIORITY
                        </span>
                      </div>
                      <div className="m-auto block">
                        <div>
                          <span className="inline-block text-sm text-gray-500 dark:text-gray-100">
                            Task done :
                            <span className="font-bold text-gray-700 dark:text-white">
                              25
                            </span>
                            /50
                          </span>
                        </div>
                        <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                          <div className="h-full w-1/2 rounded-full bg-purple-500 text-center text-xs text-white"></div>
                        </div>
                      </div>
                      <div className="my-4 flex items-center justify-start space-x-4">
                        <span className="flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-semibold text-green-500">
                          IOS APP
                        </span>
                        <span className="flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-500">
                          UI/UX
                        </span>
                      </div>
                      <div className="flex -space-x-2">
                        <a href="#" className="">
                          <img
                            className="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-white"
                            src="/images/person/1.jpg"
                            alt="Guy"
                          />
                        </a>
                        <a href="#" className="">
                          <img
                            className="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-white"
                            src="/images/person/2.jpeg"
                            alt="Max"
                          />
                        </a>
                        <a href="#" className="">
                          <img
                            className="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-white"
                            src="/images/person/3.jpg"
                            alt="Charles"
                          />
                        </a>
                        <a href="#" className="">
                          <img
                            className="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-white"
                            src="/images/person/4.jpg"
                            alt="Jade"
                          />
                        </a>
                      </div>
                      <span className="mt-4 flex w-36 items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-500">
                        DUE DATE : 18 JUN
                      </span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="w-full rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-700">
                      <div className="mb-6 flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="relative rounded-xl bg-blue-100 p-2">
                            <svg
                              width="25"
                              height="25"
                              viewBox="0 0 2447.6 2452.5"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-rule="evenodd" fill-rule="evenodd">
                                <path
                                  d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z"
                                  fill="#36c5f0"
                                ></path>
                                <path
                                  d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z"
                                  fill="#2eb67d"
                                ></path>
                                <path
                                  d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z"
                                  fill="#ecb22e"
                                ></path>
                                <path
                                  d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0"
                                  fill="#e01e5a"
                                ></path>
                              </g>
                            </svg>
                          </span>
                          <div className="flex flex-col">
                            <span className="text-md ml-2 font-bold text-black dark:text-white">
                              Slack
                            </span>
                            <span className="ml-2 text-sm text-gray-500 dark:text-white">
                              Slack corporation
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <button className="rounded-full border border-gray-200 p-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              className="h-4 w-4 text-yellow-500"
                              fill="currentColor"
                              viewBox="0 0 1792 1792"
                            >
                              <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z"></path>
                            </svg>
                          </button>
                          <button className="text-gray-200">
                            <svg
                              width="25"
                              height="25"
                              fill="currentColor"
                              viewBox="0 0 1792 1792"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M1088 1248v192q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h192q40 0 68 28t28 68zm0-512v192q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h192q40 0 68 28t28 68zm0-512v192q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h192q40 0 68 28t28 68z"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="mb-4 flex items-center justify-between space-x-12">
                        <span className="flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-semibold text-green-700">
                          COMPLETED
                        </span>
                        <span className="flex items-center rounded-md border border-green-600 bg-white px-2 py-1 text-xs font-semibold text-green-600">
                          MEDIUM PRIORITY
                        </span>
                      </div>
                      <div className="m-auto block">
                        <div>
                          <span className="inline-block text-sm text-gray-500 dark:text-gray-100">
                            Task done :
                            <span className="font-bold text-gray-700 dark:text-white">
                              50
                            </span>
                            /50
                          </span>
                        </div>
                        <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                          <div className="h-full w-full rounded-full bg-pink-400 text-center text-xs text-white"></div>
                        </div>
                      </div>
                      <div className="my-4 flex items-center justify-start space-x-4">
                        <span className="flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-semibold text-green-500">
                          IOS APP
                        </span>
                        <span className="flex items-center rounded-md bg-yellow-200 px-2 py-1 text-xs font-semibold text-yellow-600">
                          ANDROID
                        </span>
                      </div>
                      <div className="flex -space-x-2">
                        <a href="#" className="">
                          <img
                            className="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-white"
                            src="/images/person/1.jpg"
                            alt="Guy"
                          />
                        </a>
                        <a href="#" className="">
                          <img
                            className="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-white"
                            src="/images/person/2.jpeg"
                            alt="Max"
                          />
                        </a>
                        <a href="#" className="">
                          <img
                            className="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-white"
                            src="/images/person/3.jpg"
                            alt="Charles"
                          />
                        </a>
                        <a href="#" className="">
                          <img
                            className="inline-block h-10 w-10 rounded-full object-cover ring-2 ring-white"
                            src="/images/person/4.jpg"
                            alt="Jade"
                          />
                        </a>
                      </div>
                      <span className="mt-4 flex w-36 items-center rounded-md bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-500">
                        DUE DATE : 18 JUN
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 xl:w-1/3">
                  <div className="mx-0 mb-4 sm:ml-4 xl:mr-4">
                    <div className="w-full rounded-2xl bg-white shadow-lg dark:bg-gray-700">
                      <p className="text-md p-4 font-bold text-black dark:text-white">
                        My Tasks
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-300">
                          (05)
                        </span>
                      </p>
                      <ul>
                        <li className="flex items-center justify-between border-b-2 border-gray-100 py-3 text-gray-600 dark:border-gray-800 dark:text-gray-200">
                          <div className="flex items-center justify-start text-sm">
                            <span className="mx-4">01</span>
                            <span>Create wireframe</span>
                          </div>
                          <svg
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="mx-4 text-gray-400 dark:text-gray-300"
                            viewBox="0 0 1024 1024"
                          >
                            <path
                              d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"
                              fill="currentColor"
                            ></path>
                            <path
                              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </li>
                        <li className="flex items-center justify-between border-b-2 border-gray-100 py-3 text-gray-600 dark:border-gray-800 dark:text-gray-200">
                          <div className="flex items-center justify-start text-sm">
                            <span className="mx-4">02</span>
                            <span>Dashboard design</span>
                            <span className="ml-2 flex items-center text-gray-400 lg:ml-6 dark:text-gray-300">
                              3
                              <svg
                                width="15"
                                height="15"
                                fill="currentColor"
                                className="ml-1"
                                viewBox="0 0 512 512"
                              >
                                <path
                                  d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2l-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29c7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1l-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160s-93.3 160-208 160z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                            </span>
                            <span className="mx-4 flex items-center text-gray-400 dark:text-gray-300">
                              3
                              <svg
                                width="15"
                                height="15"
                                className="ml-1"
                                fill="currentColor"
                                viewBox="0 0 384 512"
                              >
                                <path
                                  d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8c-.6 16.1-4.2 28.5-11 36.9c-15.4 19.2-49.3 22.4-85.2 25.7c-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3c0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6c3.1-5.2 7.8-9.8 14.9-13.4c16.2-8.2 40.4-10.4 66.1-12.8c42.2-3.9 90-8.4 118.2-43.4c14-17.4 21.1-39.8 21.6-67.9c31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16s-16-7.2-16-16s7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16s16 7.2 16 16s-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16s-16-7.2-16-16s7.2-16 16-16z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                            </span>
                          </div>
                          <svg
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="mx-4 text-gray-400 dark:text-gray-300"
                            viewBox="0 0 1024 1024"
                          >
                            <path
                              d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"
                              fill="currentColor"
                            ></path>
                            <path
                              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </li>
                        <li className="flex items-center justify-between border-b-2 border-gray-100 py-3 text-gray-600 dark:border-gray-800 dark:text-gray-200">
                          <div className="flex items-center justify-start text-sm">
                            <span className="mx-4">03</span>
                            <span>Components card</span>
                            <span className="ml-2 flex items-center text-gray-400 lg:ml-6 dark:text-gray-300">
                              3
                              <svg
                                width="15"
                                height="15"
                                fill="currentColor"
                                className="ml-1"
                                viewBox="0 0 512 512"
                              >
                                <path
                                  d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2l-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29c7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1l-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160s-93.3 160-208 160z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                            </span>
                          </div>
                          <svg
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="mx-4 text-gray-400 dark:text-gray-300"
                            viewBox="0 0 1024 1024"
                          >
                            <path
                              d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"
                              fill="currentColor"
                            ></path>
                            <path
                              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </li>
                        <li className="flex items-center justify-between border-b-2 border-gray-100 py-3 text-gray-400 dark:border-gray-800">
                          <div className="flex items-center justify-start text-sm">
                            <span className="mx-4">04</span>
                            <span className="line-through">
                              Google logo design
                            </span>
                          </div>
                          <svg
                            width="20"
                            height="20"
                            fill="currentColor"
                            viewBox="0 0 1024 1024"
                            className="mx-4 text-green-500"
                          >
                            <path
                              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8l157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </li>
                        <li className="flex items-center justify-between border-b-2 border-gray-100 py-3 text-gray-400 dark:border-gray-800">
                          <div className="flex items-center justify-start text-sm">
                            <span className="mx-4">05</span>
                            <span className="line-through">
                              Header navigation
                            </span>
                          </div>
                          <svg
                            width="20"
                            height="20"
                            fill="currentColor"
                            viewBox="0 0 1024 1024"
                            className="mx-4 text-green-500"
                          >
                            <path
                              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8l157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </li>
                        <li className="flex items-center justify-between border-b-2 border-gray-100 py-3 text-gray-600 dark:border-gray-800 dark:text-gray-200">
                          <div className="flex items-center justify-start text-sm">
                            <span className="mx-4">06</span>
                            <span>International</span>
                            <span className="ml-2 flex items-center text-gray-400 lg:ml-6 dark:text-gray-300">
                              3
                              <svg
                                width="15"
                                height="15"
                                fill="currentColor"
                                className="ml-1"
                                viewBox="0 0 512 512"
                              >
                                <path
                                  d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2l-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29c7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1l-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160s-93.3 160-208 160z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                            </span>
                            <span className="mx-4 flex items-center text-gray-400 dark:text-gray-300">
                              3
                              <svg
                                width="15"
                                height="15"
                                className="ml-1"
                                fill="currentColor"
                                viewBox="0 0 384 512"
                              >
                                <path
                                  d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8c-.6 16.1-4.2 28.5-11 36.9c-15.4 19.2-49.3 22.4-85.2 25.7c-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3c0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6c3.1-5.2 7.8-9.8 14.9-13.4c16.2-8.2 40.4-10.4 66.1-12.8c42.2-3.9 90-8.4 118.2-43.4c14-17.4 21.1-39.8 21.6-67.9c31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16s-16-7.2-16-16s7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16s16 7.2 16 16s-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16s-16-7.2-16-16s7.2-16 16-16z"
                                  fill="currentColor"
                                ></path>
                              </svg>
                            </span>
                          </div>
                          <svg
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="mx-4 text-gray-400 dark:text-gray-300"
                            viewBox="0 0 1024 1024"
                          >
                            <path
                              d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"
                              fill="currentColor"
                            ></path>
                            <path
                              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </li>
                        <li className="flex items-center justify-between py-3 text-gray-600 dark:text-gray-200">
                          <div className="flex items-center justify-start text-sm">
                            <span className="mx-4">07</span>
                            <span>Production data</span>
                          </div>
                          <svg
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="mx-4 text-gray-400 dark:text-gray-300"
                            viewBox="0 0 1024 1024"
                          >
                            <path
                              d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0 0 51.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"
                              fill="currentColor"
                            ></path>
                            <path
                              d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="mb-4 sm:ml-4 xl:mr-4">
                    <div className="w-full rounded-2xl bg-white shadow-lg dark:bg-gray-700">
                      <div className="flex items-center justify-between p-4">
                        <p className="text-md font-bold text-black dark:text-white">
                          Google
                        </p>
                        <button className="mr-4 rounded border border-gray-400 p-1 text-sm text-gray-400">
                          <svg
                            width="15"
                            height="15"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <g fill="none">
                              <path
                                d="M17.222 8.685a1.5 1.5 0 0 1 0 2.628l-10 5.498A1.5 1.5 0 0 1 5 15.496V4.502a1.5 1.5 0 0 1 2.223-1.314l10 5.497z"
                                fill="currentColor"
                              ></path>
                            </g>
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center justify-between border-l-4 border-blue-500 bg-blue-100 px-4 py-2 text-gray-600 dark:bg-gray-800">
                        <p className="flex items-center text-xs dark:text-white">
                          <svg
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="mr-2 text-blue-500"
                            viewBox="0 0 24 24"
                          >
                            <g fill="none">
                              <path
                                d="M12 5a8.5 8.5 0 1 1 0 17a8.5 8.5 0 0 1 0-17zm0 3a.75.75 0 0 0-.743.648l-.007.102v4.5l.007.102a.75.75 0 0 0 1.486 0l.007-.102v-4.5l-.007-.102A.75.75 0 0 0 12 8zm7.17-2.877l.082.061l1.149 1a.75.75 0 0 1-.904 1.193l-.081-.061l-1.149-1a.75.75 0 0 1 .903-1.193zM14.25 2.5a.75.75 0 0 1 .102 1.493L14.25 4h-4.5a.75.75 0 0 1-.102-1.493L9.75 2.5h4.5z"
                                fill="currentColor"
                              ></path>
                            </g>
                          </svg>
                          Create wireframe
                        </p>
                        <div className="flex items-center">
                          <span className="ml-2 mr-2 text-xs font-bold md:ml-4 dark:text-gray-200">
                            25 min 20s
                          </span>
                          <button className="mr-4 rounded border bg-blue-500 p-1 text-sm text-gray-400">
                            <svg
                              width="17"
                              height="17"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              className="text-white"
                            >
                              <g fill="none">
                                <path
                                  d="M9 6a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V7a1 1 0 0 1 1-1zm6 0a1 1 0 0 1 1 1v10a1 1 0 1 1-2 0V7a1 1 0 0 1 1-1z"
                                  fill="currentColor"
                                ></path>
                              </g>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-b-2 border-gray-100 p-4">
                        <p className="text-md font-bold text-black dark:text-white">
                          Slack
                        </p>
                        <button className="mr-4 rounded border border-gray-400 p-1 text-sm text-gray-400">
                          <svg
                            width="15"
                            height="15"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <g fill="none">
                              <path
                                d="M17.222 8.685a1.5 1.5 0 0 1 0 2.628l-10 5.498A1.5 1.5 0 0 1 5 15.496V4.502a1.5 1.5 0 0 1 2.223-1.314l10 5.497z"
                                fill="currentColor"
                              ></path>
                            </g>
                          </svg>
                        </button>
                      </div>
                      <div className="flex items-center justify-between border-b-2 border-gray-100 px-4 py-2 text-gray-600">
                        <p className="flex items-center text-xs dark:text-white">
                          <svg
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="mr-2"
                            viewBox="0 0 24 24"
                          >
                            <g fill="none">
                              <path
                                d="M12 5a8.5 8.5 0 1 1 0 17a8.5 8.5 0 0 1 0-17zm0 3a.75.75 0 0 0-.743.648l-.007.102v4.5l.007.102a.75.75 0 0 0 1.486 0l.007-.102v-4.5l-.007-.102A.75.75 0 0 0 12 8zm7.17-2.877l.082.061l1.149 1a.75.75 0 0 1-.904 1.193l-.081-.061l-1.149-1a.75.75 0 0 1 .903-1.193zM14.25 2.5a.75.75 0 0 1 .102 1.493L14.25 4h-4.5a.75.75 0 0 1-.102-1.493L9.75 2.5h4.5z"
                                fill="currentColor"
                              ></path>
                            </g>
                          </svg>
                          International
                        </p>
                        <div className="flex items-center">
                          <span className="ml-2 mr-2 text-xs text-gray-400 md:ml-4">
                            30 min
                          </span>
                          <button className="mr-4 rounded border border-gray-400 p-1 text-sm text-gray-400">
                            <svg
                              width="15"
                              height="15"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <g fill="none">
                                <path
                                  d="M17.222 8.685a1.5 1.5 0 0 1 0 2.628l-10 5.498A1.5 1.5 0 0 1 5 15.496V4.502a1.5 1.5 0 0 1 2.223-1.314l10 5.497z"
                                  fill="currentColor"
                                ></path>
                              </g>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between border-b-2 border-gray-100 px-4 py-2 text-gray-600">
                        <p className="flex items-center text-xs dark:text-white">
                          <svg
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="mr-2"
                            viewBox="0 0 24 24"
                          >
                            <g fill="none">
                              <path
                                d="M12 5a8.5 8.5 0 1 1 0 17a8.5 8.5 0 0 1 0-17zm0 3a.75.75 0 0 0-.743.648l-.007.102v4.5l.007.102a.75.75 0 0 0 1.486 0l.007-.102v-4.5l-.007-.102A.75.75 0 0 0 12 8zm7.17-2.877l.082.061l1.149 1a.75.75 0 0 1-.904 1.193l-.081-.061l-1.149-1a.75.75 0 0 1 .903-1.193zM14.25 2.5a.75.75 0 0 1 .102 1.493L14.25 4h-4.5a.75.75 0 0 1-.102-1.493L9.75 2.5h4.5z"
                                fill="currentColor"
                              ></path>
                            </g>
                          </svg>
                          Slack logo design
                        </p>
                        <div className="flex items-center">
                          <span className="ml-2 mr-2 text-xs text-gray-400 md:ml-4">
                            30 min
                          </span>
                          <button className="mr-4 rounded border border-gray-400 p-1 text-sm text-gray-400">
                            <svg
                              width="15"
                              height="15"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <g fill="none">
                                <path
                                  d="M17.222 8.685a1.5 1.5 0 0 1 0 2.628l-10 5.498A1.5 1.5 0 0 1 5 15.496V4.502a1.5 1.5 0 0 1 2.223-1.314l10 5.497z"
                                  fill="currentColor"
                                ></path>
                              </g>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between px-4 py-2 text-gray-600">
                        <p className="flex items-center text-xs dark:text-white">
                          <svg
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="mr-2"
                            viewBox="0 0 24 24"
                          >
                            <g fill="none">
                              <path
                                d="M12 5a8.5 8.5 0 1 1 0 17a8.5 8.5 0 0 1 0-17zm0 3a.75.75 0 0 0-.743.648l-.007.102v4.5l.007.102a.75.75 0 0 0 1.486 0l.007-.102v-4.5l-.007-.102A.75.75 0 0 0 12 8zm7.17-2.877l.082.061l1.149 1a.75.75 0 0 1-.904 1.193l-.081-.061l-1.149-1a.75.75 0 0 1 .903-1.193zM14.25 2.5a.75.75 0 0 1 .102 1.493L14.25 4h-4.5a.75.75 0 0 1-.102-1.493L9.75 2.5h4.5z"
                                fill="currentColor"
                              ></path>
                            </g>
                          </svg>
                          Dahboard template
                        </p>
                        <div className="flex items-center">
                          <span className="ml-2 mr-2 text-xs text-gray-400 md:ml-4">
                            30 min
                          </span>
                          <button className="mr-4 rounded border border-gray-400 p-1 text-sm text-gray-400">
                            <svg
                              width="15"
                              height="15"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <g fill="none">
                                <path
                                  d="M17.222 8.685a1.5 1.5 0 0 1 0 2.628l-10 5.498A1.5 1.5 0 0 1 5 15.496V4.502a1.5 1.5 0 0 1 2.223-1.314l10 5.497z"
                                  fill="currentColor"
                                ></path>
                              </g>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-1/2 xl:w-1/3">
                  <div className="mb-4">
                    <div className="rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-700">
                      <div className="flex flex-wrap overflow-hidden">
                        <div className="w-full rounded shadow-sm">
                          <div className="mb-4 flex items-center justify-between">
                            <div className="text-left text-xl font-bold text-black dark:text-white">
                              Dec 2021
                            </div>
                            <div className="flex space-x-4">
                              <button className="rounded-full bg-blue-500 p-2 text-white">
                                <svg
                                  width="15"
                                  height="15"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z"
                                  ></path>
                                </svg>
                              </button>
                              <button className="rounded-full bg-blue-500 p-2 text-white">
                                <svg
                                  width="15"
                                  height="15"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M10 19a1 1 0 0 1-.64-.23a1 1 0 0 1-.13-1.41L13.71 12L9.39 6.63a1 1 0 0 1 .15-1.41a1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19z"
                                  ></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                          <div className="-mx-2">
                            <table className="w-full dark:text-white">
                              <tr>
                                <th className="px-2 py-3 md:px-3 ">S</th>
                                <th className="px-2 py-3 md:px-3 ">M</th>
                                <th className="px-2 py-3 md:px-3 ">T</th>
                                <th className="px-2 py-3 md:px-3 ">W</th>
                                <th className="px-2 py-3 md:px-3 ">T</th>
                                <th className="px-2 py-3 md:px-3 ">F</th>
                                <th className="px-2 py-3 md:px-3 ">S</th>
                              </tr>
                              <tr className="text-gray-400 dark:text-gray-500">
                                <td className="px-2 py-3 text-center text-gray-300 md:px-3 dark:text-gray-500">
                                  25
                                </td>
                                <td className="px-2 py-3 text-center text-gray-300 md:px-3 dark:text-gray-500">
                                  26
                                </td>
                                <td className="px-2 py-3 text-center text-gray-300 md:px-3 dark:text-gray-500">
                                  27
                                </td>
                                <td className="px-2 py-3 text-center text-gray-300 md:px-3 dark:text-gray-500">
                                  28
                                </td>
                                <td className="px-2 py-3 text-center text-gray-300 md:px-3 dark:text-gray-500">
                                  29
                                </td>
                                <td className="px-2 py-3 text-center text-gray-300 md:px-3 dark:text-gray-500">
                                  30
                                </td>
                                <td className="cursor-pointer px-2 py-3 text-center text-gray-800 hover:text-blue-500 md:px-3">
                                  1
                                </td>
                              </tr>
                              <tr>
                                <td className="cursor-pointer px-2 py-3 text-center hover:text-blue-500 md:px-3">
                                  2
                                </td>
                                <td className="relative cursor-pointer px-1 py-3 text-center hover:text-blue-500">
                                  3
                                  <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 transform rounded-full bg-blue-500"></span>
                                </td>
                                <td className="cursor-pointer px-2 py-3 text-center hover:text-blue-500 md:px-3">
                                  4
                                </td>
                                <td className="cursor-pointer px-2 py-3 text-center hover:text-blue-500 md:px-3">
                                  5
                                </td>
                                <td className="cursor-pointer px-2 py-3 text-center hover:text-blue-500 md:px-3">
                                  6
                                </td>
                                <td className="cursor-pointer px-2 py-3 text-center hover:text-blue-500 md:px-3">
                                  7
                                </td>
                                <td className="relative cursor-pointer px-2 py-3 text-center hover:text-blue-500 md:px-3 lg:px-3">
                                  8
                                  <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 transform rounded-full bg-yellow-500"></span>
                                </td>
                              </tr>
                              <tr>
                                <td className="cursor-pointer px-2 py-3 text-center hover:text-blue-500 md:px-3">
                                  9
                                </td>
                                <td className="cursor-pointer px-2 py-3 text-center hover:text-blue-500 md:px-3">
                                  10
                                </td>
                                <td className="cursor-pointer px-2 py-3 text-center hover:text-blue-500 md:px-3">
                                  11
                                </td>
                                <td className="cursor-pointer px-2 py-3 text-center hover:text-blue-500 md:px-3">
                                  12
                                </td>
                                <td className="cursor-pointer px-2 py-3 text-center text-white md:px-3">
                                  <span className="rounded-full bg-blue-500 p-2">
                                    13
                                  </span>
                                </td>
                                <td className="cursor-pointer px-2 py-3 text-center hover:text-blue-500 md:px-3">
                                  14
                                </td>
                                <td className="cursor-pointer px-2 py-3 text-center hover:text-blue-500 md:px-3">
                                  15
                                </td>
                              </tr>
                              <tr>
                                <td className="cursor-pointer px-2 py-3 text-center hover:text-blue-500 md:px-3">
                                  16
                                </td>
                                <td className="cursor-pointer px-2 py-3 text-center hover:text-blue-500 md:px-3">
                                  17
                                </td>
                                <td className="cursor-pointer px-2 py-3 text-center hover:text-blue-500 md:px-3">
                                  18
                                </td>
                                <td className="cursor-pointer px-2 py-3 text-center hover:text-blue-500 md:px-3">
                                  19
                                </td>
                                <td className="cursor-pointer px-2 py-3 text-center hover:text-blue-500 md:px-3">
                                  20
                                </td>
                                <td className="cursor-pointer px-2 py-3 text-center hover:text-blue-500 md:px-3">
                                  21
                                </td>
                                <td className="cursor-pointer px-2 py-3 text-center hover:text-blue-500 md:px-3">
                                  22
                                </td>
                              </tr>
                              <tr>
                                <td className="cursor-pointer px-2 py-3 text-center hover:text-blue-500 md:px-3">
                                  23
                                </td>
                                <td className="cursor-pointer px-2 py-3 text-center hover:text-blue-500 md:px-3">
                                  24
                                </td>
                                <td className="relative cursor-pointer px-2 py-3 text-center hover:text-blue-500 md:px-3">
                                  25
                                  <span className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 transform rounded-full bg-red-500"></span>
                                </td>
                                <td className="cursor-pointer px-2 py-3 text-center hover:text-blue-500 md:px-3">
                                  26
                                </td>
                                <td className="cursor-pointer px-2 py-3 text-center hover:text-blue-500 md:px-3">
                                  27
                                </td>
                                <td className="cursor-pointer px-2 py-3 text-center hover:text-blue-500 md:px-3">
                                  28
                                </td>
                                <td className="cursor-pointer px-2 py-3 text-center hover:text-blue-500 md:px-3">
                                  29
                                </td>
                              </tr>
                              <tr>
                                <td className="cursor-pointer px-2 py-3 text-center hover:text-blue-500 md:px-3">
                                  30
                                </td>
                                <td className="cursor-pointer px-2 py-3 text-center hover:text-blue-500 md:px-3">
                                  31
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                              </tr>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="w-full rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-700">
                      <p className="text-md font-bold text-black dark:text-white">
                        Messages
                      </p>
                      <ul>
                        <li className="my-6 flex items-center space-x-2">
                          <a href="#" className="relative block">
                            <img
                              alt="profil"
                              src="/images/person/1.jpg"
                              className="mx-auto h-10 w-10 rounded-full object-cover "
                            />
                          </a>
                          <div className="flex flex-col">
                            <span className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                              Charlie Rabiller
                            </span>
                            <span className="ml-2 text-sm text-gray-400 dark:text-gray-300">
                              Hey John ! Do you read the NextJS doc ?
                            </span>
                          </div>
                        </li>
                        <li className="my-6 flex items-center space-x-2">
                          <a href="#" className="relative block">
                            <img
                              alt="profil"
                              src="/images/person/5.jpg"
                              className="mx-auto h-10 w-10 rounded-full object-cover "
                            />
                          </a>
                          <div className="flex flex-col">
                            <span className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                              Marie Lou
                            </span>
                            <span className="ml-2 text-sm text-gray-400 dark:text-gray-300">
                              No I think the dog is better...
                            </span>
                          </div>
                        </li>
                        <li className="my-6 flex items-center space-x-2">
                          <a href="#" className="relative block">
                            <img
                              alt="profil"
                              src="/images/person/6.jpg"
                              className="mx-auto h-10 w-10 rounded-full object-cover "
                            />
                          </a>
                          <div className="flex flex-col">
                            <span className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                              Ivan Buck
                            </span>
                            <span className="ml-2 text-sm text-gray-400 dark:text-gray-300">
                              Seriously ? haha Bob is not a child !
                            </span>
                          </div>
                        </li>
                        <li className="my-6 flex items-center space-x-2">
                          <a href="#" className="relative block">
                            <img
                              alt="profil"
                              src="/images/person/7.jpg"
                              className="mx-auto h-10 w-10 rounded-full object-cover "
                            />
                          </a>
                          <div className="flex flex-col">
                            <span className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                              Marina Farga
                            </span>
                            <span className="ml-2 text-sm text-gray-400 dark:text-gray-300">
                              Do you need that design ?
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main> */}
    </>
  )
}
