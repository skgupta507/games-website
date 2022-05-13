import React, { useEffect, useState } from 'react'
import * as C from './styles'
import API from '../../API/IGDB'
import { Link } from 'react-router-dom'

export default function Home() {

  const [releasingThisMonth, setReleasingThisMonth] = useState([])
  const [highestRatings, setHighestRatings] = useState([])
  const [loading, setLoading] = useState(true)
  const [headingGameChose, setHeadingGameChose] = useState(Math.floor(Math.random() * 9))
  const [auxClickGamesLastMonth, setAuxClickGamesLastMonth] = useState(0)

  useEffect(() => {
    document.title = 'Home | My Next Game'
    const load1 = async () => {
      const data1 = await API.getMonthRelease();
      const data2 = await API.getLastMonthHighestRatings();
      setReleasingThisMonth(data1)
      setHighestRatings(data2)
      const load2 = () => {
        if (data1[headingGameChose] && data2) {
          setLoading(false)
        }
      }
      load2()
    }
    load1()

  }, [])

  return (
    <C.Container>
      {loading === false &&

        <>
          <div className='mobile-website-heading'>
            <h1>What will be your Next Game?</h1>
            <h2>See the new releases and pick the one who will entertain you the most!</h2>
          </div>
          <C.HeadingContent style={releasingThisMonth[headingGameChose].game.artworks ? {
            backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_screenshot_huge/${releasingThisMonth[headingGameChose].game.artworks[0].image_id}.jpg)`,
          } : {}}>

            <div className='desktop-website-heading'>
              <h1>What will be your Next Game?</h1>
              <h2>See the new releases and pick the one who will entertain you the most!</h2>
            </div>

            <div className='info-game-to-be-released'>
              {releasingThisMonth[headingGameChose].game.release_dates[0] && (
                <h2 className=''>Releasing this Month</h2>
              )}
              <div>
                <h3>
                  <Link to={`/game/${releasingThisMonth[headingGameChose].game.id}`}>{releasingThisMonth[headingGameChose].game.name}</Link>
                </h3>
                {releasingThisMonth[headingGameChose].game.themes &&
                  <ul>
                    {releasingThisMonth[headingGameChose].game.themes.map((item, key) => (
                      <li key={key}>{item.name}</li>
                    ))
                    }
                  </ul>
                }
                {releasingThisMonth[headingGameChose].game.release_dates[0] &&
                  <h3>{releasingThisMonth[headingGameChose].game.release_dates[0].human}
                    {releasingThisMonth[headingGameChose].game.release_dates[0].region === 1 && ', Europe'}
                    {releasingThisMonth[headingGameChose].game.release_dates[0].region === 2 && ', North America'}
                    {releasingThisMonth[headingGameChose].game.release_dates[0].region === 5 && ', Japan'}
                    {releasingThisMonth[headingGameChose].game.release_dates[0].region === 8 && ', WorldWide'}
                    {releasingThisMonth[headingGameChose].game.release_dates[0].region === 10 && ', Brazil'}

                  </h3>

                }

                <Link className='a-tag-button-style' to={`/game/${releasingThisMonth[headingGameChose].game.id}`}>More Info</Link>
              </div>
            </div>

            {/* <button onClick={() => {
            console.log(releasingThisMonth[0].game.artworks[0])

          }}>Console</button> */}

          </C.HeadingContent>

          <C.HighestRatingsLastMonth>

            <h2>Highest Ratings From Last Month</h2>

            <div className='ratings-section'>
              <div className='ratings-text'>
                <h3>The Most Best Rated!</h3>
                <p>
                  According with the users, these are the best games of the month!
                </p>

              </div>
              <div className='ratings-games'>
                <ul>
                  <span onClick={() => { setAuxClickGamesLastMonth(auxClickGamesLastMonth - 1) }}>{'<'}</span>
                  {highestRatings.map((item, key) => (
                    <>
                      <li key={key}>
                        <h4>{item.game.name}</h4>
                        <div style={item.game.artworks[0] ? {
                          backgroundImage: `url(//images.igdb.com/igdb/image/upload/t_original/${item.game.artworks[0].image_id}.jpg)`,
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat'
                        } : {}}>
                          <img src={`//images.igdb.com/igdb/image/upload/t_cover_big/${item.game.cover.image_id}.jpg`} alt={item.game.name}></img>
                        </div>
                      </li>
                    </>
                  ))}
                  <span onClick={() => { setAuxClickGamesLastMonth(auxClickGamesLastMonth + 1) }}>{'>'}</span>
                </ul>
              </div>
            </div>



          </C.HighestRatingsLastMonth>

        </>
      }
    </C.Container>
  )

}
