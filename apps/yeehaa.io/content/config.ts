import { defineCollection, reference, z } from "astro:content";
import { article, landing, profile, series as series_cms, course, tag } from "@rizom/cms/schema";

const posts = defineCollection({
  type: "content",
  schema: ({ image }) => article.schema.extend({
    bannerImageURL: image(),
    course: reference('Courses').optional(),
    series: reference('Series').optional()
  })
});

const landingPages = defineCollection({
  type: "data",
  schema: ({ image }) => landing.schema.extend({
    profileImageURL: image(),
    bannerImageURL: image(),
    articles: z.array(reference('Posts')),
    courses: z.array(reference('Courses')),
  })
});

const profiles = defineCollection({
  type: "data",
  schema: ({ image }) => profile.schema.extend({
    profileImageURL: image(),
    articles: z.array(reference('Posts')),
  })
});

const series = defineCollection({
  type: "data",
  schema: ({ image }) => series_cms.schema.extend({
    bannerImageURL: image(),
    articles: z.array(reference('Posts')),
  })
});

const tags = defineCollection({
  type: "data",
  schema: tag.schema.extend({
    articles: z.array(reference('Posts')),
    courses: z.array(reference('Courses')),
  })
});

const courses = defineCollection({
  type: "data",
  schema: course.schema.extend({
    habitat: reference('Posts').optional()
  })
});

export const collections = {
  Posts: posts,
  Tags: tags,
  Profiles: profiles,
  LandingPage: landingPages,
  Courses: courses,
  Series: series
};
