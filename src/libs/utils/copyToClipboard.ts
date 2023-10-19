const copyToClipboard = (
  el: Element,
  onSuccess?: () => void,
  onError?: (e: any) => void
) => {
  if (el && typeof window !== undefined && typeof navigator !== undefined) {
    const selection = window.getSelection();

    if (selection) {
      if (selection.rangeCount > 0) selection.removeAllRanges();

      const range = document.createRange();
      range.selectNode(el);
      selection.addRange(range);

      const text = selection.toString();
      navigator.clipboard
        .writeText(text)
        .then(() => {
          if (onSuccess) onSuccess();
        })
        .catch((e) => {
          if (onError) onError(e);
        })
        .finally(() => {
          selection.removeAllRanges();
        });
    } else {
      console.error('No selection detected');
    }
  } else {
    console.error('Browser is not supported');
  }
};

export default copyToClipboard;
