// 16 African teams for the Round of 16 - CAN 2025 Real Bracket
export const teams = [
  // Côté gauche
  { id: "senegal", name: "Sénégal", flag: "🇸🇳" },
  { id: "sudan", name: "Soudan", flag: "🇸🇩" },
  { id: "mali", name: "Mali", flag: "🇲🇱" },
  { id: "tunisia", name: "Tunisie", flag: "🇹🇳" },
  { id: "egypt", name: "Égypte", flag: "🇪🇬" },
  { id: "benin", name: "Bénin", flag: "🇧🇯" },
  { id: "ivory_coast", name: "Côte d'Ivoire", flag: "🇨🇮" },
  { id: "burkina_faso", name: "Burkina Faso", flag: "🇧🇫" },
  // Côté droit
  { id: "south_africa", name: "Afrique du Sud", flag: "🇿🇦" },
  { id: "cameroon", name: "Cameroun", flag: "🇨🇲" },
  { id: "morocco", name: "Maroc", flag: "🇲🇦" },
  { id: "tanzania", name: "Tanzanie", flag: "🇹🇿" },
  { id: "nigeria", name: "Nigeria", flag: "🇳🇬" },
  { id: "mozambique", name: "Mozambique", flag: "🇲🇿" },
  { id: "algeria", name: "Algérie", flag: "🇩🇿" },
  { id: "dr_congo", name: "RD Congo", flag: "🇨🇩" },
];

// Helper function to get team by ID
export function getTeamById(id) {
  return teams.find((team) => team.id === id);
}

// Helper function to get teams by IDs
export function getTeamsByIds(ids) {
  return ids.map((id) => getTeamById(id)).filter(Boolean);
}
