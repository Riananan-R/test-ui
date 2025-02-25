const ROW_JUSTIFY = ['start', 'end', 'center', 'space-around', 'space-between']

export const RowProps = {
  gutter: {
    type: Number,
    default: 0,
  },
  justify: {
    type: String,
    default: 'start',
    validator: (value) => {
      return ROW_JUSTIFY.includes(value);
    },
  },
};