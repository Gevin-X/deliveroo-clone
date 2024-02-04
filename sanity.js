import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
//import imageUrlBuilder from '@sanity/image-url'


const client = createClient({
    projectId: 'iiy9n27z',
    dataset: 'production',
    useCdn:true,
    apiVersion:"2023-01-15"
})

const builder = imageUrlBuilder({projectId: 'iiy9n27z', dataset: 'production'});
export const urlFor = (source) => builder.image(source);
export default client;
