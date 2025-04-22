import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/fridge/fridge.config';
import { FridgeComponent } from './app/fridge/components/fridge.component';

bootstrapApplication(FridgeComponent, appConfig)
  .catch((err) => console.error(err));
