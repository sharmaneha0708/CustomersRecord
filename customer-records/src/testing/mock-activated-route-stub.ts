import {Observable} from 'rxjs';
import {ActivatedRoute,Params } from '@angular/router';

export class MockActivatedRoute implements ActivatedRoute{
  public snapshot;
  public url;
  public params;
  public queryParams: Observable<Params>;
  public fragment: Observable<string>;
  public data;
  public outlet;
  public component;
  public paramMap;
  public queryParamMap;
  public routeConfig;
  public root;
  public parent;
  public firstChild;
  public children;
  public pathFromRoot;
  public toString(): string {
    return '';
  };
}
