export const AXES = [
  'Emergence',
  'Interiority',
  'Meaning-making',
  'Embodiment',
  'Relationality',
] as const;

export const AXIS_SUBTITLES = [
  'Creating together in the moment',
  'Access to inner experience',
  'Understanding & transmissible knowledge',
  'Body as a site of knowing',
  'Real-time connection between people',
] as const;

export const MAX_VALUE = 5;

export type PracticeGroup = 'rm' | 'other';

export interface Practice {
  name: string;
  scores: number[];
  group: PracticeGroup;
  color: string;
}

export const PRACTICES: Practice[] = [
  // Choreo-Musical (RM) — warm colors
  { name: 'Capoeira Roda',      scores: [5, 4, 4, 5, 5], group: 'rm', color: '#E25822' },
  { name: 'Rumba / Bomba',      scores: [5, 4, 5, 5, 5], group: 'rm', color: '#D4A017' },
  { name: 'Jazz',               scores: [5, 4, 4, 3, 5], group: 'rm', color: '#C7254E' },
  { name: 'Social Dance Floor', scores: [4, 4, 3, 5, 4], group: 'rm', color: '#FF6B35' },
  // Other technologies of remembering — cool colors
  { name: 'Meditation',           scores: [2, 5, 3, 3, 1], group: 'other', color: '#2E86AB' },
  { name: 'Classical Yoga',       scores: [2, 5, 4, 5, 3], group: 'other', color: '#5B8C5A' },
  { name: 'Psychotherapy',        scores: [3, 5, 4, 2, 3], group: 'other', color: '#7B68EE' },
  { name: 'Team Sports',          scores: [4, 2, 2, 5, 5], group: 'other', color: '#20B2AA' },
  { name: 'Psychedelics',         scores: [4, 5, 4, 3, 2], group: 'other', color: '#6A5ACD' },
  { name: 'Protest / March',      scores: [3, 3, 4, 4, 5], group: 'other', color: '#4682B4' },
  { name: 'Reading / Literature', scores: [1, 3, 5, 1, 1], group: 'other', color: '#708090' },
  { name: 'Theater (Audience)',   scores: [2, 3, 5, 2, 2], group: 'other', color: '#9370DB' },
];

export const RM_PRACTICES = PRACTICES.filter(p => p.group === 'rm');
export const OTHER_PRACTICES = PRACTICES.filter(p => p.group === 'other');
