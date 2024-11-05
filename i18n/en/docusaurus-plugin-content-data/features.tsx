import Translate, { translate } from '@docusaurus/Translate'
import OpenSourceSvg from '@site/static/svg/undraw_open_source.svg'
import SpiderSvg from '@site/static/svg/undraw_spider.svg'
import WebDeveloperSvg from '@site/static/svg/undraw_web_developer.svg'

export type FeatureItem = {
  title: string | React.ReactNode
  description: string | React.ReactNode
  header: React.ReactNode
  icon?: React.ReactNode
}

const FEATURES: FeatureItem[] = [
  {
    title: translate({
      id: 'homepage.feature.developer',
      message: '全栈工程师',
    }),
    description: (
      <Translate id="features-1">
        作为一名全栈工程师，全面掌握前端和后端开发技能是至关重要的，从而能够独立完成完整的项目开发和维护。
      </Translate>
    ),
    header: <WebDeveloperSvg className={'h-auto w-full'} height={150} role="img" />,
    // icon: <Icon icon="logos:typescript-icon" className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: translate({
      id: 'homepage.feature.spider',
      message: '编程热情与自律',
    }),
    description: (
      <Translate id="features-2">
        对编程的热爱让我具备了出色的代码阅读能力。没有难懂的代码，只有选择是否去深入理解的决定。通过自律与持续学习，我不断提升自己，面对各种代码挑战。
      </Translate>
    ),
    header: <SpiderSvg className={'h-auto w-full'} height={150} role="img" />,
  },
  {
    title: translate({
      id: 'homepage.feature.enthusiast',
      message: '解决问题的能力',
    }),
    description: (
      <Translate id="features-3">
        具备帮助他人解决编程问题的丰富经验，覆盖从前端到后端的多种技术领域。
      </Translate>
    ),
    header: <OpenSourceSvg className={'h-auto w-full'} height={150} role="img" />,
  },
]

export default FEATURES
