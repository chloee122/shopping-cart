export default function getImage(imageName: string) {
    return new URL(`../images/${imageName}.jpg`, import.meta.url).href
}