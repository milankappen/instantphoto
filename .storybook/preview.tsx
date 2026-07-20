import type { Preview } from '@storybook/react-vite'
import '../src/components/InstantPhotoFrame/InstantPhotoFrame.css'

const preview: Preview = {
  parameters: {
    backgrounds: {
      options: {
        warm_gray: { name: 'warm gray', value: '#e8e4df' },
        white: { name: 'white',     value: '#ffffff' },
        dark: { name: 'dark',      value: '#2b2b2b' },
        light_gray: { name: 'light gray', value: '#f5f5f5' }
      }
    },
    layout: 'centered',
  },

  initialGlobals: {
    backgrounds: {
      value: 'warm_gray'
    }
  }
}

export default preview
