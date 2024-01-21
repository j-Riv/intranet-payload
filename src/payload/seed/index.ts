import fs from 'fs'
import path from 'path'
import type { Payload } from 'payload'

import { absenceRequest1 } from './absence-request-1'
import { absenceRequestsPage } from './absence-requests-page'
import { event1 } from './event-1'
import { event2 } from './event-2'
import { eventsPage } from './events-page'
import { home } from './home'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { post1 } from './post-1'
import { post2 } from './post-2'
import { post3 } from './post-3'
import { postsPage } from './posts-page'
import { project1 } from './project-1'
import { project2 } from './project-2'
import { project3 } from './project-3'
import { projectsPage } from './projects-page'

const collections = [
  'categories',
  'media',
  'pages',
  'posts',
  'projects',
  'comments',
  'events',
  'absence-requests',
  'departments',
]
const globals = ['header', 'settings', 'footer']

// Next.js revalidation errors are normal when seeding the database without a server running
// i.e. running `yarn seed` locally instead of using the admin UI within an active app
// The app is not running to revalidate the pages and so the API routes are not available
// These error messages can be ignored: `Error hitting revalidate route for...`
export const seed = async (payload: Payload): Promise<void> => {
  payload.logger.info('Seeding database...')

  // we need to clear the media directory before seeding
  // as well as the collections and globals
  // this is because while `yarn seed` drops the database
  // the custom `/api/seed` endpoint does not

  payload.logger.info(`— Clearing media...`)

  const mediaDir = path.resolve(__dirname, '../../media')
  if (fs.existsSync(mediaDir)) {
    fs.rmdirSync(mediaDir, { recursive: true })
  }

  payload.logger.info(`— Clearing collections and globals...`)

  // clear the database
  await Promise.all([
    ...collections.map(async collection =>
      payload.delete({
        collection: collection as 'media',
        where: {},
      }),
    ), // eslint-disable-line function-paren-newline
    ...globals.map(async global =>
      payload.updateGlobal({
        slug: global as 'header',
        data: {},
      }),
    ), // eslint-disable-line function-paren-newline
  ])

  payload.logger.info(`— Seeding departments...`)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mediaDepartment, salesDepartment, warehouseDepartment, purchasingDepartment] =
    await Promise.all([
      await payload.create({
        collection: 'departments',
        data: {
          name: 'Media',
        },
      }),
      await payload.create({
        collection: 'departments',
        data: {
          name: 'Sales',
        },
      }),
      await payload.create({
        collection: 'departments',
        data: {
          name: 'Warehouse',
        },
      }),
      await payload.create({
        collection: 'departments',
        data: {
          name: 'Purchasing',
        },
      }),
    ])

  payload.logger.info(`— Seeding demo users...`)

  await Promise.all(
    ['demo-admin@payloadcms.com', 'demo-editor@payloadcms.com', 'demo-user@payloadcms.com'].map(
      async email => {
        await payload.delete({
          collection: 'users',
          where: {
            email: {
              equals: email,
            },
          },
        })
      },
    ),
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let [{ id: demoAdminId }, _, { id: demoUserID }] = await Promise.all([
    await payload.create({
      collection: 'users',
      data: {
        email: 'demo-admin@payloadcms.com',
        name: 'Demo Admin',
        password: 'password',
        roles: ['admin'],
        department: mediaDepartment.id,
      },
    }),
    await payload.create({
      collection: 'users',
      data: {
        email: 'demo-editor@payloadcms.com',
        name: 'Demo Editor',
        password: 'password',
        roles: ['editor'],
        department: mediaDepartment.id,
      },
    }),
    await payload.create({
      collection: 'users',
      data: {
        email: 'demo-user@payloadcms.com',
        name: 'Demo User',
        password: 'password',
        roles: ['user'],
        department: salesDepartment.id,
      },
    }),
  ])

  payload.logger.info(`— Seeding media...`)

  const [image1Doc, image2Doc] = await Promise.all([
    await payload.create({
      collection: 'media',
      filePath: path.resolve(__dirname, 'image-1.jpg'),
      data: image1,
    }),
    await payload.create({
      collection: 'media',
      filePath: path.resolve(__dirname, 'image-2.jpg'),
      data: image2,
    }),
  ])

  payload.logger.info(`— Seeding categories...`)

  const [
    technologyCategory,
    newsCategory,
    financeCategory,
    designCat,
    softwareCat,
    engineeringCat,
    eventCategory,
    paidHolidayCategory,
    absenceRequestCategory,
  ] = await Promise.all([
    await payload.create({
      collection: 'categories',
      data: {
        title: 'Technology',
      },
    }),
    await payload.create({
      collection: 'categories',
      data: {
        title: 'News',
      },
    }),
    await payload.create({
      collection: 'categories',
      data: {
        title: 'Finance',
      },
    }),
    await payload.create({
      collection: 'categories',
      data: {
        title: 'Design',
      },
    }),
    await payload.create({
      collection: 'categories',
      data: {
        title: 'Software',
      },
    }),
    await payload.create({
      collection: 'categories',
      data: {
        title: 'Engineering',
      },
    }),
    await payload.create({
      collection: 'categories',
      data: {
        title: 'Event',
      },
    }),
    await payload.create({
      collection: 'categories',
      data: {
        title: 'Paid Holiday',
      },
    }),
    await payload.create({
      collection: 'categories',
      data: {
        title: 'Absence Request',
      },
    }),
  ])

  // we are using postgres our ids are strings
  let image1ID = image1Doc.id.toString()
  let image2ID = image2Doc.id.toString()
  let demoAdminID = demoAdminId.toString()

  // if (payload.db.defaultIDType === 'text') {
  //   image1ID = `"${image1Doc.id}"`
  //   image2ID = `"${image2Doc.id}"`
  //   demoAdminID = `"${demoAdminId}"`
  // }

  payload.logger.info(`— Seeding posts...`)

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  const post1Doc = await payload.create({
    collection: 'posts',
    data: JSON.parse(
      JSON.stringify({ ...post1, categories: [technologyCategory.id] })
        .replace(/"\{\{IMAGE\}\}"/g, image1ID)
        .replace(/"\{\{AUTHOR\}\}"/g, demoAdminID),
    ),
  })

  const post2Doc = await payload.create({
    collection: 'posts',
    data: JSON.parse(
      JSON.stringify({ ...post2, categories: [newsCategory.id] })
        .replace(/"\{\{IMAGE\}\}"/g, image1ID)
        .replace(/"\{\{AUTHOR\}\}"/g, demoAdminID),
    ),
  })

  const post3Doc = await payload.create({
    collection: 'posts',
    data: JSON.parse(
      JSON.stringify({ ...post3, categories: [financeCategory.id] })
        .replace(/"\{\{IMAGE\}\}"/g, image1ID)
        .replace(/"\{\{AUTHOR\}\}"/g, demoAdminID),
    ),
  })

  const posts = [post1Doc, post2Doc, post3Doc]

  // update each post with related posts

  await Promise.all([
    await payload.update({
      collection: 'posts',
      id: post1Doc.id,
      data: {
        relatedPosts: [post2Doc.id, post3Doc.id],
      },
    }),
    await payload.update({
      collection: 'posts',
      id: post2Doc.id,
      data: {
        relatedPosts: [post1Doc.id, post3Doc.id],
      },
    }),
    await payload.update({
      collection: 'posts',
      id: post3Doc.id,
      data: {
        relatedPosts: [post1Doc.id, post2Doc.id],
      },
    }),
  ])

  payload.logger.info(`— Seeding events...`)

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  const event1Doc = await payload.create({
    collection: 'events',
    data: JSON.parse(
      JSON.stringify({ ...event1, categories: [eventCategory.id, paidHolidayCategory.id] })
        .replace(/"\{\{IMAGE\}\}"/g, image1ID)
        .replace(/"\{\{AUTHOR\}\}"/g, demoAdminID),
    ),
  })

  const event2Doc = await payload.create({
    collection: 'events',
    data: JSON.parse(
      JSON.stringify({ ...event2, categories: [eventCategory.id, paidHolidayCategory.id] })
        .replace(/"\{\{IMAGE\}\}"/g, image1ID)
        .replace(/"\{\{AUTHOR\}\}"/g, demoAdminID),
    ),
  })

  // const events = [event1Doc, event2Doc]

  // update each event with related events

  await Promise.all([
    await payload.update({
      collection: 'events',
      id: event1Doc.id,
      data: {
        relatedEvents: [event2Doc.id],
      },
    }),
    await payload.update({
      collection: 'events',
      id: event2Doc.id,
      data: {
        relatedEvents: [event1Doc.id],
      },
    }),
  ])

  payload.logger.info(`— Seeding absence requests...`)

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  // const absenceRequest1Doc =
  await payload.create({
    collection: 'absence-requests',
    data: JSON.parse(
      JSON.stringify({
        ...absenceRequest1,
        categories: [eventCategory.id, absenceRequestCategory.id],
      })
        .replace(/"\{\{IMAGE\}\}"/g, image1ID)
        .replace(/"\{\{AUTHOR\}\}"/g, demoAdminID)
        .replace(/"\{\{APPROVER\}\}"/g, demoAdminID),
    ),
  })

  // const absenceRequests = [absenceRequest1Doc]

  // update each event with related events

  // await Promise.all([
  //   await payload.update({
  //     collection: 'events',
  //     id: event1Doc.id,
  //     data: {
  //       relatedAbsenceRequests: [absenceRequest1Doc.id],
  //     },
  //   }),
  // ])

  payload.logger.info(`— Seeding comments...`)

  await Promise.all(
    posts.map(
      async (post, index) =>
        await payload.create({
          collection: 'comments',
          data: {
            _status: 'published',
            comment: `This is a comment on post ${
              index + 1
            }. It has been approved by an admin and is now visible to the public. You can leave your own comment on this post using the form below.`,
            user: demoUserID,
            doc: post.id,
          },
        }),
    ),
  )

  payload.logger.info(`— Seeding projects...`)

  // Do not create posts with `Promise.all` because we want the posts to be created in order
  // This way we can sort them by `createdAt` or `publishedAt` and they will be in the expected order
  const project1Doc = await payload.create({
    collection: 'projects',
    data: JSON.parse(
      JSON.stringify({ ...project1, categories: [designCat.id] }).replace(
        /"\{\{IMAGE\}\}"/g,
        image2ID,
      ),
    ),
  })

  const project2Doc = await payload.create({
    collection: 'projects',
    data: JSON.parse(
      JSON.stringify({ ...project2, categories: [softwareCat.id] }).replace(
        /"\{\{IMAGE\}\}"/g,
        image2ID,
      ),
    ),
  })

  const project3Doc = await payload.create({
    collection: 'projects',
    data: JSON.parse(
      JSON.stringify({ ...project3, categories: [engineeringCat.id] }).replace(
        /"\{\{IMAGE\}\}"/g,
        image2ID,
      ),
    ),
  })

  // update each project with related projects

  await Promise.all([
    await payload.update({
      collection: 'projects',
      id: project1Doc.id,
      data: {
        relatedProjects: [project2Doc.id, project3Doc.id],
      },
    }),
    await payload.update({
      collection: 'projects',
      id: project2Doc.id,
      data: {
        relatedProjects: [project1Doc.id, project3Doc.id],
      },
    }),
    await payload.update({
      collection: 'projects',
      id: project3Doc.id,
      data: {
        relatedProjects: [project1Doc.id, project2Doc.id],
      },
    }),
  ])

  payload.logger.info(`— Seeding posts page...`)

  const postsPageDoc = await payload.create({
    collection: 'pages',
    data: JSON.parse(JSON.stringify(postsPage).replace(/"\{\{IMAGE\}\}"/g, image1ID)),
  })

  payload.logger.info(`— Seeding events page...`)

  const eventsPageDoc = await payload.create({
    collection: 'pages',
    data: JSON.parse(JSON.stringify(eventsPage).replace(/"\{\{IMAGE\}\}"/g, image1ID)),
  })

  payload.logger.info(`— Seeding absence requests page...`)

  const absenceRequestsPageDoc = await payload.create({
    collection: 'pages',
    data: JSON.parse(JSON.stringify(absenceRequestsPage).replace(/"\{\{IMAGE\}\}"/g, image1ID)),
  })

  payload.logger.info(`— Seeding projects page...`)

  const projectsPageDoc = await payload.create({
    collection: 'pages',
    data: JSON.parse(JSON.stringify(projectsPage).replace(/"\{\{IMAGE\}\}"/g, image1ID)),
  })

  // we are using postgres our ids are strings
  let postsPageID = postsPageDoc.id.toString()
  let eventsPageID = eventsPageDoc.id.toString()
  let absenceRequestsPageID = absenceRequestsPageDoc.id.toString()
  let projectsPageID = projectsPageDoc.id.toString()

  // if (payload.db.defaultIDType === 'text') {
  //   postsPageID = `"${postsPageID}"`
  //   eventsPageID = `"${eventsPageID}"`
  //   absenceRequestsPageID = `"${absenceRequestsPageID}"`
  //   projectsPageID = `"${projectsPageID}"`
  // }

  payload.logger.info(`— Seeding home page...`)

  await payload.create({
    collection: 'pages',
    data: JSON.parse(
      JSON.stringify(home)
        .replace(/"\{\{IMAGE_1\}\}"/g, image1ID)
        .replace(/"\{\{IMAGE_2\}\}"/g, image2ID)
        .replace(/"\{\{POSTS_PAGE_ID\}\}"/g, postsPageID)
        .replace(/"\{\{EVENTS_PAGE_ID\}\}"/g, eventsPageID)
        .replace(/"\{\{ABSENCE_REQUESTS_PAGE_ID\}\}"/g, absenceRequestsPageID)
        .replace(/"\{\{PROJECTS_PAGE_ID\}\}"/g, projectsPageID),
    ),
  })

  payload.logger.info(`— Seeding settings...`)

  await payload.updateGlobal({
    slug: 'settings',
    data: {
      postsPage: postsPageDoc.id,
      eventsPage: eventsPageDoc.id,
      absenceRequestsPage: absenceRequestsPageDoc.id,
      projectsPage: projectsPageDoc.id,
    },
  })

  payload.logger.info(`— Seeding header...`)

  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: [
        {
          link: {
            type: 'reference',
            reference: {
              relationTo: 'pages',
              value: postsPageDoc.id,
            },
            label: 'Posts',
          },
        },
        {
          link: {
            type: 'reference',
            reference: {
              relationTo: 'pages',
              value: eventsPageDoc.id,
            },
            label: 'Events',
          },
        },
        {
          link: {
            type: 'reference',
            reference: {
              relationTo: 'pages',
              value: absenceRequestsPageDoc.id,
            },
            label: 'Absence Requests',
          },
        },
        {
          link: {
            type: 'reference',
            reference: {
              relationTo: 'pages',
              value: projectsPageDoc.id,
            },
            label: 'Projects',
          },
        },
      ],
    },
  })

  payload.logger.info('Seeded database successfully!')
}
