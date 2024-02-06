import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule], // Import the necessary modules
      declarations: [],
      providers: [
        // Provide the MAT_DIALOG_DATA token with a mock value
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
