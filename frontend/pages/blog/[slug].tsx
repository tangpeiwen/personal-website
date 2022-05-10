import AppHeader from "../../components/AppHeader"
import { InlineApps } from '../../constants/app'
import Head from 'next/head'
import FullContainer from "../../components/Containers"
import useBlogArticle from "../../hooks/useBlogArticle"
import { useRouter } from 'next/router'
import highlight from "highlight.js";
import "highlight.js/styles/atom-one-dark-reasonable.css";
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faClock } from '@fortawesome/free-regular-svg-icons'


const Blog = () => {

  const router = useRouter()
  const { slug } = router.query
  const { article, fetchArticle } = useBlogArticle(slug as string)
  const [renderedContent, setRenderedContent] = useState('')

  const renderArticleContent = (content: string) => {
    const articleDom = new DOMParser().parseFromString(content, "text/xml")
    const root = articleDom.children[0]
    let result = ''
    for (let i = 0; i < root.children.length; i++) {
      const child = root.children[i]
      if ('image-package' === child.className) {
        let images = child.getElementsByTagName('img');
        if (images.length > 0) {
          let image = images[0];
          result += `<img class="rounded-lg mx-auto min-h-[100px] bg-gray-100" src="${image.getAttribute('data-original-src')}" alt="" />`
        }
      } else {
        result += child.outerHTML
      }
    }
    return result
  }

  useEffect(() => {
    router.isReady && fetchArticle()
  }, [router.isReady])

  useEffect(() => {
    article.content.length > 0 && setRenderedContent(renderArticleContent(article.content))
  }, [article])

  useEffect(() => {
    if (renderedContent.length > 0) {
      document.querySelectorAll("pre code").forEach((block: any) => {
        try {
          highlight.highlightBlock(block)
        } catch (e) {
          console.log(e)
        }
      });
    }
  }, [renderedContent])

  return (
    <div className='w-full p-4 md:p-8 flex flex-col gap-4 md:gap-6'>

      <Head>
        <title>{InlineApps[0].name}</title>
      </Head>

      <AppHeader path={[InlineApps[0], { name: '正文' }]} />

      <FullContainer>
        <div className="max-w-screen-lg mx-auto py-8">
          {
            article.title.length > 0 && (
              <>
                <div className="text-center text-3xl font-semibold">{article.title}</div>
                <div className="flex flex-row items-center justify-center gap-1 text-sm text-gray-500 w-full mt-4">
                  <FontAwesomeIcon icon={faUser} />
                  <span>{article.author_name}</span>
                  <FontAwesomeIcon icon={faClock} className="ml-2" />
                  <span>{article.time}</span>
                </div>
                <article className="max-w-full prose text-base p-4 md:p-8 " dangerouslySetInnerHTML={{ __html: renderedContent }} />
              </>
            )
          }
        </div>
      </FullContainer>
    </div>
  )
}

export default Blog