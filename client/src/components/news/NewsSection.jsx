import { useState, useEffect, useRef } from 'react'
import NewsComponent from './NewsComponent'
import LoadingNewsComponent from './LoadingNewsComponent'
import arrow from '../../images/down-arrow.png'
import news_image from '../../images/news-feed-svgrepo-com.svg';

const NewsSection = () => {
  const [article, setArticle] = useState([])
  const [isNewsLoading, setIsNewsLoading] = useState(false)
  const [counterRight, setCounterRight] = useState(1);
  const tray = useRef(null);
  const tray_container = useRef(null);
  const API_URL = import.meta.env.VITE_APP_NEWS_API;
  // const articles = [
  //   {
  //     "source": {
  //       "id": null,
  //       "name": "Yahoo Entertainment"
  //     },
  //     "author": "Karen Friar",
  //     "title": "Stock market news today: Stocks mixed as December jobs report comes in strong - Yahoo Finance",
  //     "description": "Eyes are on the December US jobs report for signs of a cooling labor market.",
  //     "url": "https://finance.yahoo.com/news/stock-market-news-today-stocks-mixed-as-december-jobs-report-comes-in-strong-134002941.html",
  //     "urlToImage": "https://s.yimg.com/ny/api/res/1.2/itv78EHInUtaEULYU4Fujw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://s.yimg.com/os/creatr-uploaded-images/2023-09/9cd768f0-51b4-11ee-bf5b-913176adb9be",
  //     "publishedAt": "2024-01-05T14:40:52Z",
  //     "content": "Stocks moved in both directions at the opening bell on Friday, setting up an end to a nine-strong run of weekly wins, as investors digested more strong labor market data that will play into expectati… [+2570 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": "abc-news",
  //       "name": "ABC News"
  //     },
  //     "author": "Rachel Scott, Sarah Beth Hensley",
  //     "title": "Harry Dunn, Capitol Police officer on Jan. 6, announces run for Congress - ABC News",
  //     "description": "He's said he's fighting to hold Donald Trump accountable.",
  //     "url": "https://abcnews.go.com/Politics/harry-dunn-capitol-police-officer-jan-6-announces/story?id=106106641",
  //     "urlToImage": "https://i.abcnewsfe.com/a/9d39687c-0f9e-4974-b992-b62db472b809/harry-dunn-3-ap-bb-240104_1704392779752_hpMain_16x9.jpg?w=992",
  //     "publishedAt": "2024-01-05T13:36:31Z",
  //     "content": "Harry Dunn, who struggled to defend the Capitol on Jan. 6, 2021, and has been one of the most outspoken members of law enforcement to condemn the attack, announced Friday that he is running for Congr… [+2078 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": null,
  //       "name": "CNBC"
  //     },
  //     "author": "Jeff Cox",
  //     "title": "U.S. payrolls increased by 216,000 in December, much better than expected - CNBC",
  //     "description": "Nonfarm payrolls were expected to increase by 170,000 in December, according to a Dow Jones consensus estimate.",
  //     "url": "https://www.cnbc.com/2024/01/05/jobs-report-december-2023-payrolls-increased-by-216000-in-december.html",
  //     "urlToImage": "https://image.cnbcfm.com/api/v1/image/107354235-1704377965500-gettyimages-1905571799-mt1_7668_es9tauno.jpeg?v=1704378446&w=1920&h=1080",
  //     "publishedAt": "2024-01-05T13:31:04Z",
  //     "content": "The U.S. labor market closed out 2023 in strong shape as the pace of hiring was even more powerful than expected, the Labor Department reported Friday.\r\nDecember's jobs report showed employers added … [+4167 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": "the-washington-post",
  //       "name": "The Washington Post"
  //     },
  //     "author": "Andrew Jeong, Kelsey Ables, Victoria Bisset, Lior Soroka, Ishaan Tharoor, Adam Taylor",
  //     "title": "Israel-Gaza war live updates: Blinken heads to Middle East amid fears of war's spread - The Washington Post",
  //     "description": "The trip comes after a U.S. strike that killed an Iran-linked militia commander in Iraq and the suspected Israeli killing of a Hamas leader in Lebanon.",
  //     "url": "https://www.washingtonpost.com/world/2024/01/05/israel-hamas-war-news-gaza-palestine/",
  //     "urlToImage": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/3R4L7Z2WVTFVKZHM52Q5JI2DKM.jpg&w=1440",
  //     "publishedAt": "2024-01-05T13:30:00Z",
  //     "content": null
  //   },
  //   {
  //     "source": {
  //       "id": null,
  //       "name": "CBS Sports"
  //     },
  //     "author": "",
  //     "title": "WATCH: Nuggets absolutely stun Warriors as Nikola Jokic banks in 39-foot three-pointer at the buzzer - CBS Sports",
  //     "description": "Amid a sea of special plays, even Jokic knew his prayer was an all-time highlight",
  //     "url": "https://www.cbssports.com/nba/news/watch-nuggets-absolutely-stun-warriors-as-nikola-jokic-banks-in-39-foot-three-pointer-at-the-buzzer/",
  //     "urlToImage": "https://sportshub.cbsistatic.com/i/r/2024/01/05/fe3b7b4b-223a-49a1-bd22-35c58bd67270/thumbnail/1200x675/450322ea4d8dcca18da7ba889280c4e9/jokic-celebrate-2024-still.png",
  //     "publishedAt": "2024-01-05T13:19:00Z",
  //     "content": "The Denver Nuggets just pulled off one of the wildest victories of the NBA season, capping a 25-4 run over the game's final six-plus minutes with a 39-foot, banked-in buzzer-beater from Nikola Jokic … [+2199 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": "reuters",
  //       "name": "Reuters"
  //     },
  //     "author": "Reuters.com",
  //     "title": "Iran arrests suspects over bomb blasts, mourners demand revenge - state TV - Reuters.com",
  //     "description": null,
  //     "url": "https://www.reuters.com/world/middle-east/iran-leaders-vow-revenge-funeral-bomb-attack-victims-state-media-2024-01-05/",
  //     "urlToImage": null,
  //     "publishedAt": "2024-01-05T13:00:00Z",
  //     "content": null
  //   },
  //   {
  //     "source": {
  //       "id": null,
  //       "name": "GMA"
  //     },
  //     "author": "Shafiq Najib, Vera Drymon",
  //     "title": "Gypsy Rose Blanchard speaks out in 1st TV interview after being released from prison - Good Morning America",
  //     "description": "Gypsy Rose Blanchard was sent to prison for the murder of her mother in 2015.",
  //     "url": "https://www.goodmorningamerica.com/news/story/gypsy-rose-blanchard-speaks-1st-tv-interview-after-106085484",
  //     "urlToImage": "https://s.abcnews.com/images/GMA/gypsy-rose-blanchard-abc-jt-240104_1704408013472_hpMain_16x9_992.jpg",
  //     "publishedAt": "2024-01-05T12:48:07Z",
  //     "content": "Gypsy Rose Blanchard is speaking out about her freedom since being released from prison last month after serving time for the murder of her mother Clauddinnea \"Dee Dee\" Blanchard in 2015.\r\nSpeaking t… [+5546 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": "cnn",
  //       "name": "CNN"
  //     },
  //     "author": "Sarah Dean, Sophie Tanno",
  //     "title": "Oscar Pistorius released from South Africa prison after serving 9 years for murdering girlfriend Reeva Steenkamp - CNN",
  //     "description": "The double-amputee sprinter was released from prison on Friday, more than a decade after shooting girlfriend Reeva Steenkamp in a killing that shocked the world.",
  //     "url": "https://www.cnn.com/2024/01/05/africa/oscar-pistorius-released-jail-intl/index.html",
  //     "urlToImage": "https://media.cnn.com/api/v1/images/stellar/prod/240104140312-01-oscar-pistorius-court-061416-file.jpg?c=16x9&q=w_800,c_fill",
  //     "publishedAt": "2024-01-05T12:47:00Z",
  //     "content": "Johannesburg, South AfricaCNN\r\n  — \r\nOscar Pistorius, the double-amputee Paralympic and Olympic sprinter, was released from prison on parole on Friday, more than a decade after shooting his girlfrien… [+5325 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": null,
  //       "name": "SamMobile"
  //     },
  //     "author": "SamMobile, Asif Iqbal Shaik",
  //     "title": "Galaxy S24 battery and screen replacement costs revealed - SamMobile - Samsung news",
  //     "description": "After the European pricing of the Galaxy S24 series was leaked, some new information has come to light. Details about ...",
  //     "url": "https://www.sammobile.com/news/galaxy-s24-battery-screen-replacement-costs-leak/",
  //     "urlToImage": "https://www.sammobile.com/wp-content/uploads/2024/01/Samsung-Galaxy-S24-S24-S24-Ultra-720x405.jpg",
  //     "publishedAt": "2024-01-05T12:46:00Z",
  //     "content": "After the European pricing of the Galaxy S24 series was leaked, some new information has come to light. Details about the pricing of some of its replacement parts might have been revealed. A Slovenia… [+2173 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": null,
  //       "name": "BBC News"
  //     },
  //     "author": null,
  //     "title": "Neptune and Uranus seen in true colours for first time - BBC.com",
  //     "description": "Analysis shows that our ideas of the colours of the planets Neptune and Uranus have been wrong.",
  //     "url": "https://www.bbc.com/news/science-environment-67892275",
  //     "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/14321/production/_132212728_index.jpg",
  //     "publishedAt": "2024-01-05T12:46:00Z",
  //     "content": "By Pallab GhoshScience correspondent\r\nOur ideas of the colours of the planets Neptune and Uranus have been wrong, research led by UK astronomers reveals.\r\nImages from a space mission in the 1980s sho… [+3999 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": null,
  //       "name": "Eonline.com"
  //     },
  //     "author": "Lindsay Weinberg",
  //     "title": "Natalia Grace's Adoptive Mom Kristine Barnett Breaks Her Silence - E! NEWS",
  //     "description": "Natalia Grace’s adoptive mom Kristine Barnett addressed the Ukrainian orphan’s claims of abuse from a recent “highly sensationalized” docuseries, saying Natalia has \"extreme\" personal behaviors.",
  //     "url": "https://www.eonline.com/news/1392459/natalia-graces-adoptive-mom-kristine-barnett-breaks-her-silence-on-explosive-docuseries",
  //     "urlToImage": "https://akns-images.eonline.com/eol_images/Entire_Site/202359/rs_1200x1200-230609123755-1200-The_Curious_Case_of_Natalia_Grace-gj.jpg?fit=around%7C1080:1080&output-quality=90&crop=1080:1080;center,top",
  //     "publishedAt": "2024-01-05T12:27:00Z",
  //     "content": "Kristine also pointed out that Natalia's allegations on the \"highly sensationalized\" docuseries were previously investigated by authorities. Indeed, after the pair was charged with neglect of a depen… [+1153 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": null,
  //       "name": "[Removed]"
  //     },
  //     "author": null,
  //     "title": "[Removed]",
  //     "description": "[Removed]",
  //     "url": "https://removed.com",
  //     "urlToImage": null,
  //     "publishedAt": "1970-01-01T00:00:00Z",
  //     "content": "[Removed]"
  //   },
  //   {
  //     "source": {
  //       "id": "cnn",
  //       "name": "CNN"
  //     },
  //     "author": "Laura He",
  //     "title": "Tesla recalls 1.6 million cars in China to reduce risk of collisions - CNN",
  //     "description": "Tesla is recalling 1.6 million vehicles in China to fix problems with its Autopilot driver-assistance system and reduce the risk of collisions, a Chinese regulator said Friday.",
  //     "url": "https://www.cnn.com/2024/01/05/business/tesla-recall-china-safety-intl-hnk/index.html",
  //     "urlToImage": "https://media.cnn.com/api/v1/images/stellar/prod/230816232734-01-tesla-china-price-cuts-hnk-intl.jpg?c=16x9&q=w_800,c_fill",
  //     "publishedAt": "2024-01-05T12:03:00Z",
  //     "content": "Tesla is recalling 1.6 million vehicles in China to fix problems with its Autopilot driver-assistance system and reduce the risk of collisions, a Chinese regulator said Friday.\r\nThe issues can be fix… [+1716 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": null,
  //       "name": "The Weather Channel"
  //     },
  //     "author": "The Weather Channel",
  //     "title": "Winter Storm Ember To Bring Snow To Northeast | Weather.com - The Weather Channel",
  //     "description": "A winter storm will affect parts of the East this weekend with snow, ice, rain and wind. Here's what we know right now. - Articles from The Weather Channel | weather.com",
  //     "url": "https://weather.com/storms/winter/news/2024-01-04-winter-storm-ember-forecast-northeast-winter-storm",
  //     "urlToImage": "https://s.w-x.co/Ember_prim_0105a.jpg",
  //     "publishedAt": "2024-01-05T12:01:11Z",
  //     "content": "At a Glance\r\n<ul><li>A winter storm will bring snow, ice, rain and wind to the East this weekend.</li><li>Parts of southern and central New England will see significant snowfall accumulations and gus… [+4038 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": null,
  //       "name": "BBC News"
  //     },
  //     "author": "Leah Carroll",
  //     "title": "AI in 2024: Five trends workers need to know - BBC.com",
  //     "description": "The influence of artificial intelligence stands to make an even bigger impact this year in areas including hiring bias, inclusivity, regulation and more.",
  //     "url": "https://www.bbc.com/worklife/article/20240104-ai-in-2024-five-trends-workers-need-to-know",
  //     "urlToImage": "https://ychef.files.bbci.co.uk/624x351/p0h34w56.jpg",
  //     "publishedAt": "2024-01-05T12:00:00Z",
  //     "content": "By Leah CarrollFeatures correspondent\r\nOne of the biggest opportunities for AI in 2024 is driving inclusion across the workforce (Credit: Alamy)\r\nThe influence of artificial intelligence stands to ma… [+8512 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": "espn",
  //       "name": "ESPN"
  //     },
  //     "author": "ESPN staff",
  //     "title": "NFL Week 18 picks, schedule, odds, injuries, fantasy tips - ESPN",
  //     "description": "There are 16 games in Week 18. Which teams will win? Who are the X factors? And what's at stake in each matchup?",
  //     "url": "https://www.espn.com/nfl/story/_/page/nflviewguide010524/nfl-week-18-picks-schedule-fantasy-football-odds-injuries-stats-2023-season",
  //     "urlToImage": "https://a.espncdn.com/combiner/i?img=%2Fphoto%2F2023%2F1001%2Fr1232576_1296x729_16%2D9.jpg",
  //     "publishedAt": "2024-01-05T12:00:00Z",
  //     "content": "The Week 18 NFL schedule for the 2023 season is stacked with great matchups, and we've got you covered with what you need to know heading into the weekend. Our NFL Nation reporters bring us the bigge… [+43779 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": null,
  //       "name": "BBC News"
  //     },
  //     "author": null,
  //     "title": "North Korea fires artillery shells towards South's border island - BBC.com",
  //     "description": "South Korea had afterwards issued an evacuation warning to its civilians on the island.",
  //     "url": "https://www.bbc.com/news/world-asia-67889551",
  //     "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/D4DA/production/_132209445_gettyimages-1226598324.jpg",
  //     "publishedAt": "2024-01-05T11:19:00Z",
  //     "content": "South Korean military held live fire drills in response to artillery fire from the North\r\nNorth Korea has fired more than 200 rounds of artillery shells off its west coast, towards the South's Yeonpy… [+4258 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": "associated-press",
  //       "name": "Associated Press"
  //     },
  //     "author": "ALANNA DURKIN RICHER, MICHAEL KUNZELMAN",
  //     "title": "Hundreds of convictions, but a major mystery is still unsolved 3 years after the Jan. 6 Capitol riot - The Associated Press",
  //     "description": "Three years after the attack on the U.S. Capitol, Washington’s federal courthouse is flooded with trials, guilty plea hearings and sentencings stemming from the largest criminal investigation in American history. And the hunt for suspects is far from over. Au…",
  //     "url": "https://apnews.com/article/capitol-riot-jan-6-criminal-cases-anniversary-bf436efe760751b1356f937e55bedaa5",
  //     "urlToImage": "https://dims.apnews.com/dims4/default/35846fb/2147483647/strip/true/crop/5133x2887+0+267/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F8b%2F75%2F0fa8cc0eb7c25c012c1d310ad58b%2F8f03b88fa3b845e096c5e08441229b06",
  //     "publishedAt": "2024-01-05T11:15:00Z",
  //     "content": "WASHINGTON (AP) Members of far-right extremist groups. Former police officers. An Olympic gold medalist swimmer. And active duty U.S. Marines. \r\nThey are among the hundreds of people who have been co… [+7003 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": "abc-news",
  //       "name": "ABC News"
  //     },
  //     "author": "Angeline Jane Bernabe",
  //     "title": "'Mary Poppins' actress Glynis Johns dies at 100 - ABC News",
  //     "description": "Johns died from natural causes, her publicist said.",
  //     "url": "https://abcnews.go.com/GMA/Culture/mary-poppins-actress-glynis-johns-dies-100/story?id=106111513",
  //     "urlToImage": "https://i.abcnewsfe.com/a/8dc56662-22fd-4c1e-ae17-d98f30a78085/glynis-johns-01-gty-jef-240104_1704397971306_hpMain_16x9.jpg?w=992",
  //     "publishedAt": "2024-01-05T10:48:32Z",
  //     "content": "Glynis Johns, the British actress best known for her role as Mrs. Winifred Banks in \"Mary Poppins,\" has died of natural causes, her publicist said. She was 100.\r\nJohns starred alongside Julie Andrews… [+1684 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": "abc-news",
  //       "name": "ABC News"
  //     },
  //     "author": "Will Steakin",
  //     "title": "Trump's businesses received millions from foreign entities during his presidency, House report says - ABC News",
  //     "description": "Democrats say the payments defied the Constitution's foreign emoluments clause.",
  //     "url": "https://abcnews.go.com/US/trumps-businesses-received-millions-foreign-entities-presidency-house/story?id=106106433",
  //     "urlToImage": "https://i.abcnewsfe.com/a/b8be8871-9986-410e-adb5-00e1f1c4dab6/trump-rt-er-240104_1704387946127_hpMain_16x9.jpg?w=992",
  //     "publishedAt": "2024-01-05T10:18:23Z",
  //     "content": "Former President Donald Trump's businesses received millions of dollars from foreign entities located in 20 different countries during his presidency, according to a new report released Thursday by D… [+3420 chars]"
  //   }
  // ]
  const loadNews = async () => {
    try {
      setIsNewsLoading(true)
      let url = `https://newsapi.org/v2/top-headlines?category=health&apiKey=${API_URL}&page=1&pageSize=9`;
      let data = await fetch(url);
      let parseData = await data.json();
      console.log(parseData)
      setArticle(parseData.articles)
      // setArticle(articles);
    } catch (error) {
      console.log(error)
    } finally {
      setIsNewsLoading(false)
    }

  }

  const move_right = () => {
    tray_container.current.scrollBy({
      left: tray.current.clientWidth,
      behavior: "smooth"
    })
    setCounterRight(counterRight + 1)
  }
  const move_left = () => {
    tray_container.current.scrollBy({
      left: -tray.current.clientWidth,
      behavior: "smooth"
    })
    setCounterRight(counterRight - 1)
  }
  useEffect(() => {
    loadNews();
    // tray_container.current.addEventListener('wheel', (e) => {
    //   if (e.shiftKey) {
    //     // Prevent horizontal scrolling
    //     e.preventDefault();
    //   }
    // });
  }, [])


  return (
    <div className="newsSection__wrapper" id='news__wrapper'>
      <div className="news__heading">
        <img src={news_image} alt="" />
        <p>Latest Health News</p>
      </div>
      <div className="newsSection__tray-wrapper">
        <button className='tray-btn' id='prev' onClick={move_left}><img src={arrow} alt="Prev" /></button>
        <div className="newsSection__tray" ref={tray_container}>
          <div className="newsSection__container">
            {
              !isNewsLoading
                ?
                article.map((element, index) => {
                  return <div className="component-wrapper" key={index} ref={tray}><NewsComponent forwardRef={tray} key={index} title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 145) : ""} imgUrl={element.urlToImage} readMore={element.url} author={element.author} date={element.publishedAt} name={element.source.name} /></div>
                })
                :
                [...Array(4)].map((_, i) => (
                  <LoadingNewsComponent key={i} />
                ))

            }
          </div>
        </div>
        <button className='tray-btn' id='next' onClick={move_right}><img src={arrow} alt="next" /></button>
      </div>
    </div>
  )
}

export default NewsSection