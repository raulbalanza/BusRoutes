import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StopsPage } from './stops.page';

describe('StopsPage', () => {
  let component: StopsPage;
  let fixture: ComponentFixture<StopsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StopsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
