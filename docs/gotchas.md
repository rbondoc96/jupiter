# Gotchas

## RadixUI / ShadCN

> [!NOTE]
> When using `tailwindcss-animate` on some of RadixUI's primitives (like Dialog, Dropdown), some flickering was encountered on the close animation.

There was a GitHub [issue](https://github.com/radix-ui/primitives/issues/1074) opened in RadixUI's primitives repo that talks about the flickering.

The fix was to set `animation-fill-mode` to `forwards`, which is provided by `tailwindcss-animate` through the `fill-mode-forwards` utility class.

## `@react-pdf/renderer`

At first, I couldn't get fonts to load using some URL I found online for Montserrat. Because of that, I opted to download the `.ttf` files, store them locally, and then load them into `react-resume`. It led to CI errors on GitHub because I excluded the `.ttf` files from Git.

I might have just been using bad URLs, but I used this Google Developer [site](https://developers.google.com/fonts/docs/developer_api?apix_params=%7B%22family%22:%5B%22Montserrat%22%5D,%22sort%22:%22ALPHA%22%7D) and I used it to find the font URLs (for `.ttf` files) for Montserrat. Using those URLs loaded the fonts.

With that, I was able to get rid of the `.ttf` files in this project, reduce the bundle size, and get the GitHub Action to pass.
