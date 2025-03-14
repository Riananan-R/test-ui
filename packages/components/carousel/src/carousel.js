export const CarouselProps = {
  height: {
    type: String,
    default: '300px'
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  interval: {
    type: Number,
    default: 3000
  },
  loop: {
    type: Boolean,
    default: true
  },
  initialIndex: {
    type: Number,
    default: 0
  },
  trigger: {
    type: String,
    default: 'hover'
  },
  indicatorPosition: {
    type: String,
    default: 'bottom'
  },
  arrow: {
    type: String,
    default: 'hover',
    validator: (value) => ['always', 'hover', 'never'].includes(value)
  },
  direction: {
    type: String,
    default: 'horizontal',
    validator: (value) => ['horizontal', 'vertical'].includes(value)
  }
}