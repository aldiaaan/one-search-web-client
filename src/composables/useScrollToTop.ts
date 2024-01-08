export default function useScrollToTop() {

  function _fn() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return _fn
}
