import { NgModuleRef, ApplicationRef } from '@angular/core';

import { createNewHosts } from '@angularclass/hmr';

export const hmrBootstrap = (
    // webpack stuff
    module: any,
    // bootstrap is AppModule bootstrapper
    bootstrap: () => Promise<NgModuleRef<any>>,
) => {
    let ngModule: NgModuleRef<any>;
    module.hot.accept();
    // bootstraps AppModule ecery time a HMR is needed
    // sets ngModule equal to AppModule if successful (unnecessary)
    bootstrap().then((mod) => (ngModule = mod));
    module.hot.dispose(() => {
        // next two lines get native element for all `app-root` tags
        // that exist in `index.html`
        const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
        const elements = appRef.components.map((c) => c.location.nativeElement);
        // I will share createNewHosts code below it's nothing fancy just
        // the simple add and delete i mentioned
        const makeVisible = createNewHosts(elements);

        ngModule.destroy();
        makeVisible();
    });
};
