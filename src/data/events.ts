export interface Event {
  id: string
  title: string
  date: string
  category: string
  description?: string
}

export const events: Event[] = [
  {
    id: '1',
    title: 'Mörk akusztik szett',
    date: '2026-05-30T21:00:00',
    category: 'Koncert',
  },
  {
    id: '2',
    title: 'Borbély András: új kötet bemutató',
    date: '2026-05-29T19:00:00',
    category: 'Egyéb',
  },
  {
    id: '3',
    title: 'Mennybéli táncház',
    date: '2026-05-28T20:00:00',
    category: 'Táncház',
  },
  {
    id: '4',
    title: 'Jazzszerda a Mennyben',
    date: '2026-05-27T20:00:00',
    category: 'Jazz',
  },
  {
    id: '5',
    title: 'Tarr Béla rövidfilm est',
    date: '2026-05-27T19:30:00',
    category: 'Filmklub',
  },
  {
    id: '6',
    title: 'Migration Pub Quiz + Holddalanap',
    date: '2026-05-23T19:00:00',
    category: 'Quiz',
  },
  {
    id: '7',
    title: 'Los Koyotes — koncert',
    date: '2026-05-22T21:00:00',
    category: 'Koncert',
  },
  {
    id: '8',
    title: 'Mennybéli táncház',
    date: '2026-05-21T20:00:00',
    category: 'Táncház',
  },
  {
    id: '9',
    title: 'Jazzszerda a Mennyben',
    date: '2026-05-20T20:00:00',
    category: 'Jazz',
  },
  {
    id: '10',
    title: 'Megnyitó buli',
    date: '2025-10-04T20:00:00',
    category: 'Koncert',
  },
]
