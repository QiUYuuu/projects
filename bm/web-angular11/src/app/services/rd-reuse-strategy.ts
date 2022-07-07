import { RouteReuseStrategy, DefaultUrlSerializer, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

export class RdReuseStrategy implements RouteReuseStrategy {

  // tslint:disable-next-line: variable-name
  _cacheRouters: { [key: string]: any } = {};

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    if (!route.routeConfig || route.routeConfig.loadChildren) {
      return false;
    }
    return true;
  }
  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    // 按path作为key存储路由快照&组件当前实例对象
    // path等同RouterModule.forRoot中的配置
    // 不复用登录的login路由, 也不复用home路由
    console.log(route['_routerState']['url']);
    const notRoute = ['/review/manage-review', '/examine/manage', '/examine/score'];   //  不进行路由复用的路由
    if (notRoute.indexOf(route['_routerState']['url']) >= 0) {
      if (route.data.title === 'Home') { return; }
      console.log('SAVE!!!');
      console.log(this.getRouteUrl(route));
      this._cacheRouters[this.getRouteUrl(route)] = {
        snapshot: route,
        handle: handle
      };
      console.log(this._cacheRouters);
    }
  }
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    // 在缓存中有的都认为允许还原路由
    return !!route.routeConfig && !!this._cacheRouters[this.getRouteUrl(route)];
  }
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    // 从缓存中获取快照，若无则返回null

    // console.log(route.routeConfig.component.toString());

    if (!route.routeConfig || !this._cacheRouters[this.getRouteUrl(route)]) { return null; }
    return this._cacheRouters[this.getRouteUrl(route)].handle;
  }
  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    // 同一路由时复用路由
    return future.routeConfig === curr.routeConfig;
  }

  private getRouteUrl(route: ActivatedRouteSnapshot) {
    return route['_routerState'].url.replace(/\//g, '_')
      + '_' + (route.routeConfig.loadChildren || (route.routeConfig.component ? route.routeConfig.component.toString().split('(')[0].split(' ')[1] : undefined));
  }
}
