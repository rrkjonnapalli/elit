import { Component, OnInit } from '@angular/core';
import { zones } from '@services/shared/utils';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { LoggerService } from '@services/shared/logger/logger.service';
import { MatIconModule } from '@angular/material/icon';
import { ITime } from '@models/core-models';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { add, differenceInDays, differenceInMonths, differenceInYears, formatRelative } from 'date-fns';
import _ from 'lodash';
import { SnackbarService } from '@services/shared/snackbar/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatButtonModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './time.component.html',
  styleUrl: './time.component.scss'
})
export class TimeComponent implements OnInit {
  zones = zones();
  times: ITime[] = [];
  isLoading = true;
  time = new Date();
  filteredTimes = this.times;
  timezone = new FormControl('');
  pins: ITime[] = [];
  pinZones: string[] = [];
  differences: string[] = [];

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  home = {name: 'Home', path: ['apps']};

  constructor(private log: LoggerService, private _snackbar: SnackbarService, private router: Router) { }

  gotoHome = () => {
    this.router.navigate(this.home.path);
  }

  ngOnInit(): void {
    const pinZones = localStorage.getItem('pinZones') || '[]';
    this.pinZones = JSON.parse(pinZones);
    setInterval(() => {
      this.time = new Date();
      this.generateTimes();
      this.isLoading = false;
    }, 1000);
    this.timezone.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe({
      next: (val) => {
        val = val || '';
        this.filteredTimes = this.getFilteredValues(val);
      }
    })
  }
  pinZone(time: ITime, isAdd = true) {
    const isPinned = this.pinZones.includes(time.timeZone);
    if (isPinned && isAdd) { return; }
    if (!isAdd) {
      const { timeZone } = time;
      this.pins = this.pins.filter(e => e.timeZone !== timeZone);
    } else {
      this.pins.push(time);
    }
    this.pinZones = this.pins.map(e => e.timeZone);
    localStorage.setItem('pinZones', JSON.stringify(this.pinZones));
  }

  getFilteredValues = (val: string) => {
    const value = val.toLowerCase();
    return this.times.filter(e => e.timeZone.toLowerCase().includes(value) || e.abbr?.toLowerCase() === val);
  }

  calculateDateDiff() {
    this.differences = [];
    const { start, end } = this.range.value;
    if (!_.isDate(start) || !_.isDate(end)) {
      this.log.info('Invalid dates');
      return;
    }
    const days = differenceInDays(end, start);
    const diffyears = differenceInYears(end, start);
    const diffmonths = differenceInMonths(end, start) % 12;
    const temp = add(start, {years: diffyears, months: diffmonths});
    const diffdays = differenceInDays(end, temp);
    this.log.debug({days, diffdays,  diffyears, diffmonths});
    this.differences = [
      [{ type: 'Year(s)', value: diffyears }, { type: 'Month(s)', value: diffmonths }, { type: 'Day(s)', value: diffdays }],
      [{ type: 'Day(s)', value: days }]
    ].map(item => item.filter(e => e.value > 0).map(e => `${e.value} ${e.type}`).join(', '));
  }

  generateTimes() {
    this.times = this.zones.map(({ zone: timeZone, abbr }) => {
      return {
        timeZone,
        abbr,
        time: Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: 'numeric',
          hour12: false,
          weekday: 'short',
          // timeZoneName: 'short',
          // formatMatcher: 'basic',
          // dateStyle: 'full',
          // timeStyle: 'medium',
          timeZone
        }).format(this.time)
      }
    });
    const timeMap: { [key: string]: ITime } = this.times.reduce((r, e) => ({ ...r, [e.timeZone]: e }), {});
    this.filteredTimes = this.getFilteredValues(this.timezone.value || '');
    this.pins = this.pinZones.map(timeZone => ({
      ...(timeMap[timeZone])
    }));
  }

}
