<<<<<<< HEAD
---
id: tc-intro
slug: /tc-intro
title: Tailwind CSS 简介
date: 2024-11-04
authors: Hoo
tags: [tailwing-css]
keywords: [tailwing-css]
---

Tailwind CSS 是一个功能强大且高度可定制的 CSS 框架，专注于提供实用的类（utility-first）样式，以便开发者能够快速构建现代化的用户界面。与传统的 CSS 框架（如 Bootstrap 或 Foundation）不同，Tailwind CSS 提供了大量的原子类，而不是预设的组件。这使得开发者能够更灵活地设计和实现独特的界面，而无需限制于框架的样式。

### 主要特点

1. **实用类优先**：Tailwind CSS 的设计理念是通过组合小型、可重用的实用类来构建复杂的用户界面。每个类通常只负责一个样式属性（如颜色、边距、字体大小等），开发者可以根据需要组合这些类，而不需要编写自定义 CSS。
2. **高度可定制**：Tailwind CSS 提供了一个配置文件，开发者可以在其中自定义颜色、间距、字体等，以满足特定的设计需求。通过这种方式，Tailwind CSS 可以轻松地适应不同的品牌和设计规范。
3. **响应式设计**：Tailwind CSS 提供了内置的响应式设计工具，开发者可以在类名中使用断点前缀，以实现针对不同屏幕尺寸的样式调整。这使得构建适应各种设备的界面变得简单直观。
4. **插件生态系统**：Tailwind CSS 具有强大的插件系统，开发者可以通过插件扩展其功能。例如，Tailwind CSS 提供了对自定义表单组件、动画、转场等的支持，可以通过安装插件来轻松集成这些功能。
5. **JIT 模式**：Tailwind CSS 的即刻构建模式（Just-in-Time Mode）能够在开发过程中动态生成所需的 CSS。这意味着只有在使用的类被引用时，才会被包含在最终的样式表中，从而显著减小了生成的 CSS 文件的大小，并提高了构建速度。

### 适用场景

Tailwind CSS 特别适合于需要快速迭代和原型设计的项目。由于其灵活性和可定制性，开发者可以迅速构建出符合需求的界面而不必担心样式的冲突或重写。同时，它也适合大型应用程序，因为它促进了样式的一致性和可维护性。

总的来说，Tailwind CSS 是一种现代的 CSS 工具，凭借其实用的类和高度的可定制性，帮助开发者高效地构建美观且功能丰富的用户界面。随着前端开发的不断进化，Tailwind CSS 已成为许多开发者和团队的首选框架。











=======
---
id: tc-intro
slug: /tc-intro
title: Tailwind CSS 简介
date: 2024-11-04
authors: Hoo
tags: [tailwing-css]
keywords: [tailwing-css]
---

### Tailwind CSS

官网：https://tailwindcss.com/docs/installation

第一方法 直接引入使用

```
<script src="https://cdn.tailwindcss.com"></script> #使用这个
```

第二方法

```
#1 npm init -y # 生成package.json
#2 npm i -D tailwindcss postcss autoprefixer
#3 npx tailwindcss init # 生成tailwind.config.js
#4 npx tailwindcss -i ./src/input.css -o ./src/output.css --watch #生成 css 文件 可以修改路径  npx tailwindcss -i ./src/css/input.css -o ./public/css/style.css --watch
```

#3 tailwind.config.js

```
module.exports = {
  content: ["./public/**/*.{html，js}"], # 修改自己的html
  theme: {
    extend: {},
  },
  plugins: [],
}

解释
./src/**/*.{html,js}：匹配 src 目录及其所有子目录中的所有 .html 和 .js 文件。
./public/**/*.html：匹配 public 目录及其所有子目录中的所有 .html 文件。
```

#4 生成 input.css 文件

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

package.json #不需要修改

```
"scripts":{
	"dev": "npx tailwindcss -i ./src/css/input.css -o ./public/css/style.css --watch"
}

只要在cmd使用，npm run dev 就会自动 npx tailwindcss -i ./src/css/input.css -o ./public/css/style.css --watch


```

HTML

```
<link rel="stylesheet" href="css/style.css" /> #引入 output.css
```



自创建 tailwind.config.js

```
theme: {
	extend: {
		colors: {
			primary: '#FF6363',
			secondary: {
				100: '#E2E2D5',
				200: '#888883',
				}
			}
		}
	},
},
```

使用

```
bg-secondary-100
```





















































>>>>>>> d75f00fc1ea1253c1f56f4615d7fcfbc00d453b8
