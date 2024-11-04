export const movies: Project[] = [
  // movie
  {
    title: '那孩子是谁？',
    description: '清水崇执导的2024恐怖电影，电影结尾太突然了。',
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
  web: '🖥️ 电影',
  app: '🖥️ 动漫',
  commerce: '🖥️ 电视剧',
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
    label: '喜爱',
    description: '我最喜欢的网站，一定要去看看!',
    color: '#e9669e',
  },
  opensource: {
    label: '开源',
    description: '开源项目可以提供灵感!',
    color: '#39ca30',
  },
  product: {
    label: '产品',
    description: '与产品相关的项目!',
    color: '#dfd545',
  },
  design: {
    label: '设计',
    description: '设计漂亮的网站!',
    color: '#a44fb7',
  },
  large: {
    label: '大型',
    description: '大型项目，原多于平均数的页面',
    color: '#8c2f00',
  },
  personal: {
    label: '个人',
    description: '个人项目',
    color: '#12affa',
  },
  private: {
    label: '非公共',
    description: '仅限内部访问的项目',
    color: '#ff5733',
  },
  public: {
    label: '公共',
    description: '面向公众的项目',
    color: '#33c7ff',
  },
  horror: {
    label: '恐怖',
    description: '恐怖的电影!',
    color: '#b01d00',
  },
  funny: {
    label: '搞笑',
    description: '搞笑的电影!',
    color: '#dfd545',
  },
  bloody: {
    label: '血腥',
    description: '血腥的电影!',
    color: '#a44fb7',
  },
  fighting: {
    label: '战斗',
    description: '热血的电影!',
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
