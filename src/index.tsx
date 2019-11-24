import React from 'react';
import ReactDOM from 'react-dom';
import * as Rx from 'typeless/rx';
import { createModule, DefaultTypelessProvider } from 'typeless';
import QiitaRepository from './repository/Qiita'
import Item from './models/Item'
import {Tags} from './models/Tag'
import {ItemList} from './ItemList'

/* == Module Interface == */

export const [useModule, QiitaActions, getQiitaState] = createModule(
  Symbol('qiita')
)
  // Create Actions Creators
  .withActions({
    $mounted: null,
    getItems: (tags: Tags) => ({ payload: { tags } }), // null means no args
    getItemsDone: (items: Array<Item>, tags: Tags) => ({ payload: { items, tags } }),
    getTags: null, // null means no args
    getTagsDone: (tags: Tags) => ({ payload: { tags } }),
  })
  .withState<QiitaState>();

export interface QiitaState {
  items: Array<Item>,
  tags: Tags
}

/* == Module Implementation == */

const initialState: QiitaState = {
  items: [],
  tags: new Tags([])
};

const repository = new QiitaRepository()

// Create Epic for side effects
useModule
  .epic()
  // Listen for `count` and dispatch `countDone` with 500ms delay
  .on(QiitaActions.$mounted, ()  => {return Rx.of(QiitaActions.getTags())})
  .on(QiitaActions.getTags, async() => {
    const page = Math.floor( Math.random() * 99 ) + 1
    return repository.getTags(page).then((result) => QiitaActions.getTagsDone(result))
  })
  .on(QiitaActions.getTagsDone, ({tags}) => {return Rx.of(QiitaActions.getItems(tags))})
  .on(QiitaActions.getItems, async({tags}) => {
    return repository.getItems(tags.query).then((result) => QiitaActions.getItemsDone(result, tags))
  });

// Create a reducer
// Under the hood it uses `immer` and state mutations are allowed
useModule
  .reducer(initialState)
  .on(QiitaActions.getItemsDone, (state, { items, tags }) => {
    state.tags = tags;
    state.items = items;
  });

ReactDOM.render(
  <DefaultTypelessProvider>
    <ItemList />
  </DefaultTypelessProvider>,
  document.getElementById('app')
);