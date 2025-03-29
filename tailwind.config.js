/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                'ghibli': {
                    'sky': '#B4E4FF',    // Soft sky blue from Howl's Moving Castle
                    'grass': '#A8E6CF',  // Fresh grass green from Totoro
                    'sunset': '#FFD3B6', // Warm sunset from Ponyo
                    'forest': '#3B7A57', // Deep forest green
                    'cloud': '#F5F5F5',  // Soft white for clouds
                    'earth': '#D4A373',  // Warm earth tone
                }
            },
            fontFamily: {
                'ghibli': ['Quicksand', 'sans-serif'],
            },
            borderRadius: {
                'ghibli': '2rem',
            },
            boxShadow: {
                'ghibli': '0 4px 20px rgba(0, 0, 0, 0.1)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'bounce-soft': 'bounce-soft 2s infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                'bounce-soft': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
            },
        },
    },
    plugins: [],
};
