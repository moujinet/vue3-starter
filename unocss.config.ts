import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      primary: {
        DEFAULT: 'var(--c-primary)',
      },
      secondary: {
        DEFAULT: 'var(--c-secondary)',
      },
    },
  },
  shortcuts: [
    {
      // text
      'text-default': 'text-$c-text-base',
      'text-secondary': 'text-$c-text-secondary',
      'text-highlight': 'text-$c-text-highlight',

      // background
      'bg-base': 'bg-$c-bg-base',

      // border
      'border-base': 'border-$c-border-base',

      // link
      'text-link-base': 'text-default hover:text-$c-primary',
      'text-link-primary': 'text-primary hover:text-$c-primary hover:underline',
      'text-link-secondary': 'text-secondary hover:text-$c-secondary',

      // utils
      'flex-center': 'items-center justify-center',
      'flex-v-center': 'items-center',
      'flex-h-center': 'justify-center',
    },
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose m-auto text-left'.split(' '),
})
