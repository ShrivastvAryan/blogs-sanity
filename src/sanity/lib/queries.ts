export const allPostsQuery = `
*[_type == "post"]{
  _id,
  title,
  slug,
  mainImage{
    asset->{
      _id,
      url
    },
    alt
  },
  author->{
    name
  },
  categories[]->{
    title
  },
  publishedAt
} | order(publishedAt desc)
`;

export const singlePostQuery = (slug: string) => `
*[_type == "post" && slug.current == "${slug}"][0]{
  title,
  slug,
  mainImage{
    asset->{
      _id,
      url
    },
    alt
  },
  author->{
    name
  },
  categories[]->{
    title
  },
  publishedAt,
  body
}
`;
