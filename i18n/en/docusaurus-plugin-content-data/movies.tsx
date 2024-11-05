export const movies: Project[] = [
  // movie
  {
   title: 'Who is that kid? ',
description: 'A 2024 horror movie directed by Takashi Shimizu. The ending of the movie is too sudden. ',
    preview: 'https://pic.pimg.tw/natalie0609/1730684034-4272516278-g_wn.jpg',
    website: 'https://www.movieffm.net/movies/who-is-that-girl/',
    source: 'https://www.movieffm.net/movies/who-is-that-girl/',
    tags: ['favorite', 'horror'],
    type: 'web',
  },

  // anime

  // drama

]

export type Tag = {
  label: string
  description: string
  color: string
}

export type TagType = 'favorite' | 'opensource' | 'product' | 'design' | 'large' | 'personal' | 'private' | 'public' |'horror' | 'funny' | 'bloody' | 'fighting'

export type ProjectType = 'web' | 'app' | 'commerce' | 'personal' | 'toy' | 'other' | 'mobile'

export const projectTypeMap = {
  web: '🖥️ Movies',
app: '🖥️ Animation',
commerce: '🖥️ TV Series',
}

export type Project = {
  title: string
  description: string
  preview?: string
  website: string
  source?: string | null
  tags: TagType[]
  type: ProjectType
}

export const Tags: Record<TagType, Tag> = {
  favorite: {
label: 'Favorite',
description: 'My favorite website, must check it out!',
color: '#e9669e',
},
opensource: {
label: 'Open source',
description: 'Open source projects can provide inspiration!',
color: '#39ca30',
},
product: {
label: 'Product',
description: 'Product-related projects!',
color: '#dfd545',
},
design: {
label: 'Design',
description: 'Beautifully designed website!',
color: '#a44fb7',
},
large: {
label: 'Large',
description: 'Large project, with more pages than average',
color: '#8c2f00',
},
personal: {
label: 'Personal',
description: 'Personal project',
color: '#12affa',
},
private: {
label: 'Non-public',
description: 'Project for internal access only',
color: '#ff5733',
},
public: {
label: 'Public',
description: 'Project for the public',
color: '#33c7ff',
},
horror: {
label: 'Horror',
description: 'Horror movie!',
color: '#b01d00',
},
funny: {
label: 'Funny',
description: 'Funny movie!',
color: '#dfd545',
},
bloody: {
label: 'Bloody',
description: 'Bloody movie!',
color: '#a44fb7',
},
fighting: {
label: 'Fighting',
description: 'Hot-blooded movie!',
color: '#8c2f00',
}
}

export const TagList = Object.keys(Tags) as TagType[]

export const groupByProjects = movies.reduce(
  (group, project) => {
    const { type } = project
    group[type] = group[type] ?? []
    group[type].push(project)
    return group
  },
  {} as Record<ProjectType, Project[]>,
)
