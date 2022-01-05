import type { NextPage } from "next";

const Home: NextPage = (props) => {
  return (
    <div className="relative min-h-screen flex">
      <div className="bg-gray-100 text-gray-700 w-64 space-y-6 px-2">
        <a href="#" className="text-gray-600 flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 110-2h4a1 1 0 011 1v4a1 1 0 11-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 112 0v1.586l2.293-2.293a1 1 0 011.414 1.414L6.414 15H8a1 1 0 110 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 110-2h1.586l-2.293-2.293a1 1 0 011.414-1.414L15 13.586V12a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>

          <span className="text-2xl font-semibold">Lagrange.fi</span>
        </a>

        <nav>
          <a href="" className="block py-2.5 px-4 ">Swap</a>
          <a href="" className="block py-2.5 px-4">Market Overview</a>
          <a href="" className="block py-2.5 px-4">Account</a>
          <a href="" className="block py-2.5 px-4">Roadmap</a>
          <a href="" className="block py-2.5 px-4">Whitepaper</a>
          <a href="" className="block py-2.5 px-4">Settings</a>
       
        </nav>
      </div>

      <div className="bg-gradient-to-r from-lagrangelight to-lagrangedark flex-1 p-10 text-xl font-bold ">
        <h1>content</h1>
      </div>
    </div>
  );
};

export default Home;
