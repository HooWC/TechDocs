---
id: song-name-display
slug: /song-name-display
title: 优美显示歌名
authors: Hoo
---

![效果图片显示](https://github.com/HoowcBN/techdocs_pic/blob/main/design-1.png?raw=true)

:::success 前文提醒

实现这个效果只需要一个HTML和CSS文件就可以了

::: 

### HTML 代码

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./style.css">
</head>

<body>
    <div id="app">
        <div id="wrapper">
            <h1 class="glitch" data-text="WHY HATE">SONG NAME</h1>
            <span class="sub">MUYI</span>
        </div>
    </div>

    <script src="./script.js"></script>
</body>

</html>
```

### CSS 代码

:::success 前文提醒

将./图片名称.jpg 更换你自己的图片就可以了

::: 

```css
@import url('https://fonts.googleapis.com/css?family=Montserrat:100');

html,
body,
h1 {
    padding: 0;
    margin: 0;
    font-family: 'Montserrat', sans-serif;
}

#app {
    background: #0a0a0a;
    height: 100vh;
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(rgba(10, 10, 10, .6), rgba(0, 0, 0, .9)), repeating-linear-gradient(0, transparent, transparent 2px, black 3px, black 3px), url('./图片名称.jpg'); 
    background-size: cover;
    background-position: center;
    z-index: 1;
}

#wrapper {
    text-align: center;
}

.sub {
    color: #ff5b5b;
    letter-spacing: 1em;
}

.glitch {
    position: relative;
    color: white;
    font-size: 4em;
    letter-spacing: 0.5em;
    animation: glitch-skew 1s infinite linear alternate-reverse;
}

.glitch::before {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    left: 2px;
    text-shadow: -2px 0 #ff00c1;
    clip: rect(44px, 450px, 56px, 0);
    animation: glitch-anim 5s infinite linear alternate-reverse;
}

.glitch::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    left: -2px;
    text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1;
    animation: glitch-anim2 1s infinite linear alternate-reverse;
}

@keyframes glitch-anim {
    0% {
        clip: rect(82px, 9999px, 58px, 0);
        transform: skew(0.19deg);
    }

    5% {
        clip: rect(53px, 9999px, 85px, 0);
        transform: skew(0.95deg);
    }

    10% {
        clip: rect(66px, 9999px, 56px, 0);
        transform: skew(0.33deg);
    }

    15% {
        clip: rect(71px, 9999px, 12px, 0);
        transform: skew(0.45deg);
    }

    20% {
        clip: rect(55px, 9999px, 96px, 0);
        transform: skew(0.17deg);
    }

    25% {
        clip: rect(89px, 9999px, 29px, 0);
        transform: skew(0.86deg);
    }

    30% {
        clip: rect(56px, 9999px, 99px, 0);
        transform: skew(0.7deg);
    }

    35% {
        clip: rect(93px, 9999px, 99px, 0);
        transform: skew(0.11deg);
    }

    40% {
        clip: rect(67px, 9999px, 88px, 0);
        transform: skew(0.37deg);
    }

    45% {
        clip: rect(22px, 9999px, 18px, 0);
        transform: skew(0.74deg);
    }

    50% {
        clip: rect(85px, 9999px, 95px, 0);
        transform: skew(0.99deg);
    }

    55% {
        clip: rect(64px, 9999px, 69px, 0);
        transform: skew(0.23deg);
    }

    60% {
        clip: rect(92px, 9999px, 90px, 0);
        transform: skew(0.47deg);
    }

    65% {
        clip: rect(15px, 9999px, 38px, 0);
        transform: skew(0.37deg);
    }

    70% {
        clip: rect(13px, 9999px, 55px, 0);
        transform: skew(0.36deg);
    }

    75% {
        clip: rect(68px, 9999px, 68px, 0);
        transform: skew(0.69deg);
    }

    80% {
        clip: rect(77px, 9999px, 33px, 0);
        transform: skew(0.38deg);
    }

    85% {
        clip: rect(9px, 9999px, 31px, 0);
        transform: skew(0.11deg);
    }

    90% {
        clip: rect(94px, 9999px, 75px, 0);
        transform: skew(0.07deg);
    }

    95% {
        clip: rect(66px, 9999px, 2px, 0);
        transform: skew(0.49deg);
    }

    100% {
        clip: rect(48px, 9999px, 8px, 0);
        transform: skew(0.17deg);
    }
}

@keyframes glitch-anim2 {
    0% {
        clip: rect(49px, 9999px, 67px, 0);
        transform: skew(0.08deg);
    }

    5% {
        clip: rect(55px, 9999px, 44px, 0);
        transform: skew(0.35deg);
    }

    10% {
        clip: rect(3px, 9999px, 9px, 0);
        transform: skew(0.29deg);
    }

    15% {
        clip: rect(11px, 9999px, 33px, 0);
        transform: skew(0.41deg);
    }

    20% {
        clip: rect(24px, 9999px, 24px, 0);
        transform: skew(0.13deg);
    }

    25% {
        clip: rect(53px, 9999px, 41px, 0);
        transform: skew(0.49deg);
    }

    30% {
        clip: rect(26px, 9999px, 99px, 0);
        transform: skew(0.56deg);
    }

    35% {
        clip: rect(43px, 9999px, 94px, 0);
        transform: skew(0.86deg);
    }

    40% {
        clip: rect(25px, 9999px, 97px, 0);
        transform: skew(0.18deg);
    }

    45% {
        clip: rect(45px, 9999px, 9px, 0);
        transform: skew(0.15deg);
    }

    50% {
        clip: rect(24px, 9999px, 24px, 0);
        transform: skew(0.47deg);
    }

    55% {
        clip: rect(38px, 9999px, 33px, 0);
        transform: skew(0.11deg);
    }

    60% {
        clip: rect(89px, 9999px, 45px, 0);
        transform: skew(0.17deg);
    }

    65% {
        clip: rect(81px, 9999px, 23px, 0);
        transform: skew(0.63deg);
    }

    70% {
        clip: rect(95px, 9999px, 21px, 0);
        transform: skew(0.16deg);
    }

    75% {
        clip: rect(14px, 9999px, 53px, 0);
        transform: skew(0.59deg);
    }

    80% {
        clip: rect(60px, 9999px, 77px, 0);
        transform: skew(0.59deg);
    }

    85% {
        clip: rect(86px, 9999px, 36px, 0);
        transform: skew(0.21deg);
    }

    90% {
        clip: rect(27px, 9999px, 87px, 0);
        transform: skew(0.32deg);
    }

    95% {
        clip: rect(16px, 9999px, 82px, 0);
        transform: skew(0.79deg);
    }

    100% {
        clip: rect(20px, 9999px, 48px, 0);
        transform: skew(0.73deg);
    }
}

@keyframes glitch-skew {
    0% {
        transform: skew(-1deg);
    }

    10% {
        transform: skew(5deg);
    }

    20% {
        transform: skew(-4deg);
    }

    30% {
        transform: skew(-1deg);
    }

    40% {
        transform: skew(0deg);
    }

    50% {
        transform: skew(-4deg);
    }

    60% {
        transform: skew(-4deg);
    }

    70% {
        transform: skew(0deg);
    }

    80% {
        transform: skew(-4deg);
    }

    90% {
        transform: skew(4deg);
    }

    100% {
        transform: skew(-4deg);
    }
}
```

