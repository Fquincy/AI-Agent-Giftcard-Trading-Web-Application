# AI Agent Development Learning Roadmap

## Objective

Develop Leyou into an authenticated demo application with a support agent. Demonstrate backend engineering, database design, tool calling, retrieval, evaluation, and deployment. Use fictional users, rates, and trades throughout.

## Reading the job screenshots

The screenshots are reference material, not implementation instructions.

| Job | Focus | Fit for this learning plan |
| --- | --- | --- |
| 1 / 1.1 | AI evaluation and code/agent annotation; 3–5 years advertised | Learn evaluation, code review, tool-use assessment, and data quality |
| 2 / 2.1 / 2.2 | AI Builder: requirements, APIs, full-stack delivery, prompting, RAG, agents | Strong initial direction; build and explain a complete application |
| 3 | Senior agent algorithm expert; 5–10 years advertised | Longer-term goal; detailed requirements are not visible |
| 4 | Agent developer/FDE; Python, backend implementation, business delivery | Relevant target; no experience restriction shown |
| 5 / 5.1 | Leadership, architecture, AI applications; 8+ years | Longer-term leadership path |

Job 2 advertises a 2027 graduate cohort, graduation between September 2026 and August 2027, and an October 31, 2026 application deadline. It also requests at least one year of related development experience. Confirm listing status and eligibility with the employer. These examples do not establish the overall market distribution.

## Core concepts

- LLM: a language model producing text or structured requests; its outputs can be wrong.
- Prompt: instructions and context provided to the model.
- Tool: a function implemented by your application, such as looking up a rate.
- Agent: a system in which the model can choose tools and use results over a bounded sequence of steps.
- Workflow: steps fixed by application code; useful for predictable processes.
- RAG: retrieve relevant information and supply it to the model before answering. RAG does not require an agent.
- Evaluation: repeatable checks of answer accuracy, tool execution, permissions, and failure handling.
- Fine-tuning: further model training using examples; study later if measured failures justify it.

Agents do not require databases. Files, APIs, and sample data are enough for initial practice. Database access should normally go through controlled backend functions, with server-side permissions.

## Recommended tools

Keep the existing Next.js and TypeScript application. Learn Python alongside it, then build a small FastAPI service as a separate exercise instead of immediately rewriting this website.

| Need | Suggested starting tool |
| --- | --- |
| Version control | Git and GitHub |
| Application | Next.js and TypeScript |
| Relational database | PostgreSQL |
| Database queries and migrations | Prisma, plus direct practice with SQL |
| Authentication | Maintained authentication library/service |
| Model integration | One provider SDK supported in your region |
| Agent execution | A small explicit tool loop first |
| Later orchestration | One framework, such as LangGraph, when branching/state warrants it |
| Testing | Vitest and Playwright |
| Python practice | Python, FastAPI, pytest |
| Later semantic retrieval | PostgreSQL with pgvector if needed |
| Delivery | One app host and managed PostgreSQL |

Verify provider availability, billing, terms, and hosting access where you develop and deploy. Avoid choosing a provider solely because a tutorial uses it.

## Milestones

Suggested pace: 10–12 weeks at 8–12 hours weekly, adjusted to programming fluency. The completion checks matter more than the calendar. This is a learning estimate, not a guarantee of employment.

### 0. GitHub baseline

Create a repository, review ignored files, and commit the current prototype with limitations documented. Explicitly choose visibility. Keep the job screenshots and recruiter conversations outside the repository.

Completion: repository online, setup documented, and no secrets or customer data included.

### 1. Fundamentals — weeks 1–2

Practice TypeScript types/functions, React state/effects, async/await, HTTP, JSON, environment variables, and Git branches. Follow registration from browser input to API response. Learn SQL tables, keys, joins, and transactions.

Correct plaintext password logging, false registration success after network failure, inconsistent API error fields, and incomplete server validation. Confirm the intended yellow: #ffdef8 is pale pink.

