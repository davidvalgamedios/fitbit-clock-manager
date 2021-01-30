interface Preferences {
  clockDisplay: '12h' | '24h';
  firstDayOfWeek: 0 | 1;
}

export const preferences: Preferences = {
  clockDisplay: '24h',
  firstDayOfWeek: 1
}
