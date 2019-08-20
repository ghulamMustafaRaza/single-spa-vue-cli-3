import { declareChildApplication, start } from 'single-spa';
import './registerServiceWorker';

declareChildApplication('nav', () => import('./nav/main'), () => true);
declareChildApplication('home', () => import('./home/main'), pathPrefix('/', ['/about']));
declareChildApplication('about', () => import('./about/main'), pathPrefix('/about'));

start();

function pathPrefix(prefix, notAllowed = []) {
    return function (location) {
        return !notAllowed.map(p => pathPrefix(p)(location)).find(a => a) && location.pathname.indexOf(`${prefix}`) === 0;
    }
}
