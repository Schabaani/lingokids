function paintCardColor(index: number) {
  const COLORS = [
    '#0075BE',
    '#855AC9',
    '#919191',
    '#E54222',
    '#37796C',
    '#0C3348',
  ];
  return COLORS[index % COLORS.length];
}

export {paintCardColor};
