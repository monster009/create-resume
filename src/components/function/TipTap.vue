<template>
  <div style="width: 100%;text-align: left;">
    <el-button-group class="ml-4" v-if="editor" style="color: #ffffff;">
      <el-button :type="color" @click="editor.chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }">
        <svg viewBox="0 0 24 24" width="24" height="24" focusable="false">
          <path
            d="M7.8 19c-.3 0-.5 0-.6-.2l-.2-.5V5.7c0-.2 0-.4.2-.5l.6-.2h5c1.5 0 2.7.3 3.5 1 .7.6 1.1 1.4 1.1 2.5a3 3 0 0 1-.6 1.9c-.4.6-1 1-1.6 1.2.4.1.9.3 1.3.6s.8.7 1 1.2c.4.4.5 1 .5 1.6 0 1.3-.4 2.3-1.3 3-.8.7-2.1 1-3.8 1H7.8Zm5-8.3c.6 0 1.2-.1 1.6-.5.4-.3.6-.7.6-1.3 0-1.1-.8-1.7-2.3-1.7H9.3v3.5h3.4Zm.5 6c.7 0 1.3-.1 1.7-.4.4-.4.6-.9.6-1.5s-.2-1-.7-1.4c-.4-.3-1-.4-2-.4H9.4v3.8h4Z"
            fill-rule="evenodd" fill="currentColor"></path>
        </svg>
      </el-button>
      <el-button :type="color" @click="editor.chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }">
        <svg viewBox="0 0 24 24" width="24" height="24" focusable="false">
          <path
            d="m16.7 4.7-.1.9h-.3c-.6 0-1 0-1.4.3-.3.3-.4.6-.5 1.1l-2.1 9.8v.6c0 .5.4.8 1.4.8h.2l-.2.8H8l.2-.8h.2c1.1 0 1.8-.5 2-1.5l2-9.8.1-.5c0-.6-.4-.8-1.4-.8h-.3l.2-.9h5.8Z"
            fill-rule="evenodd" fill="currentColor"></path>
        </svg>
      </el-button>
      <!-- <el-button :type="color" @click="editor.chain().focus().toggleUnderline().run()" :class="{ 'is-active': editor.isActive('underline') }">
        <svg viewBox="0 0 24 24" width="24" height="24" focusable="false">
          <path
            d="M16 5c.6 0 1 .4 1 1v5.5a4 4 0 0 1-.4 1.8l-1 1.4a5.3 5.3 0 0 1-5.5 1 5 5 0 0 1-1.6-1c-.5-.4-.8-.9-1.1-1.4a4 4 0 0 1-.4-1.8V6c0-.6.4-1 1-1s1 .4 1 1v5.5c0 .3 0 .6.2 1l.6.7a3.3 3.3 0 0 0 2.2.8 3.4 3.4 0 0 0 2.2-.8c.3-.2.4-.5.6-.8l.2-.9V6c0-.6.4-1 1-1ZM8 17h8c.6 0 1 .4 1 1s-.4 1-1 1H8a1 1 0 0 1 0-2Z"
            fill-rule="evenodd" fill="currentColor"></path>
        </svg>
      </el-button> -->
      <el-button :type="color" @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }">
        <svg viewBox="0 0 24 24" width="24" height="24" focusable="false">
          <path
            d="M11 5h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2Zm0 6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2Zm0 6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2ZM4.5 6c0-.4.1-.8.4-1 .3-.4.7-.5 1.1-.5.4 0 .8.1 1 .4.4.3.5.7.5 1.1 0 .4-.1.8-.4 1-.3.4-.7.5-1.1.5-.4 0-.8-.1-1-.4-.4-.3-.5-.7-.5-1.1Zm0 6c0-.4.1-.8.4-1 .3-.4.7-.5 1.1-.5.4 0 .8.1 1 .4.4.3.5.7.5 1.1 0 .4-.1.8-.4 1-.3.4-.7.5-1.1.5-.4 0-.8-.1-1-.4-.4-.3-.5-.7-.5-1.1Zm0 6c0-.4.1-.8.4-1 .3-.4.7-.5 1.1-.5.4 0 .8.1 1 .4.4.3.5.7.5 1.1 0 .4-.1.8-.4 1-.3.4-.7.5-1.1.5-.4 0-.8-.1-1-.4-.4-.3-.5-.7-.5-1.1Z"
            fill-rule="evenodd" fill="currentColor"></path>
        </svg>
      </el-button>
      <el-button :type="color" @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'is-active': editor.isActive('orderedList') }">
        <svg viewBox="0 0 24 24" width="24" height="24" focusable="false">
          <path
            d="M10 17h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2Zm0-6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2Zm0-6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 1 1 0-2ZM6 4v3.5c0 .3-.2.5-.5.5a.5.5 0 0 1-.5-.5V5h-.5a.5.5 0 0 1 0-1H6Zm-1 8.8.2.2h1.3c.3 0 .5.2.5.5s-.2.5-.5.5H4.9a1 1 0 0 1-.9-1V13c0-.4.3-.8.6-1l1.2-.4.2-.3a.2.2 0 0 0-.2-.2H4.5a.5.5 0 0 1-.5-.5c0-.3.2-.5.5-.5h1.6c.5 0 .9.4.9 1v.1c0 .4-.3.8-.6 1l-1.2.4-.2.3ZM7 17v2c0 .6-.4 1-1 1H4.5a.5.5 0 0 1 0-1h1.2c.2 0 .3-.1.3-.3 0-.2-.1-.3-.3-.3H4.4a.4.4 0 1 1 0-.8h1.3c.2 0 .3-.1.3-.3 0-.2-.1-.3-.3-.3H4.5a.5.5 0 1 1 0-1H6c.6 0 1 .4 1 1Z"
            fill-rule="evenodd" fill="currentColor"></path>
        </svg>
      </el-button>
    </el-button-group>
    <editor-content :editor="editor"  />
  </div>
