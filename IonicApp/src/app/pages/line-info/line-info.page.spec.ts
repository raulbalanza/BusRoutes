import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LineInfoPage } from './line-info.page';

describe('LineInfoPage', () => {
  let component: LineInfoPage;
  let fixture: ComponentFixture<LineInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LineInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
