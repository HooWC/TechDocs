export type Social = {
  github?: string
  x?: string
  //juejin?: string
  //qq?: string
  wx?: string
  linkedin?: string
  //cloudmusic?: string
  //zhihu?: string
  email?: string
  discord?: string
}

type SocialValue = {
  href?: string
  title: string
  icon: string
  color: string
}

const social: Social = {
  github: 'https://github.com/HooWC',
  x: 'https://x.com/Hoo_Code',
  //juejin: 'https://juejin.cn/user/1565318510545901',
  wx: 'https://github.com/HoowcBN/techdocs_pic/blob/main/wx.jpg?raw=true',
  linkedin:'https://www.linkedin.com/in/hoo-weng-chin-120090201/',
  // qq: 'https://img.kuizuo.cn/qq.png',
  // zhihu: 'https://www.zhihu.com/people/kuizuo',
  // cloudmusic: 'https://music.163.com/#/user/home?id=1333010742',
  email: 'mailto:wengchinbusiness@gmail.com',
  discord: 'https://discordapp.com/users/Hoo#0234',
}

type SocialWithoutRSS = {
  github: SocialValue;
  linkedin: SocialValue;
  x: SocialValue;
  wx: SocialValue;
  discord: SocialValue;
  email: SocialValue;
};

const socialSet: SocialWithoutRSS = {
  github: {
    href: social.github,
    title: 'GitHub',
    icon: 'ri:github-line',
    color: '#010409',
  },
  linkedin: {
    href: social.linkedin,
    title: 'LinkedIn',
    icon: 'ri:linkedin-line',
    color: '#010409',
  },
  // juejin: {
  //   href: social.juejin,
  //   title: '掘金',
  //   icon: 'simple-icons:juejin',
  //   color: '#1E81FF',
  // },
  x: {
    href: social.x,
    title: 'X',
    icon: 'ri:twitter-x-line',
    color: '#000',
  },
  wx: {
    href: social.wx,
    title: '微信',
    icon: 'ri:wechat-2-line',
    color: '#07c160',
  },
  // zhihu: {
  //   href: social.zhihu,
  //   title: '知乎',
  //   icon: 'ri:zhihu-line',
  //   color: '#1772F6',
  // },
  discord: {
    href: social.discord,
    title: 'Discord',
    icon: 'ri:discord-line',
    color: '#5A65F6',
  },
  // qq: {
  //   href: social.qq,
  //   title: 'QQ',
  //   icon: 'ri:qq-line',
  //   color: '#1296db',
  // },
  email: {
    href: social.email,
    title: '邮箱',
    icon: 'ri:mail-line',
    color: '#D44638',
  },
  // cloudmusic: {
  //   href: social.cloudmusic,
  //   title: '网易云',
  //   icon: 'ri:netease-cloud-music-line',
  //   color: '#C20C0C',
  // },
  // rss: {
  //   href: '/blog/rss.xml',
  //   title: 'RSS',
  //   icon: 'ri:rss-line',
  //   color: '#FFA501',
  // },
}

export default socialSet