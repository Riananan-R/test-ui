const CAROUSEL_ARROW = ['always', 'hover', 'never']

export const CarouselProps = {
  height: {
    type: String,
    default: '300px'
  },
  autoplay: {
    type: Boolean,
    default: true,
  },
  interval: {
    type: Number,
    default: 3000,
  },
  arrow: {
    type: String,
    default: 'hover',
    validator: (value) => CAROUSEL_ARROW.includes(value)
  },
}