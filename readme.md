## Vite as cli issue

I'm trying to create a cli tool that uses vite to serve a simple web app. 

There are two folders in this project. First of is `core` that contains the code of the cli tool, and then do we have `example` that is just an example project that can consume this cli (there is no code there).

What I want to achieve in this stage is to be able to run `npx vite_book_issue` in the `example` folder. 

```
cd core
npx vite
```
This is working fine, just as expected. There is a index.html and a vite config file that vite picks up and use. Nice.

Since I want to use this tool as an installable cli tool I have created a cli.ts file (core/cli/cli.ts) that starts a vite sender and servers a custom html file.

```
cd core
./cli/cli.ts
```
This works with the same result as above. If you visit localhost:3000 you can see the text "hello" and in devtools, you can see that about 13 files have been downloaded. Sounds reasonable. 

Let's now try to install this cli in the example project:
```
cd core
npm pack
cd ../example
npm install ../core/vite_book_issue-1.0.0.tgz
npx vite_book_issue
```
The server starts, but I'm getting a lot of "Sourcemap for "..." points to missing source files" and if I try to visit the page in the browser, it will make 461 requests before it gets a runtime error (Uncaught SyntaxError: The requested module '/node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js?v=00265e9c' does not provide an export named 'default').

I have also tried to run vite inside the example folder with a index.html file:
```
cd example
npx vite
```
With the same issue as with `npx vite_book_issue`.

So `npx vite` works fine in the core folder but not in the example folder. The difference is that `core/index.hml` is importing a script file from `/src/webapp/index.tsx` and `example/index.html` the same script file is imported by `node_modules/vite_book_issue/src/webapp/index.tsx`.

So this works fine:
```html
<script type="module" src="/src/webapp/index.tsx"></script>
```

But if I use the following code instead:
```html
<script type="module" src="node_modules/vite_book_issue/src/webapp/index.tsx"></script>
```
I'm getting a lot of "Sourcemap for "..." points to missing source files" and  the browser is downloading a lot of files (~460) and is never able to show the page.

Can someone point me in the right direction to see what the issue can be?

Thanks
