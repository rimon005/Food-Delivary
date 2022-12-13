import  SanityClient  from "@sanity/client";
import  ImageUrlBuilder from "@sanity/image-url";
export const client = SanityClient({
    projectId:"dr7sxd6l",
    dataset:'production',
    apiVersion:"2022-12-13",
    useCdn:true,
    token:"sk2RC5Xg29KRJ9yt8UaF4LzgjQY1J2apu5UfeKtU60ykpXdsf0gEJwyyk0b5ymT9tuCnzGhy21rVvGpujiiO1KqkYEfd7KpSUJl4HA4stu0TPJNet3Ef0a4iKQpQHWR1dltM0WEy6puU3tnf6yXFkZB2lrzb8wI1Ekkey4QivnO4ZqT61dZE"
});


const builder = ImageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)