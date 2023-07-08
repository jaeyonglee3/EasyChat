import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import type { StyleFunctionProps } from '@chakra-ui/styled-system'

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: true,
  }

const fonts = {
    body: "system-ui, sans-serif",
    heading: "DM Sans, serif",
    mono: "Menlo, monospace",
}

const colors = {
    dark: {
        bg: '#FF0000',
    },
}

const styles = {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'blackAlpha.600' : 'whiteAlpha.900',
      },
    }),
}

const theme = extendTheme({ config, fonts, colors, styles })

export default theme