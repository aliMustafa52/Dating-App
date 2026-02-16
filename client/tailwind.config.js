/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // --- THEMES ---
        // 1. The Main "Blurple" (Primary Action Color)
        primary: {
          DEFAULT: '#5865F2', // The main button/brand color
          hover: '#4752C4',   // Darker shade for hover states
        },

        // 2. Background Layers (Darkest to Lightest)
        bg: {
          main: '#36393f',    // Main chat window background
          sidebar: '#2f3136', // The channel/user list sidebar
          server: '#202225',  // The far-left server list (darkest)
          input: '#40444b',   // Message input box & search bars
          hover: '#32353b',   // Hover state for list items
        },

        // 3. Text Colors
        text: {
          normal: '#dcddde',  // Primary text (messages, names)
          muted: '#72767d',   // Secondary text (timestamps, offline users)
          header: '#ffffff',  // Pure white for section headers
        },

        // 4. Message Bubbles
        bubble: {
          sent: '#5865F2',      // Your messages (same as primary)
          received: '#2f3136',  // Their messages (matches sidebar)
        },

        // 5. Utility / Status Indicators
        status: {
          online: '#3ba55c',
          idle: '#faa61a',
          dnd: '#ed4245',     // Do Not Disturb / Errors
          offline: '#747f8d',
        },

        // 6. Dividers
        divider: '#202225', // Subtle borders between sections
      },
    },
  },
  plugins: [],
}