Completion: explain the request flow and demonstrate honest success/failure without logging credentials.

### 2. Database and authentication — weeks 3–4

Add PostgreSQL, Prisma migrations, seeded synthetic data, and authentication. Suggested tables: users, gift card types, rates, demo trades, and support tickets. Store monetary values in fixed precision or minor units; include currencies and timestamps. Quotes need an expiry policy.

Enforce authentication and authorization on the server. If managing passwords yourself, use a maintained password hashing implementation. Keep real payouts outside this stage.

Completion: persisted registration, login sessions, duplicate account handling, and proof that one user cannot read another user's trades.

### 3. First model feature — week 5

Build server-side FAQ chat using a short approved knowledge source. Keep API credentials on the server. Learn structured outputs, streaming, context limits, timeouts, and usage costs. Return uncertainty when information is missing.

Completion: chat works with fictional examples and you can explain what comes from the model versus code.

### 4. First agent — weeks 6–7

Provide narrowly scoped read tools:

- getGiftCardRate(cardType, currency)
- calculateQuote(cardType, amount, currency)
- getMyTradeStatus(tradeId)

The server obtains user identity from the session, validates arguments, checks permissions, executes tools, and returns results. Never trust a model-supplied user identity. Calculate money in code.

Limit tool steps, elapsed time, and cost. Handle model and tool failures clearly.

Completion: rate/status answers use real tool results, unauthorized queries fail, and missing data is not invented.

### 5. Retrieval and one controlled action — week 8

Retrieve relevant FAQ/policy passages and cite sources. Begin with a small searchable collection; add embeddings if measured retrieval quality warrants them.

Add createSupportTicket as the first write tool. Require user confirmation and avoid duplicate submissions. Treat document content as data, not authority to change instructions or permissions.

Completion: cited policy answers, uncertainty for unsupported questions, and confirmed ticket creation.

### 6. Evaluation — weeks 9–10

Build 30–50 synthetic cases covering rates, arithmetic, missing/expired rates, other users' records, malicious document instructions, tool failures, and duplicate actions.

Measure correct tool selection, valid arguments, authorized records, correct amounts, cited sources, task success, response latency, and cost. Log tool outcomes and timing with sensitive data redacted. Do not treat hidden model reasoning as an audit trail.

Completion: repeatable evaluation with measured results and documented remaining failures.

### 7. Portfolio — weeks 11–12

Deploy using synthetic data. Publish setup instructions, architecture, a demo video, evaluation results, and limitations. Explain a bug you diagnosed and your design choices. Practice describing the project in English and Mandarin.

Useful vocabulary: 大模型 (large model), 智能体 (agent), 工具调用 (tool calling), 检索增强生成 (RAG), 评测 (evaluation), 工作流 (workflow), 部署 (deployment).

Completion: another person can run it and you can explain its code and behavior independently.

## Example agent execution

Question: “What would I receive for a $100 Amazon card, and what is the status of my trade?”

1. Backend authenticates the user.
2. Model requests quote and trade-status tools.
3. Backend validates arguments and restricts access to the current user's records.
4. Tools retrieve seeded data and calculate the quote in code.
5. Model explains returned amounts, timestamps, and status.
6. Missing information produces clarification or an explicit unavailable result.

The model must not invent rates, decide payouts, or access arbitrary users' data.

## Do and do not

Do build one feature at a time, inspect AI-generated code, use small commits, test failure cases, consult official documentation, and keep a learning journal.

Do not learn every framework in an advertisement, begin with multiple agents, train models before learning APIs, expose keys in browser code, grant unrestricted SQL access, or equate an attractive demo with reliability.

## Immediate next step

Complete GitHub setup before implementing the database or agent. At inspection, GitHub CLI was absent and Git author identity was not configured. Finish account authentication locally; never paste passwords or access tokens into chat.
