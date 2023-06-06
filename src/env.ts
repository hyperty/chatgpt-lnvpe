import type { Model } from "./types"

/**
 * 用于创建 .env.example 文件，不要直接填写敏感信息。
 * 以 CLIENT_ 开头的变量会暴露给前端
 */
export const defaultEnv = {
  CLIENT_GLOBAL_SETTINGS: {
    APIKey: "",
    password: "",
    enterToSend: true
  },
  CLIENT_SESSION_SETTINGS: {
    // 0-2
    title: "",
    saveSession: true,
    APITemperature: 0.6,
    continuousDialogue: true,
    APIModel: "gpt-3.5-turbo" as Model
  },
  CLIENT_DEFAULT_MESSAGE: `Based on OpenAI GPT-3.5-turbo. [[Deploy by Tianyi]] 
  - API资源有限，自己人可以尽情使用，但请不要Share给其他人哦。
  - ChatGPT的表现如何，取决于你提问题的能力。不要吝啬你的提问，提供尽可能多的信息，它能有更好的表现。
  - [[Shift]] + [[Enter]] 换行。开头输入 [[/]] 或者 [[空格]] 搜索 Prompt 预设。[[↑]] 可编辑最近一次提问。点击顶部名称滚动到顶部，点击输入框滚动到底部。
  - **如要语音输入，请善用 [[Windows徽标键]] + [[H]]**
  - 使用中有任何疑问，可以[点我联系](https://teams.microsoft.com/l/chat/0/0?users=liuty24@lenovo.com&message=Hi%20folks%2C%20something%20went%20wrong%20with%20your%20GPT%20website
  )。
  
- WarningSign
`,
  CLIENT_MAX_INPUT_TOKENS: {
    "gpt-3.5-turbo": 4 * 1024,
    "gpt-4": 8 * 1024,
    "gpt-4-32k": 32 * 1024
  } as Record<Model, number>,
  OPENAI_API_BASE_URL: "api.openai.com",
  OPENAI_API_KEY: "",
  TIMEOUT: 30000,
  PASSWORD: "",
  SEND_KEY: "",
  SEND_CHANNEL: 9,
  NO_GFW: false
}

export type SessionSettings = typeof defaultEnv.CLIENT_SESSION_SETTINGS
