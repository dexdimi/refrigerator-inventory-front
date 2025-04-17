import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/fridge.config';
import { FridgeComponent } from './app/fridge.component';

bootstrapApplication(FridgeComponent, appConfig)
  .catch((err) => console.error(err));
