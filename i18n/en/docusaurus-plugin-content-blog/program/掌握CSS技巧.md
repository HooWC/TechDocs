---
slug: css-skills-get
title: Master CSS skills
date: 2024-08-14
authors: Hoo
tags: [Sharing knowledge]
keywords: [Sharing knowledge]
description: This article shares how to master CSS, exploring advanced features, layout techniques, and optimization methods to enhance your understanding and improve web design efficiency and quality.
image: https://images2.alphacoders.com/137/thumb-1920-1371295.png
---

Hey, friend! Are you still worried about your CSS styles being messed up? Trying to make the button look cool, but it looks like it just escaped from a web page in 2003? Don't worry, today I'm going to show you the core skills of CSS! Let you become a magician in the front-end world in a few minutes (maybe a little exaggerated, but the effort is always effective)!

<!-- truncate -->

### Master CSS skills: Make your web page blind everyone's eyes!

Hey, friend! Are you still worried about your CSS styles being messed up? Trying to make the button look cool, but it looks like it just escaped from a web page in 2003? Don't worry, today I'm going to show you the core skills of CSS! Let you become a magician in the front-end world in a few minutes (maybe a little exaggerated, but the effort is always effective)!

------

### 1. Understand the selector: Choose the right element, save a few hairs!

CSS selectors are like when you report to your boss, you must grasp the key points and never confuse the objects. Otherwise, you want to style the button, but the whole page is rainbow-colored. Simply put, the selector tells CSS who to act on.

**A brief introduction to common selectors:**

- **Element selector**: Just write the tag name directly, such as `p`, `div`. It will select all elements of the same type - yes, all! So, friends who want to do something, use it with caution.

- **Class selector**: With a dot (`.`), such as `.cool-button`. This selector is very precise, you can safely create many classes and assign them to different elements.

- **ID selector**: With a pound sign (`#`), such as `#super-title`. ID selectors are extremely specific. An ID can only be used once on a page. Abusing IDs will drive your CSS crazy.
- **Attribute selectors**: Suitable for those "unconventional" elements, such as `input[type="text"]`. Used in situations where unique specifications are required, such as form styles.

**Mastering suggestions:** Try to use class selectors, which are simple, easy to use and not easy to get out of control. ID selectors can be used occasionally, but don't use them everywhere, as they are prone to CSS conflicts.

------

### 2. Firmly follow the path of layout: Become the master of Flexbox and Grid!

Layout is like laying a foundation. If the foundation is not stable, the building will collapse. Here is a strong suggestion: study Flexbox and Grid thoroughly! These two artifacts can save you from the torture of floating layout (I think everyone who has experienced the pain of floating layout understands it).

**Flexbox (Flexible Box Layout)**: Specializes in various horizontal and vertical arrangement problems. Whether you want elements to automatically line up in a row or a column, whether the content is centered, Flexbox can handle it all. He is simply an old Chinese doctor in the CSS layout world.

- **display: flex;** is the mantra of Flexbox - everything starts here.
- **justify-content**: Controls the horizontal arrangement, such as `center` for centering.
- **align-items**: Controls the vertical arrangement, if you want to center up and down, use `center`.
- **flex-direction**: Controls the arrangement direction (`row` for horizontal, `column` for vertical).

**Grid (grid layout)**:
Suitable for large-scale layout, a bit like a table, but much more flexible than a table. You can divide the page into grid areas as you like, and then stuff the content in.

- **display: grid;** Another mantra! Grid debuts.
- **grid-template-columns**: Defines the number of columns, `repeat(3, 1fr)` means evenly divided into three columns.
- **grid-template-rows**: Defines the number of rows, the routine is the same as above.
- **grid-gap**: Control the gap between grids, no more headaches from adjusting the position.

**Mastering suggestions:** Flexbox is suitable for local alignment, Grid is suitable for the overall layout of the page. Use them together, whoever uses them will be better!

------

### 3. Play with the box model: Make margins and padding no longer a mystery

The box model is a mysterious existence in the CSS world. Have you ever experienced a moment of mental breakdown from adjusting margins and padding? In fact, after understanding the structure of the box model, you will find that this is actually a "packaging art"!

**Box model basics:**

- **Content area (content)**: The heart of the box, used to display text and pictures.

- **Padding**: The white edge outside the content area is part of the box.

- **Border (border)**: A border outside the content area and the padding is a safety airbag.

- **Margin**: Outside the box, used to keep a distance from other elements.

**box-sizing tips:** `box-sizing: border-box;` is a life-saving setting for modern web design. It makes the width and height include the inner margin and border, so that the width and height you set will not be inflated by padding and border. Every time you add borders and padding, you will feel as stable as a rock!

------

### 4. Color palette: control the color and make tasteful color matching

You may not think that CSS colors can be so particular! Remember the "red and green match dog shit" taught by the art teacher in elementary school? The same principle applies to CSS.

**Common representation of color:**

- **Hexadecimal (Hex)**: #ffffff represents white, simple and direct.
- **RGB**: `rgb(255, 255, 255)` represents white, suitable for adjusting transparency (just add `a`).
- **HSL**: `hsl(120, 100%, 50%)`, this is hue, saturation, and brightness in one! The first choice for master color matching!

**Popular color matching techniques:**

- **Monochromatic color**: The depth of a color changes, safe and error-free.

- **Complementary colors**: Strong contrast, suitable for making the key content stand out.

- **Gradient color**: Background gradient `background: linear-gradient()`, the page is as beautiful as a painting!

------

### 5. Text magic: Add some drama to font design

Fonts are not just text, but the soul of the page. A good font can instantly enhance the style of the entire page, but please pay attention to moderation and don't choose too fancy fonts, otherwise it will only look... like a small advertisement.

**Basic operation of font selection:**

- **font-family**: Using system fonts is safe and highly adaptable, but you can add a little custom style to the font combination.

- **font-size**: Generally, large titles should be appropriately enlarged, and small titles should not exceed the line.
- **line-height**: Too tight line spacing will make the text difficult to read, 1.5 is a more comfortable value.

**Advanced skills:**

- **@font-face**: Want to use a more personalized font? You can import it yourself! But pay attention to the font size to avoid slow page loading.

- **Google Fonts**: There are a large number of beautiful free fonts here, which can be easily imported to improve the taste of the page.

------

### 6. Animation effect: Make the page lively

Want to add some animation to the page? Congratulations, CSS animation (CSS Animation) has paved a gorgeous red carpet for you. The page with animation effects is not only pleasing to the eye, but also increases the user's sense of participation.

**Simple animation:**

- **transition**: Just add `transition: all 0.3s ease;` on hover to make the button change slowly and increase the sense of interaction.

- **keyframes**: This is the highlight of the whole scene! You can define complex animation steps with `@keyframes` to make elements move like Disney characters!

**Common animation effects:**

- **Rotation**: Make the icon rotate `transform: rotate(360deg);`

- **Scale**: Zoom in and out `transform: scale(1.5);`

- **Flash**: With transparency, you can easily achieve light and shadow effects.

------

### 7. Breakpoint layout: Responsive design is no longer a problem

Did you know? In fact, making responsive layout is like doing magic, but this magic needs to take into account various screen sizes. So, don't do hardcore alignment - use CSS media query (media query)!

**Media query popular science:**

- `@media only screen and (max-width: 768px) { ... }`: Within this range, CSS will be triggered, and you can adjust it however you want!

------

### Summary

How is it? Do you feel that you have a deeper understanding of CSS? From selectors to layouts, from colors to animations, there are more CSS tricks than you think. With these skills, your web pages will definitely go from being a "passerby" to a "techie"!