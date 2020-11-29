import { $, $$ } from './util'

interface Website {
  name: string
  match: string
  getImages(): string[]
}

export const websites: Website[] = [
  {
    name: 'magantown',
    match: 'mangatown.com/manga/[^/]+/[^/]+',
    getImages() {
      const { src } = $<HTMLImageElement>('#image')!
      const numPages = $<HTMLSelectElement>('.page_select select')!.options.length - 1
      return Array.from({ length: numPages }, (_, idx) =>
        src.replace(/[0-9]+\.(jpg|png)/, `${String(idx + 1).padStart(3, '0')}.$1`)
      )
    }
  },
  {
    name: 'batoto',
    match: 'bato.to/chapter',
    getImages: () => $$<HTMLImageElement>('#viewer img').map(img => img.src)
  },
  {
    name: 'mangareader.net',
    match: 'https://www.mangareader.net/[^/]+/[0-9]+',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getImages: () => (document as any).mj.im.map((x: any) => x.u)
  },
  {
    name: 'fanfox.net',
    match: 'http://fanfox.net/manga/[^/]+/[^/]+/[^/]+.html',
    getImages: () =>
      $$<HTMLImageElement>('img.reader-main-img').map(img => img.dataset.src || img.src)
  }
]
