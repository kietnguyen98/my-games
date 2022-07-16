/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        zoomInZoomOut: {
          "0%, 100%": { transform: "scale(1, 1)" },
          "50%": { transform: "scale(1.2, 1.2)" },
        },
        dropDown: {
          from: {
            top: "-300px",
            opacity: 0,
          },
          to: {
            top: "0px",
            opacity: 1,
          },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        zoomInZoomOut: "zoomInZoomOut 1.5s ease-out infinite",
        dropDown: "dropDown 0.75s",
        loadingSpin: "spin 1s linear infinite",
      },
      backgroundImage: {
        banner: "url('../public/images/matching/banner.png')",
        "matching-view": "url('../../public/images/commons/pepe-matching.png')",
        "pepe-1": "url('../public/images/matching/001.png')",
        "pepe-2": "url('../public/images/matching/002.png')",
        "pepe-3": "url('../public/images/matching/003.png')",
        "pepe-4": "url('../public/images/matching/004.png')",
        "pepe-5": "url('../public/images/matching/005.png')",
        "pepe-6": "url('../public/images/matching/006.png')",
        "pepe-7": "url('../public/images/matching/007.png')",
        "pepe-8": "url('../public/images/matching/008.png')",
        "pepe-9": "url('../public/images/matching/009.png')",
        "pepe-10": "url('../public/images/matching/010.png')",
        "pepe-11": "url('../public/images/matching/011.png')",
        "pepe-12": "url('../public/images/matching/012.png')",
        "pepe-13": "url('../public/images/matching/013.png')",
        "pepe-14": "url('../public/images/matching/014.png')",
        "pepe-15": "url('../public/images/matching/015.png')",
        "pepe-16": "url('../public/images/matching/016.png')",
        "pepe-17": "url('../public/images/matching/017.png')",
        "pepe-18": "url('../public/images/matching/018.png')",
      },
    },
  },
  plugins: [],
};
