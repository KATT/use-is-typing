# `use-is-typing` <img src="https://raw.githubusercontent.com/KATT/use-is-typing/master/typing-indicator.gif" width="50">

See if someone is typing into an input or textarea.

## Install

```sh
yarn add use-is-typing
```

```
npm i use-is-typing --save
```

## Example

- See more examples [`./storybook`](./stories/useIsTyping.stories.tsx)
- [Try it at CodeSandbox](https://codesandbox.io/s/use-is-typing-jz5i6)

### Basic

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useIsTyping } from 'use-is-typing';

const App = () => {
  const [isTyping, register] = useIsTyping();

  return (
    <div>
      <textarea ref={register} />
      <br />
      Typing? {isTyping ? '✅' : '❌'}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
```

### With [Material UI](https://material-ui.com/)

```tsx
export const MaterialUITextField = () => {
  const [isTyping, register] = useIsTyping();
  return (
    <div>
      <TextField label="Type something here" inputRef={register} />
      <Box mb={2} />
      <Typography variant="body1">
        Typing? {isTyping ? '✅' : '❌'}
      </Typography>
    </div>
  )
};
```

### Customize timeout

By default, the typing indicator is set to `false` after 1000ms, this can be changed:

```tsx
const [isTyping, register] = useIsTyping({ timeout: 300 }); // timeout after 300ms
```



## Contributing

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx). See sections below for info on how to get it running.


### Configuration

Code quality is [set up for you](https://github.com/palmerhq/tsdx/pull/45/files) with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.


### Commands

TSDX scaffolds your new library inside `/src`, and also sets up a [Parcel-based](https://parceljs.org) playground for it inside `/example`.

The recommended workflow is to run TSDX in one terminal:

```
npm start # or yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

Then run either example playground or storybook:

#### Storybook

Run inside another terminal:

```
yarn storybook
```

This loads the stories from `./stories`.

> NOTE: Stories should reference the components as if using the library, similar to the example playground. This means importing from the root project directory. This has been aliased in the tsconfig and the storybook webpack config as a helper.

#### Jest

Jest tests are set up to run with `npm test` or `yarn test`. This runs the test watcher (Jest) in an interactive mode. By default, runs tests related to files changed since the last commit.
