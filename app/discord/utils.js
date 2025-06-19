import fs from 'fs';
import path from 'path';

// Toggle test mode via environment variable
export const TEST_MODE = process.env.TEST_MODE === 'true';

// Paths for configs and test output
const CONFIG_PATH    = path.join(process.cwd(), 'app', 'configs', 'config.json');
const LAST_SEEN_PATH = path.join(process.cwd(), 'app', 'configs', 'lastSeen.json');
const TEST_OUTPUT    = path.join(process.cwd(), 'app', 'configs', 'testOutput.json');

export let lastSeen = {};

export function loadConfig() {
  const cfg = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
  const { enabledApis, watches } = cfg;

  return watches
    .filter(w => enabledApis.includes(w.api))
    .map(w => {
      const chanKey = w['discord-text-channel'];
      const resolved = process.env[chanKey] || chanKey;

      return {
        ...w,
        'discord-text-channel': resolved
      };
    });
}

export function loadLastSeen() {
  try {
    lastSeen = JSON.parse(fs.readFileSync(LAST_SEEN_PATH, 'utf-8'));
  } catch {
    lastSeen = {};
  }
}

export function saveLastSeen() {
  fs.writeFileSync(LAST_SEEN_PATH, JSON.stringify(lastSeen, null, 2));
}

export function filterPost(text, watch) {
  const lc = text.toLowerCase();
  const hasKeyword = !watch.keywords.length ||
    watch.keywords.some(k => lc.includes(k.toLowerCase()));
  const hasExcluded = watch.excluded.some(e => lc.includes(e.toLowerCase()));
  return hasKeyword && !hasExcluded;
}

export function recordTestPost(entry) {
  // In TEST_MODE, append to testOutput.json
  let arr = [];
  try {
    arr = JSON.parse(fs.readFileSync(TEST_OUTPUT, 'utf-8'));
  } catch {}
  arr.push(entry);
  fs.writeFileSync(TEST_OUTPUT, JSON.stringify(arr, null, 2));
}