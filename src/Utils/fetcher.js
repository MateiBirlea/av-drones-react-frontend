import axios from "axios";

const fetcher=(url,id)=>
    axios.post(url, { id_receiver: id }).then(res=>res.data);

export default fetcher;