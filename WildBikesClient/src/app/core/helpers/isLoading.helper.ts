import { BehaviorSubject } from 'rxjs';

export class IsLoadingHelper {
  public readonly isLoading$ = new BehaviorSubject<boolean>(false);
  private requestsNumber = 0;

  protected requestStarted(): void {
    this.isLoading$.next(Boolean(this.requestsNumber += 1));
  }

  protected requestCompleted(): void {
    this.isLoading$.next(Boolean(this.requestsNumber -= 1));
  }
}