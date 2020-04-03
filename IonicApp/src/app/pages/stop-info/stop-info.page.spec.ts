import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StopInfoPage } from './stop-info.page';

describe('StopInfoPage', () => {
  let component: StopInfoPage;
  let fixture: ComponentFixture<StopInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StopInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
