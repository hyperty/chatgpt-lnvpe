import {
  type Accessor,
  For,
  Show,
  createEffect,
  createSignal,
  createMemo
} from "solid-js"
import { RootStore, defaultMessage } from "~/store"
import { scrollToBottom } from "~/utils"
import MessageItem from "./MessageItem"
import { defaultInputBoxHeight } from "./InputBox"

export default function ({
  sendMessage,
  inputBoxHeight
}: {
  sendMessage(value?: string): void
  inputBoxHeight: Accessor<number>
}) {
  const { store } = RootStore
  // 防止重新设置高度时页面跳动
  const paddingBottom = createMemo(
    k =>
      inputBoxHeight() === defaultInputBoxHeight - 1 ? k : inputBoxHeight(),
    defaultInputBoxHeight
  )

  createEffect((prev: number | undefined) => {
    if (prev !== undefined && store.messageList.length > prev) {
      scrollToBottom()
    }
    return store.messageList.length
  })

  createEffect(prev => {
    if (store.currentAssistantMessage) scrollToBottom()
  })

  createEffect(prev => {
    inputBoxHeight()
    if (prev && paddingBottom() !== defaultInputBoxHeight) {
      scrollToBottom()
    }
    return true
  })

  return (
    <div
      class="px-1em"
      id="message-container"
      style={{
        "margin-bottom": `calc(6em + ${paddingBottom() + "px"})`
      }}
    >
      <div id="message-container-img" class="px-1em">
        <Show when={!store.messageList.length}>
          <MessageItem hiddenAction={true} message={defaultMessage} />
        </Show>
        <For each={store.messageList}>
          {(message, index) => (
            <MessageItem
              message={message}
              hiddenAction={store.loading}
              index={index()}
              sendMessage={sendMessage}
            />
          )}
        </For>
        <Show when={store.currentAssistantMessage}>
          <MessageItem
            hiddenAction={true}
            message={{
              role: "assistant",
              content: store.currentAssistantMessage,
              type: "temporary"
            }}
          />
        </Show>
      </div>
    </div>
  )
}
