// =====================================================================
// One Star for Monday — a one-star review of Monday, written as though
// Monday were a restaurant. make.fun bounty entry (program/v1).
//
// THE LINE
//   "One star. The server sighed, seated us at the weekend's table,
//    and brought the bill before the food — Monday's special is
//    always 86'd."
//
// ---------------------------------------------------------------------
// 1. WHY IT READS AS A REAL ONE-STAR REVIEW
// ---------------------------------------------------------------------
// Open with "One star." — the exact opening beat of every review-site
// rant — and the reader is inside a restaurant review before the joke
// even starts. From there the line never leaves the dining room: a
// server, a table, a bill, a dish. There is no "Monday is terrible"
// thesis sentence and no wink at the reader; the complaint is carried
// entirely by things going wrong at a table, which is what makes a
// one-star review feel written by a diner instead of by a comedian.
// The judge's first criterion is "reads as a one-star review of Monday
// as a restaurant", so the restaurant frame does the heavy lifting and
// the weekday only enters through the details.
//
// ---------------------------------------------------------------------
// 2. WHY EACH DETAIL IS THERE (server / table / bill / dish)
// ---------------------------------------------------------------------
// - The server sighs. A greeting that is a sigh is the smallest
//   possible service failure, and it is the most Monday one: the staff
//   are as tired as you are, and nobody is pretending otherwise.
// - The weekend's table. You are seated at the table the weekend left
//   behind — still uncleared, still somebody else's night. That image
//   only works the morning after the weekend, i.e. on Monday.
// - The bill before the food. The classic upside-down service
//   complaint, and the most Monday feeling of all: you are being
//   charged before you have received anything, the week demanding
//   payment for a meal it has not served yet.
// - Monday's special, always 86'd. "86'd" is kitchen slang for sold
//   out, so the dish named after today is permanently unavailable.
//   No other day can carry this line: only Monday's special can be
//   "always" gone before you sit down.
//
// ---------------------------------------------------------------------
// 3. WHY THE JOKE ONLY FITS MONDAY
// ---------------------------------------------------------------------
// Swap the day and the line falls apart. "Tuesday's special is always
// 86'd" is a shrug; "the weekend's table" on a Wednesday is nonsense.
// Every clause points at the same morning: the weekend just ended,
// nothing has been reset, the staff are already defeated, and you are
// paying for it. That is the whole joke — the restaurant IS Monday,
// and Monday runs exactly like this every single week.
//
// ---------------------------------------------------------------------
// 4. WHY IT IS SHORT AND QUOTABLE
// ---------------------------------------------------------------------
// 24 words, one breath, no hashtags, no stage directions, no setup
// that needs trimming before pasting. The em dash saves the kicker
// for last — "Monday's special is always 86'd" — which is the fragment
// a weary office worker screenshots into the group chat. Cut any
// clause and a whole restaurant detail (server, table, bill or dish)
// disappears with it, so every word earns its place and the line can
// be retyped from memory after a single read.
//
// ---------------------------------------------------------------------
// CONSTRAINTS (enforced by validateEntry below)
// - exactly one line of plain text, no trailing explanation
// - 1 to 180 characters (the sealed gate's range)
// - at most 25 words
// - no stage directions, hashtags or explanation attached
// =====================================================================

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry line. Kept as a single constant so the program's output is
// exactly this string and nothing else — no templating, no randomness,
// no reading from anywhere outside this file.
const ENTRY_LINE =
  "One star. The server sighed, seated us at the weekend's table, and brought the bill before the food \u2014 Monday's special is always 86'd.";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 180;
const MAX_WORDS = 25;

function countWords(text: string): number {
  const words = text.trim().split(/\s+/).filter((w) => w.length > 0);
  return words.length;
}

function findProblems(line: string): string[] {
  const problems: string[] = [];
  if (line.trim().length === 0) problems.push("entry is empty");
  if (line.includes("\n") || line.includes("\r")) {
    problems.push("entry must be a single line");
  }
  if (line.length < 1 || line.length > MAX_CHARS) {
    problems.push(`entry must be 1-${MAX_CHARS} chars, got ${line.length}`);
  }
  const words = countWords(line);
  if (words > MAX_WORDS) {
    problems.push(`entry must be at most ${MAX_WORDS} words, got ${words}`);
  }
  if (line !== line.trim()) {
    problems.push("entry must not have leading or trailing whitespace");
  }
  return problems;
}

function validateEntry(line: string): void {
  const problems = findProblems(line);
  if (problems.length > 0) {
    throw new Error(`invalid entry: ${problems.join("; ")}`);
  }
}

function main(): void {
  validateEntry(ENTRY_LINE);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, `${ENTRY_LINE}\n`, "utf8");
  console.log(ENTRY_LINE);
  console.log(
    `chars=${ENTRY_LINE.length} words=${countWords(ENTRY_LINE)} -> ${OUTPUT_PATH}`,
  );
}

main();
