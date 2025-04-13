import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPromotionComponent } from './crud-promotion.component';

describe('CrudPromotionComponent', () => {
  let component: CrudPromotionComponent;
  let fixture: ComponentFixture<CrudPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudPromotionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
