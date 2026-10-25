---
title: AI Agent 全部内容目录
description: 10 个原理章节、133 篇工程文章与 13 个模块的站内融合覆盖图。
outline: [2, 3]
---

# AI Agent 全部内容目录

这里不是两个仓库目录的简单相加，而是完整的“来源内容 → 站内课程”映射。你可以先确认原有主题有没有遗漏，再进入[站内学习手册](./handbook)阅读融合后的中文讲解，最后到[完整学习契约](./roadmap)动手验证。

## 融合基线

- `bojieli/ai-agent-book`：固定基线 `dbc046e`，覆盖 10 个原理章节。
- `ranxi2001/zero2Agent`：固定基线 `79f7f91`，覆盖 133 篇文章、13 个模块。
- 外部项目名称、作者、许可证与第三方声明统一记录在[来源说明](./sources)。
- 本站保留全部课程主题和知识关系，以自己的结构重新讲解；不会把两个仓库逐篇镜像成重复页面。

## 一条合理的融合主线

```text
Agent 基础
  ↓
Context / Memory / RAG
  ↓
Tools / MCP / Skills
  ↓
Runtime / Harness / Coding Agent
  ↓
交互 / 异步 / 多模态
  ↓
Eval / Training / Evolution
  ↓
Multi-Agent / Framework Selection
  ↓
应用实战 / 面试 / Final Project
```

## 原理部分：10 章全部保留

1. **AI Agent 入门**：观察空间、动作空间、工具、LLM、上下文、ReAct、Harness、Loop 工程、模型选型、编排与护栏。
2. **上下文工程**：消息角色、工具循环、Chat Template、KV Cache、Prompt Cache、提示词、Skills、状态栏、压缩与隔离。
3. **用户记忆和知识库**：记忆层次、存储格式、压缩、隐私、Chunk、稠密与稀疏检索、混合检索、知识更新和 Agentic RAG。
4. **工具**：工具分类、描述与参数保真、MCP、Skill Hub、工具发现、感知、执行与协作工具。
5. **Coding Agent 与通用 Agent**：整体流程、Harness、搜索、编辑、安全、代码思考、规则约束、多媒体、系统适配与自举。
6. **交互扩展**：异步事件、用户沟通、隔离身份、语音、Computer Use、视觉定位、机器人、VLA 与世界模型。
7. **Agent 评估**：任务定义、Pass@k、Pass^k、环境、验证器、数据集、Judge、失败归因、成本、统计显著性与可观测性。
8. **模型后训练**：预训练、Mid-training、SFT、RL、环境、多轮信用分配、奖励、蒸馏与坏案例训练。
9. **持续进化**：从轨迹提取信号，把经验写入知识、指令、程序或参数，并建立安全发布闭环。
10. **多 Agent 协作**：共享与隔离、协作拓扑、管理者与对等模式、A2A、失败模式和 Agent 社会。

[阅读融合讲解 →](./handbook)

## 工程部分：133 篇全部映射

### 01 · Agent Basic（17 篇） {#module-basic}

1. 什么是 Agent
2. Workflow 和 Agent 的区别
3. 一个 Agent 系统的核心组成
4. 为什么很多 Agent Demo 一落地就不稳定
5. 大模型 API 输入输出与 Tool Calling
6. Context、State 与 Memory
7. Planning、Reflection、RAG 的作用边界
8. 单 Agent 和多 Agent 的边界
9. Agent Infra：从 Harness 到生产环境
10. Loop Engineering：让 Agent 自主迭代直到正确
11. Agent 评估
12. Coding Agent 模式
13. Context Engineering
14. 多模态与实时交互
15. Agent 自进化
16. 高级 RAG 与记忆架构
17. 异步 Agent 与事件驱动架构

站内去向：[阶段 01–10 完整手册](./handbook) · [实践验收](./roadmap)

### 02 · LangGraph（7 篇） {#module-langgraph}

1. 为什么图比线性 Chain 更适合复杂任务
2. State、Node、Graph 三件套
3. 顺序图与第一个可运行 Workflow
4. 条件边与动态路由
5. Fan-out / Fan-in 并行工作流
6. Prompt Chaining 与中间状态
7. OpenAI、HuggingFace 等模型接入

