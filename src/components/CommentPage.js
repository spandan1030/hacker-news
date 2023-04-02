import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function CommentPage() {
    // console.log(id);
    console.log('yes');
    const [comments, setComments] = useState([]);
    const location = useLocation();
    const { data } = location.state;
    const [loading ,setLoading]  = useState(true);
    const id = data[0].value;
    console.log(id)
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `http://hn.algolia.com/api/v1/items/${id}`
            );
            setComments(result.data);
            setLoading(false);
            // console.log(result.data);
        };
        fetchData();
    }, []);
    const getText = (html) => {
        var divContainer = document.createElement("div");
        divContainer.innerHTML = html;
        return divContainer.textContent || divContainer.innerText || "";
    }
    let navigate = useNavigate();
    const cmtPage = (e) => {
        // console.log(e);
        navigate(`/comment/`, {
            state: {
                data: [{ id: 1, value: e }]
            }
        });
    }
    const authorPage = (e) => {
        navigate(`/author/`, {
            state: {
                data: [{ id: 1, value: e }]
            }
        });
    }
    const childComment = (cmt) => {
        return (
            <div style={{ marginLeft: "3em" }}>
                <div
                    className="grey-text"
                    style={{
                        fontSize: "small",
                        display: "list-item",
                        listStyleType: "disclosure-open",
                        color: "gray",
                    }}
                >
                    <a
                        href="#"
                        style={{ color: "#9e9e9e" }}
                        onClick={() => authorPage(cmt.author)}
                    >
                        <span>by {cmt.author}</span>
                    </a>{" "}
                    |<span> {timeSince(cmt.created_at)}</span>
                </div>
                <div id={`collapse${cmt.id}`} style={{ backgroundColor: "#fffad7" }} aria-labelledby={`heading${cmt.id}`} data-bs-parent="#accordionExample">
                    <div className="accordion-body" dangerouslySetInnerHTML={{ __html: cmt.text }}>
                        {/* {getText(cmt.text)} */}
                    </div>
                </div>
                {cmt.children ? cmt.children.map((cmt) => childComment(cmt)) : ""}
            </div>
        );
    };
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
    return (
        <div>
            <Navbar/>
            {(loading == true) ? <div className="text-center py-3" style={{backgroundColor:"#fffad7"}}><button className="btn btn-primary" type="button" disabled >
                    <span className="spinner-grow spinner-grow-sm mx-2" role="status" aria-hidden="true"></span>
                    Loading...
                </button></div> :<div className='card' style={{ backgroundColor: "#fffad7" }}>
                <div className="card-body">
                    <div className='card-title' style={{ fontWeight: "bolder", fontFamily: "initial", fontSize: "24px" }}>{comments.title}</div>
                    <div className='card-subtitle mb-3'>By: {comments.author}</div>
                    {/* yet to implement only one show at a time */}
                    <div className="accordion mx-2 ">
                        {
                            comments.children ? comments.children.map((cmt) => (
                                <div style={{ marginLeft: "3em" }}>
                                    <div
                                        className="grey-text"
                                        style={{
                                            fontSize: "small",
                                            display: "list-item",
                                            listStyleType: "disclosure-open",
                                            color: "gray",
                                        }}
                                    >
                                        <a
                                            href="#"
                                            style={{ color: "#9e9e9e" }}
                                            onClick={() => authorPage(cmt.author)}
                                        >
                                            <span>by {cmt.author}</span>
                                        </a>{" "}
                                        |<span> {timeSince(cmt.created_at)}</span>
                                    </div>
                                    <div id={`collapse${cmt.id}`} style={{ backgroundColor: "#fffad7" }} aria-labelledby={`heading${cmt.id}`} data-bs-parent="#accordionExample">
                                        <div className="accordion-body" dangerouslySetInnerHTML={{ __html: cmt.text }}>
                                            {/* {getText(cmt.text)} */}
                                        </div>
                                    </div>
                                    {cmt.children ? cmt.children.map((cmt) => childComment(cmt)) : ""}
                                </div>
                            )) : ""
                        }
                    </div>
                </div>
            </div>}
        </div>

    )
}

export default CommentPage
