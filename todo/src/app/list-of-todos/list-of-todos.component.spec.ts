import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfTodosComponent } from './list-of-todos.component';

describe('ListOfTodosComponent', () => {
  let component: ListOfTodosComponent;
  let fixture: ComponentFixture<ListOfTodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfTodosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
