const SPAN_VALUES = [...Array(24).keys(), 24];

export const ColProps = {
  span: {
    type: Number,
    default: 24,
    validator(value) {
      return SPAN_VALUES.includes(value);
    },
  },
  offset: {
    type: Number,
    default: 0,
    validator(value) {
      return SPAN_VALUES.includes(value);
    },
  },
};
