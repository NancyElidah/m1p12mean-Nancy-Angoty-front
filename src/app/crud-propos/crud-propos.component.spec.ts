import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudProposComponent } from './crud-propos.component';

describe('CrudProposComponent', () => {
  let component: CrudProposComponent;
  let fixture: ComponentFixture<CrudProposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudProposComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudProposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
