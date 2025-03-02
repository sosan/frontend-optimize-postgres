/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./web/*.{js,ts,jsx,tsx}",
        "./web/**/*.{js,ts,jsx,tsx}",
        "./web/**/**/*.{js,ts,jsx,tsx}",
        "./web/**/**/**/*.{js,ts,jsx,tsx}",
        "./web/**/**/**/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                avenir: ["avenirnextltpro, sans-serif"],
                ibmplexmono: ["ibmplexmono, sans-serif"]
            },
        },
    },
    plugins: [],
}

