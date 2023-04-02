import React,{useState , useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

function AuthorPage() {
    const [user, setUser] = useState({});
    const location = useLocation();
    const { data } = location.state;
    const id = data[0].value;
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        console.log(id);
        const fetchData = async () => {
            const result = await axios(
                `http://hn.algolia.com/api/v1/users/${id}`
            );
            setUser(result.data);
            setLoading(false);
        };
        fetchData();

    }, [id]);
    const getText = (html) => {
        var divContainer = document.createElement("div");
        divContainer.innerHTML = html;
        return divContainer.textContent || divContainer.innerText || "";
    }
    return (
        <>
        <Navbar/>{(loading == true) ? <div className="text-center py-3" style={{backgroundColor:"#fffad7"}}><button className="btn btn-primary" type="button" disabled >
                    <span className="spinner-grow spinner-grow-sm mx-2" role="status" aria-hidden="true"></span>
                    Loading...
                </button></div> :
        <div style={{backgroundColor:"#fff8c4"}}>
            <div className='container py-4' >
                <p>Username : {user.username}</p>
                <p>Created : {user.created_at}</p>
                <p>Karma : {user.karma}</p>
                <div className='d-flex'>
                    <p>About : </p>
                <p dangerouslySetInnerHTML={{ __html: user.about }} className="mx-2"></p>
                </div>
            </div>
        </div>}
        </>
    )
}

export default AuthorPage
