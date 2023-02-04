import { InjectionToken } from '@angular/core';

import { IAppConfig } from './iapp.config';

export let APP_CONFIG = new InjectionToken('app.config');


export const AppConfig: IAppConfig = {
   
    serviceBase_Url: {
  
    base_Url:'http://localhost:60793/api/', 
  
    }
  };