</template>

<script>
  import {
    useEditor,
    EditorContent
  } from '@tiptap/vue-3'
  import StarterKit from '@tiptap/starter-kit'
  import { watch } from 'vue'

  export default {
    name: 'TipTap',
    props: [ 'text', 'color' ],
    components: {
      EditorContent,
    },
    setup(props, { emit }) {
      const editor = useEditor({
        content: props.text,
        extensions: [
          StarterKit,
        ],
        editorProps: {
          attributes: {
            class: `ProseMirror-${props.color}`,
          },
        },
        onUpdate: () => {
          if (editor.value.getHTML()) {
            emit('changeText', editor.value.getHTML())
          }
        }
      })
      watch(() => props.text, (newValue, oldValue) => {
        if(!oldValue) {
          editor.value.commands.setContent(newValue)
        }
      })
      return {
        editor
      }
    },
  }
</script>
<style>
  .ProseMirror {
    height: 360px;
    margin-top: 8px;
    padding: 12px;
    border-radius: var(--el-input-border-radius,var(--el-border-radius-base));
    box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
    outline: none;
    background-color: #ffffff;
    overflow-y: auto;
  }
  .ProseMirror.ProseMirror-primary.ProseMirror-focused {
    box-shadow: 0 0 0 1px var(--el-color-primary) inset;
  }
  .ProseMirror.ProseMirror-success.ProseMirror-focused {
    box-shadow: 0 0 0 1px var(--el-color-success) inset;
  }
  .ProseMirror.ProseMirror-warning.ProseMirror-focused {
    box-shadow: 0 0 0 1px var(--el-color-warning) inset;
  }
  .ProseMirror.ProseMirror-danger.ProseMirror-focused {
    box-shadow: 0 0 0 1px var(--el-color-danger) inset;
  }
  .ProseMirror ul,
  .ProseMirror ol {
    padding-left: 16px;
  }
  @media (min-width: 768px) {
    .ProseMirror {
      height: 160px;
    }
  }
</style>