import axios from "axios";

const fetcher1=(url,username)=>
    axios.post(url,{search_username:username}).then(res=>res.data);

export default fetcher1;