import { ref, computed, reactive } from 'vue'
import { teams } from '../data/teams.js'

const STORAGE_KEY = 'can-bracket-predictions'

// Initialize Round of 16 matches (8 matches with 16 teams)
function initializeMatches() {
  const roundOf16Matches = [
    { id: 1, round: 'round_of_16', teams: [teams[0], teams[1]], winner: null }, // Morocco vs Senegal
    { id: 2, round: 'round_of_16', teams: [teams[2], teams[3]], winner: null }, // Egypt vs Nigeria
    { id: 3, round: 'round_of_16', teams: [teams[4], teams[5]], winner: null }, // Algeria vs Tunisia
    { id: 4, round: 'round_of_16', teams: [teams[6], teams[7]], winner: null }, // Cameroon vs Ghana
    { id: 5, round: 'round_of_16', teams: [teams[8], teams[9]], winner: null }, // Ivory Coast vs Mali
    { id: 6, round: 'round_of_16', teams: [teams[10], teams[11]], winner: null }, // Burkina Faso vs South Africa
    { id: 7, round: 'round_of_16', teams: [teams[12], teams[13]], winner: null }, // Guinea vs Cape Verde
    { id: 8, round: 'round_of_16', teams: [teams[14], teams[15]], winner: null }, // Angola vs Equatorial Guinea
  ]
  
  // Initialize empty matches for subsequent rounds
  const quarterFinalMatches = Array.from({ length: 4 }, (_, i) => ({
    id: 9 + i,
    round: 'quarter_final',
    teams: [null, null],
    winner: null,
  }))
  
  const semiFinalMatches = Array.from({ length: 2 }, (_, i) => ({
    id: 13 + i,
    round: 'semi_final',
    teams: [null, null],
    winner: null,
  }))
  
  const finalMatch = {
    id: 15,
    round: 'final',
    teams: [null, null],
    winner: null,
  }
  
  return [...roundOf16Matches, ...quarterFinalMatches, ...semiFinalMatches, finalMatch]
}

export function useBracket() {
  const matches = ref(initializeMatches())
  const currentMatchIndex = ref(0)
  
  // Get all matches in order
  const allMatches = computed(() => matches.value)
  
  // Get current match
  const currentMatch = computed(() => {
    if (currentMatchIndex.value >= matches.value.length) {
      return null
    }
    return matches.value[currentMatchIndex.value]
  })
  
  // Check if we're at the final recap
  const isFinalRecap = computed(() => {
    return currentMatchIndex.value >= matches.value.length || 
           (currentMatch.value && currentMatch.value.round === 'final' && currentMatch.value.winner !== null)
  })
  
  // Get champion (winner of final)
  const champion = computed(() => {
    const final = matches.value.find(m => m.round === 'final')
    return final?.winner || null
  })
  
  // Get matches by round
  const getMatchesByRound = (round) => {
    return matches.value.filter(m => m.round === round)
  }
  
  // Populate next round matches based on winners
  function populateNextRound(currentRound) {
    const currentRoundMatches = matches.value.filter(m => m.round === currentRound)
    const winners = currentRoundMatches.map(m => m.winner).filter(Boolean)
    
    if (winners.length === 0) return
    
    let nextRound
    let nextRoundStartIndex
    
    if (currentRound === 'round_of_16') {
      nextRound = 'quarter_final'
      nextRoundStartIndex = 8 // Matches 9-12
    } else if (currentRound === 'quarter_final') {
      nextRound = 'semi_final'
      nextRoundStartIndex = 12 // Matches 13-14
    } else if (currentRound === 'semi_final') {
      nextRound = 'final'
      nextRoundStartIndex = 14 // Match 15
    } else {
      return
    }
    
    // Pair winners for next round
    for (let i = 0; i < winners.length; i += 2) {
      const matchIndex = nextRoundStartIndex + Math.floor(i / 2)
      if (matchIndex < matches.value.length) {
        matches.value[matchIndex].teams[0] = winners[i]
        matches.value[matchIndex].teams[1] = winners[i + 1] || null
      }
    }
  }
  
  // Select winner for current match
  function selectWinner(team) {
    if (!currentMatch.value) return
    
    // Set winner
    currentMatch.value.winner = team
    
    // Check if all matches in current round are complete
    const currentRound = currentMatch.value.round
    const roundMatches = matches.value.filter(m => m.round === currentRound)
    const allRoundMatchesComplete = roundMatches.every(m => m.winner !== null)
    
    // Populate next round if current round is complete
    if (allRoundMatchesComplete) {
      populateNextRound(currentRound)
    }
    
    // Advance to next match
    if (currentMatchIndex.value < matches.value.length - 1) {
      // Find next match that has teams assigned
      let nextIndex = currentMatchIndex.value + 1
      while (nextIndex < matches.value.length) {
        const nextMatch = matches.value[nextIndex]
        if (nextMatch.teams[0] && nextMatch.teams[1]) {
          currentMatchIndex.value = nextIndex
          break
        }
        nextIndex++
      }
      
      // If no next match found, we're done
      if (nextIndex >= matches.value.length) {
        currentMatchIndex.value = matches.value.length
      }
    } else {
      currentMatchIndex.value = matches.value.length
    }
    
    // Save to localStorage
    saveToLocalStorage()
  }
  
  // Reset all predictions
  function resetPredictions() {
    matches.value = initializeMatches()
    currentMatchIndex.value = 0
    localStorage.removeItem(STORAGE_KEY)
  }
  
  // Save to localStorage
  function saveToLocalStorage() {
    const data = {
      matches: matches.value.map(m => ({
        id: m.id,
        round: m.round,
        teams: m.teams.map(t => t?.id || null),
        winner: m.winner?.id || null,
      })),
      currentMatchIndex: currentMatchIndex.value,
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }
  
  // Load from localStorage
  function loadFromLocalStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) return false
      
      const data = JSON.parse(stored)
      
      // Restore matches
      data.matches.forEach(storedMatch => {
        const match = matches.value.find(m => m.id === storedMatch.id)
        if (match) {
          match.teams = storedMatch.teams.map(id => 
            id ? teams.find(t => t.id === id) : null
          )
          match.winner = storedMatch.winner 
            ? teams.find(t => t.id === storedMatch.winner)
            : null
        }
      })
      
      // Restore current match index
      if (data.currentMatchIndex !== undefined) {
        // Find the first match that needs a winner
        let index = data.currentMatchIndex
        while (index < matches.value.length) {
          const match = matches.value[index]
          if (match.teams[0] && match.teams[1] && !match.winner) {
            currentMatchIndex.value = index
            return true
          }
          index++
        }
        // If all matches have winners, go to final recap
        currentMatchIndex.value = matches.value.length
      }
      
      return true
    } catch (error) {
      console.error('Error loading from localStorage:', error)
      return false
    }
  }
  
  return {
    matches,
    currentMatchIndex,
    allMatches,
    currentMatch,
    isFinalRecap,
    champion,
    getMatchesByRound,
    selectWinner,
    resetPredictions,
    loadFromLocalStorage,
    saveToLocalStorage,
  }
}

