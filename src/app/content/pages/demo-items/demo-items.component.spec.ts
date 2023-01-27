import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoItemsComponent } from './demo-items.component';

describe('DemoItemsComponent', () => {
  let component: DemoItemsComponent;
  let fixture: ComponentFixture<DemoItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
