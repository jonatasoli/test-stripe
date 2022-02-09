# Fast Crud Jest  Documentation

# Unit Testing

This document contains guidelines for writing unit tests for the current frontend application.

## Introduction

* Tests should use **mocked data** most of cases. It will only have a few exceptions, that will need dynamic data or
  imported from another location.
* Make use of Jest helpers like `beforeEach`, `afterEach`, etc.
* Unit test descriptions should be clear phrases indicating what the does
  * Use [SVO](https://www.thoughtco.com/subject-verb-object-1692011) (Subject + Verb + Object)
  * Examples:
    * BAD: 'increment click' (no verb)
    * GOOD: 'increments counter value on click' (implicit "test component" subject)
* Unit tests file names should be named as others in the project, should contain `.test.js` (or `.ts` if using
  typescript) at end
  * Example: `tests/unit/Auth.test.js`
* Case tests are stored in any of `__tests__` folders. Test filenames should be concise, preferably having the same name
  as the component / helper you will test.
  * Example: `src/core/helpers/env.js` => `src/core/helpers/__tests__/env.test.js`
* Avoid adding code that is not going to be used in your tests immediately
  * Example: if you need a "ref" to facilitate finding the component in tests, don't add it to all components just
    because it may be used someday. Add it only when your test effectively uses it. If your tests changes and the ref is
    not used anymore, check if you can remove it as well.
  * Try to use an existing class or id instead of adding a ref. If the styling is following
    [BEM](https://en.bem.info/methodology/html/) in the HTML as indicated in our styling guide that can be quite easy to
    do. If not, you proceed to change the component under test (maybe using BEM!).

The rest of this document will show more guidelines, but more specific and some with examples.

## Specific Guidelines

### Do not try to `find` third party classes, like from vuetify

You should not use third party classes in tests like below:

```js
expect(wrapper.find(‘.text-field-static’).classes()).toContain(‘v-input—is-disabled’)
```

Some reasons for not doing the above:

* snapshot tests will already verify the classes from third party are in place, so it would be redundant to the above
* you would be testing third party functionality, which assume works and should NOT be tested
* the expectation is hard to read, as the names are not connected to functionality

Instead, you should identify a meaningful class provided by our own functionality, an id or a ref and use it instead, like:

```js
const isButtonDisabled = wrapper.findComponent({ ref: 'purchaseInsuranceButton' }).element.disabled
expect(isButtonDisabled).toBe(true)
```

Notice that the above is a little easier to read and you now know what purpose the button has, besides knowing that it
should be disabled.

### Use another file for mock data when there is too much of it

If you have many lines of mock data for your test (more than 50), you should create a new file named like your test
file, but ending in `.data.js`. You should then import the file in your test in order to use the data.

This will help keeping the test file with the most important information on top: the tests.

### Focus on testing the API, not internal functionality

* You should validate private / internal functionality by unit testing public methods
* In our case, we want to test SFCs (Single File Components) and our public functionality is in fact the UI interaction,
  for instance:
  * Click on buttons and edit forms, which in turn
  * Updates the state and then
  * Re-renders the UI, which can be verified for
* When testing the UI interaction is too hard or you see the methods on a SFC can be well tested by directly
  interacting with the method, you may add additional tests for that.

An example of testing the "public functionality" of an SFC would be UI only interactions like:

```js
it('increments counter value on click', async () => {
  const wrapper = mount(Counter)
  const button = wrapper.find('button')
  const text = wrapper.find('p')

  expect(text.text()).toContain('Total clicks: 0')

  await button.trigger('click')

  expect(text.text()).toContain('Total clicks: 1')
})
```

You can see above that we mount a component, interact with it and then check how the UI was updated. We don't verify
`vm` values directly.

As the component becomes more complex, you may need to starting verifying values on the view model directly (using
`wrapper.vm`) but if you can get such information indirectly through UI interactions, that is preferred. An example of
this: consider the example above has a submit button to send the total clicks via an event. You want to validate the
view model contains the right data to be sent via the form so you could verify using `wrapper.vm.clicks`, but you could
also instead intercept the emitted event and verify it contains the right click count. This way, you don't test only the
internal value in the model, but also that it was emitted correctly. Also, if the internal name changes later in a
refactor, you don't necessarily need to change the test, unless the public api (props, emitted events, etc) change. The
way of storing the data (in component or a vuex store) could even change as well without necessarily requiring a test
change.

You may also write a test not for a component, but for a helper function. You would just import the function and write a
test as usual:

```js
// this you would import from somewhere
function getCounter() {
  let count = 0

  return {
    count() {
      return count
    },
    increment() {
      count++
    },
    decrement() {
      count--
    }
  }
}

// you proceed to the test as usual
describe('counter', () => {
  test('counter can increment value', () => {
    let wrapper = getCounter()

    wrapper.increment()
    wrapper.increment()

    expect(wrapper.count()).toBe(2)
  })

  test('counter can decrement value', () => {
    let wrapper = getCounter()

    wrapper.decrement()

    expect(wrapper.count()).toBe(-1)
  })
})
```

### Testing the View Model

Testing the public API via props, emitted events and UI changes is preferred, but there may be changes you find it
compelling to also test the view model, which means basically testing calling methods on a vue instance and seeing how
the data changes, forgetting about the UI for a moment.

If you judge tests for the view model are helpful, create a separate section for them in your test file using `describe`:

```js
describe('Component.vue', () => {
  describe('Public API', () => {
    it('renders something...')
  })
  describe('View Model', () => {
    it('changes something...')
  })
})
```

The point in having the separation between the public api tests and the view-model tests is to help decide the scope of
each test. You can still create helpers to mount components outside the describe blocks, so that they can be used in
both. On the view model tests though, you would not be interacting with the UI, but just seeing how the data layer of
the component behaves.

### Avoid changing files just for tests

If possible, try to use existing functionality to test your public API. Changing components to ease testing should be
avoided. However, it may be necessary if the original implementation is just too hard to test otherwise.

One point here is using vue-test-utils `find` feature with css query selectors. Those can help you find elements. For
instance, if the BEM styling was followed as suggested in our styling guide, you could have something like the HTML below rendered:

```html
<ul class="menu">
  <li class="menu__item">
    <a class="menu__link" href="https://">...</a>
  </li>
    <li class="menu__item active">
    <a class="menu__link" href="https://">...</a>
  </li>
</ul>
```

You could select the active menu item with:

```js
const activeMenuItem = wrapper.find('.menu .menu__item.active')
```

The above would not require a ref nor a new id and the test would still be clear as the `find` call is searching for
meaningful names. If the class names were `boldText` or something else, that would not be useful for a test and should
be avoided.

### Jest Matchers: toBeFalsy, toBeTruthy, toBe(true), toBe(false)

If you are testing boolean values, you should use `toBe(true)` and `toBe(false)`. This does some type checking, so if
the variable you are comparing against becomes undefined, `toBe(false)` would fail, while `toBeFalsy` would pass, even
if this was not our intention. For instance, we may have written:

```js
expect(wrapper.vm.isCurrentlyLoading).toBeFalsy()
```

If we refactor the view model so that the variable is now `isLoading`, the test would still be working as
`vm.isCurrentlyLoading` is undefined and that is falsy. However, this makes our test effectively broken as maybe the
component is loading and we just don't know.

You should use `toBeFalsy` and `toBeTruthy` well aware of the above. Those matchers can express well what you want to
test, but don't use them always without thinking. Consider what would happen when one variable in the chain becomes
undefined and what you want to happen in the test: should it fail or pass?

### Naming

Use `it` when writing tests. You should write test descriptions in such a way that the `it` is a pronoun that is part of
reading the test description. `it` would refer to the component being tested which would be specified by the file or the
containing `describe` block. For instance:

```js
describe('Component.vue', () => {
  // "it", the "Component.vue", mounts successfully
  it("mounts successfully", () => {})
  it("renders value X from props", () => {})
  it("reacts to data changes", () => {})
})
```

Previous tests that use `test` or that do not follow the convention above for the description may be kept as is or
renamed if the maintainer finds it adequate to improve legibility.

### Use .html() instead of .element for snapshots

We use the [jest-serializer-vue-tjw](https://github.com/tjw-lint/jest-serializer-vue-tjw) to serialize vue components to
html for saving our snapshots. Examples from the official vue docs may use something like
`expect(wrapper.element).toMatchSnapshot()` but this is not advised in this project. The reason is that the output of
such call ignores serializer configurations to remove attributes that change values outside of our control. For
instance, vuetify numbers some attribute values, so if you add or remove an input you may in effect change your snapshot
in multiple places. If you use the `.html()` method ( `expect(wrapper.html()).toMatchSnapshot()` ), those attributes are
cleared.

An example with `.element` would be:

```html
<input
  aria-checked="false"
  id="input-4"
  name="active"
  role="radio"
  type="radio"
  value=""
/>
```

the same element with `.html()` becomes:

```html
<input aria-checked="false" id name role="radio" type="radio" value>
```

You see that whitespace is different, but the main point is that the `id` and `name` attributes were cleared, so they
don't appear in the snapshot. For testing, those values are available, just the snapshot test lines are influenced.

### Fake timers

Certain components have timers to run code after a period of time. Tests should be deterministic and predictable, and
tests that depend on time intervals may be quite brittle. Jest has "fake timers" which allow us to control timers in
unit tests. Please see the [official documentation](https://jestjs.io/docs/timer-mocks) for more info.

In particular, pay attention to how you can [advance timers by
time](https://jestjs.io/docs/timer-mocks#advance-timers-by-time). The following are code examples from the jest docs:

```js
// timerGame.js (the function that uses a timer that we would like to test)
'use strict';

function timerGame(callback) {
  console.log('Ready....go!');
  setTimeout(() => {
    console.log("Time's up -- stop!");
    callback && callback();
  }, 1000);
}

module.exports = timerGame;
```

```js
it('calls the callback after 1 second via advanceTimersByTime', () => {
  const timerGame = require('../timerGame');
  const callback = jest.fn();

  timerGame(callback);
git
  // At this point in time, the callback should not have been called yet
  expect(callback).not.toBeCalled();

  // Fast-forward until all timers have been executed
  jest.advanceTimersByTime(1000);

  // Now our callback should have been called!
  expect(callback).toBeCalled();
  expect(callback).toHaveBeenCalledTimes(1);
});
```

Using fake timers with the technique above you can deterministically stay or get to a desired state even on components
that update based on timers.

### Use the attachTo mount option

Vue test utils uses [JSDOM](https://github.com/jsdom/jsdom) under the hood, which acts as a "browser" for the component.
The simplest way of mounting in vue test utils does not require many options:

```js
import { mount } from '@vue/test-utils'
import Foo from './Foo.vue'

describe('Foo', () => {
  it('renders a div', () => {
    const wrapper = mount(Foo)
    expect(wrapper.contains('div')).toBe(true)
  })
})
```

By mounting the component as above, we effectively have a "disconnected element" that is not in the DOM. Testing it
works, but it presents some issues when triggering certain DOM events. Vue test utils
[#1777](https://github.com/vuejs/vue-test-utils/pull/1777) has a comment saying:

> Ahhh okay I think the "Fixed el.focus() to do nothing on disconnected elements." change in jsdom is the issue.
>
> If I change my tests to use the attachTo option when mounting then the tests pass. I think it is because the element
> is not actually appended to the document so the focus event is not fired.
>
> However, the above causes problems when we start testing components that have more involved interactions, such as
> emitting multiple events.

From that comment, we notice the consequence of having a disconnected element is that one may effectively try to focus
on an element with vue test utils for it to simply do nothing, without any indication of why. Attaching to the DOM
provides a slightly closer to the browser behavior. Certain helper methods may depend on this feature if they trigger
events like "focus".

### Use the @tests import alias

One may create auxiliary methods under the `/tests` folders, while the tests themselves are inside a `src/**/__tests__`
folder. You can import those auxiliary methods using the `@tests` module mapper, which was defined in `jest.config.js`.
An example:

```js
import { fillTextFieldStatic, waitForComponent } from '@tests/helpers'
```

## Notes

* Check existing tests as examples. They are in`__tests__` folder across the project. Take a look to see how perform a component test.
* Unit tests with jest were added with vue-test-utils 1.2.2, but a bug in the verification for the object type happened
  in the initial tests, which was reported by someone else on the official repo (see
  [#1805](https://github.com/vuejs/vue-test-utils/issues/1805)) but wasn't addressed yet (maybe future version, or if
  [#1897](https://github.com/vuejs/vue-test-utils/pull/1897) ever gets merged). In the meantime, we are using
  [patch-package](https://www.npmjs.com/package/patch-package) to apply the patch after `yarn` updates like installing
  and removing a package. This should ensure both CI and local environment have this patch, which is essential for our
  tests at least with vue-test-utils 1.2.2.

## Further Reading

* [Vue Test Utils - Guides](https://vue-test-utils.vuejs.org/guides/)
* [Digital Ocean VueJS Testing](https://www.digitalocean.com/community/tutorials/vuejs-vue-testing)
* [Vuetify Unit Testing](https://vuetifyjs.com/en/getting-started/unit-testing/#test-runners)
* [Jest API](https://jestjs.io/docs/en/api)
* [Best practices for writing unit tests](https://docs.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices)
* [Project installation docs](https://dev.to/vuesomedev/add-testing-to-vite-4b75)