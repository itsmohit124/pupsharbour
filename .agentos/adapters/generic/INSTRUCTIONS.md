<!-- agentos:begin -->
# AgentOS (generic)

AgentOS is the source of truth for skills, permissions, context, workflow, and validation.
This file tells the agent when to call the `agentos` CLI. It does not run those commands.

## Commands

- Build a Context Pack: `agentos context build "<task>"`
- Validate the project: `agentos validate --kind unit_test`
- Plan a workflow: `agentos plan "<task>"`
- Execute a saved plan: `agentos run <plan-id> --runner manual`

Pass `--root <project>` when the working directory is not the project root.

## Invocation policy

`user_invocable` and `model_invocable` stay independent. A user-invoked-only skill must not be selected by the model.
AgentOS denies that call. Permissions are default-deny and are checked by AgentOS.
Nothing in this file grants `fs.read`, `fs.write`, `shell`, `network`, or `browser`.

## Model-invocable skills

- `architecture-review` user_invocable=true model_invocable=true permissions=fs.read
- `code-review` user_invocable=true model_invocable=true permissions=fs.read,shell
- `domain-modeling` user_invocable=true model_invocable=true permissions=fs.read,fs.write
- `implementation` user_invocable=true model_invocable=true permissions=fs.read,fs.write,shell
- `interface-design` user_invocable=true model_invocable=true permissions=fs.read,fs.write
- `research` user_invocable=true model_invocable=true permissions=fs.read,network
- `tdd` user_invocable=true model_invocable=true permissions=fs.read,fs.write,shell

## User-invoked only

- `engineering-router` user_invocable=true model_invocable=false permissions=(none)
- `grilling` user_invocable=true model_invocable=false permissions=fs.read
- `improve-codebase-architecture` user_invocable=true model_invocable=false permissions=fs.read,fs.write,shell
- `setup-agentos` user_invocable=true model_invocable=false permissions=fs.read

## Skills location

Canonical skills are portable `SKILL.md` packages under `.agents/skills/` and `.agentos/skills/`.
Built-in skills are compiled into `agentos`. Do not copy a skill to change who may invoke it.

Any agent that can read files and run commands can use this project.
`.agentos/adapters/generic/skills.json` is a generated index, not a second registry.
<!-- agentos:end -->
