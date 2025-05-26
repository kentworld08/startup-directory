import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY =
  defineQuery(`*[_type == "startup" && defined(slug.current)] | order(_createdAt desc){
  _id,
    _createdAt,
    author -> {
      name,image
    },
    image,
    category,
    description,
    views,
    title
}`);
export const STARTUPS_BY_ID_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id,
    _createdAt,
    author -> {
      name,_id,bio,image,username
    },
    image,
    category,
    description,
    pitch,
    slug,
    views,
    title
}`);
export const STARTUPS_VIEWS_QUERY =
  defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id,views,
   
}`);
// export const AUTHOR_BY_GITHUB_ID_QUERY =
//   defineQuery(`*[_type == "author" && _id == $id][0]{
//   _id,id,name,username,email,image,bio

// }`);
