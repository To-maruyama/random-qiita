import axios from "axios";

const baseDomain = "https://qiita.com"
const baseURL = `${baseDomain}/api/v2`

export default axios.create({baseURL});