import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic"

import { environment } from "../environment/environment.hmr";
import { hmrBootstrap } from "./hmr";
import { AppModule } from "./app.module";

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule)

if (environment.hmr) {
  if (module["hot"]) {
    hmrBootstrap(module, bootstrap);
  } else {
    console.error("HMR is not enabled!");
    console.log("RUN `yarn run pre-dev`, it will be carry on your bundle with enabled HMR");
  }
} else {
  bootstrap().catch(err => console.log(err))
};