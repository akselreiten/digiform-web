import 'rxjs/Rx';
import {Observable}                     from "rxjs/Rx";

// Angular
import {Injectable}                     from '@angular/core';
import {Headers, Http, Response}        from "@angular/http";
import {Router}                         from "@angular/router";

// Angular JWT libary used for authentication
import { AuthHttp, tokenNotExpired }    from 'angular2-jwt';

@Injectable()
export class Api {

  /**
   * ====================================
   *   REQUEST SERVICE
   * ====================================
   *
   * The request service is the only service that actually handles request to the server.
   * What this means is that all the other services uses the request method to retrieve their data
   * from server.
   *
   * The class has two methods:
   *
   * 1. Public request which handles all the requests to server
   *
   *    @Params: method  : string
   *            url     : string
   *            key     : string (Optional)
   *            data    : any (Optional)
   *
   *    @Returns: Observable
   *
   *
   * 2. Public invalidate which invalidates cached data based in a key
   *
   *    @Params: key     : string
   *
   *    @Returns: void
   *
   */

    // Information watchers
  private _watchers:any[];

  // Dictionary that stores all the data related to jobs
  private _cachedData:{};

  // Variable to hold default headers
  private _header:Headers;

  // Pagination paths
  private _paginationPaths:{};

  constructor(
    private http:Http,
    private authHttp:AuthHttp,
    private _router:Router
  ) {

    /**
     * ====================================
     *   DEFAULT HEADERS
     * ====================================
     *
     * These headers are used for all post requests as of today
     *
     */

    this._header = new Headers();
    this._header.append('Content-Type', 'application/json');

    this._watchers = [];
    this._paginationPaths = {};

    /**
     * The dict is initialized as a empty dict and later filled when different
     * requests are initiated
     */

    this._cachedData = {};

    /**
     * If the path changes, we need to reset the pagination paths
     */

    this._router.events.subscribe(val => {
      this._paginationPaths = {};
    });

  }

  /**
   * =======================================================
   *   MAIN REQUEST METHOD
   * =======================================================
   */

  public request(method:string, url:string, key?:string, data?:any):Observable<Response> {

    /**
     * This method is used to handle all types of requests, and does caching on client
     * side based on different keys.
     */

    // If cache exist the data is returned as an observable object
    if (key && this._cachedData[key] && method != 'post') {
      return Observable.create(observer => {
        observer.next(this._cachedData[key]);
        observer.complete();
      });
    }

    /**
     *
     * What class we want to use to generate requests to the server depends on
     * if the user is logged in or not. To check that a user is logged in, we
     * check if there are a token stored in the local storage.
     *
     */

    var token;

    // Retrieves the token from local storage
    if (tokenNotExpired())
      token = localStorage.getItem('id_token');

    // Some browsers require the format=json attrbute to be sent in order to get the correct dataobject back
    if (url.indexOf('format=json') == -1) {
      if (url.indexOf('?') != -1) {
        url += '&format=json';
      } else {
        url += '?format=json';
      }
    }

    // Declares a variable to be initialized with the correct class
    var http;

    if (token)
    // A token is present, so we assume that the user is logged in
      http = this.authHttp;
    else
    // There are no token present, so we assume that the user is not logged in
      http = this.http;

    /**
     * If the method continues to this point, it means that no cached values was found
     * and that we need to request new information from the server
     */

    switch (method) {
      case 'POST': // The method is of type post
        var body = JSON.stringify(data);
        return http.post(url, body, {headers: this._header});

      case 'PUT': // The method is of type put
        var body = JSON.stringify(data);
        return http.put(url, body, {headers: this._header});

      case 'DELETE': // The method is of type delete
        return http.delete(url);

      case 'GET': // The method is of type get
        return http.get(url)
          .do(res => {

            // The value is saved in the cache dict if key is provided
            if (key)
              this._cachedData[key] = res;
          });
    }
  }

  /**
   * =======================================================
   *   INVALIDATION METHOD
   * =======================================================
   */

  public invalidate(key):void {

    /**
     *
     * This method is used every time the cached data needs to be
     * invalidated. The invalidation happens based on a provided key
     *
     */

    delete this._cachedData[key];
  }

  /**
   * =======================================================
   *   INVALIDATE ALL METHOD
   * =======================================================
   */

  public invalidateAll():void {

    /**
     *
     * This method is used to invalidate all cached data. Typically used when a user loggs out.
     *
     */

    this._cachedData = {};
  }

  /**
   * =======================================================
   *   REGISTER WATCHER
   * =======================================================
   */

  public registerWatcher(watcher:any) {

    /**
     *
     * Register watchers adds a new watcher to the watchers list
     *
     */

    // Pushes a new watcher to the list
    this._watchers.push(watcher);
  }

  /**
   * =======================================================
   *   ALERT WATCHERS
   * =======================================================
   */

  public alertWatchers() {

    /**
     *
     * Alert watchers iterates through all the registered wathcers and alerts
     * them about that something has changed.
     *
     */

    this._watchers.forEach((watcher:any) => {

      // Calls update method on each watcher
      watcher.alertUpdate();
    });
  }

  /**
   * =======================================================
   *   SET & GET PAGINATION PATH
   * =======================================================
   */

  public setPaginationPath(key, path):void {
    this._paginationPaths[key] = path;
  }

  public getPaginationPath(key):string {
    return this._paginationPaths[key];
  }
}
