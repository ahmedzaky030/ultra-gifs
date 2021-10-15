import { GifModel, Rating, Term } from "src/app/giphy/models";

const gif1: GifModel = {
    id: "KDnxbHF3N7EDKhZIGE",
    title: "Happy Level Up GIF",
    images: {
        original:{
            url: "https://media1.giphy.com/media/KDnxbHF3N7EDKhZIGE/giphy.gif?cid=2ad5fbfep9hl3j03tb9r6fz618nh4lhtwuxcb1age0gu0i26&rid=giphy.gif&ct=g",
            width: "375",
            height: "375"
        },
        fixed_width: {
            url: "https://media1.giphy.com/media/KDnxbHF3N7EDKhZIGE/200w.gif?cid=2ad5fbfep9hl3j03tb9r6fz618nh4lhtwuxcb1age0gu0i26&rid=200w.gif&ct=g",
            height: "200",
            width: "200"
        }
    },
    url: "https://giphy.com/gifs/loading-level-up-null-KDnxbHF3N7EDKhZIGE",
    bitly_url: "https://gph.is/g/E0W2Wgp",
    embed_url: "https://giphy.com/embed/KDnxbHF3N7EDKhZIGE",
    rating:Rating.G,
    slug: "loading-level-up-null-KDnxbHF3N7EDKhZIGE",
    type: "gif"
}

const gif2: GifModel = {
    id: "QRRnWMrXT9E7C",
    title: "null GIF",
    images: {
        original:{
            url: "https://media1.giphy.com/media/KDnxbHF3N7EDKhZIGE/giphy.gif?cid=2ad5fbfep9hl3j03tb9r6fz618nh4lhtwuxcb1age0gu0i26&rid=giphy.gif&ct=g",
            width: "375",
            height: "375"
        },
        fixed_width: {
            url: "https://media1.giphy.com/media/KDnxbHF3N7EDKhZIGE/200w.gif?cid=2ad5fbfep9hl3j03tb9r6fz618nh4lhtwuxcb1age0gu0i26&rid=200w.gif&ct=g",
            height: "200",
            width: "200"
        }
    },
    url: "https://giphy.com/gifs/QRRnWMrXT9E7C",
    bitly_url: "http://gph.is/28SpjN8",
    embed_url: "https://giphy.com/embed/QRRnWMrXT9E7C",
    rating:Rating.G,
    slug: "QRRnWMrXT9E7C",
    type: "gif"
}

export const Gifs = [gif1, gif2];

const tag1: Term = { name: 'comedy' }
const tag2: Term = { name: 'funny' }

export const Tags = [tag1, tag2];