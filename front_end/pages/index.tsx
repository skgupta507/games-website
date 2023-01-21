import Styles from './Home.module.css'
import { DivContainer } from './HomeStyles'
import { fetchGamesForGenre, homePageGames } from './api/IGDB'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Plus from '../public/img/icons/PlusSolid'
import NextArrow from '../public/img/icons/NextArrow'
import CarouselItem from '@/components/CarouselItem'
import Head from '@/components/DocumentHead/Head'
import PageLoading from '@/components/PageLoading'
import GameGenreCard from '@/components/GameGenreCard'

export default function Home({ results }: any) {

  const [heroSectionGames, setHeroSectionGames] = useState<GameInfo[]>([])
  const [genreGames, setGenreGames] = useState<GameInfo[]>([])

  const [heroGameInfoIndex, setHeroGameInfoIndex] = useState<number>(0)
  const [carouselRowNumber, setCarouselRowNumber] = useState<number>(0)
  const [genreContainerRowNumber, setGenreContainerRowNumber] = useState<number>(0)

  async function getData() {

    const homeGames = await homePageGames()
    const genreGames = await fetchGamesForGenre('horror')

    setHeroSectionGames(homeGames)

    setGenreGames(genreGames)

  }

  // return array with the exact ammout of how many results should be shown on carousel 
  function sliceFilterRange(currentCarouselRow: number) {

    if (screen.width > 480 && screen.width < 660) {

      return [currentCarouselRow * 2, (currentCarouselRow + 1) * 2]

    }
    else if (screen.width >= 660 && screen.width < 860) {

      return [currentCarouselRow * 3, (currentCarouselRow + 1) * 3]

    }

    return [currentCarouselRow * 4, (currentCarouselRow + 1) * 4]

  }

  const router = useRouter()

  useEffect(() => {
    getData()
  }, [])

  return (
    heroSectionGames.length > 0 ? (
      <>
        <DivContainer
          {...heroSectionGames[heroGameInfoIndex].artworks[0]}
          id={Styles.container}
        />

        <section id={Styles.hero_game_info} className={Styles.section_margin}>

          <div>

            <h1><Link href={`/game/${heroSectionGames[heroGameInfoIndex].slug}`}>{heroSectionGames[heroGameInfoIndex].name}</Link></h1>

            {heroSectionGames[heroGameInfoIndex].game_modes.length > 0 && (
              <ul>
                {heroSectionGames[heroGameInfoIndex].game_modes.slice(0, 3).map((item: { name: string, slug: string }, key: any) => (
                  <li key={key}><Link href={`/genre/${item.slug}`}>{item.name}</Link></li>
                ))}
                {heroSectionGames[heroGameInfoIndex].game_modes.length > 3 && (
                  <li>e mais.</li>
                )}
              </ul>
            )}

            <button role='link' onClick={() => router.push(`/game/${heroSectionGames[2].slug}`)}>
              <Plus /> Saber Mais
            </button>

          </div>
        </section>

        <section id={Styles.carrousel}>

          <div className={Styles.section_heading}>

            <h2>Lançamentos</h2>

            <div className={Styles.buttons_container}>
              <button disabled={carouselRowNumber === 0 ? true : false} onClick={() => setCarouselRowNumber((curr) => curr - 1)}>
                <NextArrow />
              </button>

              <button disabled={carouselRowNumber === heroSectionGames.length ? true : false} onClick={() => setCarouselRowNumber((curr) => curr + 1)}>
                <NextArrow style={{ rotate: '180deg' }} />
              </button>
            </div>

          </div>

          {screen.width >= 480 && (
            <ul aria-live="polite">
              {heroSectionGames.slice(sliceFilterRange(carouselRowNumber)[0], sliceFilterRange(carouselRowNumber)[1]).map((item: GameInfo) => (
                <CarouselItem key={item.id} props={item} />
              ))}
            </ul>
          )}

          {screen.width <= 479 && (
            <ul aria-live="polite">
              {heroSectionGames.map((item: GameInfo) => (
                <CarouselItem key={item.id} props={item} />
              ))}
            </ul>
          )}

          <div id={Styles.carousel_indicators}>
            {heroSectionGames.map((item: GameInfo, key: number) => (
              <span key={key}
                data-active-row={carouselRowNumber === key ? true : false}
                onClick={() => setCarouselRowNumber(key)}
              ></span>
            ))}
          </div>

        </section>

        <section id={Styles.genre_games} className={` ${Styles.position_top}`}>

          <div className={Styles.section_heading}>
            <h2>Terror +18</h2>

            <Link href={`/genre/`}>
              Ver Todos
            </Link>

          </div>

          <div className={Styles.genre_game_cards_container}>

            {screen.width < 560 ? (
              <ul>
                {genreGames.map((item: GameInfo) => (
                  <GameGenreCard key={item.id} props={item} />
                ))}
              </ul>
            ) : (<ul>
              {genreGames.slice(genreContainerRowNumber * 3, (genreContainerRowNumber + 1) * 3).map((item: GameInfo) => (
                <GameGenreCard key={item.id} props={item} />
              ))}
            </ul>)}

            <div className={Styles.buttons_container}>
              <button disabled={genreContainerRowNumber === 0 ? true : false} onClick={() => setGenreContainerRowNumber((curr) => curr - 1)}>
                <NextArrow />
              </button>

              <button disabled={genreContainerRowNumber === heroSectionGames.length ? true : false} onClick={() => setGenreContainerRowNumber((curr) => curr + 1)}>
                <NextArrow style={{ rotate: '180deg' }} />
              </button>
            </div>

          </div>

        </section>

      </>
    ) : (
      <PageLoading />
    )
  )
}

// export async function getServerSideProps(props: any) {

//   const res = await homePageGames()

//   return {
//     props: {
//       results: [res]
//     }
//   }

// }