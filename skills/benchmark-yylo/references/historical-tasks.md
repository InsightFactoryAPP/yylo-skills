# Historical coding-task study checklist

Use installed help and the selected Benchmark release's contracts. The following
checks are preventative guidance, not proof that a particular host, account or
historical repository has passed them. Store experiment-specific status and
receipts on Ledger, never in canonical skill instructions.

## Historical truth and selection

- Select completed implementation tasks with recoverable requirements and commits.
  Exclude duplicate umbrellas, release-only operations and unreproducible external
  dependencies, recording why. Stratify before seeing outcomes; disclose purposive
  sampling and public-repository training-contamination risk.
- Resolve the full development range. An integrated SHA can be a final two-line
  repair after a larger implementation; evaluating only that parent diff measures
  the wrong task. Record original base, solution range and integration mapping.
- Strip completion responses, solution references and future Git objects from
  candidate inputs. A synthetic fixture commit needs an explicit mapping to the
  original base and a manifest of every omission or setup-only addition.
- Pin original requirements and acceptance criteria. Never redefine success after
  seeing a candidate. Equivalent implementations need not match the original patch.
  Prefer public behavioral oracles: a hidden mock tied to the original internal
  function can reject an equivalent correct implementation. If this is discovered,
  retain the frozen result, record grader invalidity, and bind an explicit
  supplemental evaluation without relabeling the original failed gate as passed.
- Verify the historical baseline exposes the missing capability and the reference
  solution passes the same frozen checks. A broken reference is a setup failure.

## Exact-shape setup canary

Test the exact attempt-directory shape: actual nesting, Git shape, ignore rules,
tool versions, HOME/auth setup and evaluator entrypoint, not just a convenient
empty directory.
A successful remote smoke proves only that smoke, not the full benchmark pipeline.
Keep setup-only and smoke costs out of scored candidate costs and visible in totals.

For YYLO Pi on fresh repositories:

- A fresh Git snapshot is not necessarily a ready YYLO workspace. Where supported,
  use explicit `yy init --mode simple --directory PATH --plan-file EXTERNAL_FILE`,
  inspect the plan, then `yy init --mode simple --apply-plan EXTERNAL_FILE`.
  Initialization does not itself authorize provider dispatch.
- Simple initialization refuses ignore rules that hide durable configuration. Do
  not add a blanket `.juno_task/` ignore and then force initialization to succeed.
  Correct experiment-owned fixture rules explicitly before freezing a new plan.
- Simple initialization also refuses a conflicting ancestor YYLO workspace.
  Initializing the fixture source for a judge can break later nested candidate
  attempts. Keep judge/smoke workspaces independent of candidate ancestors. Record
  any adapter-owned execution cwd changes, rather than pretending every process
  uses the Benchmark request cwd.
- Preserve original generated build inputs. Historical package build commands may
  require authored runtime twins or root-level generated instruction files outside
  the package subtree. Reconstruct them from the same base/canonical source, record
  their manifests, and validate parity. Never borrow current controller metadata.
- Use Node/tool versions and exact locks required by that historical case. Install
  each attempt's dependencies locally; do not copy or symlink dependency trees.
  If dependencies sit outside the candidate manifest, record the exact location,
  lock hash, installer result and setup time. Do not include credential stores in
  manifests, reference patches, prompts or reports.
- Remove stale outer-session/controller/model assertions only when establishing a
  verified new execution context, never to defeat admission or choose a hidden
  model override. Pass the selected provider-qualified model explicitly to `yy pi`.
  Use file-backed prompt transport for shell-sensitive content.

## Harness and evaluator readiness

Default isolation and trusted-host configuration are not interchangeable. Inspect
receipts for the actual boundary. With explicit trusted-host authority, use the
supported configuration rather than patching out checks. Document that shared
host paths/account files are not technically inaccessible. Never claim full
sandboxing or proven absence of contamination in that lane.

Read installed provider/account documentation. Dynamic model catalogs can differ
from built-in static catalogs. A missing alias or static entry is a discovery gap,
not proof a model cannot run. Confirm exact observed identity and preserve errors;
no fallback to another model, account, provider CLI or harness.

Smoke both candidate and judge launchers, plus the deterministic evaluator. Native
Benchmark versions may impose a fixed deterministic-command timeout even if the
candidate budget is longer. Measure the entire evaluator wall time; split checks
into supported bounded profiles or fix the timeout contract before scoring. Do
not attribute evaluator timeout or missing dependencies to candidate capability.

Evaluate a separate grader copy, not the retained candidate workspace. Candidate
staging, commits and new files all count: derive the patch from the fresh snapshot
root, not just current HEAD. Freeze hidden tests outside candidate visibility and
preserve exact packet bytes, their digests, test output and judge prompt provenance.
A judge with read access must receive only the intended anonymized packet by
policy; disclose when that restriction is not technically enforced.

Do not dispatch judges needlessly on invalid candidate infrastructure. If the
installed pipeline does so, retain the wasted usage and file a Ledger finding;
a judge's opinion about an empty patch does not make a missing candidate valid.

## Immutable evidence and repair

- Retain intent, terminal, post-execution manifest, evaluation generations and
  producer identity. An interrupted attempt without a verified terminal is
  ambiguous: inspect recovery rather than issuing an automatic retry.
- Changed prompts, setup, harness, rubric or tests require a distinguishable new
  plan/cohort. Keep original failures and expenses. Do not mix repaired trials
  into a misleading single-attempt success rate.
- A secret-pattern scanner may flag fixture/example source. Inspect without
  printing potential secrets; never remove validation to obtain a green result.
  Preserve evidence and report whether doctor/report failed, including the exact
  category. A manually derived comparison is not a verified native report.
- Use supported artifact capture with profile, payload mode, provenance and
  retention. Artifact metadata/history retrieval is not byte round-trip proof.
  Some installed help surfaces expose document-only source rendering on artifact
  commands; record the failure, preserve the external payload and do not claim
  successful byte verification. Do not manually edit the Ledger store.
- Record documentation/help/skill gaps with reproduction, installed versions,
  expected behavior, impact, evidence IDs and proposed fix. Fixes require their
  own admitted workspace; activating/publishing them requires separate authority.

## Per-task report and advancement gate

Include task and commit identities; original and normalized inputs; protocol and
plan IDs; requested/resolved/observed models and sessions; exact settings; baseline
and reference checks; candidate patches and acceptance; blinded judge reasoning;
validity versus quality; candidate/setup/judge wall times and tokens; raw cost
coverage and separately labelled estimates or billing; failures, repairs, unknowns,
reproducibility and isolation limitations.

Report one attempt as one observation, not a reliable failure probability. Retain
all denominators and abstentions. After saving and inspecting the pilot, wait for
owner approval before task 2 or more repetitions when that gate is part of the
protocol. A publication-ready report requires resolved integrity gaps and an
explicit disclosure of study limitations; frontend/repository publication remains
a separate operation.
