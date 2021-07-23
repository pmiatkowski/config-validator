import { Component, Inject } from '@angular/core';
import * as Tokens from '@app/tokens';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'config-validator';

  constructor(
    @Inject(Tokens.CONFIG) public config: Config
  ) {

    console.warn(window.__CONFIG);
  }
}
