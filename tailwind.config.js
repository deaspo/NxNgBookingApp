/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts, js, tsx, jsx}', './apps/**/**/*.{html,ts, js, tsx, jsx}'],
    theme: {
        extend: {},
    },
    plugins: [require('@tailwindcss/aspect-ratio')
        , require('@tailwindcss/forms')
        , require('@tailwindcss/line-clamp')
        , require('@tailwindcss/typography')
    ],
};
