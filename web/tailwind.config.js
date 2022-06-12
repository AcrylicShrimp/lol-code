module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        "0/6": "#090E11",
        "1/6": "#0E1E27",
        "2/6": "#204C66",
        "3/6": "#427999",
        "4/6": "#75ACCC",
        "5/6": "#E5F6FF",
        "6/6": "#FFFFFF",
      },
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Oxygen",
        "Ubuntu",
        "Cantarell",
        "Open Sans",
        "Helvetica Neue",
        "sans-serif",
      ],
    },
  },
  plugins: [],
};
