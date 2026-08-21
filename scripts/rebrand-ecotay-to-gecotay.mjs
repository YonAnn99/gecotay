#!/usr/bin/env node
/**
 * Rebrand script: replace all user-visible "Ecotay" with "Gecotay".
 * Run: node scripts/rebrand-ecotay-to-gecotay.mjs
 * Add --write to actually write files (default is dry-run).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const WRITE = process.argv.includes('--write');

const TARGET_GLOBS = [
  'app/**/*.ts',
  'app/**/*.tsx',
  'app/**/*.json',
];

// Helper to expand globs (simple)
import { globSync } from 'glob';

const files = TARGET_GLOBS.flatMap(g => globSync(g, { cwd: ROOT, absolute: true }));

const replaceMap = [
  // Legal entity
  [/Grupo Ecotay S\.A\.S\. de C\.V\./g, 'Grupo Gecotay S.A.S. de C.V.'],
  // Common brand
  [/Grupo Ecotay/g, 'Grupo Gecotay'],
  // Standalone word Ecotay (case-sensitive)
  [/(?<!\w)Ecotay(?!\w)/g, 'Gecotay'],
  // Uppercase
  [/(?<!\w)ECOTAY(?!\w)/g, 'GECOTAY'],
];

let totalChanges = 0;
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  for (const [regex, repl] of replaceMap) {
    content = content.replace(regex, repl);
  }
  if (content !== original) {
    const diffLines = content.split('\n').filter((line, i) => line !== original.split('\n')[i]).length;
    console.log(`\n${path.relative(ROOT, file)}: ${diffLines} lines changed`);
    totalChanges++;
    if (WRITE) {
      fs.writeFileSync(file, content, 'utf8');
    }
  }
}

console.log(`\n${WRITE ? 'Applied' : 'Dry-run'} — ${totalChanges} files would be modified.`);
if (!WRITE) {
  console.log('Run with --write to apply changes.');
}