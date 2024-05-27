import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { TApp } from '@models/core-models';

@Component({
  selector: 'app-apps',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './apps.component.html',
  styleUrl: './apps.component.scss'
})
export class AppsComponent {
  apps: TApp[] = [
    {name: 'JSON Formatter', path: ['jsonplay']},
    {name: 'Dates & Times', path: ['time']},
    {name: 'JSON Diff', path: ['jsondiff']}
  ]
  constructor(private router: Router) { }

  gotoPath = (app: TApp) => {
    this.router.navigate(app.path);
  }
}