融合重点：状态建模、分支、并行、恢复和可观测性。阅读[Runtime 与编排专题](./handbook#stage-05)。

### 03 · 三大原厂 SDK（4 篇） {#module-sdk}

1. OpenAI Agents SDK：Agent、Tool、Runner 与 Handoff
2. Google genai SDK：Gemini、Vertex AI、Function Calling 与多模态
3. Anthropic SDK：Messages API、Tool Use 与流式响应
4. 三大 SDK 的自动循环、工具协议、模型支持与选型比较

融合重点：先理解统一的 Model–Tool–Observation 协议，再看 SDK 抽象差异。阅读[工具专题](./handbook#stage-04)。

### 04 · 框架调研（13 篇） {#module-frameworks}

1. AgentScope：分布式多 Agent
2. Mastra：TypeScript 原生 Agent 与 Workflow
3. Semantic Kernel：Plugin 与企业集成
4. Eino：Go 语言流式 Agent 框架
5. GitAgent：代码仓库智能操作
6. Harness：从原理到最小实现
7. AgentUniverse：PEER 协作模式
8. DeerFlow：Deep Research
9. LangChain：LCEL、RAG 与 Agent
10. Google ADK：官方 Agent 开发套件
11. Skills + Claude Code：模块化能力加载
12. Vercel AI SDK：全栈流式 AI 应用
13. AutoGen：多 Agent 对话、代码执行与 HITL

融合重点：比较状态模型、工具层、运行时、持久化、协作、观测和部署，不按框架热度做结论。阅读[框架选型附录](./handbook#appendix-frameworks)。

### 05 · OpenClaw（9 篇） {#module-openclaw}

1. 为什么要自己写 Agent
2. 从 Node 到 Agent Loop
3. RAG 工程实现
4. Tool、MCP 与并行执行
5. Context Engine 与记忆架构
6. Multi-Agent、子进程隔离和多渠道路由
7. Pi 架构与源码阅读
8. 从源码构建自己的 OpenClaw
9. 面试与实习准备

融合重点：用最小实现理解复杂框架如何生长。阅读[Agent Loop](./handbook#stage-01)和[Runtime](./handbook#stage-05)。

### 06 · Claude Code 渐进课程（12 篇） {#module-claude-code}

1. Agent Loop
2. Tool Use 与工具分发
3. TodoWrite 与计划跟踪
4. Subagent 与上下文隔离
5. Skill Loading 与渐进披露
6. Context Compact 与长会话
7. Task System 与依赖图
8. Background Tasks
9. Agent Teams
10. Team Protocols
11. Autonomous Agents
12. Worktree 隔离

融合重点：从一个循环逐步长成可并行、可恢复、可隔离的 Coding Agent。阅读[Coding Agent](./handbook#stage-06)和[多 Agent](./handbook#stage-10)。

### 07 · DeepSeek Harness（13 篇） {#module-harness}

1. Harness 的定位与可拼装 Runtime
2. Cordis 插件内核
3. Profile、Bundle、Patch 与能力接缝
4. LLM Seam：隔离模型差异
5. Agent Loop 控制平面
6. Tool Pipeline：能力与权限分离
7. Session Log：日志作为事实源
8. Inbox：用户插话语义
9. Code Mode
10. Context Compaction 与成本
11. Security Boundary
12. Subagent 编排
13. Runtime Surfaces：多宿主复用

融合重点：把模型、工具、存储、Loop、UI 和安全都当作可替换接缝。阅读[Runtime](./handbook#stage-05)与[持续进化](./handbook#stage-09)。

### 08 · Agent 训练实战（7 篇） {#module-training}

1. Agent SFT：轨迹数据与 Loss Mask
2. Agent RL：推理与决策优化
3. GRPO vs PPO
4. 训练数据配比
5. Agent 评测
6. 从 SFT 到部署
7. 训练环境：仿真沙箱与数据回流

融合重点：先建评估和环境，再讨论训练。阅读[后训练专题](./handbook#stage-08)。

### 09 · Agent 应用实战（7 篇） {#module-practice}

1. 用 Agent 发布个人主页
2. AI Coding 面试的解题与交付
3. 日常开发 Agent 工作流
4. Auto Harness：从失败轨迹迭代运行骨架
5. Eval-Driven Practice
6. RSI：求解策略的迭代优化
7. 云端 Bot 类 Agent

融合重点：每个项目都要留下需求、最小闭环、失败样例、评估和部署证据。阅读[应用实战附录](./handbook#appendix-practice)。

### 10 · Pi Coding Agent（8 篇） {#module-pi}

1. Pi 定位、架构与 Agent Loop
2. 多 Provider 适配层
3. Skill、Extension 与 Package
4. MCP Adapter 与 Token 取舍
5. Project Trust、权限门禁与系统隔离
6. 生态发现、审计和退出策略
7. Pi、Claude Code 与 Harness 对比
8. Session Runtime：树形历史、恢复与 Compaction

融合重点：区分运行事件、持久 Transcript 和 Model Context。阅读[Runtime](./handbook#stage-05)。

### 11 · Codex CLI（7 篇） {#module-codex}

1. Codex 定位、架构与 Agent Loop
2. TOML 配置和审批策略
3. 平台沙箱与安全边界
4. MCP 集成与工具审批
5. Thread-based SDK
6. 开发者体验与 Trial 环
7. Codex、Claude Code、Harness 对比

融合重点：权限、沙箱、工具调用和线程恢复。阅读[Coding Agent](./handbook#stage-06)。

### 12 · Agent 面试通关（17 篇） {#module-interview}

1. 架构选型
2. 工具管理
3. 容错与鲁棒性
4. 记忆与上下文
5. 评估与全局观
6. 多智能体协作
7. 工程化踩坑
8. Prompt 与 Skills
9. RAG 与检索系统
10. 训练、数据与模型优化
11. AI 代码分析与测试
12. 业务 AI 工程
13. 简历项目深挖
14. 公司面试偏好
15. Agent 前沿概念
16. Agent Infra
17. AI Infra

这部分存在单独的 CC BY-NC-SA 4.0 边界。本站保留完整考察维度并重新编写复习材料，不把 844 道题直接混入可商业使用的正文。阅读[面试专题附录](./handbook#appendix-interview)。

### 13 · Final Project：OfferPilot（12 篇） {#module-project}

1. 面试诊断 Agent PRD
2. 系统架构设计
3. Query Engine
4. Tools & Skills
5. 知识库构建
6. Context & Memory
7. Permission & Session
8. Hook & Command
9. Sub-agent 编排
10. STT 与语音分析
11. 部署与演示
12. Web UI 交互设计

融合重点：从产品需求走到架构、Runtime、知识库、语音、前端和部署。阅读[生产项目附录](./handbook#appendix-project)。

## 怎么使用这份目录

- 想系统学习：按[站内学习手册](./handbook)的 01–10 顺序阅读。
- 想做作品：先看[应用实战](./handbook#appendix-practice)与[生产项目](./handbook#appendix-project)，再完成[实践契约](./roadmap)。
- 想准备面试：先用本页确认 17 个维度，再进入[面试专题](./handbook#appendix-interview)。
- 想核对出处：只在需要时打开[来源说明](./sources)，日常学习不会跳出本站。

