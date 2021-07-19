interface Command {
  execute(): void;
}

/**
 * Some commands can implement simple operations on their own.
 */
 class SimpleCommand implements Command {
  private payload: string;

  constructor(payload: string) {
      this.payload = payload;
  }

  public execute(): void {
      console.log(`SimpleCommand: See, I can do simple things like printing (${this.payload})`);
  }
}

/**
* However, some commands can delegate more complex operations to other objects,
* called "receivers."
*/
class ComplexCommand implements Command {
  private receiver: Receiver;

  /**
   * Context data, required for launching the receiver's methods.
   */
  private a: string;

  private b: string;

  /**
   * Complex commands can accept one or several receiver objects along with
   * any context data via the constructor.
   */
  constructor(receiver: Receiver, a: string, b: string) {
      this.receiver = receiver;
      this.a = a;
      this.b = b;
  }

  /**
   * Commands can delegate to any methods of a receiver.
   */
  public execute(): void {
      console.log('ComplexCommand: Complex stuff should be done by a receiver object.');
      this.receiver.doSomething(this.a);
      this.receiver.doSomethingElse(this.b);
  }
}
