import { createTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = createTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    // blue
                    main: '#1976d2',
                    light: '#ffffff',
                    dark: '#015bb0'
                },
                secondary: {
                    // red
                    main: '#ff0000',
                    light: '#f74e4e',
                    dark: '#920000'
                },
                white: {
                    main: '#ffffff',
                    light: '#fff5ce'
                },
                black: {
                    main: '#333333'
                },
                yellow: {
                    main: '#FFD700', // vàng
                    light: '#FFFACD', // vàng nhạt
                    dark: '#B8860B' // vàng đậm
                },
                orange: {
                    main: '#FF8C00', // cam
                    light: '#FFA07A', // cam nhạt
                    dark: '#FF4500' // cam đậm
                }
            },
            backgroundColor: {
                primary: {
                    main: '#f3f4f4'
                }
            },
            text: {
                primary: {
                    main: '#ffffff'
                }
            },
            boxShadow: {
                main: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                hover: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
                // hover: `rgba(3, 102, 214, 0.3) 0px 0px 0px 3px`,
            }
        }
        // dark: {
        //     palette: {
        //         primary: {
        //             // white
        //             light: '#FFFFFF',DF
        //             main: '#E3E4E4',
        //             dark: '#C2C2C2',
        //             backgroundColor: '#454c5a',
        //         },
        //         secondary: {
        //             light: '#ff7961',
        //             main: '#E3E4E4',
        //             dark: '#ba000d',
        //             backgroundColor: '#454c5a',
        //         },
        //     },
        // },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536
        }
    }
})

export default theme
