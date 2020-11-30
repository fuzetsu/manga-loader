import { $, $$ } from './util'

export interface Metadata {
  numPages: number
  nextChapterUrl?: string
  previousChapterUrl?: string
}

export interface Website {
  name: string
  match: string
  getImages(): AsyncGenerator<string> | string[]
  getMetadata(): Metadata
}

export const websites: Website[] = [
  {
    name: 'magantown',
    match: 'mangatown.com/manga/[^/]+/[^/]+',
    getMetadata: () => ({
      numPages: $<HTMLSelectElement>('.page_select select')!.options.length - 1
    }),
    getImages: async function* () {
      const { src } = $<HTMLImageElement>('#image')!
      const numPages = this.getMetadata().numPages
      for (let i = 1; i <= numPages; i++) {
        yield src.replace(/[0-9]+\.(jpg|png)/, `${String(i).padStart(3, '0')}.$1`)
      }
    }
  },
  {
    name: 'batoto',
    match: 'bato.to/chapter',
    getImages: () => $$<HTMLImageElement>('#viewer img').map(img => img.src),
    getMetadata: () => ({ numPages: $$('#viewer img').length })
  },
  {
    name: 'mangareader.net',
    match: 'https://www.mangareader.net/[^/]+/[0-9]+',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getImages: () => (document as any).mj.im.map((x: any) => x.u),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getMetadata: () => ({ numPages: (document as any).mj.im.length })
  },
  {
    name: 'fanfox.net',
    match: 'https://fanfox.net/manga/[^/]+/[^/]+/[^/]+.html',
    getImages: () =>
      $$<HTMLImageElement>('img.reader-main-img').map(img => img.dataset.src || img.src),
    getMetadata: () => ({ numPages: $$('img.reader-main-img').length })
  },
  {
    name: 'manganelo',
    match: 'https://manganelo.com/chapter/[^/]+/[^/]+',
    getImages: () => $$<HTMLImageElement>('.container-chapter-reader img').map(img => img.src),
    getMetadata() {
      return {
        numPages: $$('.container-chapter-reader img').length,
        nextChapterUrl: $<HTMLAnchorElement>('a.navi-change-chapter-btn-next')?.href,
        previousChapterUrl: $<HTMLAnchorElement>('a.navi-change-chapter-btn-prev')?.href
      }
    }
  }
]
