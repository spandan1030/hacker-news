import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams, Navigate } from 'react-router-dom';
import Pagination from './Pagination';
import Navbar from './Navbar';

function StoriesPage() {
    const [stories, setStories] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hitsPerPage, setHitsPerPage] = useState(50);
    const [tag, setTag] = useState("story");
    let navigate = useNavigate();
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                let response = "";
                response = await axios.get(`http://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}&hitsPerPage=${hitsPerPage}`);
                setStories(response.data.hits);
                setLoading(false);
                // console.log(response)
            }
            catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [page, hitsPerPage, tag]);
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
            console.log(diffYears + " years ago");
            return diffYears + " years ago";
        } else if (diffMonths >= 1) {
            console.log(diffMonths + " months ago");
            return diffMonths + " months ago";
        } else if (diffDays >= 1) {
            console.log(diffDays + " days ago");
            return diffDays + " days ago"
        } else if (diffHours >= 1) {
            console.log(diffHours + " hours ago");
            return diffHours + " hours ago"
        } else if (diffMinutes >= 0) {
            console.log(diffMinutes + " minutes ago");
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

    const paginate = (e) => {
        setPage(e);
    }

    const filterUrl = (e) => {
        if (e) {
            return "(" + e + ")";
        }
        return "";
    }
    return (
        <>
            <Navbar />
            <div className='py-3' style={{ backgroundColor: "#fffad7" }}>
                <div className='d-flex justify-content-center' style={{ fontSize: "32px" }}>Top Stories today</div>
                {(loading == true) ? <div className="text-center my-3"><button class="btn btn-primary" type="button" disabled>
                    <span class="spinner-grow spinner-grow-sm mx-2" role="status" aria-hidden="true"></span>
                    Loading...
                </button></div> :

                    <>{stories.map((story) => (
                        <div className='card my-2 mx-4' style={{ backgroundColor: "#fff8c4" }} key={story.objectID}>
                            <>
                                <div className="card-body">
                                    <div className='d-inline-flex '>
                                        {/* when url is blank to be done */}
                                        <a className="card-title my-0" style={{ textDecoration: 'none', color: '#000000', fontSize: 'larger', fontWeight: "500" }} href={`${story.url}`}>{story.title}</a>
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
                                {/* <CommentsPage storyId={stories.objectID} /> */}
                                {/* <AuthorPage authorId={stories.author} /> */}
                            </>

                        </div>
                    ))}</>


                }
                <Pagination postsPerPage={hitsPerPage} totalPosts='1000' paginate={paginate}></Pagination>
            </div>
        </>
    )
}

export default StoriesPage
