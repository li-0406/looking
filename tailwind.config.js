/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: "4px",
      },
      backgroundImage: {
        flag: "url('/public/Tw@3x.png')",
        banner:
          "url('https://r-xx.bstatic.com/xdata/images/xphoto/714x300/261387541.jpeg?k=80d1571cedd0a363b9d9b78207914af9b1490c6a859cacd8dc090c866d1bbc94&o=')",
        taiwanIcon:
          "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAq1BMVEX////////V2+zR1+nFzeS8xd+uudmlsdWlsNSgrNLwkZWWpM7viY6NncmLncuImMjugISElcXte4Dten9/kMTrdHnscXZ7i8F1h77qaG3pZWpugrxofLlofLroWl/oWF5gdrVec7TmUljmS1BSbLLeSkpQaK5KZa3gQUflPUPfPUNCXqpDXKfcNjziMTfZMznYLjU2UqHWKjDgJy4wS5zgISjTISffGCDPGSDZ6017AAAAAXRSTlMAQObYZgAAAJFJREFUGBnFwUGOwjAQRNHflXKUGcGeG3D/C7HkBGwMsXs0QgYJskW8B58XHBluPJ0MZ60t5B4rDwcM7reGf8w1kkgCKpgyX9ZOtCU6gwODHUTMJc2QYErZrzWW30IypDB4t9RpnpPGkBNmWkrZ86/zIEyVudsx1ESIDcKExavSEGKDEGaDEYg3AqPW2WCY+JY/oVkkz4kGF1gAAAAASUVORK5CYII=')",
        footer:
          "url('https://cf.bstatic.com/psb/capla/static/media/world-map.7d457a5d.png')",
      },
      colors: {
        "blue-1": "#27374D",
        "blue-2": "#526D82",
        "blue-3": "#9DB2BF",
        "blue-4": "#DDE6ED",
      },
    },

    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    spacing: {
      1: "4px",
      2: "8px",
      3: "12px",
      4: "16px",
      5: "20px",
      6: "24px",
      7: "28px",
      8: "32px",
      9: "36px",
      10: "40px",
      11: "44px",
      12: "48px",
      13: "52px",
      14: "56px",
      15: "60px",
      16: "64px",
      17: "68px",
      18: "72px",
      19: "76px",
      20: "80px",
    },
  },
  plugins: [],
};
