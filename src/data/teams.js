// 16 African teams for the Round of 16
export const teams = [
  { id: 'morocco', name: 'Morocco', flag: '🇲🇦' },
  { id: 'senegal', name: 'Senegal', flag: '🇸🇳' },
  { id: 'egypt', name: 'Egypt', flag: '🇪🇬' },
  { id: 'nigeria', name: 'Nigeria', flag: '🇳🇬' },
  { id: 'algeria', name: 'Algeria', flag: '🇩🇿' },
  { id: 'tunisia', name: 'Tunisia', flag: '🇹🇳' },
  { id: 'cameroon', name: 'Cameroon', flag: '🇨🇲' },
  { id: 'ghana', name: 'Ghana', flag: '🇬🇭' },
  { id: 'ivory_coast', name: 'Ivory Coast', flag: '🇨🇮' },
  { id: 'mali', name: 'Mali', flag: '🇲🇱' },
  { id: 'burkina_faso', name: 'Burkina Faso', flag: '🇧🇫' },
  { id: 'south_africa', name: 'South Africa', flag: '🇿🇦' },
  { id: 'guinea', name: 'Guinea', flag: '🇬🇳' },
  { id: 'cape_verde', name: 'Cape Verde', flag: '🇨🇻' },
  { id: 'angola', name: 'Angola', flag: '🇦🇴' },
  { id: 'equatorial_guinea', name: 'Equatorial Guinea', flag: '🇬🇶' },
]

// Helper function to get team by ID
export function getTeamById(id) {
  return teams.find(team => team.id === id)
}

// Helper function to get teams by IDs
export function getTeamsByIds(ids) {
  return ids.map(id => getTeamById(id)).filter(Boolean)
}

