import { translate } from '@docusaurus/Translate'

export const projects: Project[] = [
  {
    title: 'TechDocs',
    description: translate({ id: 'projects.work.techdocs', message: '基于 Docusaurus 静态网站生成器实现学习平台' }),
    preview: '/img/project/techdocs.png',
    website: 'https://techdocs-hazel.vercel.app/',
    source: 'https://github.com/HooWC/TechDocs.git',
    tags: ['opensource', 'design', 'favorite','public'],
    type: 'web',
  },
  {
    title: 'CV Web',
    description: translate({ id: 'projects.work.cv', message: '基于 HTML/CSS/JavaScript 开发的个人简历网站' }),
    preview: '/img/project/cv.png',
    website: 'https://hoo-cv-website.vercel.app/',
    source: 'https://github.com/HooWC/CV_Web.git',
    tags: ['opensource','public'],
    type: 'web',
  },
  {
    title: 'Webp To Png Conterver',
    description: translate({ id: 'projects.work.conterver', message: '能够将 WEBP 格式转换 PNG 图片的网站' }),
    preview: '/img/project/Converter.png',
    website: 'https://converter-alpha-orcin.vercel.app/',
    source: 'https://github.com/HooWC/Webp_to_Png.git',
    tags: ['opensource', 'design','public'],
    type: 'web',
  },
  {
    title: 'QR Code',
    description: translate({ id: 'projects.work.qrcode', message: 'React 开发的免费生成二维码的网站' }),
    preview: '/img/project/QR.png',
    website: 'https://qr-code-woad-ten.vercel.app/',
    source: 'https://github.com/HooWC/QR_Code.git',
    tags: ['opensource', 'design','public'],
    type: 'web',
  },
  {
    title: 'Sky',
    description: translate({ id: 'projects.work.sky', message: 'React 开发的天气预报功能' }),
    preview: '/img/project/Sky.png',
    website: 'https://sky-teal-pi.vercel.app/',
    source: 'https://github.com/HooWC/sky_public_source.git',
    tags: ['opensource', 'design','public'],
    type: 'web',
  },
  {
    title: 'Image to Text',
    description: translate({ id: 'projects.work.imgtotext', message: '识别图片转换成文字，免费版' }),
    preview: '/img/project/imgtotext.png',
    website: 'https://image-to-text-neon-kappa.vercel.app/',
    source: 'https://github.com/HooWC/image-to-text.git',
    tags: ['opensource', 'design','public'],
    type: 'web',
  },
  {
    title: 'Password Generator',
    description: translate({ id: 'projects.work.password', message: '加强密码' }),
    preview: '/img/project/password.png',
    website: 'https://sky-teal-pi.vercel.app/',
    source: 'https://github.com/HooWC/sky_public_source.git',
    tags: ['opensource', 'design','public'],
    type: 'web',
  },
  {
    title: 'Online Conversion Tool',
    description: translate({ id: 'projects.work.online', message: '在线转换代码' }),
    preview: '/img/project/online.png',
    website: 'https://image-to-text-neon-kappa.vercel.app/',
    source: 'https://github.com/HooWC/image-to-text.git',
    tags: ['opensource', 'design','public'],
    type: 'web',
  },
  // personal
  {
    title: 'Muyi Music',
    description: translate({ id: 'projects.work.muyimusic', message: '自己开发和设计的个人音乐在线网站' }),
    preview: '/img/project/Muyi Music.png',
    website: 'https://muyi-music.vercel.app/',
    source: 'https://github.com/HooWC/Muyi_Music.git',
    tags: ['opensource','personal','design','public'],
    type: 'personal',
  },
  {
    title: 'Muyi Lyrics',
    description: translate({ id: 'projects.work.muyilyrics', message: '保存自己写的歌词网站' }),
    preview: '/img/project/Lyrics.png',
    website: 'https://lyrics-web-alpha.vercel.app/',
    source: 'https://github.com/HooWC/Lyrics_Web.git',
    tags: ['opensource', 'personal','design','public'],
    type: 'personal',
  },
  // mobile
  {
    title: 'Motian Novel',
    description: translate({ id: 'projects.work.motian', message: 'Xamarin + Rest API 开发的小说 APP' }),
    preview: '/img/project/novels.png',
    website: 'https://github.com/HooWC/Motian_Novel.git',
    source: 'https://github.com/HooWC/Motian_Novel.git',
    tags: ['opensource','favorite','design','private'],
    type: 'mobile',
  },
  {
    title: 'Sakura Cinama',
    description: translate({ id: 'projects.work.sakura', message: 'Xamarin + Rest API 开发的在线购买电影票APP，也是在学校最后的作品' }),
    preview: '/img/project/Sakura.png',
    website: 'https://github.com/HooWC/Sakura_Cinema.git',
    source: 'https://github.com/HooWC/Sakura_Cinema.git',
    tags: ['opensource','favorite','design','private'],
    type: 'mobile',
  },
  {
    title: 'Hoo-Youtube Music',
    description: translate({ id: 'projects.work.youtube', message: 'Xamarin + Firebase 模拟开发的 Youtube Music APP' }),
    preview: '/img/project/YTMusic.png',
    website: '#',
    tags: ['opensource','large','design','private'],
    type: 'mobile',
  },
  // other
  {
    title: 'TOTP',
    description: translate({ id: 'projects.work.totp', message: 'Laravel 开发的两步验证功能' }),
    preview: '/img/project/totp.png',
    website: 'https://github.com/HooWC/TOTP.git',
    source: 'https://github.com/HooWC/TOTP.git',
    tags: ['opensource', 'product','design','private'],
    type: 'other',
  },
  {
    title: 'SAML IDP',
    description: translate({ id: 'projects.work.samlidp', message: 'Laravel + SAML 实现 IDP 用户数据存储功能和提供 Metadata 给 SP 项目' }),
    preview: '/img/project/samlidp.png',
    website: 'https://github.com/HooWC/SAML_IDP.git',
    source: 'https://github.com/HooWC/SAML_IDP.git',
    tags: ['opensource','product','private'],
    type: 'other',
  },
  {
    title: 'SAML SP',
    description: translate({ id: 'projects.work.samlsp', message: 'Laravel + SAML 实现 SSO 安全登入和多个 SP 项目自动登入和登出功能' }),
    preview: '/img/project/samlsp.png',
    website: 'https://github.com/HooWC/SAML_SP.git',
    source: 'https://github.com/HooWC/SAML_SP.git',
    tags: ['opensource','product','design','private'],
    type: 'other',
  },
  {
    title: 'IT Assets Management',
    description: translate({ id: 'projects.work.it', message: 'ASP .NET MVC + Rest API 开发员工在线租借公司产品，以及 Admin 实现 ERP 界面功能' }),
    preview: '/img/project/ITAsset.png',
    website: 'https://github.com/HooWC/IT_Assets.git',
    source: 'https://github.com/HooWC/IT_Assets.git',
    tags: ['opensource','favorite','design','private'],
    type: 'other',
  },
  {
    title: 'CharNest',
    description: translate({ id: 'projects.work.chart', message: '使用 Node + MongoDB Atlas 开发的在线聊天功能' }),
    preview: '/img/project/chat.png',
    website: 'https://github.com/HooWC/ChatNest.git',
    source: 'https://github.com/HooWC/ChatNest.git',
    tags: ['opensource','private'],
    type: 'other',
  },
  {
    title: 'Meybank Online Banking',
    description: translate({ id: 'projects.work.meybank', message: 'Java Dynamic Web + Rest API 模拟 Public Bank 开发的银行网站' }),
    preview: '/img/project/Meybank.png',
    website: 'https://github.com/HooWC/MeyBank.git',
    source: 'https://github.com/HooWC/MeyBank.git',
    tags: ['opensource','large','design','private'],
    type: 'other',
  },
  {
    title: 'Hoo-Malaysia Netflix',
    description: translate({ id: 'projects.work.netflix', message: 'ASP .NET MVC + Rest API 开发在线购买电影的网站' }),
    preview: '/img/project/Netflix.png',
    website: 'https://github.com/HooWC/Netflix_Student.git',
    source: 'https://github.com/HooWC/Netflix_Student.git',
    tags: ['opensource','large','design','private'],
    type: 'other',
  },
  {
    title: 'Alice Music',
    description: translate({ id: 'projects.work.alice', message: 'ASP .NET MVC + Rest API 开发在线观看的音乐网站' }),
    preview: '/img/project/Alice.png',
    website: 'https://github.com/HooWC/Alice_Music.git',
    source: 'https://github.com/HooWC/Alice_Music.git',
    tags: ['opensource','large','design','private'],
    type: 'other',
  },
  {
    title: 'Nana Shopee',
    description: translate({ id: 'projects.work.nana', message: 'ASP .NET MVC + MSSQL 开发在线网购的网站，也是自己在学校第一个网站' }),
    preview: '/img/project/Nana.png',
    website: 'https://github.com/HooWC/Nana_Shopee.git',
    source: 'https://github.com/HooWC/Nana_Shopee.git',
    tags: ['opensource','large','design','private'],
    type: 'other',
  },
  {
    title: 'Ganfang Food',
    description: translate({ id: 'projects.work.ganfang', message: 'ASP .NET MVC + MSSQL 开发在线订购食物的网站' }),
    preview: '/img/project/Ganfang.png',
    website: 'https://github.com/HooWC/Ganfang_Food.git',
    source: 'https://github.com/HooWC/Ganfang_Food.git',
    tags: ['opensource','design','private'],
    type: 'other',
  },  
  {
    title: 'Memory Forum',
    description: translate({ id: 'projects.work.memory', message: 'ASP .NET MVC + Rest API 开发大型论坛网站，里面包含88个以上话题，学校论文的作品' }),
    preview: '/img/project/Forum.png',
    website: 'https://github.com/HooWC/Memory_Forum.git',
    source: 'https://github.com/HooWC/Memory_Forum.git',
    tags: ['opensource','large','design','private'],
    type: 'other',
  },  
  {
    title: 'Beer Quest',
    description: translate({ id: 'projects.work.beer', message: 'React Native 为啤酒APP设计的首页' }),
    preview: '/img/project/BQ.png',
    website: 'https://github.com/HooWC/Bear.git',
    source: 'https://github.com/HooWC/Bear.git',
    tags: ['opensource','design','private'],
    type: 'other',
  },  
   {
    title: 'Picture Shadows',
    description: translate({ id: 'projects.work.pictureshadows', message: '使用 CSS 将图片模糊漆黑效果的小项目' }),
    website: 'https://github.com/HooWC/Picture_Shadows.git',
    source: 'https://github.com/HooWC/Picture_Shadows.git',
    tags: ['opensource','design','private'],
    type: 'other',
  },  
  {
    title: 'ATM System',
    description: translate({ id: 'projects.work.atmsystem', message: 'Java 开发模拟 ATM 功能' }),
    website: 'https://github.com/HooWC/ATM_System.git',
    source: 'https://github.com/HooWC/ATM_System.git',
    tags: ['opensource', 'private'],
    type: 'other',
  },  
]

