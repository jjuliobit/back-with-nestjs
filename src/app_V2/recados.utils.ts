import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class RecadosUtils {
  private readonly instanceId = Math.random().toString(36).slice(2, 8);

  getInstanceId(): string {
    return this.instanceId;
  }

  invertString(str: string): string {
    return str.split('').reverse().join('');
  }
}

@Injectable()
export class RecadosUtilsMock {
    invertString(str: string): string {
        // Invert a string
        // Example: "hello" -> "olleh"
        return 'bla bla bla';
    }
}