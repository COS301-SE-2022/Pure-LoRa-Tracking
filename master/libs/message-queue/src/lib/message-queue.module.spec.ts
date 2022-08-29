import { async, TestBed } from '@angular/core/testing';
import { MessageQueueModule } from './message-queue.module';

describe('MessageQueueModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MessageQueueModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(MessageQueueModule).toBeDefined();
  });
});
