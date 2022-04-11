module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  variants: {
    extend: {
      backgroundColor: ['even', 'odd'],
    }
  },
  theme: {
    container: {
      center: true
    },
    extend: {

    },
  },
  plugins: [
    
  ],
}
