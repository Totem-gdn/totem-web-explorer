import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoGamesComponent } from './demo-games.component';

describe('DemoGamesComponent', () => {
  let component: DemoGamesComponent;
  let fixture: ComponentFixture<DemoGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoGamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
