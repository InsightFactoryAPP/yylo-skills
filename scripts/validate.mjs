#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const skillsRoot = path.join(root, 'skills');
const expected = [
  'artifact-yylo',
  'ledger-tasks-yylo',
  'plan-ledger-tasks-yylo',
  'ralph-loop-yylo',
  'understand-project-yylo',
  'wiki-yylo',
  'workflow-yylo',
];
const actual = fs.readdirSync(skillsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
if (JSON.stringify(actual) !== JSON.stringify(expected)) {
  throw new Error(`unexpected canonical skills: ${actual.join(', ')}`);
}

const requiredContracts = {
  'artifact-yylo': ['$ARGUMENTS'],
  'ledger-tasks-yylo': ['$ARGUMENTS'],
  'plan-ledger-tasks-yylo': ['$ARGUMENTS'],
  'ralph-loop-yylo': ['Read [references/implement.md](references/implement.md) completely',
    '## Complete assigned request', '$ARGUMENTS'],
  'understand-project-yylo': ['$1', '$2', '$ARGUMENTS', '### Main task',
    '### Constraints and context', '### Complete raw request'],
  'wiki-yylo': ['$ARGUMENTS'],
  'workflow-yylo': ['$ARGUMENTS'],
};
const legacy = ['kanban-workflow', 'plan-kanban-tasks', 'ralph-loop`', 'understand-project`'];
for (const slug of expected) {
  const directory = path.join(skillsRoot, slug);
  const skillPath = path.join(directory, 'SKILL.md');
  const readmePath = path.join(directory, 'README.md');
  if (!fs.existsSync(skillPath) || !fs.existsSync(readmePath)) {
    throw new Error(`missing SKILL.md or README.md for ${slug}`);
  }
  const text = fs.readFileSync(skillPath, 'utf8');
  if (!text.startsWith('---\n') || !text.includes(`\nname: ${slug}\n`)) {
    throw new Error(`frontmatter identity mismatch for ${slug}`);
  }
  for (const literal of [...requiredContracts[slug], 'Record kind/profile',
    'actual immutable Record ID', 'actual Ledger slug', 'native get readback',
    'Never invent a slug', 'IDs remain authoritative']) {
    if (!text.includes(literal)) throw new Error(`${slug} lost invocation contract: ${literal}`);
  }
  for (const match of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1];
    if (/^(?:https?:|#)/.test(target)) continue;
    if (!fs.existsSync(path.resolve(directory, target))) {
      throw new Error(`${slug} has unresolved local reference: ${target}`);
    }
  }
}

const markdown = [];
for (const directory of [root, ...expected.map((slug) => path.join(skillsRoot, slug))]) {
  const visit = (current) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      if (entry.name.startsWith('.')) continue;
      const file = path.join(current, entry.name);
      if (entry.isDirectory() && current !== root) visit(file);
      else if (entry.isFile() && entry.name.endsWith('.md')) markdown.push(fs.readFileSync(file, 'utf8'));
    }
  };
  visit(directory);
}
const joined = markdown.join('\n');
for (const old of legacy) {
  if (joined.includes(old)) throw new Error(`legacy skill reference remains: ${old}`);
}

const normalized = joined.replace(/\s+/g, ' ');
for (const retired of [
  /public Ledger .* surface is task-oriented|Do not advertise `record`/i,
  /\byy(?:lo)?\s+merge\s+(?:arbiter|drive|next|resolve)\b/i,
  /sole lifecycle-semantic review owner|Reviewer A then Reviewer B|risk-based review sequence/i,
  /Run `yy task preflight TASK_ID` before|validates the exact preflighted tip/i,
  /\byy(?:lo)?\s+task\s+(?:run|resume|recover-predispatch|recover-wall-budget)\b/i,
  /\byy(?:lo)?\s+watch\s+exec\b/i,
]) {
  if (retired.test(normalized)) throw new Error(`retired lifecycle instruction: ${retired}`);
}
const implementation = fs.readFileSync(path.join(skillsRoot, 'ralph-loop-yylo/references/implement.md'), 'utf8');
for (const contract of [
  'Optional read-only `yy task preflight TASK_ID`', 'not a prerequisite',
  'Finish independently enforces admission', 'configured validation',
  'outside merge', 'launches no models', 'fencing token', 'hydration',
  'yy task finish TASK_ID --lease-token <current-token>',
  'yy merge status TASK_ID', 'yy merge land TASK_ID', 'yy merge project TASK_ID',
  'projects Ledger automatically', 'Recompose and recheck', 'preserve private conflicts',
  'The external agent performs implementation', 'budget recovery are retired',
  'read-only observer of existing evidence', 'never replay/reset them automatically',
]) {
  if (!implementation.replace(/\s+/g, ' ').includes(contract)) throw new Error(`missing native delivery contract: ${contract}`);
}

const config = JSON.parse(fs.readFileSync(path.join(root, 'skills.sh.json'), 'utf8'));
if (config.$schema !== 'https://skills.sh/schemas/skills.sh.schema.json') {
  throw new Error('skills.sh.json schema identity is missing');
}
const grouped = config.groupings.flatMap((group) => group.skills).sort();
if (JSON.stringify(grouped) !== JSON.stringify(expected)) {
  throw new Error(`skills.sh.json grouping mismatch: ${grouped.join(', ')}`);
}
if (!/^2\.\d+\.\d+$/.test(fs.readFileSync(path.join(root, 'VERSION'), 'utf8').trim())) {
  throw new Error('VERSION must identify the v2 skill contract');
}
const plugin = JSON.parse(fs.readFileSync(path.join(root, '.claude-plugin/plugin.json'), 'utf8'));
if (plugin.version !== fs.readFileSync(path.join(root, 'VERSION'), 'utf8').trim()) {
  throw new Error('plugin version must match VERSION');
}
console.log(`validated ${expected.length} canonical skills, nested lifecycle guidance and invocation contracts`);
