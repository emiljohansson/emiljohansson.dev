import { styled } from '@/stitches';

export default styled('section', {
  backgroundColor: 'transparent',
  border: '0',
  display: 'flex',
  alignItems: 'center',
  flex: '1',
  justifyContent: 'center',
  fontSize: '3rem',
  height: '100%',
  outline: 'none',
  overflow: 'auto',
  fontVariantNumeric: 'tabular-nums',

  variants: {
    direction: {
      row: {
        flexDirection: 'row',
      },
      column: {
        flexDirection: 'column',
      },
    },
  },
  defaultVariants: {
    direction: 'row',
  }
})
