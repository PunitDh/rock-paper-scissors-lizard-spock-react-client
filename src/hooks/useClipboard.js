export default function useClipboard() {
  async function copy(text) {
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
