import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = join(process.cwd(), 'data')

export function getPostSlugs (category) {
  return fs.readdirSync(join(postsDirectory, category))
}

export function getPostBySlug (category, slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${category}/${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {}

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts (category, fields = []) {
  const slugs = getPostSlugs(category)
  const posts = slugs
    .map((slug) => getPostBySlug(category, slug, fields))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}

export function getRecentPosts (category, fields = []) {
  const slugs = getPostSlugs(category)
  const posts = slugs
    .map((slug) => getPostBySlug(category, slug, fields))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts.splice(0, 8)
}

// 再現状況

export function getStatusBySlug (park, slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, 'status', park, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {}

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getStatus (park, fields = []) {
  const slugs = fs.readdirSync(join(postsDirectory, 'status', park))
  return slugs.map((slug) => getStatusBySlug(park, slug, fields))
}
