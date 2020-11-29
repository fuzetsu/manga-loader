export const fetchDoc = (url: string) =>
  fetch(url)
    .then(res => res.text())
    .then(text => new DOMParser().parseFromString(text, 'text/html'))

export async function* iteratePages(findNext: (doc: Document) => string) {
  let current = document
  while (current) {
    yield current
    const nextUrl = findNext(current)
    if (!nextUrl) return
    current = await fetchDoc(nextUrl)
  }
}
