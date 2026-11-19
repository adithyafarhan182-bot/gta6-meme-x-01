// gta6-meme-x-01: the entry is a post on X. This program copies the post's
// address (POST.json) from the repository into the output directory, where
// the gate reads it. That is the whole job: the house reads the post itself
// from X, builds the dossier from its first picture and text, and the judge
// sees that. Nothing else written here is judged.
//
// Standard library only, no network, no clock, no files outside the repo:
// the two runs of an entry must write the same bytes.
//
// Local run:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const source = join(botDir, "POST.json");
const target = join(outputDir, "POST.json");

if (!existsSync(source)) {
  console.error(`POST.json not found in ${botDir}`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });

const bytes = readFileSync(source);
try {
  JSON.parse(bytes.toString("utf8"));
} catch (error) {
  console.error(`POST.json in ${botDir} is not valid JSON: ${(error as Error).message}`);
  process.exit(1);
}
writeFileSync(target, bytes);
