import {base_url} from "assets/js/api";

export function getImageUrl(image_path) {
    return `${base_url}/open/image?imgPath=${image_path}`
}
