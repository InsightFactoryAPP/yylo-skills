import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

const source = path.resolve(import.meta.dirname, '..');
for (const skill of fs.readdirSync(path.join(source, 'skills'))) {
  test(`rejects missing actual slug reporting in ${skill}`, () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'yylo-reporting-contract-'));
    try {
      for (const item of ['skills', 'scripts', 'VERSION', 'skills.sh.json', '.claude-plugin']) {
        fs.cpSync(path.join(source, item), path.join(root, item), { recursive: true });
      }
      const file = path.join(root, 'skills', skill, 'SKILL.md');
      fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replace('actual Ledger slug', 'guessed slug'));
      assert.throws(() => execFileSync(process.execPath, [path.join(root, 'scripts/validate.mjs')],
        { stdio: 'pipe' }), /lost invocation contract: actual Ledger slug/);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });
}
for (const [name, injected] of [
  ['arbiter command', 'yy merge arbiter run TASK_ID'],
  ['drive command', 'yy merge drive TASK_ID'],
  ['obsolete capability denial', 'Do not advertise `record` or wiki namespaces.'],
  ['merge-owned reviewers', 'The managed queue is the sole lifecycle-semantic review owner.'],
  ['mandatory preflight', 'Run `yy task preflight TASK_ID` before expensive final validation.'],
]) {
  test(`rejects ${name} in nested skill references`, () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'yylo-skill-contract-'));
    try {
      for (const item of ['skills', 'scripts', 'VERSION', 'skills.sh.json', '.claude-plugin']) {
        fs.cpSync(path.join(source, item), path.join(root, item), { recursive: true });
      }
      const validate = () => execFileSync(process.execPath, [path.join(root, 'scripts/validate.mjs')], { stdio: 'pipe' });
      assert.doesNotThrow(validate);
      fs.writeFileSync(path.join(root, 'skills/ralph-loop-yylo/references/regression.md'), injected);
      assert.throws(validate, /retired lifecycle instruction/);
    } finally {
      fs.rmSync(root, { recursive: true, force: true });
    }
  });
}