export type Tag = {
  label: string
  description: string
  color: string
}

export type TagType = 'favorite' | 'opensource' | 'product' | 'design' | 'large' | 'personal' | 'private' | 'public' |'horror' | 'funny' | 'bloody' | 'fighting' | 'boring' | 'thriller'

export type ProjectType = 'web' | 'app' | 'commerce' | 'personal' | 'toy' | 'other' | 'mobile' | 'movie' | 'anime' | 'tv'

export const projectTypeMap = {
  web: '🖥️ 网站',
  app: '💫 应用',
  commerce: '商业项目',
  personal: '👨‍💻 个人',
  toy: '🔫 玩具',
  mobile: '📱 安卓',
  other: '🗃️ 其他',
  movie: '🖥️ 电影',
  anime: '🖥️ 动漫',
  tv: '🖥️ 电视剧',
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
    label: translate({id: 'projects.tags.favorite', message:'喜爱'}),
    description: '我最喜欢的网站，一定要去看看!',
    color: '#e9669e',
  },
  opensource: {
    label: translate({id: 'projects.tags.opensource', message:'开源'}),
    description: '开源项目可以提供灵感!',
    color: '#39ca30',
  },
  product: {
    label: translate({id: 'projects.tags.product', message:'产品'}),
    description: '与产品相关的项目!',
    color: '#dfd545',
  },
  design: {
    label: translate({id: 'projects.tags.design', message:'设计'}),
    description: '设计漂亮的网站!',
    color: '#a44fb7',
  },
  large: {
    label: translate({id: 'projects.tags.large', message:'大型'}),
    description: '大型项目，原多于平均数的页面',
    color: '#8c2f00',
  },
  personal: {
    label: translate({id: 'projects.tags.personal', message:'个人'}),
    description: '个人项目',
    color: '#12affa',
  },
  private: {
    label: translate({id: 'projects.tags.private', message:'非公共'}),
    description: '仅限内部访问的项目',
    color: '#ff5733',
  },
  public: {
    label: translate({id: 'projects.tags.public', message:'公共'}),
    description: '面向公众的项目',
    color: '#33c7ff',
  },
  horror: {
    label: translate({id: 'projects.tags.horror', message:'恐怖'}),
    description: '恐怖的电影!',
    color: '#b01d00',
  },
  funny: {
    label: translate({id: 'projects.tags.funny', message:'搞笑'}),
    description: '搞笑的电影!',
    color: '#dfd545',
  },
  bloody: {
    label: translate({id: 'projects.tags.bloody', message:'血腥'}),
    description: '血腥的电影!',
    color: '#a44fb7',
  },
  fighting: {
    label: translate({id: 'projects.tags.fighting', message:'热血'}),
    description: '热血的电影!',
    color: '#8c2f00',
  },
  boring: {
    label: translate({id: 'projects.tags.boring', message:'无聊'}),
    description: '血腥的电影!',
    color: '#a44fb7',
  },
  thriller: {
    label: translate({id: 'projects.tags.thriller', message:'惊悚'}),
    description: '热血的电影!',
    color: '#8c2f00',
  }
}

export const TagList = Object.keys(Tags) as TagType[]

export const groupByProjects = projects.reduce(
  (group, project) => {
    const { type } = project
    group[type] = group[type] ?? []
    group[type].push(project)
    return group
  },
  {} as Record<ProjectType, Project[]>,
)
