export const focusOnMount = {
  mounted: (el?: HTMLInputElement) => {
    if (el) el.focus()
  }
}
