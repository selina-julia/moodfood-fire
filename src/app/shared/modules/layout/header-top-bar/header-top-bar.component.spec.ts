import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTopBarComponent } from './header-top-bar.component';

describe('HeaderTopBarComponent', () => {
  let component: HeaderTopBarComponent;
  let fixture: ComponentFixture<HeaderTopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderTopBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
