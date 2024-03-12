import cloudinary from "cloudinary";
import ENV from "../env/index.js";
import axios from "axios";

const GEOAPIFY_API = axios.create({ baseURL: "https://api.geoapify.com/" });

async function autocomplete(text = "") {
  return await GEOAPIFY_API.get(
    `v1/geocode/autocomplete?text=${text}&apiKey=${ENV.GEOAPIFY_API_KEY}`
  );
}

export default { autocomplete };
