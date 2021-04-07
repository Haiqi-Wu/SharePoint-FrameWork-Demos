import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpFxAngular9WebPartComponent } from './sp-fx-angular9-web-part.component';

describe('SpFxAngular9WebPartComponent', () => {
  let component: SpFxAngular9WebPartComponent;
  let fixture: ComponentFixture<SpFxAngular9WebPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpFxAngular9WebPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpFxAngular9WebPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
