// tailwind.config.js
module.exports = {
    // ... other config
    theme: {
        extend: {
            // ... other extensions
            utilities: {
                '.scrollbar-hide': {
                    /* Firefox */
                    'scrollbar-width': 'none',
                    /* Safari and Chrome */
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    }
                }
            }
        }
    }
}