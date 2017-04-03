import Vue from 'vue';
import Router from 'vue-router';
import entry from '@/components/entry';
import game from '@/components/game';
import outDate from '@/components/outdate';
import invite from '@/components/invite';
import getMoney from '@/components/getMoney';
import 'normalize.css';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'entry',
      components: {
        window: entry
      }
    },
    {
      path: '/game',
      name: 'game',
      components: {
        window: game
      }
    },
    {
      path: '/outDate',
      name: 'outDate',
      components: {
        window: outDate
      }
    },
    {
      path: '/invite',
      name: 'invite',
      components: {
        window: invite
      }
    },
    {
      path: '/getMoney',
      name: 'getMoney',
      components: {
        window: getMoney
      }
    }
  ]
});
