# Frontend Mentor - Shortly URL shortening API Challenge solution

This is a solution to the [Shortly URL shortening API Challenge challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/url-shortening-api-landing-page-2ce3ob-G). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- Shorten any valid URL
- See a list of their shortened links, even after refreshing the browser
- Copy the shortened link to their clipboard in a single click
- Receive an error message when the `form` is submitted if:
  - The `input` field is empty

### Screenshot

![](./public/readme/screenshot.png)

### Links

- Solution URL: [https://github.com/pixelHat/url-shortening-api-landing-page](https://github.com/pixelHat/url-shortening-api-landing-page)
- Live Site URL: [https://pixelhat.github.io/url-shortening-api-landing-page/](https://pixelhat.github.io/url-shortening-api-landing-page/)

## My process

I started this challenge to work in a different way than usual. My biggest idea was to think outside of the box.

So, first I read a lot about some patterns/architecture to get some ideas. I started reading about some architecture:

- [CUBE CSS](https://cube.fyi/)
- [RSCSS](https://ricostacruz.com/rscss/)
- [BEM](https://en.bem.info/)
- [SMACSS](http://smacss.com/)

And a few articles:

- [Challenging CSS Best Practices](https://www.smashingmagazine.com/2013/10/challenging-css-best-practices-atomic-approach/)
- [The Road To Reusable HTML Components](https://www.smashingmagazine.com/2012/10/road-reusable-html-components/)
- [CSS Variable Secrets](https://www.youtube.com/watch?v=ZuZizqDF4q8)

I decided to use only SASS and Vite as frameworks because it's a small and experimental project.

### Built with

- Vite
- Mobile-first workflow
- Vanilla JS
- SASS
- CSS custom properties

### What I learned

My first idea to solve the background problem was to use a negative margin.

![half-background](./public/readme/half-background.png)

```css
.container {
  --height: 200px;
  height: var(--height);
  margin-inline-start: calc(var(--height) / 2);
}
```

The biggest issue with this strategy is that we must have a fixed `height` which isn't a good practice.

The second idea was to use the `transform` property.

```css
.container {
  transform: translateY(-50%);
}
```

For this strategy, I don't need to specify a `height`. However, the `translateY` doesn't pull the siblings' elements. So, I can't easily control the margins between these elements.

A better option was to use the `linear-gradient` property to create a half-background.

```css
.bg-half {
  background-image: linear-gradient(
    to bottom,
    var(--bg-half-clr-top, var(--clr-white)) 50%,
    var(--bg-half-clr-bottom, var(--clr-light-gray)) 50%
  );
}
```

I used css custom properties to create a small design token system, instead of SASS variables, and I really like it. Of course, we can use SASS to generate it.

```scss
$colors: (
  "light-cyan": hsl(180, 56%, 75%),
  "cyan": hsl(180, 66%, 49%),
  "dark-violet": hsl(257, 27%, 26%),
  "gray": hsl(0, 0%, 75%),
  "light-gray": hsl(0, 0%, 95%),
  "grayish-violet": hsl(257, 8%, 63%),
  "very-darkblue": hsl(255, 11%, 21%),
  "very-dark-violet": hsl(260, 8%, 14%),
  "red": hsl(0, 87%, 67%),
  "white": hsl(0, 0%, 100%, 1),
  "black": hsl(257, 8%, 14%),
);

:root {
  @each $key, $value in $colors {
    --clr-#{$key}: #{$value};
  }
}
```

Even though it's easy to use SASS to create these variables, I would use a tool for a future project. Something like [Token CSS](https://tokencss.com/) or even [Tailwind](https://tailwindcss.com/).

Also, I have used css custom properties to create some reusable utilities like the flow class.

```css
.flow > * + * {
  margin-block-start: var(--flow-y, var(--spacing-4));
}
```

I have learned that we should use `flex` for 1d containers and `grid` for 2d containers. However, it's much easier to control the children's size through `grid` than `flex`.

When we are using grid, we can define, at the parent element, what is the size of each child.

```css
.grid {
  display: grid;
  grid-template-columns: 4fr 1fr;
  column-gap: 40px;
  align-items: start;
}
```

In this example, the first child has 80% of the size and the second has 20%.

Now, using flex, we must style this on the children's style.

```css
.flex {
  display: flex;
  align-items: start;
}
.flex > *:first-child {
  width: 80%;
}
.flex > *:last-child {
  width: 20%;
}
```

I prefer the first one because the component should be responsive to its parent (container).

At the beginning of my carrer, I really enjoyed vanilla Javascript. However, nowadays I don't have more patience to use it. Next time I'm going to use a small library like alpine.

### Continued development

It would be much easier to make it using only BEM because it's a simple application. Though I end up doing some over-engineering, it was fun to work differently.

The next step is to get a multi-page application where I'm going to be able to see how a modular architecture can be helpfull.

## Author

- Frontend Mentor - [@pixelhat](https://www.frontendmentor.io/profile/pixelHat)
