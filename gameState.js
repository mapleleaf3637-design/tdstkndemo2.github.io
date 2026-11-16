/**
 * Lightweight progress model; story replay never resets stage progress.
 * No stage tutorial is marked complete from a prologue event.
 */
const STORAGE_KEY = 'lost-elephant-archive:v1';

const defaults = () => ({
  currentStage: 'prologue',
  completedStages: [],
  unlockedBranches: [],
  collectedEvidence: [],
  prologueStatus: 'not-started', // 'completed' | 'skipped'
  stage1TutorialCompleted: false,
});

function load() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults();
    const saved = JSON.parse(raw);
    if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return defaults();
    const base = defaults();
    return {
      ...base,
      ...saved,
      completedStages: Array.isArray(saved.completedStages) ? saved.completedStages : [],
      unlockedBranches: Array.isArray(saved.unlockedBranches) ? saved.unlockedBranches : [],
      collectedEvidence: Array.isArray(saved.collectedEvidence) ? saved.collectedEvidence : [],
      // Old or malformed saves must not count as having watched the Stage 1 tutorial.
      stage1TutorialCompleted: saved.stage1TutorialCompleted === true,
    };
  } catch (error) {
    console.warn('Could not load game progress; using a temporary session.', error);
    return defaults();
  }
}

let state = load();

export function getGameState() {
  return JSON.parse(JSON.stringify(state));
}

export function updateGameState(patch) {
  state = { ...state, ...patch };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('Progress could not be saved in this browser.', error);
  }
  return getGameState();
}

/** Future stages can call this after a genuinely completed evidence challenge. */
export function restoreKnowledgeBranch(branchId) {
  const valid = ['behavior', 'domestication', 'care', 'culture', 'society', 'economy'];
  if (!valid.includes(branchId)) throw new Error(`Unknown branch: ${branchId}`);
  updateGameState({ unlockedBranches: [...new Set([...state.unlockedBranches, branchId])] });
}

/** Intentionally never called by the Prologue or Skip actions. */
export function setStage1TutorialCompleted() {
  updateGameState({ stage1TutorialCompleted: true });
}
