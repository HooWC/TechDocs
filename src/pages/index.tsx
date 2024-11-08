import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { useEffect } from 'react';
import ReactDOMServer from 'react-dom/server'; // 用来渲染 React 组件
import BlogSection from '../components/landing/BlogSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import Hero from '../components/landing/Hero';
import ProjectSection from '../components/landing/ProjectSection';
import Particles from '../components/magicui/particles';

export default function Home() {
  const {
    siteConfig: { customFields, tagline },
  } = useDocusaurusContext()
  const { description } = customFields as { description: string }

  let lastClick = 0; // 上次点击的时间戳
  const delay = 300; // 两次点击之间的最小间隔，单位毫秒

const handleClickEffect = (e: MouseEvent) => {
  const now = Date.now();

  // 如果两次点击间隔小于指定时间，则不触发效果
  if (now - lastClick < delay) return;

  lastClick = now; // 更新上次点击时间

  const words = [
    <Translate id="showcase-header-button-1">富强</Translate>,
    <Translate id="showcase-header-button-2">民主</Translate>,
    <Translate id="showcase-header-button-3">文明</Translate>,
    <Translate id="showcase-header-button-4">和谐</Translate>,
    <Translate id="showcase-header-button-5">自由</Translate>,
    <Translate id="showcase-header-button-6">平等</Translate>,
    <Translate id="showcase-header-button-7">公正</Translate>,
    <Translate id="showcase-header-button-8">法治</Translate>,
    <Translate id="showcase-header-button-9">爱国</Translate>,
    <Translate id="showcase-header-button-10">敬业</Translate>,
    <Translate id="showcase-header-button-11">诚信</Translate>,
    <Translate id="showcase-header-button-12">友善</Translate>,
  ];

  // 随机选取一个翻译后的文本
  const word = words[Math.floor(Math.random() * words.length)];

  // 使用 ReactDOMServer 渲染该 React 元素为字符串
  const wordText = ReactDOMServer.renderToStaticMarkup(word);

  const span = document.createElement('span');
  span.innerText = wordText; // 设置为渲染后的文本
  span.style.position = 'absolute';
  span.style.zIndex = '999999';
  span.style.left = `${e.pageX}px`;
  span.style.top = `${e.pageY - 20}px`;
  span.style.fontWeight = 'bold';
  span.style.pointerEvents = 'none'; // 使元素不可被鼠标指针选中
  span.style.color = `rgb(${~~(255 * Math.random())}, ${~~(255 * Math.random())}, ${~~(255 * Math.random())})`;

  document.body.appendChild(span);

  // 动画效果
  span.animate([{ top: `${e.pageY - 20}px`, opacity: 1 }, { top: `${e.pageY - 180}px`, opacity: 0 }], { duration: 1500 });

  // 动画结束后移除元素
  setTimeout(() => span.remove(), 1500);
};

  useEffect(() => {
    // 添加点击事件
    document.body.addEventListener('click', handleClickEffect);

    // 清理函数，组件卸载时移除事件监听
    return () => {
      document.body.removeEventListener('click', handleClickEffect);
    };
  }, []);

  return (
    <Layout title={tagline} description={description}>
      <main>
        <Hero />
        <Particles className="absolute inset-0" quantity={100} ease={80} color={'#ffffff'} refresh />

        <div className="relative">
          <div className="mx-auto max-w-7xl bg-background lg:px-8">
            <BlogSection />
            <ProjectSection />
            <FeaturesSection />
          </div>
          <div
            className="-z-50 absolute inset-0 bg-grid-slate-50 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.3))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"
            style={{ backgroundPosition: '10px 10px;' }}
          />
        </div>
      </main>
    </Layout>
  )
}
