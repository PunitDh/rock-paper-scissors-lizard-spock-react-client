export type Clipboard = {
  get: () => Promise<string | undefined>;
  copy: (text: string) => void;
};

export default function useClipboard(): Clipboard {
  async function copy(text: string) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  async function get() {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.readText();
    }
  }

  return {
    copy,
    get,
  };
}
