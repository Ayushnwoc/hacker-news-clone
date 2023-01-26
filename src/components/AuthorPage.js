import React,{useState , useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function AuthorPage() {
    const [user, setUser] = useState({});
    const location = useLocation();
    const { data } = location.state;
    const id = data[0].value;

    useEffect(() => {
        console.log(id);
        const fetchData = async () => {
            const result = await axios(
                `http://hn.algolia.com/api/v1/users/${id}`
            );
            setUser(result.data);
            console.log(result.data);
        };
        fetchData();

    }, [id]);
    return (
        <div style={{backgroundColor:"#fff8c4"}}>
            <div className='container py-4' >
                <p>Username : {user.username}</p>
                <p>Created : {user.created_at}</p>
                <p>Karma : {user.karma}</p>
                <p>
                    About : {user.about}
                </p>
            </div>
        </div>
    )
}

export default AuthorPage
