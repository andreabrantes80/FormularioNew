import { Component, Input } from '@angular/core';
import { DependentsList } from '../../types/dependents-list';


@Component({
  selector: 'app-dependents-list',
  templateUrl: './dependents-list.component.html',
  styleUrls: ['./dependents-list.component.scss']
})
export class DependentsListComponent {
  @Input() dependentsList: DependentsList | undefined = [];

}
