import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AutocompleteAddressFragment } from '../../domain/model/generated';
import { TravelPointApiService } from '../../domain/api/travel-point-api.service';
import { debounceTime, distinctUntilChanged, filter, switchMap, takeUntil } from 'rxjs/operators';
import { DEBOUNCE_TIME, MIN_SEARCH_TERM_LENGTH } from '@dravelopsfrontend/shared';

@Component({
  selector: 'dravelopsefafrontend-autocomplete-search',
  templateUrl: './autocomplete-address-search.component.html',
  styleUrls: ['./autocomplete-address-search.component.scss']
})
export class AutocompleteAddressSearchComponent implements OnInit, OnDestroy {
  @Input() inputLabel: string;
  @Output() selectAddressEvent = new EventEmitter<AutocompleteAddressFragment>();

  autocompleteTravelPoints$: Observable<AutocompleteAddressFragment[]>;
  readonly input$ = new Subject<string>();
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly travelPointApiService: TravelPointApiService
  ) {
  }

  ngOnInit(): void {
    this.initAutocompleteTravelPointSearch();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  handleTravelPointSelectEvent(address: AutocompleteAddressFragment): void {
    this.selectAddressEvent.next(address);
  }

  private initAutocompleteTravelPointSearch(): void {
    this.autocompleteTravelPoints$ = this.input$
      .pipe(
        takeUntil(this.destroy$),
        filter((searchTerm: string) => searchTerm.length >= MIN_SEARCH_TERM_LENGTH),
        distinctUntilChanged(),
        debounceTime(DEBOUNCE_TIME),
        switchMap((searchTerm: string) => this.travelPointApiService.getAddressesBy(searchTerm))
      );
    // working with mock data
    // this.departureTravelPoints$ = of([{...getFurtwangenUniversityTravelPoint()}, {...getFurtwangenUniversityTravelPoint()}]);
  }
}
