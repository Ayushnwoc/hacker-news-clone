import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function CommentPage() {
    // console.log(id);
    console.log('yes');
    const [comments, setComments] = useState([]);
    const location = useLocation();
    const { data } = location.state;
    const id = data[0].value;
    console.log(id)
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `http://hn.algolia.com/api/v1/items/${id}`
            );
            setComments(result.data);
            // console.log(result.data);
        };
        fetchData();
    }, []);
    const getText = (html) => {
        var divContainer = document.createElement("div");
        divContainer.innerHTML = html;
        return divContainer.textContent || divContainer.innerText || "";
    }
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
            <div className='card' style={{ backgroundColor: "#fffad7" }}>
                <div className="card-body">
                    <div className='card-title' style={{ fontWeight: "bolder", fontFamily: "initial", fontSize: "24px" }}>{comments.title}</div>
                    <div className='card-subtitle mb-3'>&ensp; By: {comments.author}</div>
                    {/* yet to implement only one show at a time */}
                    <div className="accordion mx-2 ">
                        {
                            comments.children  ? comments.children.map((cmt) => (
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id={`heading${cmt.id}`}>
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" style={{ backgroundColor: "#fff8c4" }} data-bs-target={`#collapse${cmt.id}`} aria-expanded="false" aria-controls={`collapse${cmt.id}`}>
                                            <strong>{cmt.author} </strong> : {timeSince(cmt.created_at)}
                                        </button>
                                    </h2>
                                    <div id={`collapse${cmt.id}`} style={{ backgroundColor: "#fffad7" }} className="accordion-collapse collapse" aria-labelledby={`heading${cmt.id}`} data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            {getText(cmt.text)}
                                        </div>
                                    </div>
                                </div>
                            )) :""
                        }
                    </div>
                </div>
                {/* /* {
                    comments.children.map((cmt) => (
                    <> {cmt.text}
                    <br></br>
                    </>
                    
                    ))
                //   }
                            {console.log(comments.children)}
                            {/* {console.log(comments.children.length)} */}
            </div>
        </div>

    )
}

export default CommentPage
