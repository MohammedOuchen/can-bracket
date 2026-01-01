import { ref, computed, reactive } from "vue";
import { teams } from "../data/teams.js";

const STORAGE_KEY = "can-bracket-predictions";

function initializeMatches() {
  const roundOf16Matches = [
    { id: 1, round: "round_of_16", teams: [teams[0], teams[1]], winner: null },
    { id: 2, round: "round_of_16", teams: [teams[2], teams[3]], winner: null },
    { id: 3, round: "round_of_16", teams: [teams[4], teams[5]], winner: null },
    { id: 4, round: "round_of_16", teams: [teams[6], teams[7]], winner: null },
    { id: 5, round: "round_of_16", teams: [teams[8], teams[9]], winner: null },
    {
      id: 6,
      round: "round_of_16",
      teams: [teams[10], teams[11]],
      winner: null,
    },
    {
      id: 7,
      round: "round_of_16",
      teams: [teams[12], teams[13]],
      winner: null,
    },
    {
      id: 8,
      round: "round_of_16",
      teams: [teams[14], teams[15]],
      winner: null,
    },
  ];

  const quarterFinalMatches = Array.from({ length: 4 }, (_, i) => ({
    id: 9 + i,
    round: "quarter_final",
    teams: [null, null],
    winner: null,
  }));

  const semiFinalMatches = Array.from({ length: 2 }, (_, i) => ({
    id: 13 + i,
    round: "semi_final",
    teams: [null, null],
    winner: null,
  }));

  const finalMatch = {
    id: 15,
    round: "final",
    teams: [null, null],
    winner: null,
  };

  return [
    ...roundOf16Matches,
    ...quarterFinalMatches,
    ...semiFinalMatches,
    finalMatch,
  ];
}

export function useBracket() {
  const matches = ref(initializeMatches());
  const currentMatchIndex = ref(0);

  const allMatches = computed(() => matches.value);

  const currentMatch = computed(() => {
    if (currentMatchIndex.value >= matches.value.length) {
      return null;
    }
    return matches.value[currentMatchIndex.value];
  });

  const isFinalRecap = computed(() => {
    return (
      currentMatchIndex.value >= matches.value.length ||
      (currentMatch.value &&
        currentMatch.value.round === "final" &&
        currentMatch.value.winner !== null)
    );
  });

  const champion = computed(() => {
    const final = matches.value.find((m) => m.round === "final");
    return final?.winner || null;
  });

  const getMatchesByRound = (round) => {
    return matches.value.filter((m) => m.round === round);
  };

  function populateNextRound(currentRound) {
    const currentRoundMatches = matches.value.filter(
      (m) => m.round === currentRound
    );
    const winners = currentRoundMatches.map((m) => m.winner).filter(Boolean);

    if (winners.length === 0) return;

    let nextRound;
    let nextRoundStartIndex;

    if (currentRound === "round_of_16") {
      nextRound = "quarter_final";
      nextRoundStartIndex = 8;
    } else if (currentRound === "quarter_final") {
      nextRound = "semi_final";
      nextRoundStartIndex = 12;
    } else if (currentRound === "semi_final") {
      nextRound = "final";
      nextRoundStartIndex = 14;
    } else {
      return;
    }

    for (let i = 0; i < winners.length; i += 2) {
      const matchIndex = nextRoundStartIndex + Math.floor(i / 2);
      if (matchIndex < matches.value.length) {
        matches.value[matchIndex].teams[0] = winners[i];
        matches.value[matchIndex].teams[1] = winners[i + 1] || null;
      }
    }
  }

  function selectWinner(team) {
    if (!currentMatch.value) return;

    currentMatch.value.winner = team;

    const currentRound = currentMatch.value.round;
    const roundMatches = matches.value.filter((m) => m.round === currentRound);
    const allRoundMatchesComplete = roundMatches.every(
      (m) => m.winner !== null
    );

    if (allRoundMatchesComplete) {
      populateNextRound(currentRound);
    }

    if (currentMatchIndex.value < matches.value.length - 1) {
      let nextIndex = currentMatchIndex.value + 1;
      while (nextIndex < matches.value.length) {
        const nextMatch = matches.value[nextIndex];
        if (nextMatch.teams[0] && nextMatch.teams[1]) {
          currentMatchIndex.value = nextIndex;
          break;
        }
        nextIndex++;
      }

      if (nextIndex >= matches.value.length) {
        currentMatchIndex.value = matches.value.length;
      }
    } else {
      currentMatchIndex.value = matches.value.length;
    }

    saveToLocalStorage();
  }

  function resetPredictions() {
    matches.value = initializeMatches();
    currentMatchIndex.value = 0;
    localStorage.removeItem(STORAGE_KEY);
  }

  function saveToLocalStorage() {
    const data = {
      matches: matches.value.map((m) => ({
        id: m.id,
        round: m.round,
        teams: m.teams.map((t) => t?.id || null),
        winner: m.winner?.id || null,
      })),
      currentMatchIndex: currentMatchIndex.value,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function loadFromLocalStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return false;

      const data = JSON.parse(stored);

      data.matches.forEach((storedMatch) => {
        const match = matches.value.find((m) => m.id === storedMatch.id);
        if (match) {
          match.teams = storedMatch.teams.map((id) =>
            id ? teams.find((t) => t.id === id) : null
          );
          match.winner = storedMatch.winner
            ? teams.find((t) => t.id === storedMatch.winner)
            : null;
        }
      });

      if (data.currentMatchIndex !== undefined) {
        let index = data.currentMatchIndex;
        while (index < matches.value.length) {
          const match = matches.value[index];
          if (match.teams[0] && match.teams[1] && !match.winner) {
            currentMatchIndex.value = index;
            return true;
          }
          index++;
        }
        currentMatchIndex.value = matches.value.length;
      }

      return true;
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return false;
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
  };
}
