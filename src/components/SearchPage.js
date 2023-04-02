import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from './Pagination';
import './style.css'

function SearchPage() {

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    type: 'top',
    time: 'all',
    popularity: 'all'
  });
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [hitsPerPage, setHitsPerPage] = useState(30);
  const [tag, setTag] = useState("story");
  const [date, setDate] = useState("popularity")
  const [time, setTime] = useState("")
  const [numericFilter, setNumericFilter] = useState("")

  const getText = (html) => {
    var divContainer = document.createElement("div");
    divContainer.innerHTML = html;
    return divContainer.textContent || divContainer.innerText || "";
  }
  const filterUrl = (e) => {
    if (e) {
      return "(" + e + ")";
    }
    return "";
  }
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = ''
        date === 'popularity' ?
          response = await axios.get(`http://hn.algolia.com/api/v1/search?tags=${tag}&numericFilters=${numericFilter}&query=${query}&page=${page}&hitsPerPage=${hitsPerPage}`)
          :
          response = await axios.get(`http://hn.algolia.com/api/v1/search_by_date?tags=${tag}&numericFilters=${numericFilter}&query=${query}&page=${page}&hitsPerPage=${hitsPerPage}`)

        setStories(response.data.hits);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }

    };
    fetchData();
  }, [query, page, hitsPerPage, tag, date, time, numericFilter]);
  const timeSince = (timestamp) => {
    let date = new Date(timestamp);
    let now = new Date();
    let timeDiff = now - date;
    let diffMinutes = Math.round(timeDiff / (1000 * 60));
    let diffHours = Math.round(diffMinutes / 60);
    let diffDays = Math.round(diffHours / 24);
    let diffMonths = Math.round(diffDays / 30);
    let diffYears = Math.round(diffMonths / 12);

    if (diffYears >= 1) {
      return diffYears + " years ago";
    } else if (diffMonths >= 1) {
      return diffMonths + " months ago";
    } else if (diffDays >= 1) {
      return diffDays + " days ago"
    } else if (diffHours >= 1) {
      return diffHours + " hours ago"
    } else if (diffMinutes >= 0) {
      return diffMinutes + " minutes ago"
    }
  }
  const authorPage = (e) => {
    navigate(`/author/`, {
      state: {
        data: [{ id: 1, value: e }]
      }
    });
  }
  const cmtPage = (e) => {
    // console.log(e);
    navigate(`/comment/`, {
      state: {
        data: [{ id: 1, value: e }]
      }
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(0);
  };

  const paginate = (e) => {
    setPage(e);
  }


  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleHitsPerPage = (e) => {
    setHitsPerPage(e.target.value);
  };

  const handleFilterChange = e => {
    console.log(e);
    setLoading(true);
    setFilter({ ...filter, [e.target.name]: e.target.value });
    setTag(e.target.value)
  };
  const handleFilterChangeDate = e => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
    setDate(e.target.value)
  };
  const handleFilterChangeTime = e => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
    setTime(e.target.value)
    let numFilter = "";
    switch (e.target.value) {
      case 'past24':
        setDate('date')
        numFilter = 'created_at_i>86400'
        break;
      case 'pastweek':
        setDate('date')
        numFilter = 'created_at_i>604800'

        break;
      case 'pastmonth':
        setDate('date')
        numFilter = 'created_at_i>2592000'

        break;
      case 'pastyear':
        setDate('date')
        numFilter = 'created_at_i>31104000'

        break;

      default:
        numFilter = ''
        break;
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#ff782b" }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src="../logo.png" alt="Logo" height="26" className="d-inline-block align-text-top mx-1 border" />
            <strong>Hacker News</strong>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex" onSubmit={handleSubmit}>
              <input className="form-control me-2" type="text" value={query} onChange={handleChange} placeholder="Search here" aria-label="Search" style={{ width: "570px" }} />
              {/* <button className="btn btn-danger" type="submit">Search</button> */}
            </form>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                            <Link className="nav-link " to="/welcome">Welcome</Link>
                        </li> */}
              <li className="nav-item dropdown mx-1">
                <Link className="nav-link" ><label>
                  Search :
                  <select name="type" placeholder='Stories' value={filter.type} onChange={handleFilterChange}>
                    {/* <option value="">All</option> */}
                    <option value="story">Stories</option>
                    <option value="comment">comments</option>
                  </select>
                </label></Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link" ><label>
                  By :
                  <select name="popularity" placeholder='Popularity' value={filter.popularity} onChange={handleFilterChangeDate}>
                    <option value="popularity">Popularity</option>
                    <option value="date">Date</option>
                  </select>
                </label></Link>
              </li>
              <li className="nav-item dropdown ">
                <Link className="nav-link"><label>
                  For :
                  <select name="time" placeholder='All time' value={filter.time} onChange={handleFilterChangeTime}>
                    <option value="all">All Time</option>
                    <option value="past24">Past 24 hours</option>
                    <option value="pastweek">Past week</option>
                    <option value="pastmonth">Past month</option>
                    <option value="pastyear">Past year</option>
                  </select>
                </label></Link>
              </li>
              <li className="nav-item dropdown ">
                <Link className="nav-link" href="#"><label>Hits per page:
                  <select value={hitsPerPage} onChange={handleHitsPerPage}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                  </select>
                </label>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <>{(loading == true) ? <div className="text-center py-3" style={{backgroundColor:"#fffad7"}}><button className="btn btn-primary" type="button" disabled >
                    <span className="spinner-grow spinner-grow-sm mx-2" role="status" aria-hidden="true"></span>
                    Loading...
                </button></div> :
        <div className='py-3' style={{ backgroundColor: "#fffad7" }}>
          {stories.map((story) => (
            <div className='card my-2 mx-4' style={{ backgroundColor: "#fff8c4" }} key={story.objectID}>
              {(tag !== 'comment') ?
                <>{(loading == true) ? <div className="text-center my-5" ><button className="btn btn-primary" type="button" disabled>
                  <span className="spinner-grow spinner-grow-sm mx-2" role="status" aria-hidden="true"></span>
                  Loading...
                </button></div>
                  :
                  <div className="card-body">
                    <div className='d-inline-flex '>
                      {/* when url is blank to be done */}
                      <a className="card-title my-0" style={{ textDecoration: 'none', color: '#000000', fontSize: 'larger', fontWeight: "500" }} href={`${story.url}`}>
                        <div dangerouslySetInnerHTML={{ __html: story._highlightResult.title.value, }}></div>
                      </a>
                      <a className="card-subtitle mt-1 mx-2 text-muted my-0 pt-1" style={{ textDecoration: 'none', fontSize: '10px' }} target="_blank" href={`${story.url}`}>{filterUrl(story.url)}</a>
                    </div>
                    <div >
                      <a className="card-subtitle text-muted my-0" style={{ textDecoration: 'none', fontSize: 'small', cursor: "pointer" }} onClick={() => cmtPage(story.objectID)}>{story.points} points</a>
                      <a className='mx-2 text-muted' style={{ textDecoration: 'none', fontSize: 'small', cursor: "unset" }}>|</a>
                      <a className="card-subtitle text-muted my-0" style={{ textDecoration: 'none', fontSize: 'small', cursor: "pointer" }} onClick={() => authorPage(story.author)}>{story.author}</a>
                      <a className='mx-2 text-muted' style={{ textDecoration: 'none', fontSize: 'small', cursor: "unset" }}>|</a>
                      <a className="card-subtitle text-muted my-0" style={{ textDecoration: 'none', fontSize: 'small', cursor: "pointer" }} onClick={() => cmtPage(story.objectID)}>{timeSince(story.created_at)}</a>
                      <a className='mx-2 text-muted' style={{ textDecoration: 'none', fontSize: 'small', cursor: "unset" }}>|</a>
                      <a className="card-subtitle text-muted my-0" style={{ textDecoration: 'none', fontSize: 'small', cursor: "pointer" }} onClick={() => cmtPage(story.objectID)}>{story.num_comments} comments</a>
                    </div>
                  </div>
                }
                  {/* <CommentsPage storyId={stories.objectID} /> */}
                  {/* <AuthorPage authorId={stories.author} /> */}
                </>
                : <>{(loading == true) ? <div className="text-center my-5"><button className="btn btn-primary" type="button" disabled>
                  <span className="spinner-grow spinner-grow-sm mx-2" role="status" aria-hidden="true"></span>
                  Loading...
                </button></div>
                  :
                  <div className="card-body">
                    <div >
                      <a className="card-subtitle text-muted my-0" style={{ textDecoration: 'none', fontSize: 'small', cursor: "pointer" }} onClick={() => cmtPage(story.objectID)}>{story.points} points by</a>
                      <a className='mx-2 text-muted' style={{ textDecoration: 'none', fontSize: 'small', cursor: "unset" }}>|</a>
                      <a className="card-subtitle text-muted my-0" style={{ textDecoration: 'none', fontSize: 'small', cursor: "pointer" }} onClick={() => authorPage(story.author)}>{story.author}</a>
                      <a className='mx-2 text-muted' style={{ textDecoration: 'none', fontSize: 'small', cursor: "unset" }}>|</a>
                      <a className="card-subtitle text-muted my-0" style={{ textDecoration: 'none', fontSize: 'small', cursor: "pointer" }} onClick={() => cmtPage(story.objectID)}>{timeSince(story.created_at)}</a>
                      <a className='mx-2 text-muted' style={{ textDecoration: 'none', fontSize: 'small', cursor: "unset" }}>| parent | </a>
                      <a className="card-subtitle text-muted my-0" style={{ textDecoration: 'none', fontSize: 'small', cursor: "pointer" }} onClick={() => cmtPage(story.objectID)}>on: {story.story_title} comments</a>
                    </div>
                    <div className="mx-0" style={{ fontSize: 'small' }}>{getText(story.comment_text)}</div>
                  </div>}
                </>
              }
            </div>
          ))}
          <Pagination postsPerPage={hitsPerPage} totalPosts='300' paginate={paginate}></Pagination>
        </div>}
      </>
    </>
  )
}

export default SearchPage
