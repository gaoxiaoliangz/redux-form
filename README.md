# better-redux-form

Easy to use redux form

[![npm version](https://badge.fury.io/js/better-redux-form.svg)](https://badge.fury.io/js/better-redux-form)

## Install

``` bash
npm install better-redux-form --save
```

## Getting Started With better-redux-form

better-redux-form primarily consists of three things:

1. A Redux reducer that listens to dispatched better-redux-form actions to maintain your form state in Redux.
2. A React component decorator that wraps your entire form in a Higher Order Component (HOC) and provides functionality via props.
3. Various Action Creators for interacting with your forms throughout the application.

### Implementation Guide

#### Step #1

The first thing that you have to do is to give the better-redux-form reducer to Redux. You will only have to do this once, no matter how many form components your app uses.

```js
import {createStore, combineReducers} from 'redux'
import {reducer as formReducer} from 'better-redux-form'
const reducers = {
  // ... your other reducers here ...
  form: formReducer
}
const reducer = combineReducers(reducers);
const store = createStore(reducer);
```
#### Step #2

Decorate your form component with form(). This will provide your component with props allowing you to attach your inputs to better-redux-form.

```js
import React, {Component} from 'react'
import form from 'better-redux-form'
// Note:
// if you use `require` don't forget to add `.default` to your import
// const form = require('better-redux-form').default

class ContactForm extends Component {
  render() {
    const {fields: {firstName, lastName, email}, handleSubmit} = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input type="text" placeholder="First Name" {...firstName}/>
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" placeholder="Last Name" {...lastName}/>
        </div>
        <div>
          <label>Email</label>
          <input type="email" placeholder="Email" {...email}/>
        </div>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

ContactForm = form({ // <----- THIS IS THE IMPORTANT PART!
  form: 'contact',                           // a unique name for this form
  fields: ['firstName', 'lastName', 'email'] // all the fields in your form
})(ContactForm)

export default ContactForm
```

That's it! There is no Step #3!

If you're starting out with better-redux-form, a good place to continue learning about how to connect up the inputs to redux-form would be the Basic Form Example.

## API

### from(config)

config: { form: string, fields: string[], validate?: func, destroyOnUnmount?: boolean }

#### form

The name of your form, which will be used in the store.

#### fields

A list of all your fields in your form.

#### validate: (values:Object) => errors:Object [optional]

a synchronous validation function that takes the form values passed into your component. If validation passes, it should return {}. If validation fails, it should return the validation errors in the form { field1: <String>, field2: <String> }. Defaults to (values) => ({}).

#### destroyOnUnmount: boolean

Whether or not to automatically destroy your form's state in the Redux store when your component is unmounted. Defaults to true.

---

### props: fields

The props listed on this page are are the props that better-redux-form generates to give to your decorated form component.

#### value: any

The value of the field, the type of which is dependent on what value is passed to the field.

#### get: (defaultVal?) => value

Get the value of field, if value is undefined defaultVal will be returned.

#### set/onChange: (val) => void

Set the value of field.

#### touched: boolean

true if the field has been touched.

#### error: string

A generic error for the entire form given by the error key in the result from the synchronous validation function.

### props: handleSubmit

A function meant to be passed to <button onClick={handleSubmit(callback)}>. It will run validation, if the form is valid, it will call callback with the contents of the form data.

---

### Action creators

initialize(form: string, values)

change(form, field, value, touch)

touch(form, fields: string[])

defineField(form, name)

reset(form: string)

destroy(form: string)
