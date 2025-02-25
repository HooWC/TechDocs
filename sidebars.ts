import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'

const sidebars: SidebarsConfig = {
  interviewSidebar: [{ type: 'autogenerated', dirName: 'interview' }],
   //techSidebar: [{ type: 'autogenerated', dirName: 'tech' }],

  // 面试
  interview: [
    'interview/fix-introduction',
     {
      label: '面试准备',
      type: 'category',
      link: { type: 'generated-index' },
      items: [
        'interview/interview-base/base-interview',
        'interview/interview-base/program-interview',
        'interview/interview-base/programmer-interview',
        'interview/interview-base/action-interview',
      ],
    },
    'interview/frontend-interview',
    'interview/sql-interview',
    'interview/interview-qr',
    'interview/interview-qr-php',
  ],


  
  // 技术笔记
  tech: [
    'tech/introduction',
    {
      label: '前端开发',
      type: 'category',
      link: {
        title: 'Web前端',
        description: '构架',
        type: 'generated-index',
        keywords: ['web', 'angular', 'css', 'react', 'vue'],
      },
      items: [
        {
          label: 'Angular',
          type: 'category',
          link: { type: 'generated-index' },
          items: [
            'tech/web/angular/angular-intro',
            'tech/web/angular/angular-base',
            'tech/web/angular/route-angular',
            'tech/web/angular/pipe',
            'tech/web/angular/observable',
            'tech/web/angular/httpclient-module',
            'tech/web/angular/injectable',
            'tech/web/angular/form-angular',
            'tech/web/angular/component-angular',
            'tech/web/angular/axios-angular',
          ],
        },
        {
          label: 'React',
          type: 'category',
          link: { type: 'generated-index' },
          items: [
            'tech/web/react/react-intro',
            'tech/web/react/react-base',
            'tech/web/react/route-react',
            'tech/web/react/local-storage-react',
            'tech/web/react/class-name-react',
            'tech/web/react/uuid-react',
            'tech/web/react/loadsh-react',
            'tech/web/react/dayjs-react',
            'tech/web/react/data-fns-react',
            'tech/web/react/ant-design-react',
            'tech/web/react/redux-tools',
            'tech/web/react/redux-toolkit-react',
            'tech/web/react/hook-react',
          ],
        },
        {
          label: 'Vue',
          type: 'category',
          link: { type: 'generated-index' },
          items: [
            'tech/web/vue/vue-intro',
            'tech/web/vue/vue-base',
            'tech/web/vue/life-vue',
            'tech/web/vue/component-vue',
            'tech/web/vue/ref-vue',
            'tech/web/vue/route-vue',
            'tech/web/vue/vuetify-vue',
            'tech/web/vue/pinia-vue',
            'tech/web/vue/api-vue',
          ],
        },
      ],
    },
    {
      label: 'JavaScript',
      type: 'category',
      link: {
        type: 'generated-index'
      },
      items: [
        'tech/javascript/js-intro',
        'tech/javascript/js-base',
      ],
    },
    {
      label: 'JQuery',
      type: 'category',
      link: {
        type: 'generated-index'
      },
      items: [
        'tech/jquery/jq-intro',
      ],
    },
    {
      label: 'TypeScript',
      type: 'category',
      link: {
        type: 'generated-index'
      },
      items: [
        'tech/typescript/ts-intro',
      ],
    },
    {
      label: 'Node',
      type: 'category',
      link: {
        type: 'generated-index'
      },
      items: [
        'tech/node/n-intro',
        'tech/node/n-base',
        'tech/node/n-hight',
      ],
    },
    {
      label: 'CSS',
      type: 'category',
      link: {
        title: 'CSS 设计',
        description: '构架',
        type: 'generated-index',
        keywords: ['css', 'css', 'scss', 'tailwind-css'],
      },
      items: [
        {
          label: 'CSS',
          type: 'category',
          link: { type: 'generated-index' },
          items: [
            'tech/css/css/css-intro',
          ],
        },
        {
          label: 'SCSS',
          type: 'category',
          link: { type: 'generated-index' },
          items: [
            'tech/css/scss/scss-intro',
            'tech/css/scss/scss-base',
          ],
        },
        {
          label: 'Tailwind CSS',
          type: 'category',
          link: { type: 'generated-index' },
          items: [
            'tech/css/tailwing-css/tc-intro',
            'tech/css/tailwing-css/tc-base',
          ],
        },
      ],
    },
    {
      label: 'ChartJS',
      type: 'category',
      link: {
        type: 'generated-index'
      },
      items: [
        'tech/chartjs/chartjs-intro',
        'tech/chartjs/chartjs-base',
      ],
    },
    {
      label: '后端',
      type: 'category',
      link: {
        title: 'C# / Python',
        description: '构架',
        type: 'generated-index',
        keywords: ['backend', 'csharp', 'python'],
      },
      items: [
        {
          label: 'C#',
          type: 'category',
          link: { type: 'generated-index' },
          items: [
            'tech/backend/csharp/cs-intro',
          ],
        },
        {
          label: 'Python',
          type: 'category',
          link: { type: 'generated-index' },
          items: [
            'tech/backend/python/py-intro',
          ],
        },
      ],
    },
     {
      label: '安卓',
      type: 'category',
      link: {
        title: '安卓开发',
        description: '构架',
        type: 'generated-index',
        keywords: ['react-native', 'xamarin'],
      },
      items: [
        {
          label: 'React Native',
          type: 'category',
          link: { type: 'generated-index' },
          items: [
            'tech/app/react-native/rn-intro',
            'tech/app/react-native/rn-base',
            'tech/app/react-native/rn-function',
            'tech/app/react-native/rn-navigation',
            'tech/app/react-native/rn-install',
          ],
        },
        {
          label: 'Xamarin',
          type: 'category',
          link: { type: 'generated-index' },
          items: [
            'tech/app/xamarin/xamarin-intro',
            'tech/app/xamarin/xamarin-base',
            'tech/app/xamarin/xamarin-understand',
            'tech/app/xamarin/xamarin-mvvm',
          ],
        },
      ],
    },
    {
      label: 'Laravel',
      type: 'category',
      link: {
        type: 'generated-index'
      },
      items: [
        'tech/laravel/laravel-intro',
        'tech/laravel/laravel-base',
        'tech/laravel/laravel-pic',
        'tech/laravel/laravel-model',
        'tech/laravel/laravel-migration',
        'tech/laravel/laravel-seeder',
        'tech/laravel/laravel-request',
        'tech/laravel/laravel-queue',
        'tech/laravel/laravel-policy',
        'tech/laravel/laravel-passport',
        'tech/laravel/laravel-event',
        'tech/laravel/laravel-vue',
        'tech/laravel/laravel-template',
        'tech/laravel/laravel-role',
        'tech/laravel/laravel-api',
        'tech/laravel/laravel-middle',
        'tech/laravel/laravel-hight',
      ],
    },
    {
      label: 'AJAX',
      type: 'category',
      link: {
        type: 'generated-index'
      },
      items: [
        'tech/ajax/ajax-intro',
        'tech/ajax/axios-base',
        'tech/ajax/fetch-base',
        'tech/ajax/jq-base',
      ],
    },
    {
      label: 'Git',
      type: 'category',
      link: {
        type: 'generated-index'
      },
      items: [
        'tech/git/git-intro',
        'tech/git/git-base',
      ],
    },
     {
      label: 'Java',
      type: 'category',
      link: {
        title: 'Java MVC 开发',
        description: '构架',
        type: 'generated-index',
        keywords: ['java', 'dynamic-web','spring'],
      },
      items: [
        {
          label: 'Dynamic Web Project',
          type: 'category',
          link: { type: 'generated-index' },
          items: [
            'tech/java/dynamic-web/dy-intro',
            'tech/java/dynamic-web/dy-base',
          ],
        },
        {
          label: 'Spring MVC',
          type: 'category',
          link: { type: 'generated-index' },
          items: [
            'tech/java/spring/spring-intro',
            'tech/java/spring/java-spring-maven',
            'tech/java/spring/mybatis-java',
            'tech/java/spring/ssm',
          ],
        },
      ],
    },
    {
      label: 'RestFul API',
      type: 'category',
      link: {
        type: 'generated-index'
      },
      items: [
        'tech/restFul-api/api-intro',
      ],
    },
    
  ],



  // 问题笔记
  design: [
    'design/introduction',
    {
      label: '美观设计',
      type: 'category',
      link: {
        type: 'generated-index',
      },
      items: [
        'design/beau-design/song-name-display',
      ],
    },
  ],



  // 工具
  tools: [
    'tools/introduction',
    'tools/discord-get-user-id',
    'tools/xampp-php-version-update',
    'tools/what-is-laragon',
    'tools/git-merge-conflicts',
    'tools/auto-save-code',
    'tools/loading-web-slow-problem',
    'tools/api-return-404-error',
    'tools/http-request-fail',
    'tools/markdown-word',
    'tools/window-change-password',
    'tools/common-beautiful-and-understand',
  ],


  // 版本
  version: [
    'version/introduction',
    {
      label: 'TechDocs 版本',
      type: 'category',
      link: {
        type: 'generated-index',
      },
      items: [
        'version/version/version-1-1',
        'version/version/version-1-0',
      ],
    },
  ],
}

module.exports = sidebars
